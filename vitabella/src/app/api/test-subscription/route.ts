import { NextResponse } from "next/server";

export async function GET() {
  console.log('=== TEST SUBSCRIPTION ENDPOINT ===');
  
  // Test data that mimics a real form submission
  const testData = {
    lineItems: [
      { price: "price_1NVd0PBvA5MJ1guPw1S9W0l7", quantity: 1 }, // Performance Monthly from plan config
      { price: "price_1P9BRBBvA5MJ1guP0XFZCpjh", quantity: 1 }, // Consultation fee
    ],
    customer: {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      address: "123 Test St",
      city: "Test City",
      state: "CA",
      zip: "12345"
    },
    coupon: null
  };
  
  try {
    // Call the actual subscription API
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3001'}/api/stripe/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: result,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
