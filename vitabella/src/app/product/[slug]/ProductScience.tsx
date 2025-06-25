'use client';

import React from 'react';
import Image from 'next/image';
import type { Product } from './ProductClient';

interface ProductScienceProps {
  product: Product;
}

export default function ProductScience({ product }: ProductScienceProps) {
  // Remove /public/ prefix from the image path since Next.js serves from root
  const imagePath = product.imageBG?.replace('/public/', '/') || '';

  return (
    <section style={{ 
      padding: '4rem 0', 
      backgroundColor: 'var(--e-global-color-off-white)',
      color: 'var(--e-global-color-grey1)',
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      boxSizing: 'border-box',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}
        className="science-grid">
          {/* Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="h2" style={{ 
              color: 'var(--e-global-color-dark-green)',
              lineHeight: '1.1',
              marginBottom: '1rem'
            }}>
              The science behind<br />
              <span style={{ fontWeight: '600' }}>{product.Title}</span>
            </h2>
            
            <div
              className="body-text"
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'var(--e-global-color-grey2)',
                textAlign: (product.Content?.split(/\s+/).length ?? 0) > 15 ? 'justify' : 'left',
              }}
            >
              {product.Content}
            </div>
          </div>

          {/* Right Image */}
          <div style={{ position: 'relative' }}>
            {imagePath && (
              <div style={{
                position: 'relative',
                height: '550px',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden'
              }}>
                <Image
                  src={imagePath}
                  alt={`Science behind ${product.Title}`}
                  fill
                  className="img"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 1023px) {
          .science-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
