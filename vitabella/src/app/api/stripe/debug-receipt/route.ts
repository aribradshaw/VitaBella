import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function GET(req: NextRequest) {
  console.log('=== STRIPE RECEIPT DEBUG API CALLED ===');
  
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get('payment_intent_id');
    const chargeId = searchParams.get('charge_id');
    
    if (!paymentIntentId && !chargeId) {
      return NextResponse.json({ 
        error: "Either payment_intent_id or charge_id parameter is required" 
      }, { status: 400 });
    }

    let charge;
    let paymentIntent;

    if (chargeId) {
      // Get charge directly
      charge = await stripe.charges.retrieve(chargeId);
      if (charge.payment_intent) {
        paymentIntent = await stripe.paymentIntents.retrieve(charge.payment_intent as string);
      }
    } else {
      // Get payment intent and find associated charge
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId!);
      const charges = await stripe.charges.list({
        payment_intent: paymentIntentId!,
        limit: 1
      });
      if (charges.data.length > 0) {
        charge = charges.data[0];
      }
    }

    const debugInfo = {
      paymentIntent: paymentIntent ? {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        receipt_email: paymentIntent.receipt_email,
        customer: paymentIntent.customer,
        metadata: paymentIntent.metadata
      } : null,
      charge: charge ? {
        id: charge.id,
        status: charge.status,
        amount: charge.amount,
        receipt_email: charge.receipt_email,
        receipt_url: charge.receipt_url,
        receipt_number: charge.receipt_number,
        customer: charge.customer,
        metadata: charge.metadata,
        paid: charge.paid,
        captured: charge.captured
      } : null,
      receiptStatus: {
        hasReceiptEmail: !!(charge?.receipt_email || paymentIntent?.receipt_email),
        receiptEmailSource: charge?.receipt_email ? 'charge' : paymentIntent?.receipt_email ? 'payment_intent' : 'none',
        hasReceiptUrl: !!charge?.receipt_url,
        receiptNumber: charge?.receipt_number || null
      }
    };

    console.log('Debug info:', debugInfo);

    return NextResponse.json(debugInfo);

  } catch (error: any) {
    console.error('Error in receipt debug:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log('=== FORCE RECEIPT SEND DEBUG API CALLED ===');
  
  try {
    const body = await req.json();
    const { email, amount = 2000, currency = 'usd' } = body;
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Create a test payment intent with receipt email
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email,
      payment_method_types: ['card'],
      description: 'VitaBella Receipt Test',
      statement_descriptor: 'VITABELLA*',
      statement_descriptor_suffix: 'RECEIPT-TST',
      metadata: {
        test: 'true',
        receiptTest: 'true',
        customerEmail: email
      }
    });

    return NextResponse.json({ 
      success: true,
      paymentIntentId: paymentIntent.id,
      receiptEmail: paymentIntent.receipt_email,
      message: 'Test payment intent created with receipt email',
      note: 'This is a test payment intent. No actual charge will be made unless completed.'
    });

  } catch (error: any) {
    console.error('Error creating test payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
