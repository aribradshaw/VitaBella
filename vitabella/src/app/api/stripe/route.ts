import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

// Handle POST requests for creating payment intents
export async function POST(req: NextRequest) {
  console.log('=== STRIPE API ROUTE CALLED ===');
  const startTime = Date.now();
  
  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { lineItems, customer, coupon } = body;
    
    if (!lineItems || !Array.isArray(lineItems) || lineItems.some(item => !item.price)) {
      console.log('Invalid lineItems:', lineItems);
      return NextResponse.json({ error: "Missing or invalid line items" }, { status: 400 });
    }

    let amount = 0;
    
    try {
      console.log('Processing lineItems:', lineItems);
      for (const item of lineItems) {
        console.log('Fetching price for:', item.price);
        // Fetch the price from Stripe for each priceId
        const price = await stripe.prices.retrieve(item.price);
        console.log('Retrieved price:', price);
        if (!price || typeof price.unit_amount !== "number") {
          console.log('Invalid price retrieved:', price);
          return NextResponse.json({ error: `Invalid priceId: ${item.price}` }, { status: 400 });
        }
        amount += price.unit_amount * (item.quantity || 1);
      }
      console.log('Total amount calculated:', amount);
    } catch (err: any) {
      console.error('Error fetching Stripe prices:', err);
      return NextResponse.json({ error: err.message || "Error fetching Stripe prices." }, { status: 500 });
    }

    if (!amount || amount < 50) {
      console.log('Amount too low:', amount);
      return NextResponse.json({ error: "Calculated amount is too low or invalid." }, { status: 400 });
    }

    try {
      console.log('Creating PaymentIntent with amount:', amount);
      
      const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          customerEmail: customer?.email || "",
        },
      };

      // Add coupon if provided
      if (coupon && coupon.id) {
        console.log('=== COUPON PROCESSING IN PAYMENT INTENT ===');
        console.log('Coupon object received:', JSON.stringify(coupon, null, 2));
        console.log('Original amount before discount:', amount);
        console.log('Line items for discount calculation:', lineItems);
        
        // Calculate discount only on eligible line items
        let applicableAmount = 0;
        
        // Go through each line item and check if it's eligible for the coupon
        for (const item of lineItems) {
          try {
            const price = await stripe.prices.retrieve(item.price, {
              expand: ['product']
            });
            
            const productId = typeof price.product === 'string' ? price.product : price.product?.id;
            console.log(`Line item ${item.price}: product ${productId}`);
            
            // Check if this product is in the coupon's applicable products list
            if (productId && coupon.applicableProducts?.includes(productId)) {
              const unitAmount = price.unit_amount || 0;
              const itemAmount = unitAmount * (item.quantity || 1);
              applicableAmount += itemAmount;
              console.log(`Product ${productId} is eligible for coupon, adding ${itemAmount} cents to applicable amount`);
            } else {
              console.log(`Product ${productId} is NOT eligible for coupon`);
            }
          } catch (err) {
            console.error(`Error checking product for line item ${item.price}:`, err);
          }
        }
        
        console.log('Total applicable amount for coupon:', applicableAmount);
        
        // Calculate discount only on applicable amount
        let discountAmount = 0;
        if (applicableAmount > 0) {
          if (coupon.type === 'percent') {
            discountAmount = Math.round(applicableAmount * (coupon.value / 100));
            console.log(`Calculating percent discount: ${applicableAmount} * (${coupon.value} / 100) = ${discountAmount}`);
          } else if (coupon.type === 'fixed') {
            discountAmount = Math.min(coupon.value, applicableAmount);
            console.log(`Calculating fixed discount: min(${coupon.value}, ${applicableAmount}) = ${discountAmount}`);
          } else {
            console.log('Unknown coupon type:', coupon.type);
          }
        } else {
          console.log('No applicable amount found for coupon - discount will be 0');
        }
        
        if (discountAmount > 0) {
          const newAmount = amount - discountAmount;
          console.log(`Applying discount: ${amount} - ${discountAmount} = ${newAmount}`);
          
          paymentIntentParams.amount = newAmount;
          paymentIntentParams.metadata = {
            ...paymentIntentParams.metadata,
            couponId: coupon.id,
            couponDiscount: discountAmount.toString(),
            originalAmount: amount.toString(),
            applicableAmount: applicableAmount.toString(),
          };
          console.log('Updated PaymentIntent metadata:', JSON.stringify(paymentIntentParams.metadata, null, 2));
          console.log('Final PaymentIntent amount:', paymentIntentParams.amount);
        } else {
          console.log('No discount amount calculated, proceeding with original amount');
        }
      } else {
        console.log('No coupon provided or coupon missing ID');
        if (coupon) {
          console.log('Coupon object without ID:', JSON.stringify(coupon, null, 2));
        }
      }
      
      const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);
      
      const endTime = Date.now();
      console.log(`=== STRIPE API SUCCESS (${endTime - startTime}ms) ===`);
      console.log('PaymentIntent created:', paymentIntent.id);
      
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
      console.error('Error creating PaymentIntent:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } catch (err: any) {
    console.error('=== STRIPE API ERROR ===');
    console.error('Error:', err);
    return NextResponse.json({ error: 'Server error processing request' }, { status: 500 });
  }
}

// Handle GET requests for fetching all Stripe prices
export async function GET() {
  try {
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
    });

    // Transform prices into a more usable format
    const pricesMap = prices.data.reduce((acc: any, price: any) => {
      acc[price.id] = price;
      return acc;
    }, {});

    return NextResponse.json({ prices: pricesMap });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch prices" }, { status: 500 });
  }
}
