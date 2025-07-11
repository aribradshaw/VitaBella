import { usePricing } from "@/app/checkout/hooks/usePricing";

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
