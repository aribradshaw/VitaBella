"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VitaBellaButton from '@/components/common/VitaBellaButton';

interface SessionDetails {
  status: string;
  payment_status: string;
  customer_email?: string;
  amount_total?: number;
  currency?: string;
  customer_details?: any;
  metadata?: any;
}

export default function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  const testMode = searchParams?.get("test");
  
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If test mode is enabled, show mock success page
    if (testMode) {
      setSessionDetails({
        status: "complete",
        payment_status: "paid",
        customer_email: "test@example.com",
        amount_total: 19900, // $199.00 in cents
        currency: "usd",
        customer_details: {
          email: "test@example.com",
          name: "Test Customer"
        },
        metadata: {}
      });
      setLoading(false);
      return;
    }

    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`/api/checkout-session/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to retrieve session details');
        }

        const data = await response.json();
        setSessionDetails(data);
      } catch (err: any) {
        console.error('Error fetching session details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 'var(--space-4x)', paddingBottom: 'var(--space-4x)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: `calc(var(--space-4x) * 2)`, paddingBottom: 'var(--space-4x)' }}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <VitaBellaButton
            label="Return to Membership"
            bg="var(--e-global-color-dark-green)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-white)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-lightgreen)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-dark-green)"
            arrowPathColorHover="var(--e-global-color-lightgreen)"
            href="/membership"
            style={{ width: 'auto' }}
          />
        </div>
      </div>
    );
  }

  if (sessionDetails?.payment_status === 'paid') {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        style={{
          paddingTop: `calc(var(--space-4x) * 2)`,
          paddingBottom: 'var(--space-4x)'
        }}
      >
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4" style={{gap: 12}}>
            <svg
              className="text-green-600"
              style={{ width: 40, height: 40, display: 'inline-block', verticalAlign: 'middle' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: '2.25rem', color: 'var(--e-global-color-dark-green)', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>
              Payment Successful!
            </span>
          </div>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've received your payment and will process your order shortly.
          </p>
          
          {sessionDetails.customer_email && (
            <p className="text-sm text-gray-500 mb-4">
              A confirmation email has been sent to: <br />
              <strong>{sessionDetails.customer_email}</strong>
            </p>
          )}

          {sessionDetails.amount_total && (
            <div className="border-t pt-4 mb-6">
              <p className="text-lg font-semibold">
                Total Paid: ${(sessionDetails.amount_total / 100).toFixed(2)} {sessionDetails.currency?.toUpperCase()}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <VitaBellaButton
              type="button"
              label="Return Home"
              bg="var(--e-global-color-dark-green)"
              bgHover="var(--e-global-color-lightgreen)"
              text="var(--e-global-color-white)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-lightgreen)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-dark-green)"
              arrowPathColorHover="var(--e-global-color-lightgreen)"
              onClick={() => window.location.href = '/'}
              href="#"
              style={{ width: 'auto', marginBottom: '12px' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Handle other payment statuses
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 'var(--space-4x)', paddingBottom: 'var(--space-4x)' }}>
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-yellow-600 text-6xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Processing
        </h1>
        <p className="text-gray-600 mb-4">
          Your payment is being processed. Status: {sessionDetails?.payment_status}
        </p>
        <VitaBellaButton
          type="button"
          label="Return to Membership"
          bg="var(--e-global-color-dark-green)"
          bgHover="var(--e-global-color-lightgreen)"
          text="var(--e-global-color-white)"
          textHover="var(--e-global-color-dark-green)"
          arrowCircleColor="var(--e-global-color-lightgreen)"
          arrowCircleColorHover="var(--e-global-color-dark-green)"
          arrowPathColor="var(--e-global-color-dark-green)"
          arrowPathColorHover="var(--e-global-color-lightgreen)"
          href="/membership"
          style={{ width: 'auto' }}
        />
      </div>
    </div>
  );
}
