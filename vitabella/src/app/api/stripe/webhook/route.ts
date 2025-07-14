import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  console.log('=== STRIPE WEBHOOK CALLED ===');
  const sig = req.headers.get('stripe-signature');
  
  if (!sig) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log('Webhook event type:', event.type);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        await handlePaymentSuccess(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log('=== HANDLING PAYMENT SUCCESS ===');
  console.log('Payment Intent ID:', paymentIntent.id);
  console.log('Customer ID:', paymentIntent.customer);
  console.log('Amount:', paymentIntent.amount);
  console.log('Receipt Email:', paymentIntent.receipt_email);

  // Ensure receipt email is sent
  if (paymentIntent.receipt_email) {
    try {
      console.log('Verifying receipt email delivery for payment:', paymentIntent.id);
      
      // List charges for this payment intent to check receipt status
      const charges = await stripe.charges.list({
        payment_intent: paymentIntent.id,
        limit: 1
      });
      
      if (charges.data.length > 0) {
        const charge = charges.data[0];
        console.log('Charge ID:', charge.id);
        console.log('Receipt Email on Charge:', charge.receipt_email);
        console.log('Receipt URL:', charge.receipt_url);
        
        // If receipt email wasn't set on the charge, update it
        if (!charge.receipt_email && paymentIntent.receipt_email) {
          console.log('Setting receipt email on charge...');
          await stripe.charges.update(charge.id, {
            receipt_email: paymentIntent.receipt_email
          });
          console.log('Receipt email updated on charge');
        }
      }
    } catch (error) {
      console.error('Error handling receipt for payment:', paymentIntent.id, error);
    }
  }

  try {
    // Get metadata from payment intent
    const metadata = paymentIntent.metadata;
    const subscriptionItems = JSON.parse(metadata.subscriptionItems || '[]');
    const oneTimeItems = JSON.parse(metadata.oneTimeItems || '[]');
    
    if (subscriptionItems.length === 0) {
      console.log('No subscription items found in metadata');
      return;
    }

    // Create the subscription now that payment is confirmed
    const subscription = await stripe.subscriptions.create({
      customer: paymentIntent.customer as string,
      items: subscriptionItems,
      default_payment_method: paymentIntent.payment_method as string,
      metadata: {
        customerEmail: metadata.customerEmail,
        customerName: metadata.customerName,
        paymentIntentId: paymentIntent.id
      },
    });

    console.log('Subscription created after payment:', subscription.id);

    // Add one-time items to the first invoice if any
    if (oneTimeItems.length > 0) {
      for (const item of oneTimeItems) {
        await stripe.invoiceItems.create({
          customer: paymentIntent.customer as string,
          subscription: subscription.id,
          price_data: {
            currency: 'usd',
            product: item.productId,
            unit_amount: item.amount,
          },
          quantity: item.quantity,
          description: item.description
        });
      }
      console.log('Added one-time items to subscription invoice');
    }

    console.log('Payment success handling completed');
  } catch (error) {
    console.error('Error creating subscription after payment:', error);
  }
}
