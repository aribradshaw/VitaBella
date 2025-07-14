"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    value: searchParams?.get('value') || '0',
    currency: searchParams?.get('currency') || 'USD',
    productName: searchParams?.get('product_name') || 'Product',
    productId: searchParams?.get('product_id') || '',
    isFree: searchParams?.get('free') === 'true'
  });

  useEffect(() => {
    // Fire Meta Pixel purchase event if it exists
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: parseFloat(orderDetails.value),
        currency: orderDetails.currency,
        content_type: 'product',
        content_ids: [orderDetails.productId],
        content_name: orderDetails.productName,
        num_items: 1
      });
    }

    // Fire Google Analytics purchase event if it exists
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: parseFloat(orderDetails.value),
        currency: orderDetails.currency,
        items: [{
          item_id: orderDetails.productId,
          item_name: orderDetails.productName,
          category: 'Membership',
          quantity: 1,
          price: parseFloat(orderDetails.value)
        }]
      });
    }
  }, [orderDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {orderDetails.isFree ? 'Subscription Activated!' : 'Payment Successful!'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {orderDetails.isFree 
              ? 'Your free subscription has been activated successfully. You will receive an email confirmation shortly.'
              : 'Thank you for your purchase. Your order has been confirmed and you will receive an email confirmation shortly.'
            }
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{orderDetails.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {orderDetails.isFree 
                    ? 'FREE' 
                    : `$${orderDetails.value} ${orderDetails.currency}`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-emerald-600">
                  {orderDetails.isFree ? 'Activated' : 'Confirmed'}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your email for order confirmation</li>
                <li>• A member of our team will contact you within 24 hours</li>
                <li>• Schedule your initial consultation</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Link
                href="/dashboard"
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-block"
              >
                Go to Dashboard
              </Link>
              
              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
              >
                Return to Home
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@vitabella.com" className="text-emerald-600 hover:text-emerald-700">
                support@vitabella.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
