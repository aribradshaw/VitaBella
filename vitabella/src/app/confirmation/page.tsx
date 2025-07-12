"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Extend window type for Meta Pixel and Google Analytics
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface PurchaseData {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
}

interface StripeSession {
  amount_total: number;
  currency: string;
  id: string;
  payment_status: string;
  customer_email?: string;
  line_items?: Array<{
    price: { id: string; product: string };
    quantity: number;
    description: string;
    amount_total: number;
  }>;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);
  const [session, setSession] = useState<StripeSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams?.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID");
      setLoading(false);
      return;
    }

    // Fetch session details from backend
    fetch(`/api/stripe-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setSession(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to fetch session");
        setLoading(false);
      });
  }, [sessionId]);

  useEffect(() => {
    if (!session || loading || error) return;

    // Fire Meta Pixel purchase event
    if (typeof window !== 'undefined' && window.fbq) {
      const purchaseData: PurchaseData = {
        value: session.amount_total / 100,
        currency: session.currency,
        content_ids: session.line_items?.map(item => item.price.id) || [],
        content_name: session.line_items?.map(item => item.description).join(', '),
        num_items: session.line_items?.reduce((sum, item) => sum + (item.quantity || 1), 0),
      };
      window.fbq('track', 'Purchase', purchaseData);
      console.log('Meta Pixel Purchase event fired:', purchaseData);
    }

    // Fire Google Analytics ecommerce purchase event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: session.id,
        value: session.amount_total / 100,
        currency: session.currency,
        items: session.line_items?.map(item => ({
          item_id: item.price.id,
          item_name: item.description,
          category: 'Health & Wellness',
          quantity: item.quantity,
          price: item.amount_total / 100,
        })) || [],
      });
      console.log('Google Analytics Purchase event fired:', session);
    }

    // Wait a moment to ensure the pixel events are fired, then redirect
    const redirectTimer = setTimeout(() => {
      setRedirecting(true);
      window.location.href = 'https://vitabella.md-hq.com/registration';
    }, 2000);
    return () => clearTimeout(redirectTimer);
  }, [session, loading, error]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading purchase details...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-600 font-bold mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          {/* Success checkmark */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Purchase Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You'll be redirected to complete your registration in just a moment.
          </p>
        </div>
        {redirecting ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500">Redirecting you now...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-2 bg-blue-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Preparing your registration... (2s)
            </p>
          </div>
        )}
        {/* Manual redirect button as fallback */}
        <div className="mt-8">
          <a 
            href="https://vitabella.md-hq.com/registration"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Continue to Registration →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
