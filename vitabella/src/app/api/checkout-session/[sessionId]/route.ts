import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    
    console.log('Retrieving session status for:', sessionId);

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer']
    });

    console.log('Session retrieved:', {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email
    });

    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      customer_details: session.customer_details,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      line_items: session.line_items?.data || []
    });

  } catch (error: any) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}