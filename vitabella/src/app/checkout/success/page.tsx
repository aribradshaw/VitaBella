"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SessionDetails {
  status: string;
  payment_status: string;
  customer_email?: string;
  amount_total?: number;
  currency?: string;
  customer_details?: any;
  metadata?: any;
}

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");
  
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (sessionDetails?.payment_status === 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
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
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = '/account'}
              className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              View My Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle other payment statuses
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-yellow-600 text-6xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Processing
        </h1>
        <p className="text-gray-600 mb-4">
          Your payment is being processed. Status: {sessionDetails?.payment_status}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
