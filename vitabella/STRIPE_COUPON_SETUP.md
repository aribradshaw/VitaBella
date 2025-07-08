# Stripe Coupon Integration - Environment Setup

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key (if not already set)
```

## Creating Coupons in Stripe

1. Go to your Stripe Dashboard
2. Navigate to "Products" → "Coupons"
3. Click "Create coupon"
4. Configure:
   - **ID**: Use uppercase format (e.g., "SAVE10", "WELCOME")
   - **Type**: Percentage or Fixed amount
   - **Value**: Discount percentage or amount
   - **Duration**: How long the discount applies
   - **Restrictions**: Max uses, expiration date, etc.

## Example Coupons to Create

Create these in your Stripe dashboard for testing:

- **SAVE10**: 10% off
- **SAVE20**: 20% off  
- **SAVE50**: $50 off
- **WELCOME**: 15% off
- **TEST**: 25% off

## API Endpoints Created

- **POST /api/validate-coupon**: Validates coupon codes with Stripe
- **POST /api/stripe**: Updated to handle coupon discounts in payment intents

## How It Works

1. User enters coupon code in checkout form
2. Frontend calls `/api/validate-coupon` to verify with Stripe
3. If valid, coupon is applied to order total display
4. When creating payment intent, coupon discount is calculated and applied
5. Payment intent is created with discounted amount
6. Coupon details are stored in payment intent metadata

## Testing

Use any of the coupon codes you created in Stripe dashboard. The system will:
- Validate the code exists and is active
- Check expiration dates and usage limits
- Apply the discount to the order total
- Create payment intent with correct discounted amount
