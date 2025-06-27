'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import { Product } from './ProductClient';

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState<'male' | 'female' | null>(null);
  
  // Determine which image to show by default
  const primaryImage = product.imageM || product.imageF;
  const hasGallery = product.imageM && product.imageF;
  
  // Clean the short description from HTML tags if needed
  const cleanDescription = product['Short Description']?.replace(/<[^>]*>/g, '') || '';
  
  // Determine the current display image
  const currentImage = selectedImage === 'male' && product.imageM 
    ? product.imageM 
    : selectedImage === 'female' && product.imageF 
    ? product.imageF 
    : primaryImage;

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1340px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', minHeight: '600px' }}>
          
          {/* Left Side - Product Image(s) - 50% width */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
            {currentImage && (
              <div style={{ position: 'relative', width: '100%', height: '500px', maxWidth: '500px' }}>
                <Image
                  src={currentImage.replace('/public', '')}
                  alt={product.Title}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            )}
            
            {/* Gallery Controls - Positioned below the image */}
            {hasGallery && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {product.imageM && (
                  <button
                    onClick={() => setSelectedImage('male')}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: (selectedImage === 'male' || (!selectedImage && product.imageM)) 
                        ? 'var(--e-global-color-green)' 
                        : '#d1d5db',
                      backgroundColor: (selectedImage === 'male' || (!selectedImage && product.imageM))
                        ? 'var(--e-global-color-lightgreen)'
                        : 'white',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: '4px'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={product.imageM.replace('/public', '')}
                        alt="Male version"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </button>
                )}
                
                {product.imageF && (
                  <button
                    onClick={() => setSelectedImage('female')}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: (selectedImage === 'female' || (!selectedImage && !product.imageM)) 
                        ? 'var(--e-global-color-green)' 
                        : '#d1d5db',
                      backgroundColor: (selectedImage === 'female' || (!selectedImage && !product.imageM))
                        ? 'var(--e-global-color-lightgreen)'
                        : 'white',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: '4px'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={product.imageF.replace('/public', '')}
                        alt="Female version"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Product Information - 50% width */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            {/* Transform With */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p 
                style={{ 
                  color: 'var(--e-global-color-grey2)',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                TRANSFORM WITH
              </p>
              <h1 
                className="h1"
                style={{ color: 'var(--e-global-color-dark-green)', margin: 0 }}
              >
                {product.Title}
              </h1>
            </div>

            {/* Short Description */}
            <p 
              className="body-text"
              style={{ 
                color: 'var(--e-global-color-grey2)',
                fontSize: '18px',
                lineHeight: '1.6',
                margin: 0
              }}
            >
              {cleanDescription}
            </p>

            {/* Benefits List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {product.introp1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      backgroundColor: 'var(--e-global-color-green)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span 
                      style={{ 
                        color: 'var(--e-global-color-dark-green)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="body-text"
                    style={{ color: 'var(--e-global-color-dark-green)' }}
                  >
                    {product.introp1}
                  </span>
                </div>
              )}
              
              {product.introp2 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      backgroundColor: 'var(--e-global-color-green)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span 
                      style={{ 
                        color: 'var(--e-global-color-dark-green)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="body-text"
                    style={{ color: 'var(--e-global-color-dark-green)' }}
                  >
                    {product.introp2}
                  </span>
                </div>
              )}
              
              {product.introp3 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      backgroundColor: 'var(--e-global-color-green)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span 
                      style={{ 
                        color: 'var(--e-global-color-dark-green)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="body-text"
                    style={{ color: 'var(--e-global-color-dark-green)' }}
                  >
                    {product.introp3}
                  </span>
                </div>
              )}
              
              {product.introp4 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      backgroundColor: 'var(--e-global-color-green)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <span 
                      style={{ 
                        color: 'var(--e-global-color-dark-green)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span 
                    className="body-text"
                    style={{ color: 'var(--e-global-color-dark-green)' }}
                  >
                    {product.introp4}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div 
              style={{ 
                width: '100%',
                height: '1px',
                backgroundColor: 'var(--e-global-color-grey2)',
                opacity: 0.2
              }}
            />

            {/* Pricing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ 
                  color: 'var(--e-global-color-dark-green)',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  from <span style={{ fontSize: '32px' }}>${product.Price}</span>/mo.*
                </p>
                <p style={{ 
                  color: 'var(--e-global-color-grey2)',
                  fontSize: '14px',
                  margin: '0.5rem 0 0 0'
                }}>
                  *with Membership, consult, and provider approval
                </p>
              </div>

              {/* CTA Button */}
              <VitaBellaButton 
                label="Get Started"
                href="/membership"
                bg="var(--e-global-color-green)"
                bgHover="var(--e-global-color-dark-green)"
                text="var(--e-global-color-dark-green)"
                textHover="var(--e-global-color-white)"
                arrowCircleColor="var(--e-global-color-dark-green)"
                arrowCircleColorHover="var(--e-global-color-green)"
                arrowPathColor="var(--e-global-color-green)"
                arrowPathColorHover="var(--e-global-color-dark-green)"
                style={{ display: 'inline-flex', alignSelf: 'flex-start', minWidth: 180, fontSize: '1.1rem', fontWeight: 700, borderRadius: '2rem', boxShadow: '0 4px 12px rgba(44, 60, 50, 0.15), 0 0 20px rgba(214, 254, 161, 0.4)' }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stack vertically on small screens */}
        <style jsx>{`
          @media (max-width: 1024px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
