import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

// Handle POST requests for validating a promo code from request body
export async function POST(req: NextRequest) {
  try {
    const { code, product } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Promo code is required" }, { status: 400 });
    }
   
    if (!product) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Fetch promo code by code
    const promoCodes = await stripe.promotionCodes.list({
      code,
      limit: 1,
      active: true,
      expand: ['data.coupon', 'data.coupon.applies_to'],
    });

    if (promoCodes.data.length === 0) {
      return NextResponse.json({ 
        error: "Invalid or expired promo code", 
        message: "This promotion code does not exist or has been deactivated" 
      }, { status: 404 });
    }

    const promoCode = promoCodes.data.at(0)!;

    if (!promoCode.coupon.valid) {
      return NextResponse.json({ 
        valid: false, 
        message: "This promotion code is no longer valid" 
      });
    }

    const now = Math.floor(Date.now() / 1000);
    if (promoCode.expires_at && promoCode.expires_at < now) {
      return NextResponse.json({ 
        valid: false, 
        message: "This promotion code has expired" 
      });
    }

    if (promoCode.max_redemptions && promoCode.times_redeemed >= promoCode.max_redemptions) {
      return NextResponse.json({ 
        valid: false, 
        message: "This promotion code has reached its maximum number of uses" 
      });
    }

    const validProduct = promoCode.coupon.applies_to?.products.includes(product);
    
    return NextResponse.json({ 
      ...promoCode,
      valid: validProduct,
      description: promoCode.coupon.percent_off 
        ? `${promoCode.coupon.percent_off}% off`
        : `$${((promoCode.coupon.amount_off || 0) / 100).toFixed(2)} off`,
      message: validProduct ? "" : "This promotion code is not valid for the selected product"
    });
  } catch (err: any) {
    console.error('Error validating promo code:', err);
    return NextResponse.json({ error: err.message || "Failed to validate promo code" }, { status: 500 });
  }
}
