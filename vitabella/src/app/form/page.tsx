"use client";

import React, { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

import { isStateAvailable, getAvailableStates, getUnavailableStates, US_STATES } from "@/constants/states";
import links from "@/constants/links.json";
import productsData from "@/app/product/products.json";
import "./form.css";
import VitaBellaLogo from "@/components/common/VitaBellaLogo";

const recaptchaSiteKey = "6Lfy92IrAAAAADLslEBpVbu9fGpkzBdatjtcXw9C";

type FormField = {
  name: keyof typeof initialForm;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'custom-dot';
  label?: string;
  required: boolean;
  options?: string[];
  conditional?: (form: typeof initialForm) => boolean;
};

type Step = {
  label: string;
  fields: FormField[];
  onlyForWaitlist?: boolean;
};

const steps: Step[] = [
  {
    label: "Biological Sex",
    fields: [
      { name: "sex", type: "radio", options: ["Male", "Female"], required: true, label: "Sex" },
    ],
  },
  {
    label: "Your Name",
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
    ],
  },
  {
    label: "Email",
    fields: [
      { name: "email", type: "email", label: "Email", required: true },
    ],
  },
  {
    label: "Phone",
    fields: [
      { name: "phone", type: "tel", label: "Phone", required: true },
    ],
  },
  {
    label: "State",
    fields: [
      { name: "state", type: "select", label: "State", required: true },
    ],
  },
  {
    label: "Current Treatment",
    fields: [
      { name: "currentTreatment", type: "radio", label: "Are you already being treated by another clinic?", required: true, options: ["Yes", "No"] },
      { name: "currentTreatmentReason", type: "textarea", label: "Why are you looking for a new provider?", required: false, conditional: (form) => form.currentTreatment === "Yes" },
    ],
    onlyForWaitlist: false,
  },
  {
    label: "Wellness Partner Factors",
    fields: [
      { name: "factor_cost", type: "checkbox", label: "Cost", required: false },
      { name: "factor_treatment_options", type: "checkbox", label: "Treatment Options", required: false },
      { name: "factor_education", type: "checkbox", label: "Education", required: false },
      { name: "factor_convenience", type: "checkbox", label: "Convenience", required: false },
      { name: "factor_other", type: "checkbox", label: "Other", required: false },
    ],
    onlyForWaitlist: false,
  },
  {
    label: "Treatment Interests",
    fields: [
      { name: "interest_anti_aging", type: "checkbox", label: "Anti-Aging", required: false },
      { name: "interest_cognitive_health", type: "checkbox", label: "Cognitive Health", required: false },
      { name: "interest_weight_loss", type: "checkbox", label: "Weight Loss", required: false },
      { name: "interest_hair_loss", type: "checkbox", label: "Hair Loss", required: false },
      { name: "interest_hormone_therapy", type: "checkbox", label: "Hormone Therapy", required: false },
      { name: "interest_injury_recovery", type: "checkbox", label: "Injury and Recovery", required: false },
      { name: "interest_sexual_wellness", type: "checkbox", label: "Sexual Wellness", required: false },
      { name: "interest_skin_care", type: "checkbox", label: "Skin Care", required: false },
      { name: "specificProducts", type: "text", label: "Search for specific products (optional)", required: false },
    ],
    onlyForWaitlist: false,
  },
  {
    label: "Your Goals 90 Days",
    fields: [
      { name: "goals90Days", type: "textarea", label: "What are your goals for the next 90 days?", required: false },
    ],
    onlyForWaitlist: false,
  },
  {
    label: "How did you hear about us?",
    fields: [
      { name: "referral", type: "radio", label: "Referral", required: true, options: ["Google", "Instagram", "Facebook", "LinkedIn", "TikTok", "Friend / Referral", "Other"] },
      // Show a text box for Friend, with appropriate label.
      { name: "referralFriend", type: "text", label: "Who referred you? (Friend)", required: false, conditional: (form) => form.referral === "Friend / Referral" },
      { name: "referralOther", type: "text", label: "Please specify", required: false, conditional: (form) => form.referral === "Other" },
    ],
  },
  {
    label: "Consent",
    fields: [
      { name: "comms_accept", type: "checkbox", label: "I agree to receive communications", required: true },
    ],
  },
];

