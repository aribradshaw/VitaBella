import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | Vita Bella',
  description: 'Browse all Vita Bella products. Find anti-aging, weight loss, hormone therapy, skin care, and more. Discover your best self with Vita Bella.',
  openGraph: {
    title: 'All Products | Vita Bella',
    description: 'Browse all Vita Bella products. Find anti-aging, weight loss, hormone therapy, skin care, and more. Discover your best self with Vita Bella.',
    url: 'https://vitabella.com/product',
    type: 'website',
  },
};

import AllProductsClient from './AllProductsClient';

export default function ProductListPage() {
  return <AllProductsClient />;
}
