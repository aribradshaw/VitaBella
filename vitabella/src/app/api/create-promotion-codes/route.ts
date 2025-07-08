import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { couponId, promoCode, customerId, maxRedemptions, expiresAt } = await req.json();
    
    console.log('Creating promotion code:', {
      couponId,
      promoCode,
      customerId,
      maxRedemptions,
      expiresAt
    });

    const params: any = {
      coupon: couponId,
      code: promoCode,
      active: true,
    };

    // Optional parameters
    if (customerId) params.customer = customerId;
    if (maxRedemptions) params.max_redemptions = maxRedemptions;
    if (expiresAt) params.expires_at = Math.floor(new Date(expiresAt).getTime() / 1000);

    const promotionCode = await stripe.promotionCodes.create(params);
    
    console.log('Promotion code created:', promotionCode);
    
    return NextResponse.json({
      success: true,
      promotionCode: {
        id: promotionCode.id,
        code: promotionCode.code,
        coupon_id: promotionCode.coupon.id,
        active: promotionCode.active,
        created: new Date(promotionCode.created * 1000).toISOString(),
        expires_at: promotionCode.expires_at ? new Date(promotionCode.expires_at * 1000).toISOString() : null,
        max_redemptions: promotionCode.max_redemptions,
        times_redeemed: promotionCode.times_redeemed,
      }
    });
    
  } catch (error: any) {
    console.error('Error creating promotion code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        type: error.type,
        code: error.code 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to create some default promotion codes for testing
export async function GET() {
  try {
    console.log('Creating default promotion codes...');
    
    // First, get all existing coupons
    const coupons = await stripe.coupons.list({ limit: 100 });
    console.log('Found', coupons.data.length, 'coupons');
    
    const results = [];
    
    // Create promotion codes for existing coupons
    for (const coupon of coupons.data) {
      if (!coupon.valid) continue;
      
      try {
        // Create a human-readable promotion code based on the discount
        let promoCode;
        if (coupon.percent_off) {
          promoCode = `SAVE${Math.round(coupon.percent_off)}`;
        } else if (coupon.amount_off) {
          promoCode = `SAVE${Math.round(coupon.amount_off / 100)}`;
        } else {
          promoCode = `PROMO${Date.now()}`;
        }
        
        // Check if this promotion code already exists
        const existing = await stripe.promotionCodes.list({
          code: promoCode,
          limit: 1
        });
        
        if (existing.data.length > 0) {
          console.log(`Promotion code ${promoCode} already exists`);
          results.push({
            coupon_id: coupon.id,
            promo_code: promoCode,
            status: 'already_exists',
            promotion_code_id: existing.data[0].id
          });
          continue;
        }
        
        const promotionCode = await stripe.promotionCodes.create({
          coupon: coupon.id,
          code: promoCode,
          active: true,
        });
        
        console.log(`Created promotion code ${promoCode} for coupon ${coupon.id}`);
        
        results.push({
          coupon_id: coupon.id,
          promo_code: promoCode,
          status: 'created',
          promotion_code_id: promotionCode.id,
          percent_off: coupon.percent_off,
          amount_off: coupon.amount_off
        });
        
      } catch (error: any) {
        console.error(`Error creating promotion code for coupon ${coupon.id}:`, error.message);
        results.push({
          coupon_id: coupon.id,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      results,
      message: 'Promotion codes creation completed'
    });
    
  } catch (error: any) {
    console.error('Error in bulk promotion code creation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
