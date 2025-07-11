import { useState, useEffect } from 'react';

export interface StripePriceData {
  id: string;
  unit_amount: number;
  currency: string;
  product: string;
  nickname: string | null;
}

export interface UsePricingReturn {
  prices: Map<string, StripePriceData> | null;
  loading: boolean;
  error: string | null;
}

export function usePricing(): UsePricingReturn {
  const [prices, setPrices] = useState<Map<string, StripePriceData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/stripe');
        if (!response.ok) {
          throw new Error('Failed to fetch pricing data');
        }
        
        const { prices } = await response.json();
        setPrices(new Map(Object.entries(prices)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pricing data');
        console.error('Error fetching prices:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return { prices, loading, error };
}

// Helper function to format price from cents to dollars
export function formatPrice(amountInCents: number): string {
  return `$${(amountInCents / 100).toLocaleString()}`;
}