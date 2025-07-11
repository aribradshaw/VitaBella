import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(request: NextRequest) {
  console.log('=== EMBEDDED CHECKOUT SESSION CREATION ===');
  
  try {
    const { lineItems, customer, couponCode } = await request.json();
    console.log('Request data:', { lineItems, customer, couponCode });

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: "Line items are required" },
        { status: 400 }
      );
    }

    // Validate that all line items have valid price IDs
    for (const item of lineItems) {
      if (!item.price || typeof item.price !== 'string') {
        return NextResponse.json(
          { error: "Each line item must have a valid price ID" },
          { status: 400 }
        );
      }
    }

    // Build the checkout session parameters
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: lineItems.map(item => ({
        price: item.price,
        quantity: item.quantity || 1,
      })),
      mode: 'payment', // Use 'subscription' if you have subscription products
      return_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false }, // Enable if you want automatic tax calculation
      customer_creation: 'always', // Create customer in Stripe
    };

    // Add customer email if provided
    if (customer?.email) {
      sessionParams.customer_email = customer.email;
    }

    // Add coupon if provided - This is the key advantage of embedded checkout!
    if (couponCode && typeof couponCode === 'string') {
      console.log('Adding coupon to checkout session:', couponCode);
      
      // Validate the coupon exists first
      try {
        // Try as direct coupon first
        let coupon;
        try {
          coupon = await stripe.coupons.retrieve(couponCode.trim());
          sessionParams.discounts = [{ coupon: coupon.id }];
          console.log('Applied direct coupon:', coupon.id);
        } catch (couponError) {
          // Try as promotion code
          const promotionCodes = await stripe.promotionCodes.list({
            code: couponCode.trim(),
            active: true,
            limit: 1,
          });
          
          if (promotionCodes.data.length > 0) {
            const promotionCode = promotionCodes.data[0];
            sessionParams.discounts = [{ promotion_code: promotionCode.id }];
            console.log('Applied promotion code:', promotionCode.id);
          } else {
            console.log('Coupon/promotion code not found, proceeding without discount');
          }
        }
      } catch (error) {
        console.error('Error validating coupon:', error);
        // Continue without coupon rather than failing the entire checkout
      }
    }

    // Add metadata for tracking
    sessionParams.metadata = {
      customerEmail: customer?.email || '',
      source: 'embedded_checkout',
      couponCode: couponCode || '',
      timestamp: new Date().toISOString(),
    };

    console.log('Creating checkout session with params:', {
      ...sessionParams,
      line_items: sessionParams.line_items?.map(item => ({ price: item.price, quantity: item.quantity }))
    });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('Checkout session created:', session.id);
    console.log('Client secret:', session.client_secret);

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error('Error creating embedded checkout session:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
