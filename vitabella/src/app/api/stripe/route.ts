import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

// Handle POST requests for creating payment intents
export async function POST(req: NextRequest) {
  const { lineItems, customer } = await req.json();
  
  if (!lineItems || !Array.isArray(lineItems) || lineItems.some(item => !item.price)) {
    return NextResponse.json({ error: "Missing or invalid line items" }, { status: 400 });
  }

  let amount = 0;
  
  try {
    for (const item of lineItems) {
      // Fetch the price from Stripe for each priceId
      const price = await stripe.prices.retrieve(item.price);
      if (!price || typeof price.unit_amount !== "number") {
        return NextResponse.json({ error: `Invalid priceId: ${item.price}` }, { status: 400 });
      }
      amount += price.unit_amount * (item.quantity || 1);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error fetching Stripe prices." }, { status: 500 });
  }

  if (!amount || amount < 50) {
    return NextResponse.json({ error: "Calculated amount is too low or invalid." }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerEmail: customer?.email || "",
      },
    });
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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
        amount: price.unit_amount, // Map unit_amount to amount for consistency
        currency: price.currency,
        interval: price.recurring?.interval || null,
        interval_count: price.recurring?.interval_count || null,
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
