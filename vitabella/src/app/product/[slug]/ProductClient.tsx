'use client';

import React from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {product.imageBG && (
          <div className="absolute inset-0">
            <Image
              src={product.imageBG.replace('/public', '')}
              alt={`${product.Title} background`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        
        <div className="container relative z-10 h-full flex items-center text-white">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {category.trim()}
                </span>
              ))}
            </div>
            
            <h1 className="h1 text-white mb-6">{product.Title}</h1>
            
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              {product['Short Description']}
            </p>
            
            <div className="flex items-center gap-6">
              <div className="text-3xl font-bold">
                ${product.Price}
              </div>
              <button className="vitabella-button">
                <span>Get Started</span>
                <div className="vitabella-arrow">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <circle className="arrow-circle" cx="15" cy="15" r="15" fill="var(--e-global-color-dark-green)"/>
                    <path className="arrow-path" d="M15 8L22 15L15 22M22 15H8" stroke="var(--e-global-color-lightgreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Points */}
      {(product.introp1 || product.introp2 || product.introp3 || product.introp4) && (
        <section className="py-16" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.introp1 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--e-global-color-lightgreen)' }}>
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="h6" style={{ color: 'var(--e-global-color-dark-green)' }}>{product.introp1}</p>
                </div>
              )}
              
              {product.introp2 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--e-global-color-lightgreen)' }}>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="h6" style={{ color: 'var(--e-global-color-dark-green)' }}>{product.introp2}</p>
                </div>
              )}
              
              {product.introp3 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--e-global-color-lightgreen)' }}>
                    <span className="text-2xl">🚀</span>
                  </div>
                  <p className="h6" style={{ color: 'var(--e-global-color-dark-green)' }}>{product.introp3}</p>
                </div>
              )}
              
              {product.introp4 && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--e-global-color-lightgreen)' }}>
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="h6" style={{ color: 'var(--e-global-color-dark-green)' }}>{product.introp4}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Product Images */}
      {(product.imageM || product.imageF) && (
        <section className="py-16">
          <div className="container">
            <h2 className="h2 text-center mb-12" style={{ color: 'var(--e-global-color-dark-green)' }}>
              Product Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {product.imageM && (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.imageM.replace('/public', '')}
                    alt={`${product.Title} - Male`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                    Male
                  </div>
                </div>
              )}
              
              {product.imageF && (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.imageF.replace('/public', '')}
                    alt={`${product.Title} - Female`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                    Female
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="h2 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
              About {product.Title}
            </h2>
            <div className="body-text mb-8">
              {product.Content}
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism of Action */}
      {product.mechanism && (
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="h3 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
                How It Works
              </h2>
              <div className="body-text">
                {product.mechanism}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {(product.benefits || product.benefit1 || product.benefit2) && (
        <section className="py-16" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="h3 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
                Benefits
              </h2>
              
              {product.benefits && (
                <div className="body-text mb-6">
                  {product.benefits}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefit1 && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0" style={{ backgroundColor: 'var(--e-global-color-green)' }}>
                      <span className="text-sm font-bold" style={{ color: 'var(--e-global-color-dark-green)' }}>✓</span>
                    </div>
                    <p className="body-text">{product.benefit1}</p>
                  </div>
                )}
                
                {product.benefit2 && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0" style={{ backgroundColor: 'var(--e-global-color-green)' }}>
                      <span className="text-sm font-bold" style={{ color: 'var(--e-global-color-dark-green)' }}>✓</span>
                    </div>
                    <p className="body-text">{product.benefit2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Doctor's Perspective */}
      {product.doctor && (
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="h3 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
                From Our Medical Team
              </h2>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4" style={{ borderLeftColor: 'var(--e-global-color-green)' }}>
                <div className="body-text italic">
                  "{product.doctor}"
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Details */}
      <section className="py-16" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="h3 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
              Product Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.ingredients && (
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="h5 mb-3" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    Ingredients
                  </h3>
                  <p className="body-text">{product.ingredients}</p>
                </div>
              )}
              
              {product.dosage && (
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="h5 mb-3" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    Dosage
                  </h3>
                  <p className="body-text">{product.dosage}</p>
                </div>
              )}
              
              {product.frequency && (
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="h5 mb-3" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    Frequency
                  </h3>
                  <p className="body-text">{product.frequency}</p>
                </div>
              )}
              
              {product.application && (
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="h5 mb-3" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    Application
                  </h3>
                  <p className="body-text">{product.application}</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="h4 mb-2" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    {product.Title}
                  </h3>
                  <p className="body-text">SKU: {product.Sku}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-4" style={{ color: 'var(--e-global-color-dark-green)' }}>
                    ${product.Price}
                  </div>
                  <button className="vitabella-button">
                    <span>Start Treatment</span>
                    <div className="vitabella-arrow">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <circle className="arrow-circle" cx="15" cy="15" r="15" fill="var(--e-global-color-dark-green)"/>
                        <path className="arrow-path" d="M15 8L22 15L15 22M22 15H8" stroke="var(--e-global-color-lightgreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
