"use client";

import { useEffect, useState } from "react";
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

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);
  
  // Get purchase data from URL parameters (if coming from Stripe Checkout)
  const sessionId = searchParams?.get("session_id");
  const value = searchParams?.get("value");
  const currency = searchParams?.get("currency") || "USD";
  const productName = searchParams?.get("product_name");
  const productId = searchParams?.get("product_id");
  
  useEffect(() => {
    // Fire Meta Pixel purchase event
    const trackPurchase = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        const purchaseData: PurchaseData = {};
        
        // Add purchase data if available from URL params
        if (value) {
          purchaseData.value = parseFloat(value);
        }
        if (currency) {
          purchaseData.currency = currency;
        }
        if (productId) {
          purchaseData.content_ids = [productId];
        }
        if (productName) {
          purchaseData.content_name = productName;
        }
        
        // Fire the purchase event
        window.fbq('track', 'Purchase', purchaseData);
        
        console.log('Meta Pixel Purchase event fired:', purchaseData);
      }
    };

    // Fire Google Analytics ecommerce purchase event
    const trackGoogleAnalyticsPurchase = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        const transactionId = sessionId || `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const purchaseValue = value ? parseFloat(value) : 0;
        
        // Enhanced Ecommerce purchase event
        window.gtag('event', 'purchase', {
          transaction_id: transactionId,
          value: purchaseValue,
          currency: currency || 'USD',
          items: [
            {
              item_id: productId || 'unknown',
              item_name: productName || 'Product',
              category: 'Health & Wellness',
              quantity: 1,
              price: purchaseValue
            }
          ]
        });

        console.log('Google Analytics Purchase event fired:', {
          transaction_id: transactionId,
          value: purchaseValue,
          currency: currency || 'USD',
          product: productName
        });
      }
    };

    // Track both events
    trackPurchase();
    trackGoogleAnalyticsPurchase();
    
    // Wait a moment to ensure the pixel events are fired, then redirect
    const redirectTimer = setTimeout(() => {
      setRedirecting(true);
      window.location.href = 'https://vitabella.md-hq.com/registration';
    }, 2000); // 2 second delay to ensure tracking

    // Cleanup timer on unmount
    return () => clearTimeout(redirectTimer);
  }, [sessionId, value, currency, productName, productId]);

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
              Preparing your registration... ({Math.max(0, 2 - Math.floor((Date.now() % 2000) / 1000))}s)
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
