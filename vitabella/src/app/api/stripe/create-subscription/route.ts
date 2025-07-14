import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  console.log('=== CREATE SUBSCRIPTION AFTER PAYMENT ===');
  
  try {
    const body = await req.json();
    const { paymentIntentId } = body;
    
    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment intent ID is required" }, { status: 400 });
    }

    // Retrieve the payment intent to get customer and metadata
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log('Retrieved payment intent:', paymentIntent.id);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: "Payment has not succeeded yet" }, { status: 400 });
    }

    const metadata = paymentIntent.metadata;
    const subscriptionItems = JSON.parse(metadata.subscriptionItems || '[]');
    const oneTimeItems = JSON.parse(metadata.oneTimeItems || '[]');
    const couponApplied = metadata.couponApplied;
    const subscriptionAmount = parseInt(metadata.subscriptionAmount || '0');
    const oneTimeAmount = parseInt(metadata.oneTimeAmount || '0');

    console.log('Payment intent metadata:');
    console.log('- Subscription items:', subscriptionItems.length);
    console.log('- One-time items:', oneTimeItems.length);
    console.log('- Subscription amount:', subscriptionAmount, 'cents ($' + (subscriptionAmount / 100) + ')');
    console.log('- One-time amount:', oneTimeAmount, 'cents ($' + (oneTimeAmount / 100) + ')');
    console.log('- Coupon applied:', couponApplied);

    if (subscriptionItems.length === 0) {
      return NextResponse.json({ error: "No subscription items found" }, { status: 400 });
    }

    // Get the billing interval from the first subscription item to set appropriate billing cycle
    const firstItem = subscriptionItems[0];
    const firstPrice = await stripe.prices.retrieve(firstItem.price);
    const interval = firstPrice.recurring?.interval;
    const intervalCount = firstPrice.recurring?.interval_count || 1;
    
    console.log('Subscription interval:', interval, 'Count:', intervalCount);
    
    // Calculate next billing date based on the subscription interval
    let billingCycleAnchor;
    const now = Math.floor(Date.now() / 1000);
    
    if (interval === 'year') {
      // For annual subscriptions, next billing is in 1 year
      billingCycleAnchor = now + (365 * 24 * 60 * 60 * intervalCount);
      console.log('Annual subscription - next billing in', intervalCount, 'year(s)');
    } else if (interval === 'month') {
      // For monthly subscriptions, next billing is in 1 month (approximately 30 days)
      billingCycleAnchor = now + (30 * 24 * 60 * 60 * intervalCount);
      console.log('Monthly subscription - next billing in', intervalCount, 'month(s)');
    } else if (interval === 'week') {
      // For weekly subscriptions, next billing is in 1 week
      billingCycleAnchor = now + (7 * 24 * 60 * 60 * intervalCount);
      console.log('Weekly subscription - next billing in', intervalCount, 'week(s)');
    } else {
      // Default fallback - 30 days
      billingCycleAnchor = now + (30 * 24 * 60 * 60);
      console.log('Unknown interval, defaulting to 30 days');
    }

    // Prepare subscription parameters - subscription should only contain recurring items
    const subscriptionParams: any = {
      customer: paymentIntent.customer as string,
      items: subscriptionItems,
      default_payment_method: paymentIntent.payment_method as string,
      billing_cycle_anchor: billingCycleAnchor,
      proration_behavior: 'none',
      metadata: {
        customerEmail: metadata.customerEmail,
        customerName: metadata.customerName,
        paymentIntentId: paymentIntent.id,
        initialPaymentCompleted: 'true',
        subscriptionOnlyAmount: subscriptionAmount.toString() // Track the subscription-only amount
      },
    };

    // Add coupon to subscription if it applies to subscription items and has ongoing duration
    if (couponApplied && couponApplied !== 'none') {
      try {
        const coupon = await stripe.coupons.retrieve(couponApplied);
        console.log('Checking coupon for subscription:', coupon.id, 'Duration:', coupon.duration);
        
        // Only apply coupon to subscription if it has repeating/forever duration
        // Always apply if it's a forever/repeating coupon that applies to subscription items
        if (coupon.duration === 'forever' || coupon.duration === 'repeating') {
          // Check if coupon applies to subscription products
          let appliestoSubscription = false;
          
          if (coupon.applies_to?.products) {
            // Check if any subscription items have products covered by the coupon
            for (const item of subscriptionItems) {
              const price = await stripe.prices.retrieve(item.price);
              const productId = typeof price.product === 'string' ? price.product : (price.product as any)?.id;
              if (coupon.applies_to.products.includes(productId)) {
                appliestoSubscription = true;
                console.log(`Subscription item ${item.price} (product: ${productId}) is covered by coupon`);
                break;
              }
            }
          } else {
            // If no specific products, assume it applies to subscription (backwards compatibility)
            appliestoSubscription = true;
          }
          
          if (appliestoSubscription) {
            subscriptionParams.discounts = [{ coupon: couponApplied }];
            console.log('Coupon applied to subscription for future billing');
          } else {
            console.log('Coupon does not apply to subscription items, not applying to subscription');
          }
        } else {
          console.log('Coupon is one-time only, not applying to subscription');
        }
      } catch (couponError) {
        console.error('Error retrieving coupon for subscription:', couponError);
      }
    }

    // Create the subscription with the confirmed payment method
    const subscription = await stripe.subscriptions.create(subscriptionParams);

    console.log('Subscription created:', subscription.id);
    console.log('Future subscription billing will only charge for recurring items, not one-time items');

    // NOTE: We do NOT add one-time items to the subscription or future invoices
    // One-time items (consultation, lab panels) were already paid for in the initial payment
    // and should not appear in future billing cycles
    if (oneTimeItems.length > 0) {
      console.log(`${oneTimeItems.length} one-time items were included in initial payment but will NOT be charged again:`, 
        oneTimeItems.map(item => `${item.description} ($${item.amount * item.quantity / 100})`).join(', '));
    }

    return NextResponse.json({ 
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status
    });
    
  } catch (err: any) {
    console.error('Error creating subscription after payment:', err);
    return NextResponse.json({ error: err.message || 'Failed to create subscription' }, { status: 500 });
  }
}
