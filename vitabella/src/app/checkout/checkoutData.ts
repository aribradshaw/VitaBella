import { usePricing, formatPrice } from "@/app/checkout/hooks/usePricing";

export interface LabPanelConfig {
  key: string;
  label: string;
  priceId: string;
  productId: string;
  description: string;
  biomarkers: string[];
}

export interface LabPanel extends LabPanelConfig {
  price: number;
}

export interface PlanConfig {
  key: string;
  label: string;
  productId: string;
  type: string;
  interval: string;
  priceId: string;
  description: string[];
  consultFeePriceId: string;
  consultFeeProductId: string;
  originalPrice: string;
  costNote: string;
}

export interface Plan extends PlanConfig {
  price: number;
  consultFee: number;
  displayPrice: string;
}

// Auto-detect test vs live mode from public environment variables
// Use public environment variables that are safe to expose to the browser
const isProduction = process.env.NODE_ENV === 'production' || 
                    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

// Use a public environment variable to determine Stripe mode
// This should be set in your Vercel environment variables
const stripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE || 'test';
const isTestMode = stripeMode === 'test';

// If no explicit mode is set, fall back to environment-based detection
// In production, default to live mode unless explicitly set to test
const finalIsTestMode = process.env.NEXT_PUBLIC_STRIPE_MODE 
  ? stripeMode === 'test'
  : !isProduction;

// Helper function to get price/product IDs based on current mode
const getStripeId = (testId: string, liveId: string) => {
  return finalIsTestMode ? testId : liveId;
};

// Get environment variables with fallback
const getEnvVar = (key: string, fallback: string = '') => {
  return process.env[key] || fallback;
};

const labPanelConfigs: LabPanelConfig[] = [
  {
    key: "comprehensive",
    label: "Comprehensive Lab Panel",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_COMPREHENSIVE_LAB', 'price_1Rka5sQx05mO0IRP0S1bYVEi'),
      getEnvVar('STRIPE_LIVE_COMPREHENSIVE_LAB', 'price_1RJeXBBvA5MJ1guPhCQ085BJ')
    ),
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_COMPREHENSIVE_LAB_PRODUCT', 'prod_Sfvx8BDGIXSFDR'),
      getEnvVar('STRIPE_LIVE_COMPREHENSIVE_LAB_PRODUCT', 'prod_SE6kLiJPvBdwM3')
    ),
    description: "Includes 50 Blood Biomarkers for Advanced Health Review",
    biomarkers: [
      "Complete Blood Count (CBC) w/ Platelet",
      "Comprehensive Metabolic Panel (CMP)",
      "Dehydroepiandrosterone (DHEA-Sulfate)",
      "Estradiol",
      "Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH)",
      "Free and Total Testosterone",
      "hCG, Qualitative, Urine (Female only)",
      "Hemoglobin A1c",
      "Homocysteine",
      "Insulin-like Growth Factor 1 (IGF-1)",
      "Lipid Panel",
      "Prolactin",
      "Prostate Specific Antigen (PSA) (Male only)",
      "Sex Hormone Binding Globulin (SHBG)",
      "Thyroid Stimulating Hormone (TSH)",
      "Vitamin D 25-Hydroxy"
    ]
  },
  {
    key: "essential",
    label: "Essential Lab Panel",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_ESSENTIAL_LAB', 'price_1Rka5YQx05mO0IRPHYvW6CEO'),
      getEnvVar('STRIPE_LIVE_ESSENTIAL_LAB', 'price_1RiL5IBvA5MJ1guPstuqR3K6')
    ),
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_ESSENTIAL_LAB_PRODUCT', 'prod_SfvxbjWBo9rlvG'),
      getEnvVar('STRIPE_LIVE_ESSENTIAL_LAB_PRODUCT', 'prod_SE6pUSuL6SlyTO')
    ),
    description: "Includes 34+ Blood Biomarkers for Basic Health Review",
    biomarkers: [
      "Complete Blood Count (CBC) w/ Platelet",
      "Comprehensive Metabolic Panel (CMP)",
      "Estradiol",
      "Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH)",
      "Free and Total Testosterone",
      "Lipid Panel",
      "Prolactin",
      "Prostate Specific Antigen (PSA)",
      "Sex Hormone Binding Globulin (SHBG)"
    ]
  }
];

