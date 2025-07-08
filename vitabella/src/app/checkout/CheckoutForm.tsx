"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { plans } from './PlanSelector';
import { useLabPanels, getSelectedPlan, getPlanGroup } from './checkoutData';
import { usePricing, getPrice } from '@/app/checkout/hooks/usePricing';
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

  // Build plans with real pricing data
  const plansWithPricing = React.useMemo(() => {
    if (!prices) return [];
    return plans.map(plan => ({
      ...plan,
      price: getPrice(prices, plan.priceId),
      consultFee: getPrice(prices, plan.consultFeePriceId),
    }));
  }, [prices]);

  // Fetch PaymentIntent clientSecret as soon as a plan is selected (do not require full form)
  React.useEffect(() => {
    if (!selectedPlan || !selectedPlan.priceId || !labPanels || pricesLoading || labsLoading) {
      setClientSecret(null);
      return;
    }
    
    let didCancel = false;
    let timeoutId: NodeJS.Timeout;
    const consultFeePriceId = selectedPlan ? selectedPlan.consultFeePriceId : null;
    const labs = labPanels.filter((l: any) => labCart.includes(l.key));
    const consultFeeValid = !consultFeePriceId || typeof consultFeePriceId === 'string';
    
    if (!consultFeeValid) {
      setClientSecret(null);
      setError('Consult fee is invalid.');
      return;
    }
    
    if (labs.some((l: any) => !l || !l.priceId)) {
      setClientSecret(null);
      setError('Missing priceId for one or more selected labs.');
      return;
    }
    
    const lineItems = [
      selectedPlan.priceId ? { price: selectedPlan.priceId, quantity: 1 } : null,
      consultFeePriceId ? { price: consultFeePriceId, quantity: 1 } : null,
      ...labs.map((l: any) => (l && l.priceId ? { price: l.priceId, quantity: 1 } : null)),
    ].filter((item) => !!item && !!item.price);
    
    if (!lineItems.length || !lineItems[0] || !lineItems[0].price) {
      setClientSecret(null);
      setError('Missing priceId in one or more line items.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    timeoutId = setTimeout(() => {
      if (!didCancel) {
        setLoading(false);
        setError('Payment system timeout. Please try again or contact support.');
      }
    }, 12000);
    
    (async () => {
      try {
        const res = await fetch("/api/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lineItems, customer: form }),
        });
        
        if (didCancel) return;
        
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setClientSecret(null);
          setError(data.error || 'Failed to initiate payment.');
        }
      } catch (err) {
        if (!didCancel) {
          setClientSecret(null);
          setError('Network error. Please try again.');
        }
      }
      
      if (!didCancel) setLoading(false);
      clearTimeout(timeoutId);
    })();
    
    return () => {
      didCancel = true;
      clearTimeout(timeoutId);
    };
  }, [selectedPlan?.priceId, selectedPlan?.consultFeePriceId, labCart, labPanels, pricesLoading, labsLoading]);

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
    clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
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
        />
      </Elements>
    ) : (
      <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#888' }}>
        Loading payment options…
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </div>
    )
  );
}
