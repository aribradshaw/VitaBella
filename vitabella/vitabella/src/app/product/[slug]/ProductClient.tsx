'use client';

import React from 'react';
import Image from 'next/image';
import BenefitsBar from '../../../components/common/BenefitsBar';
import ProductHero from './ProductHero';
import ProductScience from './ProductScience';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import ProductReviews from '@/components/common/ProductReviews';
import ProductMechanismModule from '@/components/common/ProductMechanismModule';

export interface Product {
  Title: string;
  Status: string;
  Content: string;
  'Short Description': string;
  Sku: string;
  Price: number;
  'Product categories': string;
  Slug: string;
  introp1?: string;
  introp2?: string;
  introp3?: string;
  introp4?: string;
  mechanism?: string;
  ingredients?: string;
  benefits?: string;
  benefit1?: string;
  benefit2?: string;
  'benefit2__1'?: string;
  doctor?: string;
  frequency?: string;
  application?: string;
  dosage?: string;
  imageBG?: string;
  imageM?: string;
  imageF?: string;
}

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const categories = product['Product categories']?.split('|') || [];

  return (
    <>
      <div>
        <ProductHero product={product} />
        <BenefitsBar />
        <ProductScience product={product} />
        <ProductMechanismModule product={product} />
        <SectionHeader
          left={{
            h2Alt: 'Real Stories,',
            h2: 'Real Transformations',
          }}
          right={
            <>
              See how our patients have achieved lasting results.<br />
              <div style={{ marginTop: '1.5rem' }}>
                <VitaBellaButton 
                  label="Get Started"
                  href="/membership"
                  bg="var(--e-global-color-dark-green)"
                  bgHover="var(--e-global-color-green)"
                  text="var(--e-global-color-white)"
                  textHover="var(--e-global-color-dark-green)"
                  arrowCircleColor="var(--e-global-color-green)"
                  arrowCircleColorHover="var(--e-global-color-dark-green)"
                  arrowPathColor="var(--e-global-color-dark-green)"
                  arrowPathColorHover="var(--e-global-color-green)"
                  style={{
                    display: 'inline-flex',
                    width: 'auto',
                    minWidth: 180,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '2rem',
                    boxShadow: '0 4px 12px rgba(44, 60, 50, 0.15), 0 0 20px rgba(214, 254, 161, 0.4)',
                  }}
                />
              </div>
            </>
          }
        />
        <ProductReviews subheader="Real Stories Real Transformations" />
      </div>
      <style jsx global>{`
        .product-cta-button {
          background: var(--e-global-color-dark-green) !important;
          color: var(--e-global-color-lightgreen) !important;
          box-shadow: 0 4px 12px rgba(44, 60, 50, 0.15), 0 0 20px rgba(214, 254, 161, 0.4) !important;
          display: inline-flex !important;
          width: auto !important;
        }
        .product-cta-button:hover {
          background: var(--e-global-color-lightgreen) !important;
          color: var(--e-global-color-dark-green) !important;
          box-shadow: 0 2px 8px rgba(44, 60, 50, 0.07) !important;
        }
        .product-cta-button span {
          color: inherit !important;
        }
        .product-cta-button:hover span {
          color: inherit !important;
        }
        .product-cta-button :global(.vitabella-arrow) :global(.arrow-circle) {
          fill: var(--e-global-color-lightgreen) !important;
        }
        .product-cta-button :global(.vitabella-arrow) :global(.arrow-path) {
          fill: var(--e-global-color-dark-green) !important;
        }
        .product-cta-button:hover :global(.vitabella-arrow) :global(.arrow-circle) {
          fill: var(--e-global-color-dark-green) !important;
        }
        .product-cta-button:hover :global(.vitabella-arrow) :global(.arrow-path) {
          fill: var(--e-global-color-lightgreen) !important;
        }
      `}</style>
    </>
  );
}
