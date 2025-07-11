"use client";

import { useState } from "react";
import EmbeddedCheckoutButton from "@/components/EmbeddedCheckoutButton";

export default function CheckoutExample() {
  const [couponCode, setCouponCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [validCoupon, setValidCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Example line items - replace with your actual product price IDs
  const lineItems = [
    {
      price: "price_1234567890", // Replace with your actual Stripe price ID
      quantity: 1,
    },
  ];

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("");
      setValidCoupon(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode: couponCode.trim() }),
      });

      const data = await response.json();
      
      if (data.valid) {
        setValidCoupon(true);
        setCouponMessage(data.message || "Coupon applied successfully!");
      } else {
        setValidCoupon(false);
        setCouponMessage(data.message || "Invalid coupon code");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setValidCoupon(false);
      setCouponMessage("Error validating coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout Example</h1>
      
      <div className="space-y-6">
        {/* Customer Information */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your-email@example.com"
          />
        </div>

        {/* Coupon Code */}
        <div>
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
            Coupon Code (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="coupon"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setValidCoupon(false);
                setCouponMessage("");
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter coupon code"
            />
            <button
              onClick={validateCoupon}
              disabled={loading || !couponCode.trim()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Apply"}
            </button>
          </div>
          
          {couponMessage && (
            <p className={`mt-2 text-sm ${validCoupon ? "text-green-600" : "text-red-600"}`}>
              {couponMessage}
            </p>
          )}
        </div>

        {/* Product Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Sample Product</span>
              <span>$99.00</span>
            </div>
            {validCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount Applied</span>
                <span>See checkout for details</span>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <div className="pt-4">
          <EmbeddedCheckoutButton
            lineItems={lineItems}
            customer={{ email: customerEmail }}
            couponCode={validCoupon ? couponCode : undefined}
            buttonText="Proceed to Checkout"
            className="w-full text-lg py-4"
            onSuccess={(sessionId) => {
              console.log("Checkout completed with session:", sessionId);
              // Handle success - maybe redirect or show confirmation
            }}
            onError={(error) => {
              console.error("Checkout error:", error);
              // Handle error - show error message
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 How to test:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Replace the price ID in lineItems with your actual Stripe price ID</li>
          <li>2. Create test coupons in your Stripe dashboard (e.g., "SAVE10", "WELCOME")</li>
          <li>3. Enter a coupon code and click "Apply" to validate it</li>
          <li>4. Click "Proceed to Checkout" to open the embedded checkout</li>
          <li>5. Use Stripe test card: 4242 4242 4242 4242</li>
        </ul>
      </div>
    </div>
  );
}
