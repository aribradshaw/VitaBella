import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      planPriceId, 
      consultFeePriceId, 
      labPriceIds = [], 
      coupon,
      customerEmail,
      mode = 'subscription' // Default to subscription for membership plans
    } = body;

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    
    // Add membership plan
    if (planPriceId) {
      lineItems.push({
        price: planPriceId,
        quantity: 1,
      });
    }
    
    // Add consultation fee (usually one-time)
    if (consultFeePriceId) {
      lineItems.push({
        price: consultFeePriceId,
        quantity: 1,
      });
    }
    
    // Add lab panels
    labPriceIds.forEach((priceId: string) => {
      lineItems.push({
        price: priceId,
        quantity: 1,
      });
    });

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: 'No items to checkout' },
        { status: 400 }
      );
    }

    // Create checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      ui_mode: 'custom',
      line_items: lineItems,
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      return_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: 'required',
      customer_email: customerEmail,
    };

    // Add coupon if provided
    if (coupon) {
      sessionConfig.discounts = [{
        coupon: coupon,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ 
      clientSecret: session.client_secret,
      sessionId: session.id 
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
