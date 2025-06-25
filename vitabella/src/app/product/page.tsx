"use client";

import React, { useState, useMemo } from 'react';
import productsData from './products.json';
import Image from 'next/image';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import '../globals.css';
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

// ProductCard component to fix hooks order issue
function ProductCard({ product }: { product: any }) {
  // Always use imageBG, stripping /public if present
  let imageSrc = product.imageBG ? product.imageBG.replace(/^\/public/, '') : '';
  // Truncate description to 20 words
  let desc = product['Short Description'] || '';
  const words = desc.split(' ');
  if (words.length > 20) {
    desc = words.slice(0, 20).join(' ') + '...';
  }

  // Marquee logic: only scroll if title is longer than container
  const titleRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = React.useState(false);
  const [charLimit, setCharLimit] = React.useState(15); // default for mobile

  // Responsive char limit based on card width
  React.useEffect(() => {
    function updateCharLimit() {
      if (titleRef.current) {
        const width = titleRef.current.offsetWidth;
        if (width > 400) setCharLimit(32);
        else if (width > 320) setCharLimit(24);
        else setCharLimit(15);
      }
    }
    updateCharLimit();
    window.addEventListener('resize', updateCharLimit);
    return () => window.removeEventListener('resize', updateCharLimit);
  }, []);

  React.useEffect(() => {
    setShouldMarquee(product.Title.length > charLimit);
  }, [product.Title, charLimit]);

  // Calculate scroll duration based on container width for consistent speed
  let scrollDuration = 12; // seconds, default
  if (titleRef.current && innerRef.current && shouldMarquee) {
    const containerWidth = titleRef.current.offsetWidth;
    const textWidth = innerRef.current.scrollWidth;
    // Set a constant px/sec speed (e.g. 40px/sec)
    const pxPerSec = 40;
    scrollDuration = (textWidth + containerWidth + 40) / pxPerSec;
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
        flex: 1,
        boxSizing: 'border-box',
        paddingLeft: 16,
        paddingRight: 16,
      }}>
        <div className="product-card-text">
          {/* Title section, fully independent, with wrapper for padding */}
          <div className="product-title-marquee-wrapper" style={{width: '100%', boxSizing: 'border-box', paddingLeft: 0, paddingRight: 0}}>
            <div
              className="product-title-marquee"
              ref={titleRef}
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: '0 0 8px 0',
                textAlign: 'center',
                color: 'var(--e-global-color-dark-green)',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                position: 'relative',
                height: 28,
                lineHeight: '28px',
                display: 'block',
                boxSizing: 'border-box',
              }}
            >
              {shouldMarquee ? (
                <span style={{ display: 'inline-block', width: '200%', position: 'relative' }}>
                  <span
                    className="product-title-marquee-inner"
                    ref={innerRef}
                    style={{ willChange: 'transform', animationDuration: scrollDuration + 's' }}
                  >
                    {product.Title}
                  </span>
                  <span
                    className="product-title-marquee-inner marquee-duplicate"
                    aria-hidden="true"
                    style={{ animationDuration: scrollDuration + 's' }}
                  >
                    {product.Title}
                  </span>
                </span>
              ) : (
                <span
                  ref={innerRef}
                  style={{ paddingLeft: 0, animation: 'none' }}
                >
                  {product.Title}
                </span>
              )}
            </div>
          </div>
          <div className="product-price" style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, width: '100%', textAlign: 'center', color: 'var(--e-global-color-grey1)' }}>
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
        {filteredProducts.map(product => (
          <ProductCard key={product.Slug} product={product} />
        ))}
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
        .product-title-marquee {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          width: 100%;
          height: 28px;
          line-height: 28px;
          display: block;
        }
        .product-title-marquee-inner {
          display: inline-block;
          /* Duplicate the text for seamless looping */
          min-width: 100%;
          padding-left: 0;
          animation: marquee-scroll-x 12s linear infinite;
        }
        .product-title-marquee-inner.marquee-duplicate {
          margin-left: 40px; /* space between loops */
        }
        @keyframes marquee-scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{textAlign: 'center', color: '#888', fontSize: 13, marginTop: 32, marginBottom: 0, width: '100%'}}>
        *with Membership, consult, and provider approval
      </div>
    </div>
  );
}
