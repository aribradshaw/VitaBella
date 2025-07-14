"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useLabPanels } from './checkoutData';
import Tooltip from './Tooltip';
import VitaBellaButton from '@/components/common/VitaBellaButton';

// Extend window type for Meta Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface AccessToFeature {
  name: string;
  available: boolean;
}

interface CheckoutFormProps {
  selectedPlan: any;
  setSelectedPlan: React.Dispatch<any>;
  planGroup: string | null;
  setPlanGroup: React.Dispatch<React.SetStateAction<string | null>>;
  labCart: string[];
  setLabCart: React.Dispatch<React.SetStateAction<string[]>>;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clientSecret: string | null;
  createPaymentIntent: (coupon?: any) => Promise<string | null>;
}

// Plan features data - matches the data from MembershipPlans.tsx
const planFeatures = [
  { name: 'TRT-Testosterone', foundation: true, performance: true },
  { name: 'Anti-Aging', foundation: true, performance: true },
  { name: 'Cognitive Health', foundation: true, performance: true },
  { name: 'Skin Care', foundation: true, performance: true },
  { name: 'Hair Loss Therapy', foundation: true, performance: true },
  { name: 'Sexual Wellness', foundation: true, performance: true },
  { name: 'Weight loss', foundation: 'limited', performance: true },
  { name: 'Peptide therapy', foundation: 'limited', performance: true },
  { name: 'Injury and Recovery', foundation: 'limited', performance: true },
];

// Function to get access features based on selected plan
function getAccessToFeatures(planKey?: string): AccessToFeature[] {
  if (!planKey) return [];
  
  const isFoundationPlan = planKey === 'fm' || planKey === 'fa';
  const isPerformancePlan = planKey === 'pm' || planKey === 'pa';
  
  return planFeatures.map(feature => ({
    name: feature.name,
    available: isFoundationPlan 
      ? feature.foundation === true 
      : isPerformancePlan 
        ? feature.performance === true 
        : false
  }));
}