const initialForm = {
  sex: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  referral: "",
  referralFriend: "",
  referralDoctor: "",
  referralOther: "",
  currentTreatment: "",
  currentTreatmentReason: "",
  interest_anti_aging: false,
  interest_cognitive_health: false,
  interest_weight_loss: false,
  interest_hair_loss: false,
  interest_hormone_therapy: false,
  interest_injury_recovery: false,
  interest_sexual_wellness: false,
  interest_skin_care: false,
  specificProducts: "",
  factor_cost: false,
  factor_treatment_options: false,
  factor_education: false,
  factor_convenience: false,
  factor_other: false,
  goals90Days: "",
  comms_accept: false,
  recordSourceDetail1: "website", // hidden tracking field
};

function VitaBellaMultiStepForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  // Product search functionality
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  // --- HubSpot tracking additions ---
  const [hubspotUtk, setHubspotUtk] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [hydrated, setHydrated] = useState(false);
  React.useEffect(() => {
    // Get hubspotutk cookie
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return "";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
      return "";
    };
    setHubspotUtk(getCookie("hubspotutk"));
    setPageUrl(window.location.href);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [hydrated]);

  if (!hydrated) return null; // or a loading spinner

  // Product search functionality
  const searchProducts = (query: string) => {
    if (!query.trim()) return [];
    const lowercaseQuery = query.toLowerCase();
    return productsData
      .filter(product => product.Title && product.Status === "Active")
      .filter(product => 
        product.Title.toLowerCase().includes(lowercaseQuery) ||
        (product["Short Description"] && product["Short Description"].toLowerCase().includes(lowercaseQuery))
      )
      .slice(0, 10) // Limit to 10 suggestions
      .map(product => product.Title);
  };

  const handleProductSearch = (query: string) => {
    setProductSearchQuery(query);
    setShowProductSuggestions(query.length > 0);
  };

  const selectProduct = (productName: string) => {
    if (!selectedProducts.includes(productName)) {
      setSelectedProducts([...selectedProducts, productName]);
    }
    setProductSearchQuery("");
    setShowProductSuggestions(false);
  };

  const removeProduct = (productName: string) => {
    setSelectedProducts(selectedProducts.filter(p => p !== productName));
  };

  // Phone formatting
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 0 && val[0] === "1") val = val.slice(1);
    if (val.length > 10) val = val.slice(0, 10);
    let raw = val.length === 10 ? "+1" + val : "";
    setForm(f => ({ ...f, phone: raw }));
    // Show formatted to user as +1 (XXX) XXX-XXXX
    let formatted = "";
    if (val.length > 0) {
      formatted = "+1 ";
      if (val.length <= 3) formatted += `(${val}`;
      else if (val.length <= 6) formatted += `(${val.slice(0,3)}) ${val.slice(3)}`;
      else formatted += `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6)}`;
    }
    if (phoneInputRef.current) phoneInputRef.current.value = formatted;
  };

  // Step validation
  const validateStep = () => {
    setError("");
    for (const field of steps[step].fields) {
      if (field.conditional && !field.conditional(form)) continue;
      if (field.required) {
        if (field.type === "checkbox" && !form[field.name as keyof typeof initialForm]) return setError("Please accept to continue."), false;
        if (!form[field.name as keyof typeof initialForm] || (typeof form[field.name as keyof typeof initialForm] === "string" && (form[field.name as keyof typeof initialForm] as string).trim() === "")) {
          return setError("Please fill all required fields."), false;
        }
      }
      if (field.type === "email" && form[field.name as keyof typeof initialForm]) {
        if (!/^\S+@\S+\.\S+$/.test(form[field.name as keyof typeof initialForm] as string)) return setError("Please enter a valid email."), false;
      }
      if (field.type === "tel" && form[field.name as keyof typeof initialForm]) {
        if (!/^\+1\d{10}$/.test(form[field.name as keyof typeof initialForm] as string)) return setError("Please enter a valid US phone number."), false;
      }
    }
    return true;
  };

  // Compute if user is in a waitlist state
  const isWaitlistState = form.state && !isStateAvailable(form.state);

  // Dynamically filter steps based on state and referral
  const getActiveSteps = () => {
    return steps.filter((stepObj) => {
      // Always show the referral step (the one with referral field)
      if (stepObj.fields.some(f => f.name === "referral")) return true;
      
      // For steps with onlyForWaitlist defined, filter based on state
      if (typeof stepObj.onlyForWaitlist === 'boolean') {
        if (stepObj.onlyForWaitlist) {
          // Only show if user is in a waitlist state
          return !isStateAvailable(form.state);
        } else {
          // onlyForWaitlist: false means show for ALL users (both waitlist and accepted)
          return true;
        }
      }
      
      // For steps without onlyForWaitlist defined, show by default
      return true;
    });
  };

  const activeSteps = getActiveSteps();

  // Step navigation
  const nextStep = () => {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, activeSteps.length - 1));
  };
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
  };

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox" && "checked" in e.target) {
      checked = (e.target as HTMLInputElement).checked;
    }
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // Handle radio button changes with auto-advance for single-choice steps
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    
    // Auto-advance for single-choice radio steps
    const currentStepFields = activeSteps[step].fields;
    const radioFields = currentStepFields.filter(field => field.type === "radio");
    
    // Check if this step has conditional fields that might become visible
    const hasConditionalFields = currentStepFields.some(field => field.conditional);
    
    // If this step has only one radio field and it's required, and no conditional fields, auto-advance
    if (radioFields.length === 1 && radioFields[0].required && radioFields[0].name === name && !hasConditionalFields) {
      // Add a small delay for better UX
      setTimeout(() => {
        if (step < activeSteps.length - 1) {
          setStep(s => s + 1);
        }
      }, 300);
    }
  };

  // Determine redirect URL based on params and state
  const getRedirectUrl = (isAccepted: boolean) => {
    const l = links[0];
    if (!isAccepted) return "/postform/";
    // Get the search params as a string
    const search = typeof window !== "undefined" ? window.location.search : "";
    // Priority order: pa, pm, fa, fm (first match in URL)
    if (search.includes("?pa") || search.includes("&pa")) return l.performance.annual;
    if (search.includes("?pm") || search.includes("&pm")) return l.performance.monthly;
    if (search.includes("?fa") || search.includes("&fa")) return l.foundation.annual;
    if (search.includes("?fm") || search.includes("&fm")) return l.foundation.monthly;
    return l.acceptedfallback;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setError("");
    setLoading(true);
    const isAccepted = isStateAvailable(form.state);
    const listType = isAccepted ? "prospect" : "waitlist";

    let recaptchaToken = "";
    try {
      // Only attempt reCAPTCHA if available and site key is defined
      if (
        typeof window !== "undefined" &&
        (window as any).grecaptcha &&
        typeof recaptchaSiteKey !== "undefined" &&
        recaptchaSiteKey
      ) {
        recaptchaToken = await new Promise((resolve, reject) => {
          (window as any).grecaptcha.ready(() => {
            (window as any).grecaptcha
              .execute(recaptchaSiteKey, { action: "newsletter" })
              .then(resolve)
              .catch(reject);
          });
        });
      }
    } catch (err) {
      setError("reCAPTCHA failed to load. Please refresh and try again.");
      setLoading(false);
      return;
    }

    // Debug: Log what will be sent
    console.log("Submitting form...", {
      email: form.email,
      recaptchaToken,
      listType,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });
    // Debug: Log recaptcha token
    console.log("reCAPTCHA token:", recaptchaToken);

    // Guard: Prevent submission if missing email or recaptcha
    if (!form.email || !recaptchaToken) {
      setError("Missing email or reCAPTCHA. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Map state code to full name for legacy compatibility (do not change anything else)
      const stateFullName = (() => {
        if (!form.state) return "";
        // US_STATES is imported from constants, format: [{ code: 'CA', name: 'California' }, ...]
        const found = US_STATES.find(s => s.code === form.state);
        return found ? found.name : form.state;
      })();
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstname: form.firstName,
          lastname: form.lastName,
          gender: form.sex,
          phone: form.phone,
          state: form.state,
          referral: form.referral,
          referral___doctor_name: form.referralDoctor,
          referral___friend_name: form.referralFriend,
          currentTreatment: form.currentTreatment,
          currentTreatmentReason: form.currentTreatmentReason,
          treatmentInterests: [
            form.interest_anti_aging && "Anti-Aging",
            form.interest_cognitive_health && "Cognitive Health", 
            form.interest_weight_loss && "Weight Loss",
            form.interest_hair_loss && "Hair Loss",
            form.interest_hormone_therapy && "Hormone Therapy",
            form.interest_injury_recovery && "Injury and Recovery",
            form.interest_sexual_wellness && "Sexual Wellness",
            form.interest_skin_care && "Skin Care"
          ].filter(Boolean).join(", "),
          specificProducts: selectedProducts.join(", "),
          goals90Days: form.goals90Days,
          wellnessFactors: [
            form.factor_cost && "Cost",
            form.factor_treatment_options && "Treatment Options",
            form.factor_education && "Education", 
            form.factor_convenience && "Convenience",
            form.factor_other && "Other"
          ].filter(Boolean).join(", "),
          recaptchaToken,
          listType,
          STATE: stateFullName,
          PLATFORM_NAME: "Vita Bella Website",
          recordSourceDetail1: form.recordSourceDetail1,
          hubspotutk: hubspotUtk,
          pageUrl: pageUrl,
          utm_source: params?.get("utm_source") || "",
          utm_medium: params?.get("utm_medium") || "",
          utm_campaign: params?.get("utm_campaign") || "",
          utm_term: params?.get("utm_term") || "",
          utm_content: params?.get("utm_content") || "",
        }),
      });
      console.log("Newsletter API response status:", res.status);
      if (!res.ok) {
        const data = await res.json();
        console.error("Newsletter API error: ", data);
        const errorMsg = (data as { error?: string })?.error;
        setError(errorMsg || "Submission failed");
        setLoading(false);
        return;
      }
      // Redirect
      router.push(getRedirectUrl(isAccepted));
      // Do not setLoading(false) here, as redirect will unmount the component
    } catch (err: any) {
      setError(err?.message || "Unknown error");
      setLoading(false);
    }
    // In case redirect fails or is blocked, always clear loading after a delay
    setTimeout(() => setLoading(false), 3000);
  };

  // Handle Enter key for Next/Submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Prevent default form submit on Enter
      e.preventDefault();
      if (step < activeSteps.length - 1) {
        nextStep();
      } else {
        // On last step, submit
        (document.activeElement as HTMLElement)?.blur();
        // Let the form's onSubmit handle it
      }
    }
  };

  // Render step fields
  const renderFields = () => {
    // Custom rendering for the first step (biological sex)
    if (activeSteps[step].fields.length === 1 && activeSteps[step].fields[0].name === "sex") {
      const field = activeSteps[step].fields[0];
      // Handler for gender selection: set value and go to next step
      const handleGenderSelect = (opt: string) => {
        setForm(f => ({ ...f, sex: opt }));
        setTimeout(() => {
          setStep(s => Math.min(s + 1, activeSteps.length - 1));
        }, 100); // slight delay to allow button press effect
      };
      return (
        <>
          <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
            What is your biological sex? <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: 0, marginTop: 16, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {field.options?.map((opt: string, idx: number) => {
              const isMale = opt === "Male";
              const isSelected = form.sex === opt;
              // Only round the outer corners
              let borderRadius = '';
              if (idx === 0) borderRadius = '12px 0 0 12px';
              if (idx === 1) borderRadius = '0 12px 12px 0';
              // Always colored, only dull the unselected one if a selection is made
              const baseColor = isMale ? '#4a90e2' : '#d6456b';
              let background = baseColor;
              let color = '#fff';
              let filter = 'none';
              if (form.sex) {
                if (isSelected) {
                  background = baseColor;
                  color = '#fff';
                  filter = 'none';
                } else {
                  background = '#e6e6e6';
                  color = isMale ? '#4a90e2' : '#d6456b'; // readable text color
                  filter = 'none';
                }
              }
              // Set icon color to match text color in dulled state, otherwise white
              const iconColor = (form.sex && !isSelected) ? (isMale ? '#4a90e2' : '#d6456b') : '#fff';
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleGenderSelect(opt)}
                  className="vita-bella-gender-btn"
                  style={{
                    flex: 1,
                    background,
                    color,
                    border: 'none',
                    borderRadius,
                    padding: '32px 0',
                    fontSize: '1.35rem',
                    fontWeight: '500' as React.CSSProperties['fontWeight'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    outline: isSelected ? '2px solid #222' : 'none',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                    filter,
                  }}
                  aria-pressed={isSelected}
                >
                  <span style={{ fontSize: 28, marginRight: 16, display: 'flex', alignItems: 'center' }}>
                    {isMale ? (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="17" r="7" stroke={iconColor} strokeWidth="2"/>
                        <path d="M21 11L27 5M27 5H21M27 5V11" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="13" r="7" stroke={iconColor} strokeWidth="2"/>
                        <path d="M16 20V28M16 24H20M16 24H12" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          <div style={{ height: 'var(--space-1x, 32px)' }} />
        </>
      );
    }
    // Special layout for First Name and Last Name on the same row (step 2)
    if (
      activeSteps[step].fields.length === 2 &&
      activeSteps[step].fields[0].name === "firstName" &&
      activeSteps[step].fields[1].name === "lastName"
    ) {
      return (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="vita-bella-form-label">First Name</label>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              className="vita-bella-form-input"
              autoComplete="given-name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="vita-bella-form-label">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              className="vita-bella-form-input"
              autoComplete="family-name"
            />
          </div>
        </div>
      );
    }
    // Custom rendering for Treatment Interests step: checkboxes
    if (
      activeSteps[step].label === "Treatment Interests" &&
      activeSteps[step].fields.some(f => f.name === "interest_anti_aging")
    ) {
      return (
        <div>
          <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
            What treatments are you interested in? (Select all that apply)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_anti_aging" checked={form.interest_anti_aging} onChange={handleChange} className="vita-bella-form-checkbox" /> Anti-Aging
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_cognitive_health" checked={form.interest_cognitive_health} onChange={handleChange} className="vita-bella-form-checkbox" /> Cognitive Health
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_weight_loss" checked={form.interest_weight_loss} onChange={handleChange} className="vita-bella-form-checkbox" /> Weight Loss
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_hair_loss" checked={form.interest_hair_loss} onChange={handleChange} className="vita-bella-form-checkbox" /> Hair Loss
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_hormone_therapy" checked={form.interest_hormone_therapy} onChange={handleChange} className="vita-bella-form-checkbox" /> Hormone Therapy
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_injury_recovery" checked={form.interest_injury_recovery} onChange={handleChange} className="vita-bella-form-checkbox" /> Injury and Recovery
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_sexual_wellness" checked={form.interest_sexual_wellness} onChange={handleChange} className="vita-bella-form-checkbox" /> Sexual Wellness
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="interest_skin_care" checked={form.interest_skin_care} onChange={handleChange} className="vita-bella-form-checkbox" /> Skin Care
            </label>
          </div>
          <div style={{ position: 'relative' }}>
            <label className="vita-bella-form-label" style={{ fontSize: '1rem', marginBottom: 8, display: 'block' }}>
              Search for specific products (optional)
            </label>
            <input
              type="text"
              value={productSearchQuery}
              onChange={(e) => handleProductSearch(e.target.value)}
              placeholder="Type product names..."
              className="vita-bella-form-input"
              style={{ width: '100%' }}
            />
            {showProductSuggestions && productSearchQuery && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {searchProducts(productSearchQuery).map((product, index) => (
                  <div
                    key={index}
                    onClick={() => selectProduct(product)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    {product}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedProducts.length > 0 && (
            <div style={{ marginTop: 16, marginBottom: 24 }}>
              <label className="vita-bella-form-label" style={{ fontSize: '1rem', marginBottom: 8, display: 'block' }}>
                Selected Products:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedProducts.map((product, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#012B27',
                      color: '#fff',
                      padding: '0px 12px',
                      borderRadius: '16px',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    {product}
                    <button
                      type="button"
                      onClick={() => removeProduct(product)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        color: '#fff',
                        opacity: 0.8
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Custom rendering for Wellness Partner Factors step: checkboxes
    if (
      activeSteps[step].label === "Wellness Partner Factors" &&
      activeSteps[step].fields.some(f => f.name === "factor_cost")
    ) {
      return (
        <div>
          <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
            When selecting a wellness partner / clinic, which factor is most important? (Select all that apply)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="factor_cost" checked={form.factor_cost} onChange={handleChange} className="vita-bella-form-checkbox" /> Cost
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="factor_treatment_options" checked={form.factor_treatment_options} onChange={handleChange} className="vita-bella-form-checkbox" /> Treatment Options
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="factor_education" checked={form.factor_education} onChange={handleChange} className="vita-bella-form-checkbox" /> Education
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="factor_convenience" checked={form.factor_convenience} onChange={handleChange} className="vita-bella-form-checkbox" /> Convenience
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="factor_other" checked={form.factor_other} onChange={handleChange} className="vita-bella-form-checkbox" /> Other
            </label>
          </div>
        </div>
      );
    }
    // ...existing code for other fields...
    return activeSteps[step].fields.map(field => {
      if (field.conditional && !field.conditional(form)) return null;
      switch (field.type) {
        case "radio":
          // Special button-style rendering for referral step
          if (field.name === "referral") {
            return (
              <div key={field.name}>
                <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
                  {activeSteps[step].label}
                </label>
                <div className="vita-bella-form-button-group">
                  {field.options?.map((opt: string) => (
                    <label key={opt} className="vita-bella-form-button-label">
                      <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        checked={form[field.name as keyof typeof initialForm] === opt}
                        onChange={handleRadioChange}
                        required={field.required}
                        className="vita-bella-form-button-radio"
                      />
                      <span className="vita-bella-form-button-display">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          }
          // Regular radio button rendering for other fields
          return (
            <div key={field.name} className="vita-bella-form-radio-group" style={{ marginBottom: 24 }}>
              {field.label && (
                <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
                  {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                </label>
              )}
              {field.options?.map((opt: string) => (
                <label key={opt} className="vita-bella-form-label">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={form[field.name as keyof typeof initialForm] === opt}
                    onChange={handleRadioChange}
                    required={field.required}
                    className="vita-bella-form-radio"
                  />
                  {opt}
                </label>
              ))}
            </div>
          );
        case "checkbox":
          return (
            <div key={field.name} style={{ marginBottom: 24 }}>
              <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
                {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!form[field.name as keyof typeof initialForm]}
                  onChange={handleChange}
                  required={field.required}
                  className="vita-bella-form-checkbox"
                />
                Yes
              </label>
            </div>
          );
        case "select":
          if (field.name === "state") {
            // Alphabetical order, no waitlist label
            const allStates = [...US_STATES].sort((a, b) => a.name.localeCompare(b.name));
            return (
              <div key={field.name}>
                <label className="vita-bella-form-label">State</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="vita-bella-form-select"
                >
                  <option value="">Select your state</option>
                  {allStates.map(s => (
                    <option key={s.code} value={s.code}>{s.name}</option>
                  ))}
                </select>
              </div>
            );
          }
          // For activity select, use the same rendering as other selects
          return (
            <div key={field.name}>
              <label className="vita-bella-form-label">{field.label}</label>
              <select
                name={field.name}
                value={form[field.name as keyof typeof initialForm] as string}
                onChange={handleChange}
                required={field.required}
                className="vita-bella-form-select"
              >
                <option value="">Select</option>
                {field.options?.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        case "textarea":
          return (
            <div key={field.name} style={{ marginBottom: 24 }}>
              <label className="vita-bella-form-label">{field.label}</label>
              <textarea
                name={field.name}
                value={form[field.name as keyof typeof initialForm] as string}
                onChange={handleChange}
                required={field.required}
                className="vita-bella-form-textarea"
              />
            </div>
          );
        case "tel":
          return (
            <div key={field.name}>
              <label className="vita-bella-form-label">{field.label}</label>
              <input
                name={field.name}
                type="tel"
                ref={phoneInputRef}
                onInput={handlePhoneInput}
                required={field.required}
                className="vita-bella-form-input"
                defaultValue={form.phone}
              />
            </div>
          );
        default:
          return (
            <div key={field.name}>
              <label className="vita-bella-form-label">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={form[field.name as keyof typeof initialForm] as string}
                onChange={handleChange}
                required={field.required}
                className="vita-bella-form-input"
              />
            </div>
          );
      }
    });
  };

  return (
    <div className="vita-bella-form-wrapper" id="vita-bella-form">
      <form onSubmit={handleSubmit} id="vita-bella-form" className="vita-bella-form-container" autoComplete="off" onKeyDown={handleKeyDown}>
        {/* Hidden tracking field for analytics/source attribution */}
        <input type="hidden" name="recordSourceDetail1" value={form.recordSourceDetail1} />
        <div className="vita-bella-form-logo" style={{textAlign: 'center', marginBottom: 16}}>
          <VitaBellaLogo style={{maxWidth: 180, margin: '0 auto'}} />
        </div>
        <div className="vita-bella-form-step active">
          {renderFields()}
          {error && <div className="vita-bella-form-error">{error}</div>}
          <div className="vita-bella-form-btn-row">
            {step > 0 && (
              <button type="button" className="vb-form-btn" onClick={prevStep} disabled={loading}>
                Previous
              </button>
            )}
            {step < activeSteps.length - 1 && (
              <button type="button" className="vb-form-btn" onClick={nextStep} disabled={loading}>
                Next
              </button>
            )}
            {step === activeSteps.length - 1 && (
              <button type="submit" className="vb-form-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <span className="vita-bella-form-step-indicator" style={{ color: '#888', fontSize: 14 }}>
              Step {step + 1}
            </span>
          </div>
        </div>
      </form>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
        strategy="afterInteractive"
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <VitaBellaMultiStepForm />
    </Suspense>
  );
}