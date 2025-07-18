"use client";
import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import { formatPrice, usePricing } from "@/app/checkout/hooks/usePricing";
import { planConfigs } from "@/app/checkout/checkoutData";

interface PlanSelectorProps {
  onPlanSelect: (plan: any) => void;
}

export default function PlanSelector({ onPlanSelect }: PlanSelectorProps) {
  const { prices, loading, error } = usePricing();

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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
    price: prices?.get(config.priceId)?.unit_amount || 0,
    consultFee: prices?.get(config.consultFeePriceId)?.unit_amount || 0,
    displayPrice: formatPrice(prices?.get(config.priceId)?.unit_amount || 0) ,
  }));
  
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f6f8fa", 
      padding: isMobile ? 20 : 40, 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      overflowX: 'hidden'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .plan-grid {
            flex-direction: column !important;
            gap: 20px !important;
          }
          
          .plan-card {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          
          .plan-container {
            padding: 0 1rem !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
        }
      `}</style>
      <h1 className="h2-alt font-tusker" style={{ 
        color: "var(--e-global-color-dark-green)", 
        fontWeight: 600, 
        fontSize: isMobile ? 28 : 36, 
        marginBottom: 24,
        textAlign: 'center'
      }}>
        Choose Your Plan
      </h1>
      <div className="plan-container" style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: isMobile ? 20 : 32, 
        width: '100%', 
        maxWidth: isMobile ? '100%' : 700, 
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        {/* Mobile: Single column, Desktop: 2x2 grid */}
        {isMobile ? (
          // Mobile layout: All plans in single column
          <div className="plan-grid" style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 20,
            width: '100%'
          }}>
            {plans.map(plan => (
              <div key={plan.key} className="plan-card" style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: 24,
                width: '100%',
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: "2px solid #e0e0e0",
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box'
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
                    style={{ 
                      width: 50, 
                      height: 50, 
                      objectFit: 'cover', 
                      borderRadius: 8, 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)', 
                      background: '#f6f8fa', 
                      border: '1px solid #e0e0e0', 
                      display: (plan.key === 'fm' || plan.key === 'fa' || plan.key === 'pm' || plan.key === 'pa') ? 'block' : 'none' 
                    }}
                    loading="lazy"
                  />
                </div>
                <div style={{ fontWeight: 700, fontSize: isMobile ? 22 : 20, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                  {plan.label}
                </div>
                <div style={{ fontSize: isMobile ? 16 : 14, color: "#333", marginBottom: 12 }}>
                  {plan.interval === "monthly" ? "Monthly Membership" : "Annual Membership"}
                </div>
                <div style={{ fontWeight: 700, fontSize: isMobile ? 20 : 18, color: "#113c1c", marginBottom: 8 }}>
                  {plan.displayPrice}/{plan.interval === "monthly" ? "Month" : "Year"}
                </div>
                <div style={{ fontWeight: 600, fontSize: isMobile ? 16 : 14, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                  Membership Includes:
                </div>
                <ul style={{ margin: 0, paddingLeft: 22, fontSize: isMobile ? 16 : 14, color: "#222", marginBottom: 10 }}>
                  {plan.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
                </ul>
                <VitaBellaButton
                  type="button"
                  label={isMobile ? "Select Plan" : `Select ${plan.label}`}
                  bg="var(--e-global-color-dark-green)"
                  bgHover="var(--e-global-color-lightgreen)"
                  text="var(--e-global-color-white)"
                  textHover="var(--e-global-color-dark-green)"
                  arrowCircleColor="var(--e-global-color-lightgreen)"
                  arrowCircleColorHover="var(--e-global-color-dark-green)"
                  arrowPathColor="var(--e-global-color-dark-green)"
                  arrowPathColorHover="var(--e-global-color-lightgreen)"
                  style={{ marginTop: 16, width: '100%' }}
                  onClick={() => onPlanSelect(plan)}
                  href="#"
                />
              </div>
            ))}
          </div>
        ) : (
          // Desktop layout: 2x2 grid
          <>
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
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 22 : 22, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                    {plan.label}
                  </div>
                  <div style={{ fontSize: isMobile ? 16 : 16, color: "#333", marginBottom: 12 }}>
                    {plan.interval === "monthly" ? "Monthly Membership" : "Annual Membership"}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 20 : 20, color: "#113c1c", marginBottom: 8 }}>
                    {plan.displayPrice}/{plan.interval === "monthly" ? "Month" : "Year"}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: isMobile ? 16 : 14, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                    Membership Includes:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 22, fontSize: isMobile ? 16 : 15, color: "#222", marginBottom: 10 }}>
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
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 22 : 22, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                    {plan.label}
                  </div>
                  <div style={{ fontSize: isMobile ? 16 : 16, color: "#333", marginBottom: 12 }}>
                    {plan.interval === "monthly" ? "Monthly Membership" : "Annual Membership"}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: isMobile ? 20 : 20, color: "#113c1c", marginBottom: 8 }}>
                    {plan.displayPrice}/{plan.interval === "monthly" ? "Month" : "Year"}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: isMobile ? 16 : 14, color: "var(--e-global-color-dark-green)", marginBottom: 8 }}>
                    Membership Includes:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 22, fontSize: isMobile ? 16 : 15, color: "#222", marginBottom: 10 }}>
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
          </>
        )}
      </div>
    </div>
  );
}
