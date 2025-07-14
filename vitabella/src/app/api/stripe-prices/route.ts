import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function GET(request: NextRequest) {
  try {
    // Get all the price IDs we need
    const priceIds = [
      'price_1NVd0PBvA5MJ1guPw1S9W0l7', // Performance Monthly
      'price_1NVd0PBvA5MJ1guPfSpSCuNV', // Performance Annual
      'price_1NVcyrBvA5MJ1guP5ywam4pb', // Foundation Monthly
      'price_1NVcyrBvA5MJ1guPHxRiZbYe', // Foundation Annual
      'price_1P8pSTBvA5MJ1guP2rLedmQv', // Consultation Fee
      'price_1RJeXBBvA5MJ1guPhCQ085BJ', // Comprehensive Lab Panel
      'price_1RiL5IBvA5MJ1guPstuqR3K6', // Essential Lab Panel
    ];

    // Fetch all prices from Stripe
    const pricePromises = priceIds.map(id => stripe.prices.retrieve(id));
    const prices = await Promise.all(pricePromises);

    // Create a map of price data
    const priceData = prices.reduce((acc, price) => {
      acc[price.id] = {
        id: price.id,
        amount: price.unit_amount, // Amount in cents
        currency: price.currency,
        interval: price.recurring?.interval || null,
        interval_count: price.recurring?.interval_count || null,
      };
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(priceData);
  } catch (error) {
    console.error('Error fetching Stripe prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 }
    );
  }
}
