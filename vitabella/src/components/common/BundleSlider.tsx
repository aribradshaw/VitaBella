"use client";
import React, { useMemo, useState, useEffect } from "react";
import VitaBellaSlider from "./VitaBellaSlider";
import styles from "./ProductCategorySlider.module.css";
import categories from "@/constants/categories.json";

interface BundleSliderProps {
  gender: "Male" | "Female";
  visibleCount?: number;
}

const useResponsiveVisibleCount = (defaultCount: number) => {
  const [count, setCount] = useState(defaultCount);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateCount = () => {
      setCount(window.innerWidth <= 900 ? 1 : defaultCount);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [defaultCount]);

  return { count, isClient };
};

const BundleSlider: React.FC<BundleSliderProps> = ({ gender, visibleCount = 4 }) => {
  // Prepare slides based on gender
  const slides = useMemo(() => {
    return categories.map((cat) => {
      const image = gender === "Male" ? cat.menImage : cat.womenImage;
      const caption = gender === "Male" ? cat.menCaption : cat.womenCaption;
      return {
        ...cat,
        image,
        caption,
      };
    });
  }, [gender]);

  // Responsive visibleCount: 1 on mobile, default otherwise
  const { count: responsiveVisibleCount, isClient } = useResponsiveVisibleCount(visibleCount);

  // Dots navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderSlide = (cat: any, idx: number) => {
    // Use consistent height for SSR, then adjust on client
    const imageHeight = isClient && window.innerWidth <= 900 ? 300 : 360;
    
    return (
      <div className={styles.card} key={cat.slug || idx}>
        <a href={`/${cat.slug}`} className={styles.imageLink} style={{ display: 'block', borderRadius: 18, overflow: 'hidden' }}>
          <img
            src={cat.image}
            alt={cat.categoryName}
            style={{
              width: "100%",
              height: imageHeight,
              minHeight: imageHeight,
              objectFit: "cover",
              borderRadius: 18,
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              aspectRatio: "16/9"
            }}
            loading="lazy"
          />
        </a>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle} style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 700, fontSize: 28, color: 'var(--e-global-color-dark-green)', textTransform: 'none', marginBottom: 6, textAlign: 'center' }}>
            {cat.categoryName}
          </div>
          <div className={styles.cardDesc} style={{ fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontSize: 15, color: 'var(--e-global-color-grey2)', textAlign: 'center', marginBottom: 16, minHeight: 48 }}>
            {cat.caption}
          </div>
        </div>
      </div>
    );
  };

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handleSlideChange = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <div className={styles.sliderSection}>
      <VitaBellaSlider
        items={slides}
        visibleCount={responsiveVisibleCount}
        renderSlide={renderSlide}
        className={styles.slider}
        style={{ margin: '0 auto', maxWidth: 1340 }}
        prevArrow={<span style={{ fontSize: 36, color: 'var(--e-global-color-dark-green)' }}>&#8249;</span>}
        nextArrow={<span style={{ fontSize: 36, color: 'var(--e-global-color-dark-green)' }}>&#8250;</span>}
        currentIndex={currentIndex}
        onSlideChange={handleSlideChange}
      />
      <div className={styles.dotsRow} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18 }}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={styles.dot + (idx === currentIndex ? ' ' + styles.active : '')}
            style={{
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

export default BundleSlider;
