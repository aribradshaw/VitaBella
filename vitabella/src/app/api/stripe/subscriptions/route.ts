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

      // Separate recurring items (subscription) from one-time items (invoice items)
      const recurringItems: Stripe.SubscriptionCreateParams.Item[] = [];
      const oneTimeItems: { price: string; quantity: number }[] = [];
      
      for (const item of lineItems) {
        try {
          const price = await stripe.prices.retrieve(item.price);
          
          if (price.recurring) {
            // This is a recurring price (membership plan)
            recurringItems.push({
              price: item.price,
              quantity: item.quantity || 1,
            });
            console.log(`Added recurring item: ${item.price}`);
          } else {
            // This is a one-time price (consultation fee, lab panels)
            oneTimeItems.push({
              price: item.price,
              quantity: item.quantity || 1,
            });
            console.log(`Added one-time item: ${item.price}`);
          }
        } catch (err) {
          console.error(`Error retrieving price ${item.price}:`, err);
          return NextResponse.json({ error: `Invalid price: ${item.price}` }, { status: 400 });
        }
      }

      if (recurringItems.length === 0) {
        return NextResponse.json({ error: "At least one recurring item is required for subscription" }, { status: 400 });
      }

      // Create subscription parameters
      const subscriptionParams: Stripe.SubscriptionCreateParams = {
        customer: stripeCustomer.id,
        items: recurringItems,
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          customerEmail: customer.email,
          customerName: `${customer.firstName} ${customer.lastName}`,
        },
      };

      // Add coupon to subscription if provided and valid
      if (coupon && coupon.id) {
        console.log('=== PROCESSING COUPON FOR SUBSCRIPTION ===');
        console.log('Coupon object:', JSON.stringify(coupon, null, 2));
        
        try {
          // Validate coupon exists in Stripe
          const stripeCoupon = await stripe.coupons.retrieve(coupon.id);
          console.log('Stripe coupon retrieved:', stripeCoupon.id);
          
          // Apply coupon to subscription
          (subscriptionParams as any).coupon = coupon.id;
          console.log('Applied coupon to subscription:', coupon.id);
        } catch (couponError) {
          console.error('Error applying coupon to subscription:', couponError);
          // Don't fail the entire subscription creation for coupon errors
        }
      }

      // Create the subscription
      const subscription = await stripe.subscriptions.create(subscriptionParams);
      console.log('Subscription created:', subscription.id);

      // Add one-time items as invoice items for the first invoice
      if (oneTimeItems.length > 0) {
        console.log('Adding one-time items to invoice...');
        
        for (const item of oneTimeItems) {
          try {
            const price = await stripe.prices.retrieve(item.price, { expand: ['product'] });
            let shouldApplyCoupon = false;
            
            // Check if this one-time item is eligible for the coupon
            if (coupon && coupon.applicableProducts) {
              const productId = typeof price.product === 'string' ? price.product : price.product?.id;
              shouldApplyCoupon = productId && coupon.applicableProducts.includes(productId);
              console.log(`One-time item ${item.price} (product: ${productId}) coupon eligible: ${shouldApplyCoupon}`);
            }
            
            const invoiceItemParams: any = {
              customer: stripeCustomer.id,
              price: item.price,
              quantity: item.quantity,
              subscription: subscription.id,
            };
            
            // Apply coupon to individual invoice item if eligible
            if (shouldApplyCoupon && coupon.id) {
              try {
                // For one-time items, we need to create a discount manually
                // since Stripe doesn't apply subscription coupons to invoice items
                const stripeCoupon = await stripe.coupons.retrieve(coupon.id);
                
                if (stripeCoupon.percent_off) {
                  // Calculate discount amount for percentage coupons
                  const discountAmount = Math.round((price.unit_amount || 0) * (stripeCoupon.percent_off / 100));
                  invoiceItemParams.amount = (price.unit_amount || 0) - discountAmount;
                  invoiceItemParams.currency = price.currency;
                  delete invoiceItemParams.price; // Use amount instead of price when applying custom discount
                  console.log(`Applied ${stripeCoupon.percent_off}% discount to one-time item: ${discountAmount} cents off`);
                } else if (stripeCoupon.amount_off) {
                  // Calculate discount amount for fixed amount coupons
                  const discountAmount = Math.min(stripeCoupon.amount_off, price.unit_amount || 0);
                  invoiceItemParams.amount = (price.unit_amount || 0) - discountAmount;
                  invoiceItemParams.currency = price.currency;
                  delete invoiceItemParams.price; // Use amount instead of price when applying custom discount
                  console.log(`Applied $${discountAmount/100} discount to one-time item`);
                }
              } catch (discountError) {
                console.error('Error applying discount to one-time item:', discountError);
                // Continue without discount if there's an error
              }
            }
            
            await stripe.invoiceItems.create(invoiceItemParams);
            console.log(`Added one-time item to invoice: ${item.price}`);
          } catch (itemError) {
            console.error(`Error adding one-time item ${item.price}:`, itemError);
          }
        }
      }

      // Get the client secret for payment confirmation
      const latestInvoice = subscription.latest_invoice as any;
      const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent;
      
      if (!paymentIntent || !paymentIntent.client_secret) {
        console.error('No payment intent client secret found');
        return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
      }

      const endTime = Date.now();
      console.log(`=== STRIPE SUBSCRIPTION API SUCCESS (${endTime - startTime}ms) ===`);
      console.log('Subscription ID:', subscription.id);
      console.log('Payment Intent ID:', paymentIntent.id);
      
      return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
        customerId: stripeCustomer.id,
      });
      
    } catch (err: any) {
      console.error('Error creating subscription:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } catch (err: any) {
    console.error('=== STRIPE SUBSCRIPTION API ERROR ===');
    console.error('Error:', err);
    return NextResponse.json({ error: 'Server error processing request' }, { status: 500 });
  }
}
