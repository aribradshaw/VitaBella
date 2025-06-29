"use client";

import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { isStateAvailable, getAvailableStates, getUnavailableStates, US_STATES } from "@/constants/states";
import links from "@/constants/links.json";
import "./form.css";
import VitaBellaLogo from "@/components/common/VitaBellaLogo";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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
    label: "How did you hear about us?",
    fields: [
      { name: "referral", type: "select", label: "Referral", required: true, options: ["Friend", "Doctor", "Online", "Other"] },
      { name: "referralOther", type: "text", label: "Please specify", required: false, conditional: (form) => form.referral === "Other" },
    ],
  },
  {
    label: "Your Goals",
    fields: [
      { name: "goal_energy", type: "checkbox", label: "Increase Energy Levels", required: false },
      { name: "goal_mental", type: "checkbox", label: "Improve Mental Clarity", required: false },
      { name: "goal_performance", type: "checkbox", label: "Enhance Physical Performance", required: false },
      { name: "goal_hormones", type: "checkbox", label: "Balance Hormones", required: false },
      { name: "goal_sleep", type: "checkbox", label: "Optimize Sleep Clarity", required: false },
      { name: "goal_weight", type: "checkbox", label: "Lose Weight", required: false },
      { name: "goals", type: "textarea", label: "What are your primary health goals for the next 90 days?", required: false },
    ],
    onlyForWaitlist: true,
  },
  {
    label: "Objectives",
    fields: [
      { name: "obj_cognitive", type: "checkbox", label: "Maintain peak cognitive performance", required: false },
      { name: "obj_fitness", type: "checkbox", label: "Achieve optimal physical fitness", required: false },
      { name: "obj_longevity", type: "checkbox", label: "Support longevity and healthy aging", required: false },
      { name: "obj_prevent", type: "checkbox", label: "Prevent age-related decline", required: false },
      { name: "obj_career", type: "checkbox", label: "Maintain career performance edge", required: false },
      { name: "obj_hormone", type: "checkbox", label: "Support long-term hormone balance", required: false },
      { name: "obj_other", type: "checkbox", label: "Other", required: false },
      { name: "objectives", type: "textarea", label: "What are your long-term (1+ year) health objectives?", required: false },
    ],
    onlyForWaitlist: true,
  },
  {
    label: "Activity",
    fields: [
      {
        name: "activity",
        type: "select",
        label: "How often do you engage in physical activity?",
        required: true,
        options: [
          "Never",
          "Rarely (1-2x/month)",
          "Occasionally (1-2x/week)",
          "Regularly (3-4x/week)",
          "Daily",
          "Other"
        ]
      },
      {
        name: "activityOther",
        type: "text",
        label: "Please elaborate (optional)",
        required: false,
        conditional: (form) => form.activity === "Other"
      },
    ],
    onlyForWaitlist: true,
  },
  {
    label: "Stress",
    fields: [
      {
        name: "stress",
        type: "select",
        label: "How often do you experience stress?",
        required: true,
        options: [
          "Never",
          "Rarely",
          "Occasionally",
          "Regularly",
          "Daily"
        ]
      },
    ],
    onlyForWaitlist: true,
  },
  {
    label: "Eating",
    fields: [
      {
        name: "eating",
        type: "custom-dot",
        label: "How would you rate your overall eating habits?",
        required: true
      },
    ],
    onlyForWaitlist: true,
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
  referralOther: "",
  goal_energy: false,
  goal_mental: false,
  goal_performance: false,
  goal_hormones: false,
  goal_sleep: false,
  goal_weight: false,
  obj_cognitive: false,
  obj_fitness: false,
  obj_longevity: false,
  obj_prevent: false,
  obj_career: false,
  obj_hormone: false,
  obj_other: false,
  goals: "",
  objectives: "",
  activity: "",
  activityOther: "",
  stress: "",
  eating: "",
  comms_accept: false,
};

function VitaBellaMultiStepForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

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
    // Always show referral step, even for waitlist
    return steps.filter((stepObj) => {
      // Always show the referral step (the one with referral field)
      if (stepObj.fields.some(f => f.name === "referral")) return true;
      // Only show referralOther if referral is Other
      if (stepObj.fields.some(f => f.name === "referralOther")) {
        return form.referral === "Other";
      }
      // For all other steps, show only if onlyForWaitlist matches state availability
      if (typeof stepObj.onlyForWaitlist === 'boolean') {
        if (stepObj.onlyForWaitlist) {
          // Only show if user is in a waitlist state
          return !isStateAvailable(form.state);
        } else {
          // Only show if user is in an accepted state
          return isStateAvailable(form.state);
        }
      }
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

  // Determine redirect URL based on params and state
  const getRedirectUrl = (isAccepted: boolean) => {
    const l = links[0];
    if (!isAccepted) return l.waitlist;
    if (params && params.get && params.get("fm")) return l.foundation.monthly;
    if (params && params.get && params.get("fa")) return l.foundation.annual;
    if (params && params.get && params.get("pm")) return l.performance.monthly;
    if (params && params.get && params.get("pa")) return l.performance.annual;
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

    try {
      // Use the newsletter API route for all form submissions
      console.log("Submitting form...", { email: form.email, listType });
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          recaptchaToken,
          listType,
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
    // Custom rendering for Your Goals step: checkboxes + textarea with label
    if (
      activeSteps[step].label === "Your Goals" &&
      activeSteps[step].fields.some(f => f.name === "goal_energy")
    ) {
      return (
        <div>
          <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
            What are your primary health goals for the next 90 days?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_energy" checked={form.goal_energy} onChange={handleChange} className="vita-bella-form-checkbox" /> Increase Energy Levels
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_mental" checked={form.goal_mental} onChange={handleChange} className="vita-bella-form-checkbox" /> Improve Mental Clarity
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_performance" checked={form.goal_performance} onChange={handleChange} className="vita-bella-form-checkbox" /> Enhance Physical Performance
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_hormones" checked={form.goal_hormones} onChange={handleChange} className="vita-bella-form-checkbox" /> Balance Hormones
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_sleep" checked={form.goal_sleep} onChange={handleChange} className="vita-bella-form-checkbox" /> Optimize Sleep Clarity
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="goal_weight" checked={form.goal_weight} onChange={handleChange} className="vita-bella-form-checkbox" /> Lose Weight
            </label>
          </div>
          <div>
            <label className="vita-bella-form-label">Please elaborate (optional)</label>
            <textarea
              name="goals"
              value={form.goals}
              onChange={handleChange}
              className="vita-bella-form-textarea"
              style={{ minHeight: 80 }}
            />
          </div>
        </div>
      );
    }
    // Custom rendering for Objectives step: checkboxes + textarea with label
    if (
      activeSteps[step].label === "Objectives" &&
      activeSteps[step].fields.some(f => f.name === "obj_cognitive")
    ) {
      return (
        <div>
          <label className="vita-bella-form-label" style={{ fontWeight: "bold", color: '#1a3b2a', fontSize: '1.15rem', marginBottom: 16, display: 'block' }}>
            What are your long-term (1+ year) health objectives?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_cognitive" checked={form.obj_cognitive} onChange={handleChange} className="vita-bella-form-checkbox" /> Maintain peak cognitive performance
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_fitness" checked={form.obj_fitness} onChange={handleChange} className="vita-bella-form-checkbox" /> Achieve optimal physical fitness
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_longevity" checked={form.obj_longevity} onChange={handleChange} className="vita-bella-form-checkbox" /> Support longevity and healthy aging
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_prevent" checked={form.obj_prevent} onChange={handleChange} className="vita-bella-form-checkbox" /> Prevent age-related decline
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_career" checked={form.obj_career} onChange={handleChange} className="vita-bella-form-checkbox" /> Maintain career performance edge
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_hormone" checked={form.obj_hormone} onChange={handleChange} className="vita-bella-form-checkbox" /> Support long-term hormone balance
            </label>
            <label className="vita-bella-form-label">
              <input type="checkbox" name="obj_other" checked={form.obj_other} onChange={handleChange} className="vita-bella-form-checkbox" /> Other
            </label>
          </div>
          <div>
            <label className="vita-bella-form-label">Please elaborate (optional)</label>
            <textarea
              name="objectives"
              value={form.objectives}
              onChange={handleChange}
              className="vita-bella-form-textarea"
              style={{ minHeight: 80 }}
            />
          </div>
        </div>
      );
    }
    // ...existing code for other fields...
    return activeSteps[step].fields.map(field => {
      if (field.conditional && !field.conditional(form)) return null;
      // Special case: Activity step, show textarea if 'Other' is selected
      if (field.name === "activityOther") {
        return (
          <div key="activityOther">
            <label className="vita-bella-form-label">{field.label}</label>
            <textarea
              name="activityOther"
              value={form.activityOther}
              onChange={handleChange}
              className="vita-bella-form-textarea"
              style={{ minHeight: 80 }}
            />
          </div>
        );
      }
      // Custom horizontal dot selector for eating habits
      if (field.type === "custom-dot" && field.name === "eating") {
        // Use global colors from :root
        const colorSelected = 'var(--e-global-color-dark-green)';
        const colorUnselected = 'var(--e-global-color-off-white)';
        const colorDotSelected = 'var(--e-global-color-green)';
        const colorDotUnselected = 'var(--e-global-color-grey2)';
        const colorOutline = 'var(--e-global-color-green)';
        return (
          <div key="eating" style={{ marginBottom: 24 }}>
            <label className="vita-bella-form-label" style={{ display: 'block', marginBottom: 12, fontWeight: "bold", color: 'var(--e-global-color-dark-green)', fontSize: '1.15rem' }}>{field.label}</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
              {[0,1,2,3,4,5].map((val) => {
                const isSelected = form.eating === val.toString();
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, eating: val.toString() }))}
                    aria-label={
                      val === 0 ? '0 - Poor / Mostly junk food' :
                      val === 5 ? '5 - Excellent / Whole foods' :
                      val.toString()
                    }
                    style={{
                      background: isSelected ? colorSelected : colorUnselected,
                      border: 'none',
                      borderRadius: '50%',
                      width: 38,
                      height: 38,
                      minWidth: 38,
                      minHeight: 38,
                      maxWidth: 38,
                      maxHeight: 38,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      outline: isSelected ? `2.5px solid ${colorOutline}` : 'none',
                      boxShadow: isSelected ? '0 2px 8px rgba(44,60,50,0.10)' : 'none',
                      transition: 'background 0.2s, outline 0.2s',
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: isSelected ? colorDotSelected : colorDotUnselected,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'var(--e-global-color-dark-green)' : '#fff',
                        fontWeight: '700' as React.CSSProperties['fontWeight'],
                        fontSize: 14,
                        transition: 'background 0.2s, color 0.2s',
                        userSelect: 'none',
                      }}
                    >
                      {val}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, color: '#888', fontWeight: '500' as React.CSSProperties['fontWeight'] }}>
              <span>0 - Poor / Mostly junk food</span>
              <span>5 - Excellent / Whole foods</span>
            </div>
            {field.required && !form.eating && (
              <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>Please select a rating.</div>
            )}
          </div>
        );
      }
      switch (field.type) {
        case "radio":
          return (
            <div key={field.name} className="vita-bella-form-radio-group">
              {field.options?.map((opt: string) => (
                <label key={opt} className="vita-bella-form-label">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={form[field.name as keyof typeof initialForm] === opt}
                    onChange={handleChange}
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
            <label key={field.name} className="vita-bella-form-label">
              <input
                type="checkbox"
                name={field.name}
                checked={!!form[field.name as keyof typeof initialForm]}
                onChange={handleChange}
                required={field.required}
                className="vita-bella-form-checkbox"
              />
              {field.label}
            </label>
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
            <div key={field.name}>
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
    <div className="vita-bella-form-wrapper">
      <form onSubmit={handleSubmit} className="vita-bella-form-container" autoComplete="off">
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
