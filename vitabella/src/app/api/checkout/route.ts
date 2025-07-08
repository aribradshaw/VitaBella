import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

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