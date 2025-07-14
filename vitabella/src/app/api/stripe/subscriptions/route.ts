import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

// Handle POST requests for creating subscriptions
export async function POST(req: NextRequest) {
  console.log('=== STRIPE SUBSCRIPTION API ROUTE CALLED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('URL:', req.url);
  const startTime = Date.now();
  
  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { lineItems, customer, coupon } = body;
    
    if (!lineItems || !Array.isArray(lineItems) || lineItems.some(item => !item.price)) {
      console.log('Invalid lineItems:', lineItems);
      return NextResponse.json({ error: "Missing or invalid line items" }, { status: 400 });
    }

    if (!customer || !customer.email) {
      console.log('Missing customer email');
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
    }

    try {
      // Create or retrieve customer
      let stripeCustomer: Stripe.Customer;
      
      // First, try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: customer.email,
        limit: 1,
      });
      
      if (existingCustomers.data.length > 0) {
        stripeCustomer = existingCustomers.data[0];
        console.log('Found existing customer:', stripeCustomer.id);
      } else {
        // Create new customer
        stripeCustomer = await stripe.customers.create({
          email: customer.email,
          name: `${customer.firstName} ${customer.lastName}`,
          address: {
            line1: customer.address,
            line2: customer.address2 || undefined,
            city: customer.city,
            state: customer.state,
            postal_code: customer.zip,
          },
        });
        console.log('Created new customer:', stripeCustomer.id);
      }

      // Separate recurring items (subscription) from one-time items
      const recurringItems: Stripe.SubscriptionCreateParams.Item[] = [];
      const oneTimeItems: Array<{ priceId: string; quantity: number; amount: number; productId: string; description: string }> = [];
      
      console.log('Processing line items:', lineItems.length);
      
      for (const item of lineItems) {
        try {
          const price = await stripe.prices.retrieve(item.price, { expand: ['product'] });
          const product = price.product as Stripe.Product;
          
          console.log(`Processing item ${item.price}:`, {
            priceId: item.price,
            productId: product.id,
            productName: product.name,
            recurring: !!price.recurring,
            unitAmount: price.unit_amount
          });
          
          if (price.recurring) {
            // This is a recurring price (membership plan)
            recurringItems.push({
              price: item.price,
              quantity: item.quantity || 1,
            });
            console.log(`Added recurring item: ${item.price} - $${(price.unit_amount || 0) / 100}`);
          } else {
            // This is a one-time price (consultation fee, lab panels)
            oneTimeItems.push({
              priceId: item.price,
              quantity: item.quantity || 1,
              amount: price.unit_amount || 0,
              productId: product.id,
              description: product.name || 'One-time item'
            });
            console.log(`Added one-time item: ${item.price} - $${(price.unit_amount || 0) / 100}`);
          }
        } catch (err) {
          console.error(`Error retrieving price ${item.price}:`, err);
          return NextResponse.json({ error: `Invalid price: ${item.price}` }, { status: 400 });
        }
      }

      if (recurringItems.length === 0) {
        return NextResponse.json({ error: "At least one recurring item is required for subscription" }, { status: 400 });
      }

      // Calculate amounts separately for better logic
      let subscriptionAmount = 0; // Only recurring subscription items
      let oneTimeAmount = 0; // Only one-time items (consultation, labs)
      
      // Get subscription amount (recurring only)
      for (const item of recurringItems) {
        const price = await stripe.prices.retrieve(item.price!);
        subscriptionAmount += (price.unit_amount || 0) * (item.quantity || 1);
      }
      
      // Get one-time items amount  
      for (const item of oneTimeItems) {
        oneTimeAmount += item.amount * item.quantity;
      }

      const totalAmount = subscriptionAmount + oneTimeAmount;
      console.log('Subscription amount:', subscriptionAmount, 'cents ($' + (subscriptionAmount / 100) + ')');
      console.log('One-time amount:', oneTimeAmount, 'cents ($' + (oneTimeAmount / 100) + ')');
      console.log('Total amount:', totalAmount, 'cents ($' + (totalAmount / 100) + ')');

      // Apply coupon discount if provided - separate subscription vs one-time discounts
      let subscriptionDiscountAmount = 0;
      let oneTimeDiscountAmount = 0;
      let validCoupon = null;
      let applicableToSubscription = false;
      let applicableToOneTime = false;
      
      if (coupon && coupon.id) {
        try {
          validCoupon = await stripe.coupons.retrieve(coupon.id);
          console.log('Stripe coupon retrieved:', validCoupon.id, validCoupon);
          console.log('Coupon percent_off:', validCoupon.percent_off);
          console.log('Coupon amount_off:', validCoupon.amount_off);
          console.log('Coupon applies_to:', validCoupon.applies_to);
          
          // Get applicable products from Stripe coupon configuration
          let applicableProducts: string[] = [];
          
          if (validCoupon.applies_to?.products) {
            // Use Stripe's applies_to configuration if available
            applicableProducts = validCoupon.applies_to.products;
            console.log('Using Stripe applies_to products:', applicableProducts);
          } else if (coupon.applicableProducts) {
            // Fallback to frontend coupon data
            applicableProducts = coupon.applicableProducts;
            console.log('Using frontend applicable products:', applicableProducts);
          } else {
            // If no specific products configured, don't apply to anything
            console.log('No specific products configured for coupon - coupon will not be applied');
            applicableProducts = [];
          }
          
          console.log('Coupon applicable products:', applicableProducts);
          
          // Only proceed with discount calculation if there are applicable products
          if (applicableProducts.length === 0) {
            console.log('No applicable products for this coupon - no discount will be applied');
          } else {
            // Check if coupon applies to subscription items
            for (const item of recurringItems) {
              const price = await stripe.prices.retrieve(item.price!);
              const productId = typeof price.product === 'string' ? price.product : (price.product as any)?.id;
              if (applicableProducts.includes(productId)) {
                applicableToSubscription = true;
                console.log(`Subscription item ${item.price} (product: ${productId}) is covered by coupon`);
              }
            }
            
            // Check if coupon applies to one-time items
            for (const item of oneTimeItems) {
              if (applicableProducts.includes(item.productId)) {
                applicableToOneTime = true;
                console.log(`One-time item ${item.priceId} (product: ${item.productId}) is covered by coupon`);
              }
            }
          }
          
          // Calculate discount for subscription items
          if (applicableToSubscription && subscriptionAmount > 0) {
            if (validCoupon.percent_off) {
              subscriptionDiscountAmount = Math.round(subscriptionAmount * (validCoupon.percent_off / 100));
            } else if (validCoupon.amount_off) {
              // For fixed amount coupons, calculate proportional discount
              if (applicableToOneTime && oneTimeAmount > 0) {
                // Split the fixed discount proportionally between subscription and one-time items
                const totalApplicableAmount = subscriptionAmount + oneTimeAmount;
                const subscriptionProportion = subscriptionAmount / totalApplicableAmount;
                subscriptionDiscountAmount = Math.min(
                  Math.round((validCoupon.amount_off || 0) * subscriptionProportion),
                  subscriptionAmount
                );
              } else {
                // Apply full discount to subscription only
                subscriptionDiscountAmount = Math.min(validCoupon.amount_off, subscriptionAmount);
              }
            }
            console.log(`Subscription discount: ${subscriptionDiscountAmount} cents`);
          }
          
          // Calculate discount for one-time items
          if (applicableToOneTime && oneTimeAmount > 0) {
            console.log('Calculating one-time discounts...');
            console.log('One-time items:', oneTimeItems.map(item => ({ 
              priceId: item.priceId, 
              productId: item.productId, 
              amount: item.amount 
            })));
            console.log('Applicable products list:', applicableProducts);
            
            // Calculate discount per item instead of total
            let totalOneTimeDiscount = 0;
            
            for (const item of oneTimeItems) {
              let itemDiscount = 0;
              
              if (applicableProducts.includes(item.productId)) {
                console.log(`Item ${item.priceId} (product: ${item.productId}) IS covered by coupon`);
                
                if (validCoupon.percent_off) {
                  itemDiscount = Math.round(item.amount * (validCoupon.percent_off / 100));
                } else if (validCoupon.amount_off) {
                  // For fixed amount coupons, calculate proportional discount
                  if (applicableToSubscription && subscriptionAmount > 0) {
                    // Split the fixed discount proportionally between subscription and one-time items
                    const totalApplicableAmount = subscriptionAmount + oneTimeAmount;
                    const oneTimeProportion = oneTimeAmount / totalApplicableAmount;
                    itemDiscount = Math.min(
                      Math.round((validCoupon.amount_off || 0) * oneTimeProportion * (item.amount / oneTimeAmount)),
                      item.amount
                    );
                  } else {
                    // Apply full discount to one-time items only
                    const applicableOneTimeAmount = oneTimeItems
                      .filter(oti => applicableProducts.includes(oti.productId))
                      .reduce((sum, oti) => sum + oti.amount, 0);
                    
                    if (applicableOneTimeAmount > 0) {
                      const itemProportion = item.amount / applicableOneTimeAmount;
                      itemDiscount = Math.min(
                        Math.round((validCoupon.amount_off || 0) * itemProportion),
                        item.amount
                      );
                    }
                  }
                }
                
                console.log(`Item ${item.priceId}: Original $${item.amount/100}, Discount $${itemDiscount/100}, Final $${(item.amount - itemDiscount)/100}`);
              } else {
                console.log(`Item ${item.priceId} (product: ${item.productId}) is NOT covered by coupon - no discount`);
              }
              
              totalOneTimeDiscount += itemDiscount;
            }
            
            oneTimeDiscountAmount = totalOneTimeDiscount;
            console.log(`Total one-time discount: ${oneTimeDiscountAmount} cents`);
          }
          
        } catch (couponError) {
          console.error('Error validating coupon:', couponError);
          // Continue without coupon if invalid
        }
      }

      const finalSubscriptionAmount = Math.max(0, subscriptionAmount - subscriptionDiscountAmount);
      const finalOneTimeAmount = Math.max(0, oneTimeAmount - oneTimeDiscountAmount);
      const totalDiscountAmount = subscriptionDiscountAmount + oneTimeDiscountAmount;
      const finalTotalAmount = finalSubscriptionAmount + finalOneTimeAmount;

      console.log('Final subscription amount after discount:', finalSubscriptionAmount, 'cents ($' + (finalSubscriptionAmount / 100) + ')');
      console.log('Final one-time amount after discount:', finalOneTimeAmount, 'cents ($' + (finalOneTimeAmount / 100) + ')');
      console.log('Total discount applied:', totalDiscountAmount, 'cents ($' + (totalDiscountAmount / 100) + ')');
      console.log('Final total amount:', finalTotalAmount, 'cents ($' + (finalTotalAmount / 100) + ')');

      // Only create completely free subscription if EVERYTHING is actually free
      if (finalTotalAmount === 0) {
        console.log('Creating completely free subscription (no payment required)');
        
        // Create subscription directly without payment
        const subscription = await stripe.subscriptions.create({
          customer: stripeCustomer.id,
          items: recurringItems,
          discounts: validCoupon ? [{ coupon: validCoupon.id }] : undefined,
          metadata: {
            customerEmail: customer.email,
            customerName: `${customer.firstName} ${customer.lastName}`,
            freeSubscription: 'true',
            couponApplied: validCoupon?.id || 'none'
          },
        });

        console.log('Completely free subscription created:', subscription.id);

        // Add one-time items to the subscription invoice as free
        if (oneTimeItems.length > 0) {
          for (const item of oneTimeItems) {
            await stripe.invoiceItems.create({
              customer: stripeCustomer.id,
              subscription: subscription.id,
              price_data: {
                currency: 'usd',
                product: item.productId,
                unit_amount: 0, // Free
              },
              quantity: item.quantity,
              description: `${item.description} (Free with coupon)`
            });
          }
        }

        return NextResponse.json({ 
          freeSubscription: true,
          subscriptionId: subscription.id,
          customerId: stripeCustomer.id,
          message: 'Subscription created successfully - no payment required!'
        });
      }

      // Create a direct payment intent for the total amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: finalTotalAmount,
        currency: 'usd',
        customer: stripeCustomer.id,
        setup_future_usage: 'off_session', // This allows us to save payment method for future use
        metadata: {
          customerEmail: customer.email,
          customerName: `${customer.firstName} ${customer.lastName}`,
          subscriptionItems: JSON.stringify(recurringItems),
          oneTimeItems: JSON.stringify(oneTimeItems),
          couponApplied: validCoupon?.id || 'none',
          discountAmount: totalDiscountAmount.toString(),
          subscriptionAmount: finalSubscriptionAmount.toString(),
          oneTimeAmount: finalOneTimeAmount.toString()
        },
      });

      console.log('Created payment intent:', paymentIntent.id, 'for amount:', paymentIntent.amount, 'cents');

      // Get the client secret for payment confirmation
      if (!paymentIntent.client_secret) {
        console.error('No payment intent client secret found');
        return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
      }

      const endTime = Date.now();
      console.log(`=== STRIPE PAYMENT INTENT API SUCCESS (${endTime - startTime}ms) ===`);
      console.log('Payment Intent ID:', paymentIntent.id);
      console.log('Amount:', paymentIntent.amount, 'cents ($' + (paymentIntent.amount / 100) + ')');
      
      return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: stripeCustomer.id,
        amount: paymentIntent.amount
      });
      
    } catch (err: any) {
      console.error('Error creating payment intent:', err);
      console.error('Error stack:', err.stack);
      return NextResponse.json({ error: err.message || 'Failed to create payment intent' }, { status: 500 });
    }
  } catch (err: any) {
    console.error('=== STRIPE PAYMENT INTENT API ERROR ===');
    console.error('Error:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json({ error: 'Server error processing request' }, { status: 500 });
  }
}