// Hook to get plans with real pricing
export function usePlans(): { plans: Plan[]; loading: boolean; error: string | null } {
  const { prices, loading, error } = usePricing();
  
  const plans: Plan[] = planConfigs.map(config => ({
    ...config,
    price: prices?.get(config.priceId)?.unit_amount || 0,
    consultFee: prices?.get(config.consultFeePriceId)?.unit_amount || 0,
    displayPrice: formatPrice(prices?.get(config.priceId)?.unit_amount || 0),
  }));

  return { plans, loading, error };
}

// Hook to get lab panels with real pricing
export function useLabPanels(): { labPanels: LabPanel[]; loading: boolean; error: string | null } {
  const { prices, loading, error } = usePricing();
  
  const labPanels: LabPanel[] = labPanelConfigs.map(config => ({
    ...config,
    price: prices?.get(config.priceId)?.unit_amount || 0 ,
  }));

  return { labPanels, loading, error };
}

export function getSelectedPlan(searchParams: URLSearchParams, plans: any[]) {
  for (const plan of plans) {
    if (searchParams.has(plan.key) && plan.priceId) return plan;
  }
  return null;
}

export function getPlanGroup(searchParams: URLSearchParams) {
  if (searchParams.has("pm") || searchParams.has("pa")) return "performance";
  if (searchParams.has("fm") || searchParams.has("fa")) return "foundation";
  return null;
}

