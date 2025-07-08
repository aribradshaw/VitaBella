import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { lineItems, customer } = await req.json();
    
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: "Missing line items" }, { status: 400 });
    }

    // For simplicity, let's use a fixed amount for now
    // You can modify this to calculate based on your actual price IDs
    const item = lineItems[0];
    let amount = 0;

    // Map your price IDs to amounts (in cents)
    const priceMap: { [key: string]: number } = {
      'price_basic': 9900,    // $99.00
      'price_premium': 19900, // $199.00
    };

    if (item.price && priceMap[item.price]) {
      amount = priceMap[item.price] * (item.quantity || 1);
    } else {
      // Fallback: try to fetch from Stripe (but this was causing issues before)
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    if (amount < 50) {
      return NextResponse.json({ error: "Amount too low" }, { status: 400 });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerEmail: customer?.email || "",
        customerName: `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim(),
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || "Internal server error" }, 
      { status: 500 }
    );
  }
}