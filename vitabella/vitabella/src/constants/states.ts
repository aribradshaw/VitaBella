export interface State {
  code: string;
  name: string;
  isAvailable: boolean;
  region?: 'northeast' | 'southeast' | 'midwest' | 'southwest' | 'west';
  notes?: string; // For restrictions like "no reviverx"
}

export const US_STATES: State[] = [
  // Available states based on image (updated 06/16/25)
  { code: 'AZ', name: 'Arizona', isAvailable: true, region: 'southwest' },
  { code: 'CO', name: 'Colorado', isAvailable: true, region: 'west' },
  { code: 'DC', name: 'District of Columbia', isAvailable: true, region: 'northeast' },
  { code: 'DE', name: 'Delaware', isAvailable: true, region: 'northeast' },
  { code: 'FL', name: 'Florida', isAvailable: true, region: 'southeast' },
  { code: 'GA', name: 'Georgia', isAvailable: true, region: 'southeast' },
  { code: 'IA', name: 'Iowa', isAvailable: true, region: 'midwest' },
  { code: 'ID', name: 'Idaho', isAvailable: true, region: 'west' },
  { code: 'IL', name: 'Illinois', isAvailable: true, region: 'midwest' },
  { code: 'IN', name: 'Indiana', isAvailable: true, region: 'midwest' },
  { code: 'KY', name: 'Kentucky', isAvailable: true, region: 'southeast', notes: 'no reviverx' },
  { code: 'LA', name: 'Louisiana', isAvailable: true, region: 'southeast' },
  { code: 'MD', name: 'Maryland', isAvailable: true, region: 'northeast' },
  { code: 'ME', name: 'Maine', isAvailable: true, region: 'northeast' },
  { code: 'MO', name: 'Missouri', isAvailable: true, region: 'midwest' },
  { code: 'MT', name: 'Montana', isAvailable: true, region: 'west', notes: 'no reviverx' },
  { code: 'ND', name: 'North Dakota', isAvailable: true, region: 'midwest' },
  { code: 'NE', name: 'Nebraska', isAvailable: true, region: 'midwest' },
  { code: 'NM', name: 'New Mexico', isAvailable: true, region: 'southwest' },
  { code: 'NV', name: 'Nevada', isAvailable: true, region: 'west' },
  { code: 'NY', name: 'New York', isAvailable: true, region: 'northeast' },
  { code: 'OH', name: 'Ohio', isAvailable: true, region: 'midwest' },
  { code: 'OK', name: 'Oklahoma', isAvailable: true, region: 'southwest' },
  { code: 'OR', name: 'Oregon', isAvailable: true, region: 'west' },
  { code: 'SD', name: 'South Dakota', isAvailable: true, region: 'midwest' },
  { code: 'TN', name: 'Tennessee', isAvailable: true, region: 'southeast' },
  { code: 'TX', name: 'Texas', isAvailable: true, region: 'southwest' },
  { code: 'UT', name: 'Utah', isAvailable: true, region: 'west' },
  { code: 'VA', name: 'Virginia', isAvailable: true, region: 'southeast' },
  { code: 'VT', name: 'Vermont', isAvailable: true, region: 'northeast' },
  { code: 'WA', name: 'Washington', isAvailable: true, region: 'west' },
  { code: 'WI', name: 'Wisconsin', isAvailable: true, region: 'midwest' },
    // Unavailable states
  { code: 'AK', name: 'Alaska', isAvailable: false, region: 'west' },
  { code: 'AL', name: 'Alabama', isAvailable: false, region: 'southeast' },
  { code: 'AR', name: 'Arkansas', isAvailable: false, region: 'southeast' },
  { code: 'CA', name: 'California', isAvailable: false, region: 'west' },
  { code: 'CT', name: 'Connecticut', isAvailable: false, region: 'northeast' },
  { code: 'HI', name: 'Hawaii', isAvailable: false, region: 'west' },
  { code: 'KS', name: 'Kansas', isAvailable: false, region: 'midwest' },
  { code: 'MA', name: 'Massachusetts', isAvailable: false, region: 'northeast' },
  { code: 'MI', name: 'Michigan', isAvailable: false, region: 'midwest' },
  { code: 'MN', name: 'Minnesota', isAvailable: false, region: 'midwest' },
  { code: 'MS', name: 'Mississippi', isAvailable: false, region: 'southeast' },
  { code: 'NC', name: 'North Carolina', isAvailable: false, region: 'southeast' },
  { code: 'NH', name: 'New Hampshire', isAvailable: false, region: 'northeast' },
  { code: 'NJ', name: 'New Jersey', isAvailable: false, region: 'northeast' },
  { code: 'PA', name: 'Pennsylvania', isAvailable: false, region: 'northeast' },
  { code: 'RI', name: 'Rhode Island', isAvailable: false, region: 'northeast' },
  { code: 'SC', name: 'South Carolina', isAvailable: false, region: 'southeast' },
  { code: 'WV', name: 'West Virginia', isAvailable: false, region: 'southeast' },
  { code: 'WY', name: 'Wyoming', isAvailable: false, region: 'west' },
];

// Helper functions
export const getAvailableStates = (): State[] => {
  return US_STATES.filter(state => state.isAvailable);
};

export const getUnavailableStates = (): State[] => {
  return US_STATES.filter(state => !state.isAvailable);
};

export const getStateByCode = (code: string): State | undefined => {
  return US_STATES.find(state => state.code === code);
};

export const isStateAvailable = (code: string): boolean => {
  const state = getStateByCode(code);
  return state?.isAvailable ?? false;
};

export const getAvailableStateCodes = (): string[] => {
  return getAvailableStates().map(state => state.code);
};

export const getAvailableStateNames = (): string[] => {
  return getAvailableStates().map(state => state.name);
};

export const getStateNotes = (code: string): string | undefined => {
  const state = getStateByCode(code);
  return state?.notes;
};

export const getStatesWithRestrictions = (): State[] => {
  return US_STATES.filter(state => state.isAvailable && state.notes);
};

export const hasRestriction = (code: string, restriction: string): boolean => {
  const state = getStateByCode(code);
  return state?.notes?.toLowerCase().includes(restriction.toLowerCase()) ?? false;
};

// Styling helpers for map coloring
export const getStateColors = (code: string) => {
  const state = getStateByCode(code);
  if (!state) {
    return {
      backgroundColor: 'var(--e-global-color-grey1)',
      textColor: 'var(--e-global-color-white)',
    };
  }

  if (state.isAvailable) {
    // Service offered: green background with dark green text
    return {
      backgroundColor: 'var(--e-global-color-green)',
      textColor: 'var(--e-global-color-dark-green)',
    };
  } else {
    // Service not yet offered: dark green background with light green text
    return {
      backgroundColor: 'var(--e-global-color-dark-green)',
      textColor: 'var(--e-global-color-lightgreen)',
    };
  }
};

export const getAllStateColors = () => {
  const colorMap: Record<string, { backgroundColor: string; textColor: string }> = {};
  US_STATES.forEach(state => {
    colorMap[state.code] = getStateColors(state.code);
  });
  return colorMap;
};