export const planConfigs: PlanConfig[] = [
  {
    key: "pm",
    label: "Performance",
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_PERFORMANCE_PRODUCT', 'prod_SfvwC34kWKAp5N'),
      getEnvVar('STRIPE_LIVE_PERFORMANCE_PRODUCT', 'prod_OIDRrElrLen7nX')
    ),
    type: "performance",
    interval: "monthly",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_PERFORMANCE_MONTHLY', 'price_1Rka4WQx05mO0IRPeQ935M33'),
      getEnvVar('STRIPE_LIVE_PERFORMANCE_MONTHLY', 'price_1NVd0PBvA5MJ1guPw1S9W0l7')
    ),
    description: [
      "Access to wholesale-priced medication (membership-only pricing)",
      "Quarterly Telehealth Visits with a Provider",
      "Personalized Protocols & Treatment Plans by Provider",
      "Secure 24/7 Access to Patient Portal & Care Team",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION', 'price_1Rka5KQx05mO0IRPFhhKj8w7'),
      getEnvVar('STRIPE_LIVE_CONSULTATION', 'price_1P8pSTBvA5MJ1guP2rLedmQv')
    ),
    consultFeeProductId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION_PRODUCT', 'prod_SfvxHHLilZxsCi'),
      getEnvVar('STRIPE_LIVE_CONSULTATION_PRODUCT', 'prod_OIF25lBLguso25')
    ),
    originalPrice: "$215",
    costNote: "+ cost of medication"
  },
  {
    key: "pa",
    label: "Performance",
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_PERFORMANCE_PRODUCT', 'prod_SfvwC34kWKAp5N'),
      getEnvVar('STRIPE_LIVE_PERFORMANCE_PRODUCT', 'prod_OIDRrElrLen7nX')
    ),
    type: "performance",
    interval: "annual",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_PERFORMANCE_ANNUAL', 'price_1Rka4oQx05mO0IRPS40wBjhk'),
      getEnvVar('STRIPE_LIVE_PERFORMANCE_ANNUAL', 'price_1NVd0PBvA5MJ1guPfSpSCuNV')
    ),
    description: [
      "Access to wholesale-priced medication (membership-only pricing)",
      "Quarterly Telehealth Visits with a Provider",
      "Personalized Protocols & Treatment Plans by Provider",
      "Secure 24/7 Access to Patient Portal & Care Team",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION', 'price_1Rka5KQx05mO0IRPFhhKj8w7'),
      getEnvVar('STRIPE_LIVE_CONSULTATION', 'price_1P8pSTBvA5MJ1guP2rLedmQv')
    ),
    consultFeeProductId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION_PRODUCT', 'prod_SfvxHHLilZxsCi'),
      getEnvVar('STRIPE_LIVE_CONSULTATION_PRODUCT', 'prod_OIF25lBLguso25')
    ),
    originalPrice: "$2,148",
    costNote: "+ cost of medication"
  },
  {
    key: "fm",
    label: "Foundation",
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_FOUNDATION_PRODUCT', 'prod_SfvuINIgpFeGBr'),
      getEnvVar('STRIPE_LIVE_FOUNDATION_PRODUCT', 'prod_OIDPSWrTDlW8WL')
    ),
    type: "foundation",
    interval: "monthly",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_FOUNDATION_MONTHLY', 'price_1Rka35Qx05mO0IRPiMy7NoF3'),
      getEnvVar('STRIPE_LIVE_FOUNDATION_MONTHLY', 'price_1NVcyrBvA5MJ1guP5ywam4pb')
    ),
    description: [
      "Access to wholesale-priced medication (membership-only pricing)",
      "Quarterly Telehealth Visits with a Provider",
      "Personalized Protocols & Treatment Plans by Provider",
      "Secure 24/7 Access to Patient Portal & Care Team",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION', 'price_1Rka5KQx05mO0IRPFhhKj8w7'),
      getEnvVar('STRIPE_LIVE_CONSULTATION', 'price_1P8pSTBvA5MJ1guP2rLedmQv')
    ),
    consultFeeProductId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION_PRODUCT', 'prod_SfvxHHLilZxsCi'),
      getEnvVar('STRIPE_LIVE_CONSULTATION_PRODUCT', 'prod_OIF25lBLguso25')
    ),
    originalPrice: "$120",
    costNote: "+ cost of medication"
  },
  {
    key: "fa",
    label: "Foundation",
    productId: getStripeId(
      getEnvVar('STRIPE_TEST_FOUNDATION_PRODUCT', 'prod_SfvuINIgpFeGBr'),
      getEnvVar('STRIPE_LIVE_FOUNDATION_PRODUCT', 'prod_OIDPSWrTDlW8WL')
    ),
    type: "foundation",
    interval: "annual",
    priceId: getStripeId(
      getEnvVar('STRIPE_TEST_FOUNDATION_ANNUAL', 'price_1Rka3uQx05mO0IRPGbtjrrLz'),
      getEnvVar('STRIPE_LIVE_FOUNDATION_ANNUAL', 'price_1NVcyrBvA5MJ1guPHxRiZbYe')
    ),
    description: [
      "Access to wholesale-priced medication (membership-only pricing)",
      "Quarterly Telehealth Visits with a Provider",
      "Personalized Protocols & Treatment Plans by Provider",
      "Secure 24/7 Access to Patient Portal & Care Team",
      "Protocol-Based Supplies Included",
      "Ongoing Coaching & Education"
    ],
    consultFeePriceId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION', 'price_1Rka5KQx05mO0IRPFhhKj8w7'),
      getEnvVar('STRIPE_LIVE_CONSULTATION', 'price_1P8pSTBvA5MJ1guP2rLedmQv')
    ),
    consultFeeProductId: getStripeId(
      getEnvVar('STRIPE_TEST_CONSULTATION_PRODUCT', 'prod_SfvxHHLilZxsCi'),
      getEnvVar('STRIPE_LIVE_CONSULTATION_PRODUCT', 'prod_OIF25lBLguso25')
    ),
    originalPrice: "$1,188",
    costNote: "+ cost of medication"
  },
];

// Add debugging info
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'unknown'}`);
console.log(`🚀 Vercel Env: ${process.env.NEXT_PUBLIC_VERCEL_ENV || 'local'}`);
console.log(`🎯 Stripe Mode Setting: ${stripeMode}`);
console.log(`🔧 Stripe Mode: ${finalIsTestMode ? 'TEST' : 'LIVE'}`);
console.log(`🔑 Using ${finalIsTestMode ? 'test' : 'live'} price IDs`);
console.log(`🎯 Production Mode: ${isProduction}`);

// For backwards compatibility, export the configs
export const labPanels: LabPanel[] = labPanelConfigs.map(config => ({
  ...config,
  price: 0, // This will be replaced by real pricing when usePricing is available
}));
