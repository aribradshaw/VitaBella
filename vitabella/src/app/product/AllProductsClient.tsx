"use client";
import React, { useState, useMemo } from 'react';
import productsData from './products.json';
import Image from 'next/image';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import '../globals.css';

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

function ProductCard({ product }: { product: any }) {
  let imageSrc = product.imageBG ? product.imageBG.replace(/^\/public/, '') : '';
  let desc = product['Short Description'] || '';
  const words = desc.split(' ');
  if (words.length > 20) {
    desc = words.slice(0, 20).join(' ') + '...';
  }

  const titleRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = React.useState(false);
  const [charLimit, setCharLimit] = React.useState(15);

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

  const [scrollDuration, setScrollDuration] = React.useState(12);

  React.useEffect(() => {
    if (titleRef.current && innerRef.current && shouldMarquee) {
      const containerWidth = titleRef.current.offsetWidth;
      const textWidth = innerRef.current.scrollWidth;
      const pxPerSec = 40;
      setScrollDuration((textWidth + containerWidth + 40) / pxPerSec);
    }
  }, [shouldMarquee, product.Title, charLimit]);

  // Add marquee animation keyframes globally if not present (in a way that works in .tsx)
  // This must be inside the ProductCard component and inside a useEffect
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('marquee-keyframes')) {
      const style = document.createElement('style');
      style.id = 'marquee-keyframes';
      style.appendChild(document.createTextNode('@keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }'));
      document.head.appendChild(style);
    }
  }, []);

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
      <a href={`/product/${product.Slug}`} style={{ width: '100%', display: 'block', aspectRatio: '1 / 1', position: 'relative', background: '#f6f6f6', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.Title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, margin: 0, display: 'block' }}
          />
        ) : null}
      </a>
      <div style={{
        paddingTop: 18,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        boxSizing: 'border-box',
        // Removed paddingLeft and paddingRight to prevent double padding
      }}>
        <div className="product-card-text">
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
                <span
                  style={{
                    display: 'inline-block',
                    width: '200%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    className="product-title-marquee-inner"
                    ref={innerRef}
                    style={{
                      willChange: 'transform',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      animation: `marquee-left ${scrollDuration}s linear infinite`,
                    }}
                  >
                    {product.Title}
                  </span>
                  <span
                    className="product-title-marquee-inner marquee-duplicate"
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      animation: `marquee-left ${scrollDuration}s linear infinite`,
                    }}
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
        <div
          className="product-card-buttons-alt"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
            paddingLeft: 'var(--space-1x)',
            paddingRight: 'var(--space-3x)',
            paddingBottom: 'var(--space-1x)',
            gap: 'var(--space-1x)',
            alignItems: 'stretch',
            maxWidth: '100%',
            overflow: 'visible',
          }}
        >
          <VitaBellaButton
            href={`/product/${product.Slug}`}
            label="Learn More"
            bg="var(--e-global-color-white)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-green)"
            arrowPathColorHover="var(--e-global-color-green)"
            style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          />
          <VitaBellaButton
            href="/membership"
            label="Get Started"
            bg="var(--e-global-color-dark-green)"
            bgHover="var(--e-global-color-green)"
            text="var(--e-global-color-white)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-dark-green)"
            arrowPathColorHover="var(--e-global-color-green)"
            style={{ width: '100%', marginLeft: 0, marginRight: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

const AllProductsClient: React.FC = () => {
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
      <h1 className="APTitle" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 24 }}>All Products</h1>
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
              ...(typeof window !== 'undefined' && window.innerWidth <= 600
                ? {
                    fontSize: '0.8rem',
                    padding: '0.16rem 0.48rem',
                    borderRadius: 10,
                  }
                : {}),
            }}
          >
            {cat}
          </button>
        ))}
      </div>
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
      <div style={{textAlign: 'center', color: '#888', fontSize: 13, marginTop: 32, marginBottom: 0, width: '100%'}}>
        *with Membership, consult, and provider approval
      </div>
    </div>
  );
};

export default AllProductsClient;
