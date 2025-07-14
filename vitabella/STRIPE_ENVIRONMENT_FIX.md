# Stripe Environment Configuration Guide

## Problem
Your production site was showing "TEST" mode instead of "LIVE" mode because:

1. **Security Issue**: The client-side code was trying to access `STRIPE_SECRET_KEY` which should never be exposed to the browser
2. **Environment Detection**: The detection logic was flawed and defaulted to test mode when environment variables weren't available

## Solution
The code has been updated to use **public environment variables** for mode detection, which is secure and reliable.

## Environment Variables Setup

### For Development (Local)
In your `.env.local` file:
```bash
# Set to 'test' for development
NEXT_PUBLIC_STRIPE_MODE=test
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
STRIPE_SECRET_KEY=sk_test_your_test_key_here
```

### For Production (Vercel)
In your Vercel dashboard, set these environment variables:

#### Required for Production:
```bash
# CRITICAL: Set this to 'live' for production
NEXT_PUBLIC_STRIPE_MODE=live

# Use your live Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

#### All your Stripe price and product IDs (both test and live)
Make sure all your `STRIPE_TEST_*` and `STRIPE_LIVE_*` environment variables are set in Vercel.

## How to Fix Your Current Production Issue

1. **Go to your Vercel Dashboard**
2. **Navigate to your project settings**
3. **Go to Environment Variables**
4. **Add this critical variable:**
   ```
   NEXT_PUBLIC_STRIPE_MODE = live
   ```
5. **Verify your live Stripe keys are set:**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
   STRIPE_SECRET_KEY = sk_live_...
   ```
6. **Redeploy your application**

## Verification

After deployment, check your browser console. You should see:
```
🔧 Stripe Mode: LIVE
🔑 Using live price IDs
```

Instead of:
```
🔧 Stripe Mode: TEST
🔑 Using test price IDs
```

## Security Notes

- ✅ `NEXT_PUBLIC_STRIPE_MODE` is safe to expose (it just says "test" or "live")
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe to expose (designed for client-side use)
- ❌ `STRIPE_SECRET_KEY` is NEVER exposed to the browser (stays server-side only)

## Testing

1. **Development**: Set `NEXT_PUBLIC_STRIPE_MODE=test` - uses test keys and test price IDs
2. **Production**: Set `NEXT_PUBLIC_STRIPE_MODE=live` - uses live keys and live price IDs

The system will automatically select the correct Stripe price IDs and product IDs based on this setting.
