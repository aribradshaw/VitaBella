import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  console.log('=== MANUAL RECEIPT SEND API CALLED ===');
  
  try {
    const body = await req.json();
    const { paymentIntentId, email } = body;
    
    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment Intent ID is required" }, { status: 400 });
    }

    // Get the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (!paymentIntent) {
      return NextResponse.json({ error: "Payment Intent not found" }, { status: 404 });
    }

    console.log('Payment Intent:', paymentIntent.id, 'Status:', paymentIntent.status);

    // Get the associated charge
    const charges = await stripe.charges.list({
      payment_intent: paymentIntentId,
      limit: 1
    });

    if (charges.data.length === 0) {
      return NextResponse.json({ error: "No charges found for this payment" }, { status: 404 });
    }

    const charge = charges.data[0];
    console.log('Charge:', charge.id, 'Receipt Email:', charge.receipt_email);

    // Update the charge to ensure receipt email is set
    const receiptEmail = email || paymentIntent.receipt_email || charge.receipt_email;
    
    if (!receiptEmail) {
      return NextResponse.json({ error: "No email address available for receipt" }, { status: 400 });
    }

    // Update charge with receipt email
    const updatedCharge = await stripe.charges.update(charge.id, {
      receipt_email: receiptEmail,
      metadata: {
        ...charge.metadata,
        manualReceiptSent: 'true',
        receiptSentAt: new Date().toISOString()
      }
    });

    console.log('Updated charge with receipt email:', updatedCharge.receipt_email);
    console.log('Receipt URL:', updatedCharge.receipt_url);

    return NextResponse.json({ 
      success: true, 
      chargeId: charge.id,
      receiptEmail: updatedCharge.receipt_email,
      receiptUrl: updatedCharge.receipt_url,
      message: 'Receipt email configured successfully'
    });

  } catch (error: any) {
    console.error('Error sending receipt:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
