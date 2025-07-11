"use client";
import React, { useEffect, useRef, useState } from 'react';
import { 
  FaFlask, 
  FaTruck, 
  FaUserDoctor, 
  FaBoxOpen, 
  FaDollarSign 
} from 'react-icons/fa6';
import styles from './BenefitsBar.module.css';

interface Benefit {
  icon: React.ComponentType<any>;
  text: string;
}

const benefits: Benefit[] = [
  { icon: FaFlask, text: "CLINICALLY-PROVEN RESULTS" },
  { icon: FaTruck, text: "MEDICATION SHIPPED DISCREETLY TO YOUR DOOR" },
  { icon: FaUserDoctor, text: "1:1 DOCTOR-LED CARE, EVERY QUARTER" },
  { icon: FaBoxOpen, text: "ALL NECESSARY SUPPLIES ALWAYS FREE" },
  { icon: FaDollarSign, text: "BEST MEDICATION PRICES" }
];

const BenefitsBar: React.FC = () => {
  const [translateX, setTranslateX] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && trackRef.current && !isInitialized) {
        // Reset to natural state first to get accurate measurements
        trackRef.current.style.transform = 'none';
        
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        
        // Check if content overflows or if on mobile
        const isOverflowing = trackWidth > containerWidth;
        const isMobile = window.innerWidth <= 900;
        
        const needsScrolling = isMobile || isOverflowing;
        setShouldScroll(needsScrolling);
        setIsInitialized(true);
        
        console.log('Overflow check:', {
          containerWidth,
          trackWidth,
          isOverflowing,
          isMobile,
          needsScrolling
        });
      }
    };

    // Use multiple timeouts to ensure DOM is fully rendered
    const timer1 = setTimeout(checkOverflow, 50);
    const timer2 = setTimeout(checkOverflow, 200);
    const timer3 = setTimeout(checkOverflow, 500);

    const handleResize = () => {
      setIsInitialized(false);
      setTimeout(checkOverflow, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    if (shouldScroll) {
      // Start animation
      const animate = () => {
        setTranslateX(prev => {
          const newTranslateX = prev - 1; // Smooth movement speed
          
          // Calculate reset point based on actual item width
          if (trackRef.current) {
            const firstItem = trackRef.current.querySelector(`.${styles.benefitItem}`) as HTMLElement;
            if (firstItem) {
              const itemWidth = firstItem.offsetWidth;
              const computedStyle = window.getComputedStyle(trackRef.current);
              const gap = parseInt(computedStyle.gap) || 40;
              const resetPoint = (itemWidth + gap) * benefits.length;
              
              if (Math.abs(newTranslateX) >= resetPoint) {
                return 0;
              }
            }
          }
          
          return newTranslateX;
        });
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Stop animation and reset position
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setTranslateX(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shouldScroll, isInitialized]);

  // Create extended array for smooth infinite scrolling when needed
  const displayBenefits = shouldScroll ? [...benefits, ...benefits] : benefits;

  return (
    <div className={styles.benefitsBar}>
      <div ref={containerRef} className={styles.container}>
        <div 
          ref={trackRef}
          className={`${styles.benefitsTrack} ${!shouldScroll ? styles.static : ''}`}
          style={{
            transform: shouldScroll ? `translateX(${translateX}px)` : 'none',
          }}
        >
          {displayBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={`${benefit.text}-${index}`} className={styles.benefitItem}>
                <IconComponent className={styles.icon} />
                <span className={styles.text}>{benefit.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsBar;
