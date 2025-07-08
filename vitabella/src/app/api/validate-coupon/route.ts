import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  console.log('=== COUPON VALIDATION DEBUG START ===');
  const startTime = Date.now();
  
  try {
    const { couponCode } = await request.json();
    console.log('Received coupon code:', JSON.stringify(couponCode));

    if (!couponCode || typeof couponCode !== 'string') {
      console.log('Invalid coupon code format:', typeof couponCode, couponCode);
      return NextResponse.json(
        { valid: false, message: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const trimmedCode = couponCode.trim();
    console.log('Processing coupon code:', JSON.stringify(trimmedCode));
    console.log('Original code length:', couponCode.length, 'Trimmed length:', trimmedCode.length);

    // Retrieve the coupon from Stripe
    console.log('Attempting to retrieve coupon from Stripe...');
    
    let coupon;
    let isPromotionCode = false;
    let actualCode = trimmedCode;
    
    try {
      // First try to get it as a direct coupon (case-sensitive)
      coupon = await stripe.coupons.retrieve(trimmedCode);
      console.log('Found as direct coupon');
    } catch (couponError: any) {
      console.log('Direct coupon not found, trying as promotion code...');
      console.log('Coupon error:', couponError.type, couponError.code);
      
      // If not found as coupon, try to find it as a promotion code (case-insensitive)
      try {
        // Promotion codes are case-insensitive according to Stripe docs
        const promotionCodes = await stripe.promotionCodes.list({
          code: trimmedCode,
          active: true,
          limit: 1,
        });
        
        console.log('Promotion code search results:', promotionCodes.data.length);
        
        if (promotionCodes.data.length > 0) {
          const promotionCode = promotionCodes.data[0];
          console.log('Found as promotion code:', promotionCode.id);
          console.log('Promotion code details:', {
            id: promotionCode.id,
            code: promotionCode.code,
            active: promotionCode.active,
            expires_at: promotionCode.expires_at,
            max_redemptions: promotionCode.max_redemptions,
            times_redeemed: promotionCode.times_redeemed
          });
          
          coupon = promotionCode.coupon;
          isPromotionCode = true;
          actualCode = promotionCode.code;
          
          // Check promotion code specific validations
          if (promotionCode.expires_at && new Date() > new Date(promotionCode.expires_at * 1000)) {
            const expiryDate = new Date(promotionCode.expires_at * 1000);
            console.log('Promotion code has expired. Expiry date:', expiryDate, 'Current date:', new Date());
            return NextResponse.json({
              valid: false,
              message: 'This promotion code has expired'
            });
          }
          
          if (promotionCode.max_redemptions && promotionCode.times_redeemed >= promotionCode.max_redemptions) {
            console.log('Promotion code has reached max redemptions:', promotionCode.times_redeemed, '>=', promotionCode.max_redemptions);
            return NextResponse.json({
              valid: false,
              message: 'This promotion code has reached its maximum number of uses'
            });
          }
          
        } else {
          console.log('No promotion code found with code:', trimmedCode);
          
          // Let's also try to list some available promotion codes for debugging
          try {
            const allPromoCodes = await stripe.promotionCodes.list({
              active: true,
              limit: 10,
            });
            console.log('Available promotion codes:', allPromoCodes.data.map(pc => ({
              code: pc.code,
              id: pc.id,
              coupon_id: pc.coupon.id
            })));
          } catch (listError) {
            console.log('Could not list promotion codes:', listError);
          }
          
          // Neither coupon nor promotion code found
          return NextResponse.json({
            valid: false,
            message: 'Invalid coupon code. Please check the code and try again.'
          });
        }
      } catch (promotionError: any) {
        console.log('Promotion code search error:', promotionError.type, promotionError.code, promotionError.message);
        // Neither coupon nor promotion code found
        return NextResponse.json({
          valid: false,
          message: 'Invalid coupon code. Please check the code and try again.'
        });
      }
    }
    
    console.log('Stripe coupon retrieved successfully:');
    console.log('- Found as promotion code:', isPromotionCode);
    console.log('- Coupon ID:', coupon.id);
    console.log('- Coupon valid:', coupon.valid);
    console.log('- Coupon name:', coupon.name);
    console.log('- Percent off:', coupon.percent_off);
    console.log('- Amount off:', coupon.amount_off);
    console.log('- Currency:', coupon.currency);
    console.log('- Redeem by:', coupon.redeem_by);
    console.log('- Max redemptions:', coupon.max_redemptions);
    console.log('- Times redeemed:', coupon.times_redeemed);
    console.log('- Created:', coupon.created);
    console.log('- Duration:', coupon.duration);

    // Check if coupon is valid and active
    if (!coupon.valid) {
      console.log('Coupon is not valid:', coupon.valid);
      return NextResponse.json({
        valid: false,
        message: 'This coupon is no longer valid'
      });
    }

    // Check if coupon has expired
    if (coupon.redeem_by && new Date() > new Date(coupon.redeem_by * 1000)) {
      const expiryDate = new Date(coupon.redeem_by * 1000);
      console.log('Coupon has expired. Expiry date:', expiryDate, 'Current date:', new Date());
      return NextResponse.json({
        valid: false,
        message: 'This coupon has expired'
      });
    }

    // Check if coupon has reached max redemptions
    if (coupon.max_redemptions && coupon.times_redeemed >= coupon.max_redemptions) {
      console.log('Coupon has reached max redemptions:', coupon.times_redeemed, '>=', coupon.max_redemptions);
      return NextResponse.json({
        valid: false,
        message: 'This coupon has reached its maximum number of uses'
      });
    }

    // Format the coupon for frontend use
    const formattedCoupon = {
      id: coupon.id,
      type: coupon.percent_off ? 'percent' : 'fixed',
      value: coupon.percent_off || coupon.amount_off || 0,
      description: coupon.percent_off 
        ? `${coupon.percent_off}% off`
        : `$${((coupon.amount_off || 0) / 100).toFixed(2)} off`,
      currency: coupon.currency,
      name: coupon.name,
      duration: coupon.duration,
      duration_in_months: coupon.duration_in_months,
    };

    console.log('Formatted coupon for frontend:', JSON.stringify(formattedCoupon, null, 2));

    const response = {
      valid: true,
      coupon: formattedCoupon,
      discount: formattedCoupon.description,
      message: `Coupon "${coupon.name || actualCode}" applied successfully!`
    };

    const endTime = Date.now();
    console.log(`=== COUPON VALIDATION SUCCESS (${endTime - startTime}ms) ===`);
    console.log('Response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);

  } catch (error: any) {
    const endTime = Date.now();
    console.log(`=== COUPON VALIDATION ERROR (${endTime - startTime}ms) ===`);
    console.error('Coupon validation error:', error);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      console.log('Handling StripeInvalidRequestError with code:', error.code);
      if (error.code === 'resource_missing') {
        console.log('Coupon not found in Stripe');
        return NextResponse.json({
          valid: false,
          message: 'Invalid coupon code'
        });
      }
    }

    // Log all error properties for debugging
    console.log('All error properties:', Object.keys(error));
    for (const key of Object.keys(error)) {
      if (typeof error[key] !== 'function') {
        console.log(`Error.${key}:`, error[key]);
      }
    }

    // Generic error response
    return NextResponse.json(
      { 
        valid: false, 
        message: 'Failed to validate coupon. Please try again.' 
      },
      { status: 500 }
    );
  }
}
