"use client";
import React, { useMemo, useState } from "react";
import VitaBellaSlider from "./VitaBellaSlider";
import VitaBellaButton from "./VitaBellaButton";
import productsData from "@/app/product/products.json";
import styles from "./ProductCategorySlider.module.css";

interface ProductCategorySliderProps {
  category: string;
  visibleCount?: number;
}

const ProductCategorySlider: React.FC<ProductCategorySliderProps> = ({ category, visibleCount = 3 }) => {
  // Normalize category for matching
  const normalizedCategory = category.trim().toLowerCase();

  // Filter products by category
  const filteredProducts = useMemo(() =>
    productsData.filter(
      (p: any) =>
        p["Status"] === "Active" &&
        typeof p["Product categories"] === "string" &&
        p["Product categories"].toLowerCase().split("|").map((c: string) => c.trim()).includes(normalizedCategory)
    ),
    [normalizedCategory]
  );

  // Slider dot navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = filteredProducts.length;

  // Render a single product card
  const getImageSrc = (src: string) => {
    if (!src) return '';
    // Remove '/public' if present
    return src.startsWith('/public') ? src.replace('/public', '') : src;
  };

  const renderSlide = (product: any, idx: number) => (
    <div className={styles.card} key={product.Sku || idx}>
      <a href={`/product/${product.Slug}`} className={styles.imageLink} style={{ display: 'block', borderRadius: 18, overflow: 'hidden' }}>
        <img
          src={getImageSrc(product.imageBG)}
          alt={product.Title}
          className={styles.productImage}
        />
      </a>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle} style={{ fontFamily: 'Tusker Grotesk, Arial, Helvetica, sans-serif', fontWeight: 700, fontSize: 28, color: 'var(--e-global-color-dark-green)', textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>{product.Title}</div>
        <div className={styles.cardPrice} style={{ color: 'var(--e-global-color-dark-green)', fontWeight: 700, fontSize: 18, textAlign: 'center', marginBottom: 8 }}>
          from <span style={{ fontWeight: 700 }}>${product.Price?.toFixed(2)}/mo.</span>
        </div>
        <div className={styles.cardDesc} style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontSize: 15, color: 'var(--e-global-color-grey2)', textAlign: 'center', marginBottom: 16, minHeight: 48 }}>
          {product["Short Description"]}
        </div>
        <div className={styles.buttonRow}>
          <VitaBellaButton
            label="Learn More"
            href={`/product/${product.Slug}`}
            bg="#fff"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-white)"
            arrowPathColorHover="var(--e-global-color-lightgreen)"
            className="vitabella-productcard-btn-learnmore"
          />
          <VitaBellaButton
            label="Get Started"
            href="/membership"
            bg="var(--e-global-color-dark-green)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-white)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-lightgreen)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-dark-green)"
            arrowPathColorHover="var(--e-global-color-lightgreen)"
            className="vitabella-productcard-btn-getstarted"
          />
        </div>
      </div>
    </div>
  );

  // Dots navigation
  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Handle slider change (if VitaBellaSlider supports it)
  const handleSlideChange = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <div className={styles.sliderSection}>
      <VitaBellaSlider
        items={filteredProducts}
        visibleCount={visibleCount}
        renderSlide={renderSlide}
        className={styles.slider}
        style={{ margin: '0 auto', maxWidth: 1340 }}
        prevArrow={<span style={{ fontSize: 36, color: 'var(--e-global-color-dark-green)' }}>&#8249;</span>}
        nextArrow={<span style={{ fontSize: 36, color: 'var(--e-global-color-dark-green)' }}>&#8250;</span>}
        currentIndex={currentIndex}
        onSlideChange={handleSlideChange}
      />
      <div className={styles.dotsRow} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18 }}>
        {filteredProducts.map((_, idx) => (
          <button
            key={idx}
            className={styles.dot + (idx === currentIndex ? ' ' + styles.active : '')}
            style={{
              // Remove width and height to use CSS for circle shape
              borderRadius: '50%',
              background: idx === currentIndex ? 'var(--e-global-color-dark-green)' : '#e0e0e0',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.18s',
            }}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategorySlider;
