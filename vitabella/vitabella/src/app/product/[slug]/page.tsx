import { notFound } from 'next/navigation';
import ProductClient, { Product } from './ProductClient';
import products from '../products.json';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const typedProducts = products as Product[];
  
  return typedProducts
    .filter(product => product.Status === 'Active')
    .map((product) => ({
      slug: product.Slug,
    }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const typedProducts = products as Product[];
  const product = typedProducts.find(p => p.Slug === slug && p.Status === 'Active');

  if (!product) {
    return {
      title: 'Product Not Found | Vita Bella',
    };
  }

  return {
    title: `${product.Title} | Vita Bella`,
    description: product['Short Description'] || product.Content?.substring(0, 160),
    openGraph: {
      title: product.Title,
      description: product['Short Description'] || product.Content?.substring(0, 160),
      images: product.imageBG ? [
        {
          url: product.imageBG.replace('/public', ''),
          width: 1200,
          height: 630,
          alt: product.Title,
        }
      ] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const typedProducts = products as Product[];
  
  // Find the product by slug
  const product = typedProducts.find(p => p.Slug === slug && p.Status === 'Active');

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
