import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ No Stripe signature found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    console.log('✅ Webhook signature verified');
    console.log('Event type:', event.type);
    console.log('Event ID:', event.id);
  } catch (error: any) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('💰 Payment Intent succeeded:', paymentIntent.id);
        console.log('   Amount:', paymentIntent.amount / 100, 'USD');
        console.log('   Customer:', paymentIntent.customer);
        console.log('   Status:', paymentIntent.status);
        console.log('   Setup future usage:', paymentIntent.setup_future_usage);
        
        // TODO: Update your database with successful payment
        // - Mark subscription as active
        // - Send confirmation email
        // - Update customer record
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Payment Intent failed:', failedPayment.id);
        console.log('   Error:', failedPayment.last_payment_error?.message);
        console.log('   Customer:', failedPayment.customer);
        
        // TODO: Handle failed payment
        // - Send failure notification
        // - Update subscription status
        // - Log failure reason
        break;

      case 'payment_intent.requires_action':
        const actionRequired = event.data.object as Stripe.PaymentIntent;
        console.log('⚠️ Payment Intent requires action:', actionRequired.id);
        console.log('   Next action:', actionRequired.next_action?.type);
        
        // TODO: Handle required actions (like 3D Secure)
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('🎉 Subscription created:', subscription.id);
        console.log('   Customer:', subscription.customer);
        console.log('   Status:', subscription.status);
        console.log('   Current period start:', new Date((subscription as any).current_period_start * 1000));
        console.log('   Current period end:', new Date((subscription as any).current_period_end * 1000));
        
        // TODO: Activate subscription in your system
        // - Create user account if needed
        // - Grant access to subscription features
        // - Send welcome email
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        console.log('🔄 Subscription updated:', updatedSubscription.id);
        console.log('   Status:', updatedSubscription.status);
        console.log('   Cancel at period end:', updatedSubscription.cancel_at_period_end);
        
        // TODO: Update subscription in your system
        // - Sync subscription status
        // - Handle plan changes
        // - Update billing cycle
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('🗑️ Subscription deleted:', deletedSubscription.id);
        console.log('   Customer:', deletedSubscription.customer);
        console.log('   Ended at:', deletedSubscription.ended_at);
        
        // TODO: Handle subscription cancellation
        // - Revoke access to subscription features
        // - Send cancellation confirmation
        // - Update customer status
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('📄 Invoice payment succeeded:', invoice.id);
        if ((invoice as any).subscription) {
          console.log('   Subscription:', (invoice as any).subscription);
        }
        console.log('   Amount paid:', invoice.amount_paid / 100, 'USD');
        
        // TODO: Handle successful recurring payment
        // - Extend subscription period
        // - Send payment receipt
        // - Update billing history
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('💸 Invoice payment failed:', failedInvoice.id);
        if ((failedInvoice as any).subscription) {
          console.log('   Subscription:', (failedInvoice as any).subscription);
        }
        console.log('   Amount due:', failedInvoice.amount_due / 100, 'USD');
        
        // TODO: Handle failed recurring payment
        // - Send payment failure notification
        // - Attempt retry logic
        // - Handle dunning management
        break;

      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log('🛒 Checkout session completed:', checkoutSession.id);
        console.log('   Customer:', checkoutSession.customer);
        console.log('   Payment status:', checkoutSession.payment_status);
        
        // TODO: Handle completed checkout
        // - Fulfill order
        // - Send confirmation
        break;

      default:
        console.log('🤷 Unhandled event type:', event.type);
        console.log('Event data:', JSON.stringify(event.data.object, null, 2));
    }

    console.log('✅ Webhook processed successfully');
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
