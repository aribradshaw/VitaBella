"use client";

import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmbeddedCheckoutButtonProps {
  lineItems: Array<{
    price: string;
    quantity?: number;
  }>;
  customer?: {
    email?: string;
    name?: string;
  };
  couponCode?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: any) => void;
}

export default function EmbeddedCheckoutButton({
  lineItems,
  customer,
  couponCode,
  buttonText = "Checkout",
  className = "",
  onSuccess,
  onError,
}: EmbeddedCheckoutButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Creating embedded checkout session...');
      
      const response = await fetch("/api/embedded-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems,
          customer,
          couponCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      console.log('Checkout session created:', data);
      
      setClientSecret(data.clientSecret);
      return data.clientSecret;
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      setError(err.message);
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [lineItems, customer, couponCode, onError]);

  const handleCheckoutClick = async () => {
    const secret = await fetchClientSecret();
    if (secret) {
      setShowCheckout(true);
    }
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    setClientSecret(null);
    setError(null);
  };

  // Stripe embedded checkout options
  const options = clientSecret ? { 
    clientSecret,
    onComplete: () => {
      console.log('Checkout completed');
      // The checkout session will redirect to your return_url
    }
  } : { clientSecret: '' };

  if (showCheckout && clientSecret) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Complete Your Purchase</h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className="p-4 max-h-[calc(90vh-120px)] overflow-y-auto">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleCheckoutClick}
        disabled={loading || !lineItems?.length}
        className={`
          inline-flex items-center justify-center px-6 py-3 
          border border-transparent text-base font-medium rounded-md 
          text-white bg-blue-600 hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating checkout...
          </>
        ) : (
          buttonText
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
