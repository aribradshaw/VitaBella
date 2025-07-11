/**
 * Test suite for promo code validation API endpoint
 * 
 * This test file covers all validation logic for promo codes including:
 * - Basic validation (missing code, invalid code)
 * - Product matching validation
 * - Coupon validity checks
 * - Expiration date validation
 * - Usage limit validation (max redemptions vs times redeemed)
 * - Edge cases (null/undefined values)
 * - Error handling and API response structure
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from "next/server";

// Mock Stripe
vi.mock("stripe", () => {
  const mockList = vi.fn();
  return {
    default: vi.fn(() => ({
      promotionCodes: {
        list: mockList,
      },
    })),
    mockList, // Export the mock for access in tests
  };
});

// Mock NextResponse
vi.mock("next/server", () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    json: vi.fn((data: any, init?: { status?: number }) => ({
      json: vi.fn().mockResolvedValue(data),
      status: init?.status || 200,
    })),
  },
}));

// Mock environment variables
process.env.STRIPE_SECRET_KEY = "sk_test_mock_key";

// Import after mocking
import { POST } from "./route";
import Stripe from "stripe";

describe("/api/stripe/promo_codes/validate", () => {
  let mockPromotionCodesList: any;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Get the mocked list function
    const stripe = new Stripe("sk_test_mock", { apiVersion: "2025-06-30.basil" });
    mockPromotionCodesList = stripe.promotionCodes.list;
  });

  const createMockRequest = (body: any) => {
    return {
      json: vi.fn().mockResolvedValue(body),
    } as unknown as NextRequest;
  };

  const createMockPromoCode = (overrides: any = {}) => ({
    id: "promo_test123",
    code: "TESTCODE",
    coupon: {
      id: "coupon_test123",
      valid: true,
      applies_to: {
        products: ["prod_test123"],
      },
      percent_off: 20,
      duration: "once",
      ...overrides.coupon,
    },
    expires_at: null,
    max_redemptions: null,
    times_redeemed: 0,
    active: true,
    ...overrides,
  });

  describe("POST /api/stripe/promo_codes/validate", () => {
    it("should return 400 if no promo code is provided", async () => {
      const req = createMockRequest({});
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe("Promo code is required");
    });

    it("should return 404 if promo code is not found", async () => {
      // Setup the mock to return empty data
      mockPromotionCodesList.mockResolvedValue({
        data: [],
      });

      const req = createMockRequest({ 
        code: "INVALIDCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(404);
      expect(data.error).toBe("Invalid or expired promo code");
      expect(data.message).toBe("This promotion code does not exist or has been deactivated");
    });

    it("should return valid promo code with valid=true when product matches", async () => {
      const validPromoCode = createMockPromoCode();

      mockPromotionCodesList.mockResolvedValue({
        data: [validPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.message).toBeUndefined();
      expect(data.id).toBe("promo_test123");
      expect(data.code).toBe("TESTCODE");
      expect(data.coupon.percent_off).toBe(20);
    });

    it("should return valid=false when product does not match coupon applies_to", async () => {
      const promoCode = createMockPromoCode({
        coupon: {
          valid: true,
          applies_to: {
            products: ["prod_different123"],
          },
        },
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [promoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(false);
      expect(data.message).toBe("This promotion code is not valid for the selected product");
    });

    it("should return valid=false when coupon is invalid", async () => {
      const invalidCouponPromoCode = createMockPromoCode({
        coupon: {
          valid: false,
          applies_to: {
            products: ["prod_test123"],
          },
        },
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [invalidCouponPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(false);
      expect(data.message).toBe("This promotion code is no longer valid");
    });

    it("should return valid=false when promo code has expired", async () => {
      const expiredTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const expiredPromoCode = createMockPromoCode({
        expires_at: expiredTimestamp,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [expiredPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(false);
      expect(data.message).toBe("This promotion code has expired");
    });

    it("should return valid=true when promo code expires in the future", async () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const futurePromoCode = createMockPromoCode({
        expires_at: futureTimestamp,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [futurePromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.message).toBeUndefined();
      expect(data.expires_at).toBe(futureTimestamp);
    });

    it("should return valid=false when max redemptions reached", async () => {
      const maxedOutPromoCode = createMockPromoCode({
        max_redemptions: 5,
        times_redeemed: 5,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [maxedOutPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(false);
      expect(data.message).toBe("This promotion code has reached its maximum number of uses");
    });

    it("should return valid=false when times redeemed exceeds max redemptions", async () => {
      const overUsedPromoCode = createMockPromoCode({
        max_redemptions: 5,
        times_redeemed: 6,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [overUsedPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(false);
      expect(data.message).toBe("This promotion code has reached its maximum number of uses");
    });

    it("should return valid=true when within redemption limits", async () => {
      const validRedemptionPromoCode = createMockPromoCode({
        max_redemptions: 10,
        times_redeemed: 5,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [validRedemptionPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.times_redeemed).toBe(5);
      expect(data.max_redemptions).toBe(10);
    });

    it("should return valid=true when no max redemptions limit is set", async () => {
      const unlimitedPromoCode = createMockPromoCode({
        max_redemptions: null,
        times_redeemed: 100,
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [unlimitedPromoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
    });

    it("should handle product parameter being undefined gracefully", async () => {
      const promoCode = createMockPromoCode();

      mockPromotionCodesList.mockResolvedValue({
        data: [promoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE"
        // product intentionally omitted
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe("Product ID is required");
    });

    it("should handle coupon without applies_to field", async () => {
      const promoCodeWithoutAppliesTo = createMockPromoCode({
        coupon: {
          valid: true,
          applies_to: null,
        },
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [promoCodeWithoutAppliesTo],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(undefined); // Optional chaining returns undefined when applies_to is null
    });

    it("should return 500 when Stripe API throws an error", async () => {
      mockPromotionCodesList.mockRejectedValue(new Error("Stripe API error"));

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data.error).toBe("Stripe API error");
    });

    it("should return 500 with generic error message when error has no message", async () => {
      mockPromotionCodesList.mockRejectedValue({});

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data.error).toBe("Failed to validate promo code");
    });

    it("should call Stripe API with correct parameters", async () => {
      const promoCode = createMockPromoCode();

      mockPromotionCodesList.mockResolvedValue({
        data: [promoCode],
      });

      const req = createMockRequest({ 
        code: "TESTCODE",
        product: "prod_test123" 
      });
      
      await POST(req);
      
      expect(mockPromotionCodesList).toHaveBeenCalledWith({
        code: "TESTCODE",
        limit: 1,
        active: true,
        expand: ['data.coupon', 'data.coupon.applies_to'],
      });
    });

    it("should return all promo code data in response when valid", async () => {
      const completePromoCode = createMockPromoCode({
        id: "promo_complete123",
        code: "COMPLETE",
        expires_at: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
        max_redemptions: 100,
        times_redeemed: 25,
        active: true,
        coupon: {
          id: "coupon_complete123",
          valid: true,
          percent_off: 15,
          duration: "once",
          applies_to: {
            products: ["prod_test123", "prod_test456"],
          },
        },
      });

      mockPromotionCodesList.mockResolvedValue({
        data: [completePromoCode],
      });

      const req = createMockRequest({ 
        code: "COMPLETE",
        product: "prod_test123" 
      });
      
      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.id).toBe("promo_complete123");
      expect(data.code).toBe("COMPLETE");
      expect(data.expires_at).toBe(completePromoCode.expires_at);
      expect(data.max_redemptions).toBe(100);
      expect(data.times_redeemed).toBe(25);
      expect(data.active).toBe(true);
      expect(data.coupon.id).toBe("coupon_complete123");
      expect(data.coupon.percent_off).toBe(15);
    });

  });
});
