"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLabPanels } from './checkoutData';
import Tooltip from './Tooltip';

interface CheckoutFormProps {
  selectedPlan: any;
  setSelectedPlan: React.Dispatch<any>;
  planGroup: string | null;
  setPlanGroup: React.Dispatch<React.SetStateAction<string | null>>;
  labCart: string[];
  setLabCart: React.Dispatch<React.SetStateAction<string[]>>;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clientSecret: string | null;
  createPaymentIntent: () => Promise<string | null>;
}

export default function CheckoutFormInner(props: CheckoutFormProps) {
  const { selectedPlan, setSelectedPlan, planGroup, setPlanGroup, labCart, setLabCart, form, setForm, error, setError, loading, setLoading, clientSecret, createPaymentIntent } = props;
  const stripe = useStripe();
  const elements = useElements();
  const { labPanels } = useLabPanels();
  
  // Mobile detection hook
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
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
  
  // Auto-reset loading state if it's stuck
  useEffect(() => {
    if (loading) {
      const formComplete = form.email && form.firstName && form.lastName && form.address && form.city && form.state && form.zip;
      
      if (!formComplete || !selectedPlan) {
        setLoading(false);
      }
    }
  }, [loading]);
  
  // Helper: check if all required form fields are filled
  const isFormComplete = () => {
    const required = form.email && form.firstName && form.lastName && form.address && form.city && form.state && form.zip;
    
    // Force reset loading if form is incomplete but loading is true
    if (!required && loading) {
      setLoading(false);
    }
    
    return !!required;
  };

  const handleLabToggle = (key: string) => {
    setLabCart((prev) => {
      // Only allow one lab panel at a time
      if (prev.includes(key)) {
        // Remove the selected lab
        return prev.filter((k) => k !== key);
      } else {
        // Replace with the new lab (only one at a time)
        return [key];
      }
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Calculate totals
  const planPrice = selectedPlan ? selectedPlan.price : 0;
  const consultFee = selectedPlan ? selectedPlan.consultFee : 0;
  const consultFeePriceId = selectedPlan ? selectedPlan.consultFeePriceId : null;
  const labs = labPanels.filter((l) => labCart.includes(l.key));
  const labsTotal = labs.reduce((sum, l) => sum + l.price, 0);
  const total = planPrice + consultFee + labsTotal;

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    
    try {
      if (!stripe || !elements) {
        throw new Error('Stripe is not loaded.');
      }
      
      // If no client secret exists, create payment intent first
      let currentClientSecret = clientSecret;
      if (!currentClientSecret) {
        currentClientSecret = await createPaymentIntent();
        if (!currentClientSecret) {
          throw new Error('Failed to create payment intent. Please try again.');
        }
      }
      
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found.');
      }
      
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(currentClientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: {
              line1: form.address,
              line2: form.address2 || undefined,
              city: form.city,
              state: form.state,
              postal_code: form.zip,
            },
          },
        },
      });
      
      if (confirmError) {
        throw new Error(confirmError.message || 'Payment failed.');
      }
      
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Don't set loading to false here - let the redirect happen
        window.location.href = '/thank-you';
      } else {
        throw new Error('Payment was not completed successfully.');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };



  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--e-global-color-off-white)',
      zIndex: 0,
      overflowX: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--space-4x)',
        paddingBottom: 'var(--space-4x)',
        boxSizing: 'border-box',
      }}>
      <style>{`
        @media (max-width: 768px) {
          .checkout-container {
            padding: 0 1.5rem !important;
            gap: 1rem !important;
          }
          
          .checkout-form {
            padding: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .checkout-form .vita-bella-button {
            width: 100% !important;
          }
          
          .checkout-form .vita-bella-button:hover:not(:disabled) {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(17, 60, 28, 0.25) !important;
          }
          
          .checkout-form .vita-bella-button:active:not(:disabled) {
            transform: translateY(0px) !important;
            box-shadow: 0 2px 8px rgba(17, 60, 28, 0.15) !important;
          }
          
          .order-summary {
            padding: 1rem !important;
          }
          
          .order-summary-header {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            margin-bottom: 1rem !important;
          }
          
          .plan-image {
            width: 45px !important;
            height: 45px !important;
            margin-left: 0.5rem !important;
          }
          
          .labs-items {
            gap: 8px !important;
          }
          
          .lab-item {
            padding: 10px !important;
            border-radius: 12px !important;
            margin-bottom: 0 !important;
          }
          
          .lab-button {
            padding: 6px 12px !important;
            font-size: 12px !important;
            height: 32px !important;
            min-width: 60px !important;
            border-radius: 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          .checkout-container {
            padding: 0 1rem !important;
          }
          
          .checkout-form {
            padding: 0.75rem !important;
          }
          
          .checkout-form .vita-bella-button {
            width: 100% !important;
          }
          
          .checkout-form .vita-bella-button:hover:not(:disabled) {
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 16px rgba(17, 60, 28, 0.2) !important;
          }
          
          .checkout-form .vita-bella-button:active:not(:disabled) {
            transform: translateY(0px) !important;
            box-shadow: 0 2px 8px rgba(17, 60, 28, 0.15) !important;
          }
          
          .order-summary {
            padding: 0.75rem !important;
          }
          
          .plan-image {
            width: 40px !important;
            height: 40px !important;
            margin-left: 0.25rem !important;
          }
          
          .labs-items {
            gap: 6px !important;
          }
          
          .lab-item {
            padding: 8px !important;
            border-radius: 10px !important;
          }
          
          .lab-button {
            padding: 4px 8px !important;
            font-size: 11px !important;
            height: 28px !important;
            min-width: 50px !important;
            border-radius: 6px !important;
          }
        }
      `}</style>
        {/* Main checkout container - responsive layout */}
        <div className="checkout-container" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '2rem', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
        {/* Left: Form */}
        <form className="checkout-form" style={{ 
          flex: isMobile ? 'none' : '1', 
          background: '#fff', 
          borderRadius: '12px', 
          padding: isMobile ? '1.5rem' : '2rem', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: isMobile ? '1rem' : '0'
        }}
          onSubmit={e => { e.preventDefault(); handleCheckout(); }}
        >
          <h1 style={{ marginBottom: 18, color: "var(--e-global-color-dark-green)", fontSize: isMobile ? '1.75rem' : '2rem', fontWeight: 700 }}>Checkout</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }} htmlFor="email">Email Address *</label>
            <input name="email" id="email" type="email" required value={form.email} onChange={handleFormChange} style={{ width: "100%", marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="firstName">First Name *</label>
              <input name="firstName" id="firstName" required value={form.firstName} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 180px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="lastName">Last Name *</label>
              <input name="lastName" id="lastName" required value={form.lastName} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '2 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="address">Street Address *</label>
              <input name="address" id="address" required value={form.address} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 120px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="address2">Apt./Unit</label>
              <input name="address2" id="address2" value={form.address2} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1rem' }}>
            <div style={{ flex: '2 1 140px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="city">City *</label>
              <input name="city" id="city" required value={form.city} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 80px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="state">State *</label>
              <input name="state" id="state" required value={form.state} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 100px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontWeight: 500 }} htmlFor="zip">ZIP Code *</label>
              <input name="zip" id="zip" required value={form.zip} onChange={handleFormChange} style={{ width: "100%", minWidth: 0, marginTop: 4, marginBottom: 0, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ margin: '18px 0 8px 0' }}>
            <label style={{ fontWeight: 500, marginBottom: 6, display: 'block' }}>Card Information *</label>
            <div style={{
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 12,
              background: '#fafbfc',
              marginBottom: 8
            }}>
              {error && (
                <div style={{ color: 'red', fontSize: 15, marginBottom: 8 }}>{error}</div>
              )}
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#113c1c',
                      '::placeholder': { color: '#888' },
                    },
                    invalid: { color: '#b71c1c' },
                  },
                }}
              />
            </div>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          
          {/* Checkout Button */}
          <button
            type="button"
            onClick={() => {
              if (selectedPlan && isFormComplete() && !error && !loading) {
                handleCheckout();
              }
            }}
            disabled={!selectedPlan || !isFormComplete() || !!error || loading}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              background: (!selectedPlan || !isFormComplete() || !!error || loading) 
                ? '#cccccc' 
                : '#113c1c',
              color: 'white',
              cursor: (!selectedPlan || !isFormComplete() || !!error || loading) 
                ? 'not-allowed' 
                : 'pointer',
              minHeight: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff40',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}
            {loading ? 'Processing...' : `Sign Up Now - $${(total / 100).toFixed(2)}`}
          </button>
          
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>

        </form>

        {/* Right: Order Summary + Image Container */}
        <div style={{ 
          flex: isMobile ? 'none' : '0 0 400px',
          width: isMobile ? '100%' : '400px'
        }}>
          {/* Order Summary */}
          <div className="order-summary" style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            padding: isMobile ? '1.5rem' : '2rem', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Header section with image positioned to the right */}
            <div className="order-summary-header" style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px'
            }}>
              <h2 style={{ 
                color: "var(--e-global-color-dark-green)", 
                fontSize: isMobile ? '1.25rem' : '1.5rem', 
                fontWeight: 700,
                margin: 0
              }}>
                Order Summary
              </h2>
              
              {/* Plan Image - positioned to the right of Order Summary text */}
              {selectedPlan && (
                <div style={{ 
                  flexShrink: 0,
                  marginLeft: '1rem'
                }}>
                  <img
                    className="plan-image"
                    src={
                      selectedPlan.key === 'fm' ? '/categories/weight-loss/weightlossslider.webp'
                      : selectedPlan.key === 'fa' ? '/modules/aboutpeople.webp'
                      : selectedPlan.key === 'pm' ? '/categories/anti-aging/antiagingslider.webp'
                      : selectedPlan.key === 'pa' ? '/categories/hormone-therapy/hormonetherapyslider.webp'
                      : ''
                    }
                    alt="Plan visual"
                    style={{ 
                      width: isMobile ? '50px' : '80px', 
                      height: isMobile ? '50px' : '80px', 
                      objectFit: 'cover', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)', 
                      background: '#f6f8fa', 
                      border: '1px solid #e0e0e0',
                      display: (selectedPlan.key === 'fm' || selectedPlan.key === 'fa' || selectedPlan.key === 'pm' || selectedPlan.key === 'pa') ? 'block' : 'none'
                    }}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          
          <div style={{ background: '#e0e0e0', height: 2, borderRadius: 1, marginBottom: '18px' }} />
          
          {selectedPlan && (
            <>
            <div>
              <div style={{ fontWeight: 700, fontSize: isMobile ? '18px' : '20px', color: 'var(--e-global-color-dark-green)', marginBottom: 6 }}>
                {selectedPlan.label} {selectedPlan.interval === "monthly" ? "(Monthly Membership)" : "(Annual Membership)"}
              </div>
              <ul style={{ margin: 0, paddingLeft: 22, fontSize: isMobile ? '14px' : '15px', color: '#222', marginBottom: 10 }}>
                {selectedPlan.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
              </ul>
              <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '10px 0 14px 0' }} />
            </div>

            {/* Add-On Bloodwork Section - Moved from bottom bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                fontWeight: 600, 
                fontSize: isMobile ? '16px' : '18px', 
                color: 'var(--e-global-color-dark-green)', 
                marginBottom: '12px' 
              }}>
                Add-On Bloodwork:
              </div>
              <div className="labs-items" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: isMobile ? '8px' : '10px', 
                width: '100%'
              }}>
                {labPanels.map((lab) => (
                  <div key={lab.key} className="lab-item" style={{ 
                    display: 'flex', 
                    alignItems: 'stretch', 
                    background: labCart.includes(lab.key) ? '#eaf7ed' : '#f6f8fa', 
                    borderRadius: '12px',
                    border: labCart.includes(lab.key) ? '2px solid #113c1c' : '1px solid #d0d0d0', 
                    padding: '12px', 
                    boxShadow: labCart.includes(lab.key) ? '0 2px 8px rgba(17,60,28,0.07)' : 'none', 
                    transition: 'all 0.18s', 
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, marginRight: '12px' }}>
                      <Tooltip content={
                        <div style={{ 
                          width: '260px',
                          maxHeight: '320px',
                          overflowY: 'auto'
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: isMobile ? 14 : 15, color: '#113c1c' }}>{lab.label} Biomarkers:</div>
                          <ul style={{ 
                            margin: 0, 
                            paddingLeft: 16, 
                            fontSize: isMobile ? 11 : 12,
                            lineHeight: 1.4
                          }}>
                            {lab.biomarkers.map((biomarker, idx) => (
                              <li key={idx} style={{ marginBottom: 2 }}>{biomarker}</li>
                            ))}
                          </ul>
                        </div>
                      }>
                        <div style={{ cursor: 'help' }}>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: isMobile ? '14px' : '15px', 
                            color: '#113c1c', 
                            marginBottom: '4px',
                            lineHeight: '1.3'
                          }}>
                            {lab.label}
                          </div>
                          <div style={{ 
                            fontSize: isMobile ? '11px' : '12px', 
                            color: '#666', 
                            marginBottom: '6px',
                            lineHeight: '1.4'
                          }}>
                            {lab.description}
                          </div>
                          <div style={{ 
                            fontWeight: 700, 
                            fontSize: isMobile ? '16px' : '18px', 
                            color: '#113c1c'
                          }}>
                            ${(lab.price / 100).toFixed(0)}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <button
                        type="button"
                        className="lab-button"
                        onClick={() => handleLabToggle(lab.key)}
                        style={{
                          padding: isMobile ? '8px 16px' : '10px 20px',
                          fontSize: isMobile ? '12px' : '14px',
                          fontWeight: 600,
                          borderRadius: '8px',
                          background: labCart.includes(lab.key) ? 'var(--e-global-color-dark-green)' : 'var(--e-global-color-primary, #4263AE)',
                          color: '#fff',
                          border: 'none',
                          minWidth: isMobile ? '70px' : '80px',
                          boxShadow: labCart.includes(lab.key) ? '0 2px 8px rgba(17,60,28,0.10)' : '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'all 0.18s',
                          whiteSpace: 'nowrap',
                          height: isMobile ? '36px' : '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        onMouseOver={(e) => {
                          if (!labCart.includes(lab.key)) {
                            e.currentTarget.style.background = 'var(--e-global-color-primary-hover, #365a9e)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!labCart.includes(lab.key)) {
                            e.currentTarget.style.background = 'var(--e-global-color-primary, #4263AE)';
                          }
                        }}
                      >
                        {labCart.includes(lab.key) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '16px 0 10px 0' }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 700, fontSize: isMobile ? '18px' : '20px', color: 'var(--e-global-color-dark-green)' }}>{selectedPlan.displayPrice || 'Loading...'}/{selectedPlan.interval === "monthly" ? "Month" : "Year"}</span>
              <span style={{ marginLeft: 8, textDecoration: "line-through", color: "#888", fontSize: isMobile ? '14px' : '16px' }}>{selectedPlan.originalPrice}</span>
              <div style={{ color: "#666", fontSize: isMobile ? '13px' : '15px', marginTop: 4 }}>{selectedPlan.costNote}</div>
              <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '14px 0 10px 0' }} />
            </div>
            <div style={{ fontWeight: 600, fontSize: isMobile ? '15px' : '17px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
              One-Time Initial Consultation Fee 
              <span style={{ float: "right", color: '#333' }}>${(consultFee / 100).toFixed(2)}</span>
            </div>
            {labCart.length > 0 && (
              <div style={{ fontWeight: 600, fontSize: isMobile ? '15px' : '17px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
                Add-On Lab Panel
                <span style={{ float: "right", color: '#333' }}>${(labsTotal / 100).toFixed(2)}</span>
              </div>
            )}
            <div style={{ background: '#e0e0e0', height: 1, borderRadius: 1, margin: '14px 0 10px 0' }} />
            <div style={{ fontWeight: 700, fontSize: isMobile ? '20px' : '22px', marginTop: 8, color: 'var(--e-global-color-dark-green)' }}>
              Total 
              <span style={{ float: "right", color: '#113c1c' }}>${(total / 100).toFixed(2)}</span>
            </div>
            <div style={{ color: "#666", fontSize: isMobile ? '12px' : '14px', marginTop: 10, marginBottom: 2 }}>
              Membership may be cancelled without penalty before or during the Initial Consultation with the provider. After that, the Terms of Service will apply.
            </div>
            <div style={{ color: "#666", fontSize: isMobile ? '12px' : '14px', marginTop: 2 }}>
              {selectedPlan.interval === "monthly"
                ? "Monthly Recurring Total"
                : "Annual Recurring Total"}
              <span style={{ float: "right", color: '#333' }}>${(planPrice / 100).toFixed(2)}</span>
            </div>
          </>          )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
