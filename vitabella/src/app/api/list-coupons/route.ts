import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function GET() {
  try {
    console.log('=== LISTING COUPONS AND PROMOTION CODES ===');
    
    // List all coupons
    const coupons = await stripe.coupons.list({
      limit: 100, // Adjust limit as needed
    });
    
    console.log('Found', coupons.data.length, 'coupons');
    
    const couponInfo = coupons.data.map(coupon => ({
      id: coupon.id,
      name: coupon.name,
      valid: coupon.valid,
      percent_off: coupon.percent_off,
      amount_off: coupon.amount_off,
      currency: coupon.currency,
      created: new Date(coupon.created * 1000).toISOString(),
      redeem_by: coupon.redeem_by ? new Date(coupon.redeem_by * 1000).toISOString() : null,
      max_redemptions: coupon.max_redemptions,
      times_redeemed: coupon.times_redeemed,
    }));
    
    console.log('Coupon details:', JSON.stringify(couponInfo, null, 2));
    
    // Also list promotion codes
    const promotionCodes = await stripe.promotionCodes.list({
      limit: 100,
    });
    
    console.log('Found', promotionCodes.data.length, 'promotion codes');
    
    const promoInfo = promotionCodes.data.map(promo => ({
      id: promo.id,
      code: promo.code,
      coupon_id: promo.coupon.id,
      coupon_name: promo.coupon.name,
      coupon_percent_off: promo.coupon.percent_off,
      coupon_amount_off: promo.coupon.amount_off,
      active: promo.active,
      created: new Date(promo.created * 1000).toISOString(),
      expires_at: promo.expires_at ? new Date(promo.expires_at * 1000).toISOString() : null,
      max_redemptions: promo.max_redemptions,
      times_redeemed: promo.times_redeemed,
    }));
    
    console.log('Promotion code details:', JSON.stringify(promoInfo, null, 2));
    
    return NextResponse.json({
      success: true,
      summary: {
        total_coupons: coupons.data.length,
        total_promotion_codes: promotionCodes.data.length
      },
      coupons: couponInfo,
      promotionCodes: promoInfo,
    });
    
  } catch (error: any) {
    console.error('Error listing coupons:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
