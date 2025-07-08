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
    
    const { lineItems, customer } = body;
    
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
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          customerEmail: customer?.email || "",
        },
      });
      
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
      acc[price.id] = {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        product: price.product,
        nickname: price.nickname,
      };
      return acc;
    }, {});

    return NextResponse.json({ prices: pricesMap });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch prices" }, { status: 500 });
  }
}
