"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { plans } from './PlanSelector';
import { useLabPanels, getSelectedPlan, getPlanGroup } from './checkoutData';
import { usePricing, getPrice, formatPrice } from '@/app/checkout/hooks/usePricing';
import PlanSelector from './PlanSelector';
import CheckoutFormInner from './CheckoutFormInner';

// Extend window type for Meta Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// Stripe publishable key from env
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

// --- STRIPE ELEMENTS CHECKOUT ---
interface CheckoutFormInnerProps {
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

export default function CheckoutForm() {
  const { prices, loading: pricesLoading } = usePricing();
  const { labPanels, loading: labsLoading } = useLabPanels();
  
  // Hoist all state to parent
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const [planGroup, setPlanGroup] = React.useState<string | null>(null);
  const [labCart, setLabCart] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: ""
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Manual reset function for debugging
  const resetPaymentState = () => {
    setLoading(false);
    setClientSecret(null);
    setError(null);
  };

  // Emergency reset if loading is stuck for too long
  React.useEffect(() => {
    if (loading) {
      const emergencyTimeout = setTimeout(() => {
        setLoading(false);
        setError('Payment system timeout. Please try refreshing the page.');
      }, 15000); // 15 second emergency timeout
      
      return () => clearTimeout(emergencyTimeout);
    }
  }, [loading]);

  // Build plans with real pricing data
  const plansWithPricing = React.useMemo(() => {
    if (!prices) return [];
    return plans.map(plan => ({
      ...plan,
      price: getPrice(prices, plan.priceId),
      consultFee: getPrice(prices, plan.consultFeePriceId),
      displayPrice: formatPrice(getPrice(prices, plan.priceId)),
    }));
  }, [prices]);

  // Function to create payment intent when user is ready to pay
  const createPaymentIntent = React.useCallback(async (coupon?: any) => {
    console.log('=== CREATE PAYMENT INTENT DEBUG START ===');
    console.log('Coupon parameter received:', JSON.stringify(coupon, null, 2));
    console.log('Selected plan:', JSON.stringify(selectedPlan, null, 2));
    console.log('Lab cart:', JSON.stringify(labCart, null, 2));
    console.log('Form data:', JSON.stringify(form, null, 2));
    console.log('Prices loading:', pricesLoading, 'Labs loading:', labsLoading);
    
    if (!selectedPlan || !selectedPlan.priceId || !labPanels || pricesLoading || labsLoading) {
      console.log('Early return: Missing required data');
      setError('Please select a plan first.');
      return null;
    }
    
    const consultFeePriceId = selectedPlan ? selectedPlan.consultFeePriceId : null;
    const labs = labPanels.filter((l: any) => labCart.includes(l.key));
    const consultFeeValid = !consultFeePriceId || typeof consultFeePriceId === 'string';
    
    console.log('Consult fee price ID:', consultFeePriceId);
    console.log('Selected labs:', JSON.stringify(labs, null, 2));
    console.log('Consult fee valid:', consultFeeValid);
    
    if (!consultFeeValid) {
      console.log('Error: Consult fee is invalid');
      setError('Consult fee is invalid.');
      return null;
    }
    
    if (labs.some((l: any) => !l || !l.priceId)) {
      console.log('Error: Missing priceId for labs');
      setError('Missing priceId for one or more selected labs.');
      return null;
    }
    
    const lineItems = [
      selectedPlan.priceId ? { price: selectedPlan.priceId, quantity: 1 } : null,
      consultFeePriceId ? { price: consultFeePriceId, quantity: 1 } : null,
      ...labs.map((l: any) => (l && l.priceId ? { price: l.priceId, quantity: 1 } : null)),
    ].filter((item) => !!item && !!item.price);
    
    console.log('Built line items:', JSON.stringify(lineItems, null, 2));
    
    if (!lineItems.length || !lineItems[0] || !lineItems[0].price) {
      console.log('Error: Missing priceId in line items');
      setError('Missing priceId in one or more line items.');
      return null;
    }
    
    setError(null);
    setLoading(true);
    
    const requestBody = { lineItems, customer: form, coupon };
    console.log('Request body for /api/stripe:', JSON.stringify(requestBody, null, 2));
    
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      if (!res.ok) {
        console.log('API error: Response not ok');
        throw new Error(`API returned ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      if (data.clientSecret) {
        console.log('Payment intent created successfully with client secret:', data.clientSecret);
        setClientSecret(data.clientSecret);
        return data.clientSecret;
      } else {
        console.log('Error: No client secret in response');
        setError(data.error || 'Failed to initiate payment.');
        return null;
      }
    } catch (err) {
      console.error('Network error in createPaymentIntent:', err);
      setError('Network error. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedPlan, labCart, labPanels, pricesLoading, labsLoading, form]);

  // Plan selection from URL on mount
  React.useEffect(() => {
    if (!plansWithPricing.length) return;
    
    const params = new URLSearchParams(window.location.search);
    const plan = getSelectedPlan(params, plansWithPricing);
    setSelectedPlan(plan);
    setPlanGroup(getPlanGroup(params));
    if (!plan) {
      setError(null); // Don't show error, just let user pick a plan
    } else {
      setError(null);
    }
  }, [plansWithPricing]);

  // Handle plan selection from PlanSelector
  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setPlanGroup(plan.type);
  };

  // Show loading while prices are being fetched
  if (pricesLoading || labsLoading) {
    return (
      <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#888' }}>
        Loading pricing information…
      </div>
    );
  }

  // If no plan is selected, show plan selection UI
  if (!selectedPlan) {
    return <PlanSelector onPlanSelect={handlePlanSelect} />;
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={clientSecret ? { clientSecret } : {}}>
        <CheckoutFormInner
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          planGroup={planGroup}
          setPlanGroup={setPlanGroup}
          labCart={labCart}
          setLabCart={setLabCart}
          form={form}
          setForm={setForm}
          error={error}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
          clientSecret={clientSecret}
          createPaymentIntent={createPaymentIntent}
        />
      </Elements>
    </div>
  );
}
