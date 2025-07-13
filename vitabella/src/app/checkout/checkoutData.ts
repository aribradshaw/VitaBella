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

const labPanelConfigs: LabPanelConfig[] = [
  {
    key: "comprehensive",
    label: "Comprehensive Lab Panel",
    priceId: "price_1RJeXBBvA5MJ1guPhCQ085BJ",
    productId: "prod_SE6kLiJPvBdwM3", // Comprehensive Lab Panel product ID
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
    priceId: "price_1RiL5IBvA5MJ1guPstuqR3K6",
    productId: "prod_SE6pUSuL6SlyTO", // Essential Lab Panel product ID
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

// For backwards compatibility, export the configs
export const labPanels: LabPanel[] = labPanelConfigs.map(config => ({
  ...config,
  price: 0, // This will be replaced by real pricing when usePricing is available
}));

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
    productId: "prod_OIDRrElrLen7nX",
    type: "performance",
    interval: "monthly",
    priceId: "price_1NVd0PBvA5MJ1guPw1S9W0l7", // Performance Monthly
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
    consultFeeProductId: "prod_Pz9kGSiZJzDjPZ", // Correct consultation fee product ID
    originalPrice: "$215",
    costNote: "+ cost of medication"
  },
  {
    key: "pa",
    label: "Performance",
    productId: "prod_OIDRrElrLen7nX",
    type: "performance",
    interval: "annual",
    priceId: "price_1NVd0PBvA5MJ1guPfSpSCuNV", // Performance Annual
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
    consultFeeProductId: "prod_Pz9kGSiZJzDjPZ", // Correct consultation fee product ID
    originalPrice: "$2,148",
    costNote: "+ cost of medication"
  },
  {
    key: "fm",
    label: "Foundation",
    productId: "prod_OIDPSWrTDlW8WL",
    type: "foundation",
    interval: "monthly",
    priceId: "price_1NVcyrBvA5MJ1guP5ywam4pb", // Foundation Monthly
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    consultFeeProductId: "prod_Pz9kGSiZJzDjPZ", // Correct consultation fee product ID
    originalPrice: "$120",
    costNote: "+ cost of medication"
  },
  {
    key: "fa",
    label: "Foundation",
    productId: "prod_OIDPSWrTDlW8WL",
    type: "foundation",
    interval: "annual",
    priceId: "price_1NVcyrBvA5MJ1guPHxRiZbYe", // Foundation Annual
    description: [
      "Quarterly Telehealth Visits with Your Provider.",
      "Personalized Protocols & Care Plans by Provider",
      "Secure Messaging with Provider & Your Care Team",
      "24/7 Access to Patient Portal"
    ],
    consultFeePriceId: "price_1P9BRBBvA5MJ1guP0XFZCpjh",
    consultFeeProductId: "prod_Pz9kGSiZJzDjPZ", // Correct consultation fee product ID
    originalPrice: "$1,188",
    costNote: "+ cost of medication"
  },
];
