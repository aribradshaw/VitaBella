import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  const sig = req.headers.get("stripe-signature");
  const buf = await req.arrayBuffer();
  let event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig!, endpointSecret);
    console.log('Webhook event type:', event.type);
    console.log('Event ID:', event.id);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
        console.log('Payment Intent succeeded:', paymentIntentSucceeded.id);
        console.log('Amount:', paymentIntentSucceeded.amount);
        console.log('Customer:', paymentIntentSucceeded.customer);
        console.log('Setup future usage:', paymentIntentSucceeded.setup_future_usage);
        
        // Handle successful payment
        // You can add custom logic here like updating database, sending emails, etc.
        break;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.log('Payment Intent failed:', paymentIntentFailed.id);
        console.log('Last error:', paymentIntentFailed.last_payment_error);
        
        // Handle failed payment
        break;

      case "payment_intent.requires_action":
        const paymentIntentRequiresAction = event.data.object as Stripe.PaymentIntent;
        console.log('Payment Intent requires action:', paymentIntentRequiresAction.id);
        console.log('Next action:', paymentIntentRequiresAction.next_action);
        
        // Handle 3D Secure or other required actions
        break;

      case "invoice.paid":
        const invoicePaid = event.data.object as Stripe.Invoice;
        console.log('Invoice paid:', invoicePaid.id);
        if ((invoicePaid as any).subscription) {
          console.log('Subscription:', (invoicePaid as any).subscription);
        }
        
        // Handle successful subscription invoice payment
        break;

      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', invoicePaymentFailed.id);
        if ((invoicePaymentFailed as any).subscription) {
          console.log('Subscription:', (invoicePaymentFailed as any).subscription);
        }
        
        // Handle failed subscription payment
        break;

      case "customer.subscription.created":
        const subscriptionCreated = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscriptionCreated.id);
        console.log('Customer:', subscriptionCreated.customer);
        console.log('Status:', subscriptionCreated.status);
        
        // Handle new subscription
        break;

      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscriptionUpdated.id);
        console.log('Status:', subscriptionUpdated.status);
        
        // Handle subscription changes
        break;

      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscriptionDeleted.id);
        
        // Handle subscription cancellation
        break;

      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', checkoutSession.id);
        
        // Handle successful checkout
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook processing error', { status: 500 });
  }
}