export default function CheckoutFormInner(props: CheckoutFormProps) {
  const { selectedPlan, setSelectedPlan, planGroup, setPlanGroup, labCart, setLabCart, form, setForm, error, setError, loading, setLoading, clientSecret, createPaymentIntent } = props;
  const stripe = useStripe();
  const elements = useElements();
  const { labPanels } = useLabPanels();
  
  // Mobile detection hook
  const [isMobile, setIsMobile] = useState(false);
  
  // Coupon state
  const [couponStatus, setCouponStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  
  // Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Card element state
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Auto-reset loading state if it's stuck
  useEffect(() => {
    if (loading) {
      const formComplete = form.email && form.firstName && form.lastName && form.address && form.city && form.state && form.zip;
      
      if (!formComplete || !selectedPlan) {
        setLoading(false);
      }
    }
  }, [loading]);
  
  // Helper: check if all required form fields are filled
  const isFormComplete = () => {
    const required = form.email && form.firstName && form.lastName && form.address && form.city && form.state && form.zip;
    
    // Force reset loading if form is incomplete but loading is true
    if (!required && loading) {
      setLoading(false);
    }
    
    return !!required;
  };

  // Helper: get specific validation error message
  const getValidationError = () => {
    if (!selectedPlan) return "Please select a membership plan.";
    if (!form.email) return "Please enter your email address.";
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Please enter a valid email address.";
    
    if (!form.firstName) return "Please enter your first name.";
    if (!form.lastName) return "Please enter your last name.";
    if (!form.address) return "Please enter your street address.";
    if (!form.city) return "Please enter your city.";
    if (!form.state) return "Please enter your state.";
    if (!form.zip) return "Please enter your ZIP code.";
    
    // ZIP code validation (basic)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(form.zip)) return "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).";
    
    // Card validation
    if (!cardComplete.cardNumber) return "Please enter a valid card number.";
    if (!cardComplete.cardExpiry) return "Please enter a valid expiry date.";
    if (!cardComplete.cardCvc) return "Please enter a valid security code (CVC).";
    
    return null;
  };

  // Clear errors when form fields change and become valid
  useEffect(() => {
    if (error && isFormComplete()) {
      setError(null);
    }
    // Clear validation error when form becomes complete or when relevant fields change
    if (validationError) {
      const currentValidationError = getValidationError();
      if (!currentValidationError) {
        setValidationError(null);
      }
    }
  }, [form, error, validationError, selectedPlan, cardComplete]);

  const handleLabToggle = (key: string) => {
    setLabCart((prev) => {
      // Only allow one lab panel at a time
      if (prev.includes(key)) {
        // Remove the selected lab
        return prev.filter((k) => k !== key);
      } else {
        // Replace with the new lab (only one at a time)
        return [key];
      }
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Clear validation error when user starts typing in a field that was causing an error
    if (validationError) {
      setValidationError(null);
    }
    
    // Reset coupon status if coupon code changes
    if (e.target.name === 'couponCode') {
      setCouponStatus('idle');
      setCouponMessage('');
      setAppliedCoupon(null);
    }
  };

  const validateCoupon = async () => {
    if (!form.couponCode || !form.couponCode.trim()) return;
    
    console.log('=== FRONTEND COUPON VALIDATION START ===');
    console.log('Original coupon code:', JSON.stringify(form.couponCode));
    console.log('Trimmed coupon code:', JSON.stringify(form.couponCode.trim()));
    
    setCouponStatus('validating');
    setCouponMessage('');
    
    try {
      // Get all product IDs from the cart
      const productIds = [];
      
      // Add plan product ID
      if (selectedPlan?.productId) {
        productIds.push(selectedPlan.productId);
      }
      
      // Add consultation fee product ID if different from plan
      if (selectedPlan?.consultFeeProductId && selectedPlan.consultFeeProductId !== selectedPlan.productId) {
        productIds.push(selectedPlan.consultFeeProductId);
      }
      
      // Add lab panel product IDs
      const selectedLabs = labPanels.filter((l: any) => labCart.includes(l.key));
      for (const lab of selectedLabs) {
        if (lab.productId && !productIds.includes(lab.productId)) {
          productIds.push(lab.productId);
        }
      }
      
      const requestBody = {
        code: form.couponCode.trim(),
        products: productIds // Send all product IDs
      };
      
      console.log('Sending request to /api/stripe/promo_codes/validate with body:', JSON.stringify(requestBody, null, 2));
      
      // Call your API endpoint to validate with Stripe
      const response = await fetch('/api/stripe/promo_codes/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const result = await response.json();
      console.log('Response data:', JSON.stringify(result, null, 2));
      
      if (response.ok && result.valid) {
        console.log('Coupon validation successful!');
        setCouponStatus('valid');
        setCouponMessage(`Coupon Applied! ${result.description}`);
        setAppliedCoupon(result.coupon);
      } else {
        console.log('Coupon validation failed:', result.message);
        setCouponStatus('invalid');
        setCouponMessage(result.message || 'Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error('Frontend coupon validation error:', error);
      setCouponStatus('invalid');
      setCouponMessage('Failed to validate coupon. Please try again.');
      setAppliedCoupon(null);
    }
  };

  // Calculate totals
  const planPrice = selectedPlan ? selectedPlan.price : 0;
  const consultFee = selectedPlan ? selectedPlan.consultFee : 0;
  const consultFeePriceId = selectedPlan ? selectedPlan.consultFeePriceId : null;
  const labs = labPanels.filter((l) => labCart.includes(l.key));
  const labsTotal = labs.reduce((sum, l) => sum + l.price, 0);
  const subtotal = planPrice + consultFee + labsTotal;
  
  // Calculate coupon discount with selective application
  const couponDiscount = appliedCoupon ? (() => {
    // Calculate what items the coupon applies to
    let applicableAmount = 0;
    
    // Check if coupon applies to the current plan's product
    const planProductId = selectedPlan?.productId;
    if (planProductId && appliedCoupon.applicableProducts?.includes(planProductId)) {
      applicableAmount += planPrice;
    }
    
    // For consultation fee, we'll assume it's part of the plan offering
    // so if the coupon applies to the plan, it also applies to consultation
    if (planProductId && appliedCoupon.applicableProducts?.includes(planProductId)) {
      applicableAmount += consultFee;
    }
    
    // Labs are typically separate products and wouldn't be included 
    // unless specifically configured in the coupon
    // Note: Since labs don't have productIds in the current structure,
    // they won't be discounted unless the coupon is configured differently
    
    // Calculate discount only on applicable amount
    if (applicableAmount > 0) {
      if (appliedCoupon.type === 'percent') {
        return Math.round(applicableAmount * (appliedCoupon.value / 100));
      } else if (appliedCoupon.type === 'fixed') {
        return Math.min(appliedCoupon.value, applicableAmount); // Don't exceed applicable amount
      }
    }
    
    return 0;
  })() : 0;
  
  const total = subtotal - couponDiscount;

  // Calculate the discounted recurring price for display
  const getDiscountedRecurringPrice = () => {
    // One-time coupons should NOT affect the recurring price display
    // Only recurring coupons should affect this
    if (!appliedCoupon || appliedCoupon.duration !== 'repeating') {
      return planPrice; // Show original price for one-time coupons
    }
    
    // Only apply discount to recurring price if it's a repeating coupon
    const planProductId = selectedPlan?.productId;
    if (planProductId && appliedCoupon.applicableProducts?.includes(planProductId)) {
      if (appliedCoupon.type === 'percent') {
        const discountAmount = Math.round(planPrice * (appliedCoupon.value / 100));
        return planPrice - discountAmount;
      } else if (appliedCoupon.type === 'fixed') {
        return Math.max(0, planPrice - appliedCoupon.value);
      }
    }
    
    return planPrice;
  };

  const discountedRecurringPrice = getDiscountedRecurringPrice();

  const handleCheckout = async () => {
    console.log('=== HANDLE CHECKOUT CALLED ===');
    console.log('Timestamp:', new Date().toISOString());
    setError(null);
    setValidationError(null); // Clear validation errors when starting checkout
    setLoading(true);
    
    try {
      if (!stripe || !elements) {
        throw new Error('Stripe is not loaded.');
      }
      
      // If no client secret exists, create payment intent first
      let currentClientSecret = clientSecret;
      console.log('Current client secret:', currentClientSecret);
      if (!currentClientSecret) {
        console.log('No client secret, calling createPaymentIntent...');
        // Pass coupon information to createPaymentIntent
        currentClientSecret = await createPaymentIntent(appliedCoupon);
        console.log('Received client secret:', currentClientSecret);
        if (!currentClientSecret) {
          throw new Error('Failed to create payment intent. Please try again.');
        }
      }
      
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        throw new Error('Card element not found.');
      }
      
      console.log('About to confirm payment with client secret:', currentClientSecret);
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(currentClientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: {
              line1: form.address,
              line2: form.address2 || undefined,
              city: form.city,
              state: form.state,
              postal_code: form.cardZip || form.zip, // Use card ZIP if provided, otherwise billing ZIP
            },
          },
        },
      });
      
      console.log('Payment confirmation result:');
      console.log('Error:', confirmError);
      console.log('PaymentIntent:', paymentIntent);
      
      if (confirmError) {
        // Provide more specific error messages and make them recoverable
        let errorMessage = confirmError.message || 'Payment failed.';
        
        if (confirmError.code === 'incomplete_zip') {
          errorMessage = 'Please enter a valid ZIP/postal code.';
        } else if (confirmError.code === 'card_declined') {
          errorMessage = 'Your card was declined. Please try a different payment method.';
        } else if (confirmError.code === 'expired_card') {
          errorMessage = 'Your card has expired. Please use a different card.';
        } else if (confirmError.code === 'incorrect_cvc') {
          errorMessage = 'The security code (CVC) is incorrect. Please check and try again.';
        } else if (confirmError.code === 'processing_error') {
          errorMessage = 'An error occurred while processing your payment. Please try again.';
        }
        
        throw new Error(errorMessage);
      }
      
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded, creating subscription...');
        
        // Create subscription after successful payment
        try {
          const subscriptionResponse = await fetch("/api/stripe/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
          });
          
          if (subscriptionResponse.ok) {
            const subscriptionData = await subscriptionResponse.json();
            console.log('Subscription created:', subscriptionData.subscriptionId);
          } else {
            console.error('Failed to create subscription:', await subscriptionResponse.text());
            // Continue anyway - payment was successful
          }
        } catch (subscriptionError) {
          console.error('Error creating subscription:', subscriptionError);
          // Continue anyway - payment was successful
        }

        // Fire Meta Pixel purchase event
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            value: total / 100, // Convert cents to dollars
            currency: 'USD',
            content_type: 'product',
            content_ids: [selectedPlan?.priceId],
            content_name: selectedPlan?.label,
            num_items: 1 + labCart.length
          });
        }

        // Fire Google Analytics purchase event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: paymentIntent.id,
            value: total / 100,
            currency: 'USD',
            items: [{
              item_id: selectedPlan?.priceId,
              item_name: selectedPlan?.label,
              category: 'Membership',
              quantity: 1,
              price: total / 100
            }]
          });
        }
        
        // Redirect to MD-HQ registration instead of internal success page
        window.location.href = 'https://vitabella.md-hq.com/registration';
      } else {
        throw new Error('Payment was not completed successfully.');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };



  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--e-global-color-off-white)',
      zIndex: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--space-4x)',
        paddingBottom: 'var(--space-4x)',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
      <style>{`
        /* Global mobile overflow fix */
        @media (max-width: 768px) {
          body {
            overflow-x: hidden !important;
          }
          
          .checkout-container {
            padding: 0 1rem !important;
            gap: 1rem !important;
            max-width: none !important;
            width: 100% !important;
            margin: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          
          .checkout-form {
            padding: 1rem !important;
            margin-bottom: 1rem !important;
            width: 100% !important;
            max-width: none !important;
            flex: none !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          
          .checkout-form input, .checkout-form select {
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box !important;
            min-width: 0 !important;
          }
          
          .checkout-form .vita-bella-button {
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .checkout-form .vita-bella-button:hover:not(:disabled) {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(17, 60, 28, 0.25) !important;
          }
          
          .checkout-form .vita-bella-button:active:not(:disabled) {
            transform: translateY(0px) !important;
            box-shadow: 0 2px 8px rgba(17, 60, 28, 0.15) !important;
          }
          
          .order-summary {
            padding: 1rem !important;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          
          .order-summary-header {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            margin-bottom: 1rem !important;
          }
          
          .plan-image {
            width: 45px !important;
            height: 45px !important;
            margin-left: 0.5rem !important;
          }
          
          .labs-items {
            gap: 8px !important;
          }
          
          .lab-item {
            padding: 10px !important;
            border-radius: 12px !important;
            margin-bottom: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          
          .lab-button {
            padding: 6px 12px !important;
            font-size: 12px !important;
            height: 32px !important;
            min-width: 60px !important;
            border-radius: 8px !important;
            box-sizing: border-box !important;
          }
        }
        
        @media (max-width: 480px) {
          .checkout-container {
            padding: 0 0.75rem !important;
          }
          
          .checkout-form {
            padding: 0.75rem !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .checkout-form .vita-bella-button {
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .checkout-form .vita-bella-button:hover:not(:disabled) {
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 16px rgba(17, 60, 28, 0.2) !important;
          }
          
          .checkout-form .vita-bella-button:active:not(:disabled) {
            transform: translateY(0px) !important;
            box-shadow: 0 2px 8px rgba(17, 60, 28, 0.15) !important;
          }
          
          .order-summary {
            padding: 0.75rem !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .plan-image {
            width: 40px !important;
            height: 40px !important;
            margin-left: 0.25rem !important;
          }
          
          .labs-items {
            gap: 6px !important;
          }
          
          .lab-item {
            padding: 8px !important;
            border-radius: 10px !important;
          }
          
          .lab-button {
            padding: 4px 8px !important;
            font-size: 11px !important;
            height: 28px !important;
            min-width: 50px !important;
            border-radius: 6px !important;
          }
        }
      `}</style>
        {/* Main checkout container - responsive layout */}
        <div className="checkout-container" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '2rem', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 1rem',
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}>
        {/* Left: Form */}
        <form className="checkout-form" style={{ 
          flex: isMobile ? 'none' : '0 0 450px', 
          width: isMobile ? '100%' : '450px',
          maxWidth: isMobile ? '100%' : '450px',
          background: '#fff', 
          borderRadius: '12px', 
          padding: isMobile ? '1.5rem' : '2rem', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: isMobile ? '1rem' : '0',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}
          onSubmit={e => { e.preventDefault(); handleCheckout(); }}
        >
          <h1 style={{ marginBottom: 18, color: "var(--e-global-color-dark-green)", fontSize: isMobile ? '1.75rem' : '2rem', fontWeight: 700 }}>Checkout</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }} htmlFor="email">Email Address *</label>
            <input name="email" id="email" type="email" required value={form.email} onChange={handleFormChange} style={{ width: "100%", marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="firstName">First Name *</label>
              <input name="firstName" id="firstName" required value={form.firstName} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="lastName">Last Name *</label>
              <input name="lastName" id="lastName" required value={form.lastName} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '2 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="address">Street Address *</label>
              <input name="address" id="address" required value={form.address} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 120px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="address2">Apt./Unit</label>
              <input name="address2" id="address2" value={form.address2} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '2 1 140px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="city">City *</label>
              <input name="city" id="city" required value={form.city} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 80px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="state">State *</label>
              <input name="state" id="state" required value={form.state} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 100px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="zip">ZIP Code *</label>
              <input name="zip" id="zip" required value={form.zip} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ margin: '18px 0 8px 0' }}>
            <label style={{ fontWeight: 500, marginBottom: 6, display: 'block' }}>Card Information *</label>
            
            {/* Card Number */}
            <div style={{
              border: '1px solid #ccc',
              borderRadius: '6px 6px 0 0',
              padding: 12,
              background: '#fafbfc',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#113c1c',
                      '::placeholder': { color: '#888' },
                      lineHeight: '24px',
                    },
                    invalid: { color: '#b71c1c' },
                  },
                  placeholder: 'Card number',
                }}
                onChange={(event) => {
                  setCardComplete(prev => ({ ...prev, cardNumber: event.complete }));
                }}
              />
            </div>
            
            {/* Expiry, CVC, and ZIP in a row */}
            <div style={{ 
              display: 'flex', 
              gap: 0,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <div style={{
                flex: 1,
                border: '1px solid #ccc',
                borderTop: 'none',
                borderRight: isMobile ? '1px solid #ccc' : '1px solid #e0e0e0',
                borderBottom: '1px solid #ccc',
                borderRadius: isMobile ? '0' : '0 0 0 6px', // Bottom-left rounded on desktop only
                padding: 12,
                background: '#fafbfc',
              }}>
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#113c1c',
                        '::placeholder': { color: '#888' },
                        lineHeight: '24px',
                      },
                      invalid: { color: '#b71c1c' },
                    },
                    placeholder: 'MM / YY',
                  }}
                  onChange={(event) => {
                    setCardComplete(prev => ({ ...prev, cardExpiry: event.complete }));
                  }}
                />
              </div>
              
              <div style={{
                flex: 1,
                border: '1px solid #ccc',
                borderTop: 'none',
                borderRight: isMobile ? '1px solid #ccc' : '1px solid #e0e0e0',
                borderBottom: '1px solid #ccc',
                borderRadius: '0', // No rounding on middle element
                padding: 12,
                background: '#fafbfc',
              }}>
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#113c1c',
                        '::placeholder': { color: '#888' },
                        lineHeight: '24px',
                      },
                      invalid: { color: '#b71c1c' },
                    },
                    placeholder: 'CVC',
                  }}
                  onChange={(event) => {
                    setCardComplete(prev => ({ ...prev, cardCvc: event.complete }));
                  }}
                />
              </div>
              
              <div style={{
                flex: 1,
                border: '1px solid #ccc',
                borderTop: 'none',
                borderRadius: isMobile ? '0 0 6px 6px' : '0 0 6px 0', // Bottom-right rounded on desktop, both corners on mobile
                padding: 12,
                background: '#fafbfc',
              }}>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={form.cardZip || ''}
                  onChange={(e) => setForm({ ...form, cardZip: e.target.value })}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '16px',
                    color: '#113c1c',
                    width: '100%',
                    outline: 'none',
                    lineHeight: '24px'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Coupon Code Section */}
          <div style={{ margin: '18px 0 8px 0' }}>
            <label style={{ fontWeight: 500, marginBottom: 6, display: 'block' }}>Coupon Code (Optional)</label>
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <input 
                name="couponCode" 
                id="couponCode" 
                type="text" 
                placeholder="Enter coupon code"
                value={form.couponCode || ''} 
                onChange={handleFormChange} 
                disabled={couponStatus === 'validating'}
                style={{ 
                  flex: isMobile ? 'none' : 1,
                  width: isMobile ? '100%' : 'auto',
                  padding: 10, 
                  borderRadius: 6, 
                  border: `1px solid ${
                    couponStatus === 'valid' ? '#28a745' : 
                    couponStatus === 'invalid' ? '#dc3545' : '#ccc'
                  }`, 
                  fontSize: 16, 
                  boxSizing: 'border-box',
                  background: couponStatus === 'valid' ? '#f8fff9' : 
                             couponStatus === 'invalid' ? '#fff5f5' : 'white'
                }} 
              />
              <button
                type="button"
                onClick={validateCoupon}
                disabled={!form.couponCode || !form.couponCode.trim() || loading || couponStatus === 'validating' || couponStatus === 'valid'}
                style={{
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: (
                    !form.couponCode || !form.couponCode.trim() || loading || couponStatus === 'validating' || couponStatus === 'valid'
                  ) ? '#cccccc' : 'var(--e-global-color-primary, #4263AE)',
                  color: 'white',
                  cursor: (
                    !form.couponCode || !form.couponCode.trim() || loading || couponStatus === 'validating' || couponStatus === 'valid'
                  ) ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  minWidth: isMobile ? '100%' : '80px',
                  width: isMobile ? '100%' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxSizing: 'border-box'
                }}
              >
                {couponStatus === 'validating' && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    border: '2px solid #ffffff40',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                )}
                {couponStatus === 'validating' ? 'Checking...' : 
                 couponStatus === 'valid' ? 'Applied' : 'Apply'}
              </button>
            </div>
            {/* Coupon status messages */}
            {couponMessage && (
              <div style={{ 
                marginTop: 6, 
                fontSize: 14,
                color: couponStatus === 'valid' ? '#28a745' : 
                       couponStatus === 'invalid' ? '#dc3545' : '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {couponStatus === 'valid' && <span>✓</span>}
                {couponStatus === 'invalid' && <span>✗</span>}
                {couponMessage}
              </div>
            )}
          </div>
          
          {/* Checkout Button */}
          <VitaBellaButton
            type="button"
            onClick={() => {
              // Check for validation errors first
              const validationErr = getValidationError();
              if (validationErr) {
                setValidationError(validationErr);
                setError(null); // Clear any existing payment errors
                return;
              }
              
              // If form is complete and no validation errors, proceed with checkout
              if (selectedPlan && isFormComplete() && !error && !loading) {
                setValidationError(null); // Clear validation error before checkout
                handleCheckout();
              }
            }}
            disabled={loading}
            label={loading ? 'Processing...' : `Sign Up Now`}
            href="#"
            bg={loading 
              ? '#cccccc' 
              : 'var(--e-global-color-lightgreen)'}
            bgHover={loading 
              ? '#cccccc' 
              : 'var(--e-global-color-dark-green)'}
            text={loading 
              ? '#666666' 
              : 'var(--e-global-color-dark-green)'}
            textHover={loading 
              ? '#666666' 
              : 'var(--e-global-color-lightgreen)'}
            arrowCircleColor={loading 
              ? '#999999' 
              : 'var(--e-global-color-dark-green)'}
            arrowCircleColorHover={loading 
              ? '#999999' 
              : 'var(--e-global-color-lightgreen)'}
            arrowPathColor={loading 
              ? '#cccccc' 
              : 'var(--e-global-color-lightgreen)'}
            arrowPathColorHover={loading 
              ? '#cccccc' 
              : 'var(--e-global-color-dark-green)'}
            style={{
              width: '100%',
              minHeight: '52px',
              cursor: loading 
                ? 'not-allowed' 
                : 'pointer',
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? 'none' : 'auto'
            }}
          />
          
          {/* Display validation error if present */}
          {validationError && (
            <div style={{ 
              color: '#dc3545', 
              fontSize: '14px', 
              marginTop: '8px',
              padding: '8px 12px',
              background: '#fff5f5',
              border: '1px solid #f5c6cb',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ fontSize: '16px' }}>⚠️</span>
              {validationError}
            </div>
          )}
          
          {/* Display payment error if present */}
          {error && (
            <div style={{ 
              color: '#dc3545', 
              fontSize: '14px', 
              marginTop: '8px',
              padding: '8px 12px',
              background: '#fff5f5',
              border: '1px solid #f5c6cb',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ fontSize: '16px' }}>❌</span>
              {error}
            </div>
          )}
          
          {loading && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff40',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          )}
          
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>

        </form>

        {/* Right: Order Summary + Image Container */}
        <div style={{ 
          flex: isMobile ? 'none' : '1',
          width: isMobile ? '100%' : 'auto',
          maxWidth: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? 'auto' : '500px',
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}>
          {/* Order Summary */}
          <div className="order-summary" style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            padding: isMobile ? '1.5rem' : '2rem', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%'
          }}>
            {/* Header section with image positioned to the right */}
            <div className="order-summary-header" style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px'
            }}>
              <h2 style={{ 
                color: "var(--e-global-color-dark-green)", 
                fontSize: isMobile ? '1.25rem' : '1.5rem', 
                fontWeight: 700,
                margin: 0
              }}>
                Order Summary
              </h2>
              
              {/* Plan Image - positioned to the right of Order Summary text */}
              {selectedPlan && (
                <div style={{ 
                  flexShrink: 0,
                  marginLeft: '1rem'
                }}>
                  <img
                    className="plan-image"
                    src={
                      selectedPlan.key === 'fm' ? '/categories/weight-loss/weightlossslider.webp'
                      : selectedPlan.key === 'fa' ? '/modules/aboutpeople.webp'
                      : selectedPlan.key === 'pm' ? '/categories/anti-aging/antiagingslider.webp'
                      : selectedPlan.key === 'pa' ? '/categories/hormone-therapy/hormonetherapyslider.webp'
                      : ''
                    }
                    alt="Plan visual"
                    style={{ 
                      width: isMobile ? '50px' : '80px', 
                      height: isMobile ? '50px' : '80px', 
                      objectFit: 'cover', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)', 
                      background: '#f6f8fa', 
                      border: '1px solid #e0e0e0',
                      display: (selectedPlan.key === 'fm' || selectedPlan.key === 'fa' || selectedPlan.key === 'pm' || selectedPlan.key === 'pa') ? 'block' : 'none'
                    }}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          
          <div style={{ background: '#e0e0e0', height: 2, borderRadius: 1, marginBottom: '18px' }} />
          
          {selectedPlan && (
            <>
            {/* Plan Details Container */}
            <div style={{
              background: 'var(--e-global-color-off-white, #f8f9fa)',
              borderRadius: '8px',
              padding: isMobile ? '1rem' : '1.5rem',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: isMobile ? '18px' : '20px', color: 'var(--e-global-color-dark-green)', marginBottom: 6 }}>
                  {selectedPlan.label} {selectedPlan.interval === "monthly" ? "(Monthly Membership)" : "(Annual Membership)"}
                </div>
                <div style={{ fontWeight: 600, fontSize: isMobile ? '16px' : '14px', color: 'var(--e-global-color-dark-green)', marginBottom: 8 }}>
                  Membership Includes:
                </div>
                <ul style={{ margin: 0, paddingLeft: 22, fontSize: isMobile ? '16px' : '15px', color: '#222', marginBottom: 10 }}>
                  {selectedPlan.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
                </ul>
                <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '10px 0 14px 0' }} />
              </div>

              {/* Access To Features Section */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  fontWeight: 600, 
                  fontSize: isMobile ? '16px' : '18px', 
                  color: 'var(--e-global-color-dark-green)', 
                  marginBottom: '12px' 
                }}>
                  Access To:
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: isMobile ? '4px' : '6px',
                  marginBottom: '12px'
                }}>
                  {getAccessToFeatures(selectedPlan?.key).map((feature: AccessToFeature, index: number) => (
                    <div
                      key={index}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: isMobile ? '3px 6px' : '4px 8px',
                        borderRadius: '16px',
                        fontSize: isMobile ? '16px' : '11px',
                        fontWeight: 500,
                        background: feature.available 
                          ? 'var(--e-global-color-lightgreen, #e8f5e8)' 
                          : '#f5f5f5',
                        color: feature.available 
                          ? 'var(--e-global-color-dark-green, #113c1c)' 
                          : '#999',
                        opacity: feature.available ? 1 : 0.6,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {feature.available && (
                        <span style={{ 
                          marginRight: '3px', 
                          fontSize: isMobile ? '16px' : '10px',
                          color: 'var(--e-global-color-dark-green, #113c1c)'
                        }}>
                          ✓
                        </span>
                      )}
                      {feature.name}
                    </div>
                  ))}
                </div>
                
                {/* Upgrade prompt for Foundation plans */}
                {(selectedPlan?.key === 'fm' || selectedPlan?.key === 'fa') && (
                  <div style={{
                    background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                    borderRadius: '8px',
                    padding: isMobile ? '12px' : '16px',
                    marginBottom: '12px',
                    border: '1px solid #f39c12',
                    boxShadow: '0 2px 8px rgba(243, 156, 18, 0.1)'
                  }}>
                    <div style={{
                      fontSize: isMobile ? '16px' : '14px',
                      fontWeight: 600,
                      color: '#d68910',
                      marginBottom: '8px',
                      lineHeight: 1.4
                    }}>
                      Want access to Weight Loss, Peptide Therapy, and Injury and Recovery Treatments?
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        // Map Foundation plans to Performance plans with same interval
                        const upgradePlanMapping = {
                          'fm': 'pm', // Foundation Monthly -> Performance Monthly
                          'fa': 'pa'  // Foundation Annual -> Performance Annual
                        };
                        
                        const targetPlanKey = upgradePlanMapping[selectedPlan?.key as keyof typeof upgradePlanMapping];
                        
                        if (targetPlanKey) {
                          console.log('Upgrading from', selectedPlan?.key, 'to', targetPlanKey);
                          
                          // Navigate to checkout with the correct plan parameter format
                          const currentUrl = new URL(window.location.href);
                          currentUrl.searchParams.delete('fm');
                          currentUrl.searchParams.delete('fa');
                          currentUrl.searchParams.delete('pm');
                          currentUrl.searchParams.delete('pa');
                          currentUrl.searchParams.set(targetPlanKey, '');
                          
                          // Navigate to the new URL
                          window.location.href = currentUrl.toString();
                        }
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: isMobile ? '8px 16px' : '10px 20px',
                        fontSize: isMobile ? '16px' : '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(243, 156, 18, 0.3)',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(243, 156, 18, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(243, 156, 18, 0.3)';
                      }}
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}
              </div>

              {/* Add-On Bloodwork Section - Moved from bottom bar */}
              <div style={{ marginBottom: '0' }}>
                <div style={{ 
                  fontWeight: 600, 
                  fontSize: isMobile ? '16px' : '18px', 
                  color: 'var(--e-global-color-dark-green)', 
                  marginBottom: '12px' 
                }}>
                  Add-On Bloodwork:
                </div>
                <div className="labs-items" style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: isMobile ? '8px' : '10px', 
                  width: '100%'
                }}>
                  {labPanels.map((lab) => (
                    <div key={lab.key} className="lab-item" style={{ 
                      display: 'flex', 
                      alignItems: 'stretch', 
                      background: labCart.includes(lab.key) ? '#eaf7ed' : '#ffffff', 
                      borderRadius: '12px',
                      border: labCart.includes(lab.key) ? '2px solid #113c1c' : '1px solid #d0d0d0', 
                      padding: '12px', 
                      boxShadow: labCart.includes(lab.key) ? '0 2px 8px rgba(17,60,28,0.07)' : 'none', 
                      transition: 'all 0.18s', 
                      width: '100%',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, marginRight: '12px' }}>
                        <Tooltip content={
                          <div style={{ 
                            width: '260px',
                            maxHeight: '320px',
                            overflowY: 'auto'
                          }}>
                            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: isMobile ? 16 : 15, color: '#113c1c' }}>{lab.label} Biomarkers:</div>
                            <ul style={{ 
                              margin: 0, 
                              paddingLeft: 16, 
                              fontSize: isMobile ? 16 : 12,
                              lineHeight: 1.4
                            }}>
                              {lab.biomarkers.map((biomarker, idx) => (
                                <li key={idx} style={{ marginBottom: 2 }}>{biomarker}</li>
                              ))}
                            </ul>
                          </div>
                        }>
                          <div style={{ cursor: 'help' }}>
                            <div style={{ 
                              fontWeight: 600, 
                              fontSize: isMobile ? '16px' : '15px', 
                              color: '#113c1c', 
                              marginBottom: '4px',
                              lineHeight: '1.3'
                            }}>
                              {lab.label}
                            </div>
                            <div style={{ 
                              fontSize: isMobile ? '16px' : '12px', 
                              color: '#666', 
                              marginBottom: '6px',
                              lineHeight: '1.4'
                            }}>
                              {lab.description}
                            </div>
                            <div style={{ 
                              fontWeight: 700, 
                              fontSize: isMobile ? '18px' : '18px', 
                              color: '#113c1c'
                            }}>
                              ${(lab.price / 100).toFixed(0)}
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <button
                          type="button"
                          className="lab-button"
                          onClick={() => handleLabToggle(lab.key)}
                          style={{
                            padding: isMobile ? '8px 16px' : '10px 20px',
                            fontSize: isMobile ? '16px' : '14px',
                            fontWeight: 600,
                            borderRadius: '8px',
                            background: labCart.includes(lab.key) ? 'var(--e-global-color-dark-green)' : 'var(--e-global-color-primary, #4263AE)',
                            color: '#fff',
                            border: 'none',
                            minWidth: isMobile ? '70px' : '80px',
                            boxShadow: labCart.includes(lab.key) ? '0 2px 8px rgba(17,60,28,0.10)' : '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.18s',
                            whiteSpace: 'nowrap',
                            height: isMobile ? '36px' : '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                          onMouseOver={(e) => {
                            if (!labCart.includes(lab.key)) {
                              e.currentTarget.style.background = 'var(--e-global-color-primary-hover, #365a9e)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!labCart.includes(lab.key)) {
                              e.currentTarget.style.background = 'var(--e-global-color-primary, #4263AE)';
                            }
                          }}
                        >
                          {labCart.includes(lab.key) ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 700, fontSize: isMobile ? '18px' : '20px', color: 'var(--e-global-color-dark-green)' }}>{selectedPlan.displayPrice || 'Loading...'}/{selectedPlan.interval === "monthly" ? "Month" : "Year"}</span>
              <span style={{ marginLeft: 8, textDecoration: "line-through", color: "#888", fontSize: isMobile ? '14px' : '16px' }}>{selectedPlan.originalPrice}</span>
              <div style={{ color: "#666", fontSize: isMobile ? '13px' : '15px', marginTop: 4 }}>{selectedPlan.costNote}</div>
              <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '14px 0 10px 0' }} />
            </div>
            <div style={{ fontWeight: 600, fontSize: isMobile ? '15px' : '17px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
              One-Time Initial Consultation Fee 
              <span style={{ float: "right", color: '#333' }}>${(consultFee / 100).toFixed(2)}</span>
            </div>
            {labCart.length > 0 && (
              <div style={{ fontWeight: 600, fontSize: isMobile ? '15px' : '17px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
                Add-On Lab Panel
                <span style={{ float: "right", color: '#333' }}>${(labsTotal / 100).toFixed(2)}</span>
              </div>
            )}
            {appliedCoupon && (
              <div style={{ 
                fontWeight: 600, 
                fontSize: isMobile ? '16px' : '17px', 
                marginTop: 8, 
                color: couponDiscount > 0 ? '#28a745' : '#666',
                padding: '6px 0',
                borderTop: couponDiscount > 0 ? '1px solid #28a74520' : 'none',
                borderBottom: couponDiscount > 0 ? '1px solid #28a74520' : 'none',
                background: couponDiscount > 0 ? '#f8fff9' : 'transparent'
              }}>
                Coupon Applied: {appliedCoupon.description}
                <span style={{ 
                  float: "right", 
                  color: couponDiscount > 0 ? '#28a745' : '#666',
                  fontWeight: 700
                }}>
                  {couponDiscount > 0 ? `-$${(couponDiscount / 100).toFixed(2)}` : 'Applied'}
                </span>
              </div>
            )}
            <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '14px 0 10px 0' }} />
            <div style={{ fontWeight: 700, fontSize: isMobile ? '20px' : '22px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
              Today's Total
              <span style={{ float: "right", color: '#113c1c' }}>${(total / 100).toFixed(2)}</span>
            </div>
            <div style={{ color: "#666", fontSize: isMobile ? '12px' : '14px', marginTop: 2 }}>
              {selectedPlan.interval === "monthly"
                ? "Monthly Recurring Membership"
                : "Annual Recurring Membership"}
              <span style={{ float: "right", color: '#333' }}>
                {discountedRecurringPrice !== planPrice ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
                      ${(planPrice / 100).toFixed(2)}
                    </span>
                    ${(discountedRecurringPrice / 100).toFixed(2)}
                  </>
                ) : (
                  `$${(planPrice / 100).toFixed(2)}`
                )}
              </span>
            </div>
            
            {/* Billing Cycle Information */}
            <div style={{ 
              color: "#666", 
              fontSize: isMobile ? '13px' : '14px', 
              marginTop: 10, 
              lineHeight: 1.4,
              padding: '8px 12px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef'
            }}>
              {(() => {
                const today = new Date();
                const dayOfMonth = today.getDate();
                const monthName = today.toLocaleDateString('en-US', { month: 'long' });
                const nextPaymentDate = new Date(today);
                
                if (selectedPlan.interval === "monthly") {
                  // Next month, same day
                  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                } else {
                  // Next year, same day
                  nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
                }
                
                const formatDate = (date: Date) => {
                  return date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  });
                };
                
                const getOrdinal = (day: number) => {
                  if (day > 3 && day < 21) return `${day}th`;
                  switch (day % 10) {
                    case 1: return `${day}st`;
                    case 2: return `${day}nd`;
                    case 3: return `${day}rd`;
                    default: return `${day}th`;
                  }
                };
                
                const billingFrequency = selectedPlan.interval === "monthly" 
                  ? `${getOrdinal(dayOfMonth)} of Every Month`
                  : `${getOrdinal(dayOfMonth)} of ${monthName} Every Year`;
                
                return (
                  <>
                    <div style={{ 
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: 700,
                      color: 'var(--e-global-color-dark-green)',
                      marginBottom: '8px'
                    }}>
                      6 Month Commitment
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '13px' : '14px',
                      color: '#666',
                      lineHeight: 1.4
                    }}>
                      Charged on {billingFrequency}. Next Payment Occurring on <strong>{formatDate(nextPaymentDate)}</strong> recurring {selectedPlan.interval === "monthly" ? "monthly" : "annually"} until cancelled.
                    </div>
                  </>
                );
              })()}
            </div>
            
            <div style={{ color: "#666", fontSize: isMobile ? '12px' : '14px', marginTop: 10, marginBottom: 2 }}>
              Membership may be cancelled without penalty before or during the Initial Consultation with the provider. After that, the Terms of Service will apply.
            </div>
            
            {/* Mobile-only Finish Checkout button */}
            {isMobile && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    // Scroll to the checkout form
                    const checkoutForm = document.querySelector('.checkout-form');
                    if (checkoutForm) {
                      checkoutForm.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--e-global-color-primary, #4263AE)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(66, 99, 174, 0.2)',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--e-global-color-primary-hover, #365a9e)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 99, 174, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--e-global-color-primary, #4263AE)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(66, 99, 174, 0.2)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                >
                  Finish Checkout ↑
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
