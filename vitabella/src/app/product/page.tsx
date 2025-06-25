"use client";

import React, { useState, useMemo } from 'react';
import productsData from './products.json';
import Image from 'next/image';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import '../productcard-buttons.css';

const allCategories = [
  'Anti-Aging',
  'Cognitive Health',
  'Weight Loss',
  'Sexual Wellness',
  'Injury and Recovery',
  'Hormone Therapy',
  'Skin Care',
  'Hair Loss',
];

function getProductCategories(product: any) {
  return product['Product categories']?.split('|').map((c: string) => c.trim()) || [];
}

export default function ProductListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      if (product.Status && product.Status.toLowerCase() === 'inactive') return false;
      const matchesSearch =
        product.Title.toLowerCase().includes(search.toLowerCase()) ||
        product['Short Description']?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category
        ? getProductCategories(product).includes(category)
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 24 }}>All Products</h1>
      {/* Search bar row */}
      <div style={{ width: '100%', marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.9rem 1.2rem',
            borderRadius: 24,
            border: '1px solid #cce3c1',
            fontSize: 18,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {/* Category buttons row */}
      <div
        className="category-row"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          overflowX: 'visible',
          gap: 12,
          marginBottom: 24,
          maxWidth: '100%',
          whiteSpace: 'nowrap',
        }}
      >
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat === category ? '' : cat)}
            style={{
              background: cat === category ? 'var(--e-global-color-dark-green)' : '#fff',
              color: cat === category ? 'var(--e-global-color-lightgreen)' : 'var(--e-global-color-dark-green)',
              border: '1.5px solid var(--e-global-color-dark-green)',
              borderRadius: 18,
              padding: '0.35rem 0.9rem',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
              flex: '0 0 auto',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <style>{`
        @media (max-width: 1340px) {
          .category-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
          }
        }
        /* Stack buttons when card is narrow */
        @media (max-width: 350px), (max-width: 600px) {
          .product-card-buttons {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .product-card-buttons .vitabella-button {
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
        /* Default: row layout */
        @media (min-width: 601px) {
          .product-card-buttons {
            flex-direction: row !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 900px) {
          .product-card-buttons {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 400px) {
          .product-card-buttons {
            flex-direction: column !important;
            gap: 6px !important;
          }
        }
      `}</style>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 32,
      }}>
        {filteredProducts.map(product => {
          // Always use imageBG, stripping /public if present
          let imageSrc = product.imageBG ? product.imageBG.replace(/^\/public/, '') : '';
          // Truncate description to 20 words
          let desc = product['Short Description'] || '';
          const words = desc.split(' ');
          if (words.length > 20) {
            desc = words.slice(0, 20).join(' ') + '...';
          }
          return (
            <div
              key={product.Slug}
              style={{
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 2px 16px rgba(44,60,50,0.07)',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 380,
                position: 'relative',
                border: '1.5px solid #e6f5e0',
                transition: 'box-shadow 0.18s',
                overflow: 'hidden',
              }}
            >
              {/* 1:1 aspect ratio image */}
              <a href={`/product/${product.Slug}`} style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', position: 'relative', background: '#f6f6f6', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }}>
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={product.Title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, margin: 0, display: 'block' }}
                  />
                ) : null}
              </a>
              {/* Card content with horizontal padding */}
              <div style={{
                paddingTop: 18,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1
              }}>
                <div className="product-card-text">
                  <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px 0', textAlign: 'center', color: 'var(--e-global-color-dark-green)', width: '100%' }}>{product.Title}</h2>
                  <div style={{ fontSize: 13, color: '#333', textAlign: 'center', marginBottom: 12, minHeight: 32, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', width: '100%' }}>{desc}</div>
                  <div className="product-price" style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, width: '100%', textAlign: 'center' }}>
                    from ${product.Price}/mo.*
                  </div>
                </div>
                <div className="product-card-buttons-alt">
                  <VitaBellaButton
                    href={`/product/${product.Slug}`}
                    className="vitabella-productcard-btn-learnmore"
                  >
                    Learn More
                  </VitaBellaButton>
                  <VitaBellaButton
                    href="/membership"
                    className="vitabella-productcard-btn-getstarted"
                  >
                    Get Started
                  </VitaBellaButton>
                </div>
              </div>
            </div>
          );
        })}
        {filteredProducts.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: 20, padding: 40 }}>
            No products found.
          </div>
        )}
      </div>
      <style>{`
        .product-card-buttons-alt {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: 8px;
          padding: var(--space-1x);
          box-sizing: border-box;

        }
        .product-card-buttons-alt .vitabella-button {
          display: block;
          width: 100%;
          margin-bottom: 8px;
          min-width: 0;
          max-width: 100%;
        }
        .product-card-buttons-alt .vitabella-button:last-child {
          margin-bottom: 0;
        }
      `}</style>
      <div style={{textAlign: 'center', color: '#888', fontSize: 13, marginTop: 32, marginBottom: 0, width: '100%'}}>
        *with Membership, consult, and provider approval
      </div>
    </div>
  );
}
