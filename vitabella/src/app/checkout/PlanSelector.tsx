"use client";
import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import { usePricing, formatPrice, getPrice } from "@/app/checkout/hooks/usePricing";

const planConfigs = [
  {
    key: "pm",
    label: "Performance",
    priceId: "price_1NVd0PBvA5MJ1guPw1S9W0l7",
    type: "performance",
    interval: "monthly",
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal",
      "20% Off Supplements",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    originalPrice: "$215",
    costNote: "+ cost of medication"
  },
  {
    key: "pa",
    label: "Performance",
    priceId: "price_1NVd0PBvA5MJ1guPfSpSCuNV",
    type: "performance",
    interval: "annual",
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal",
      "20% Off Supplements",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    originalPrice: "$2,148",
    costNote: "+ cost of medication"
  },
  {
    key: "fm",
    label: "Foundation",
    priceId: "price_1NVcyrBvA5MJ1guP5ywam4pb",
    type: "foundation",
    interval: "monthly",
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    originalPrice: "$120",
    costNote: "+ cost of medication"
  },
  {
    key: "fa",
    label: "Foundation",
    priceId: "price_1NVcyrBvA5MJ1guPHxRiZbYe",
    type: "foundation",
    interval: "annual",
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    originalPrice: "$1,188",
    costNote: "+ cost of medication"
  },
];

interface PlanSelectorProps {
  onPlanSelect: (plan: any) => void;
}

export default function PlanSelector({ onPlanSelect }: PlanSelectorProps) {
  const { prices, loading, error } = usePricing();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f6f8fa", padding: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 18, color: "#666" }}>Loading pricing information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#f6f8fa", padding: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 18, color: "red" }}>Error loading pricing: {error}</div>
      </div>
    );
  }

  // Build plans with real Stripe pricing data
  const plans = planConfigs.map(config => ({
    ...config,
    price: getPrice(prices, config.priceId),
    consultFee: getPrice(prices, config.consultFeePriceId),
    displayPrice: formatPrice(getPrice(prices, config.priceId)),
  }));
  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="h2-alt font-tusker" style={{ color: "var(--e-global-color-dark-green)", fontWeight: 600, fontSize: 36, marginBottom: 24 }}>
        Choose Your Plan
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: '100%', maxWidth: 700, margin: '0 auto' }}>
        {/* 2x2 grid for plans */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
          {plans.slice(0, 2).map(plan => (
            <div key={plan.key} style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              padding: 32,
              minWidth: 260,
              maxWidth: 320,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: "2px solid #e0e0e0",
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Plan image in top right of card */}
              <div style={{ position: 'absolute', top: 0, right: 0, paddingTop: 10, paddingRight: 10, zIndex: 2 }}>
                <img
                  src={
                    plan.key === 'fm' ? '/categories/weight-loss/weightlossslider.webp'
                    : plan.key === 'fa' ? '/modules/aboutpeople.webp'
                    : plan.key === 'pm' ? '/categories/anti-aging/antiagingslider.webp'
                    : plan.key === 'pa' ? '/categories/hormone-therapy/hormonetherapyslider.webp'
                    : ''
                  }
                  alt="Plan visual"
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', background: '#f6f8fa', border: '1px solid #e0e0e0', display: (plan.key === 'fm' || plan.key === 'fa' || plan.key === 'pm' || plan.key === 'pa') ? 'block' : 'none' }}
                  loading="lazy"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: 22, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                {plan.label}
              </div>
              <div style={{ fontSize: 16, color: "#333", marginBottom: 12 }}>
                {plan.interval === "monthly" ? "Monthly Membership" : "Annual Membership"}
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#113c1c", marginBottom: 8 }}>
                {plan.displayPrice}/{plan.interval === "monthly" ? "Month" : "Year"}
              </div>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 15, color: "#222", marginBottom: 10 }}>
                {plan.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
              </ul>
              <VitaBellaButton
                type="button"
                label={`Select ${plan.label}`}
                bg="var(--e-global-color-dark-green)"
                bgHover="var(--e-global-color-lightgreen)"
                text="var(--e-global-color-white)"
                textHover="var(--e-global-color-dark-green)"
                arrowCircleColor="var(--e-global-color-lightgreen)"
                arrowCircleColorHover="var(--e-global-color-dark-green)"
                arrowPathColor="var(--e-global-color-dark-green)"
                arrowPathColorHover="var(--e-global-color-lightgreen)"
                style={{ marginTop: 16, minWidth: 160 }}
                onClick={() => onPlanSelect(plan)}
                href="#"
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {plans.slice(2, 4).map(plan => (
            <div key={plan.key} style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              padding: 32,
              minWidth: 260,
              maxWidth: 320,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: "2px solid #e0e0e0",
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Plan image in top right of card */}
              <div style={{ position: 'absolute', top: 0, right: 0, paddingTop: 10, paddingRight: 10, zIndex: 2 }}>
                <img
                  src={
                    plan.key === 'fm' ? '/categories/weight-loss/weightlossslider.webp'
                    : plan.key === 'fa' ? '/modules/aboutpeople.webp'
                    : plan.key === 'pm' ? '/categories/anti-aging/antiagingslider.webp'
                    : plan.key === 'pa' ? '/categories/hormone-therapy/hormonetherapyslider.webp'
                    : ''
                  }
                  alt="Plan visual"
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', background: '#f6f8fa', border: '1px solid #e0e0e0', display: (plan.key === 'fm' || plan.key === 'fa' || plan.key === 'pm' || plan.key === 'pa') ? 'block' : 'none' }}
                  loading="lazy"
                />
              </div>
              <div style={{ fontWeight: 700, fontSize: 22, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                {plan.label}
              </div>
              <div style={{ fontSize: 16, color: "#333", marginBottom: 12 }}>
                {plan.interval === "monthly" ? "Monthly Membership" : "Annual Membership"}
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#113c1c", marginBottom: 8 }}>
                {plan.displayPrice}/{plan.interval === "monthly" ? "Month" : "Year"}
              </div>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: 15, color: "#222", marginBottom: 10 }}>
                {plan.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
              </ul>
              <VitaBellaButton
                type="button"
                label={`Select ${plan.label}`}
                bg="var(--e-global-color-dark-green)"
                bgHover="var(--e-global-color-lightgreen)"
                text="var(--e-global-color-white)"
                textHover="var(--e-global-color-dark-green)"
                arrowCircleColor="var(--e-global-color-lightgreen)"
                arrowCircleColorHover="var(--e-global-color-dark-green)"
                arrowPathColor="var(--e-global-color-dark-green)"
                arrowPathColorHover="var(--e-global-color-lightgreen)"
                style={{ marginTop: 16, minWidth: 160 }}
                onClick={() => onPlanSelect(plan)}
                href="#"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { planConfigs as plans, planConfigs };
