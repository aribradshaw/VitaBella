import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// You should store your Stripe secret key in an environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil',
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'line_items'],
    });

    // Retrieve line items
    const lineItems = session.line_items?.data || [];

    // Format the response for the frontend
    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      line_items: lineItems.map((item: any) => ({
        price: {
          id: item.price.id,
          product: item.price.product,
        },
        quantity: item.quantity,
        description: item.description || (item.price.product && typeof item.price.product === 'object' ? item.price.product.name : ''),
        amount_total: item.amount_total,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch session' }, { status: 500 });
  }
}
