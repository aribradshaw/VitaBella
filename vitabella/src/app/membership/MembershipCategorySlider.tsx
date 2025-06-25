import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MembershipCategorySlider.module.css';

const slides = [
  { title: 'Anti-Aging', image: '/modules/menu/antiaging.webp', href: '/anti-aging' },
  { title: 'Cognitive Health', image: '/modules/menu/cognitivehealth.webp', href: '/cognitive-health' },
  { title: 'Hair Loss', image: '/modules/menu/hairloss.webp', href: '/hair-loss' },
  { title: 'Hormone Therapy', image: '/modules/menu/hormonetherapy.webp', href: '/hormone-therapy' },
  { title: 'Injury & Recovery', image: '/modules/menu/injuryandrecovery.webp', href: '/injury-and-recovery' },
  { title: 'Sexual Wellness', image: '/modules/menu/sexualwellness.webp', href: '/sexual-wellness' },
  { title: 'Skin Care', image: '/modules/menu/skincare.webp', href: '/skin-care' },
  { title: 'Weight Loss', image: '/modules/menu/weightloss.webp', href: '/weight-loss' },
];

const MembershipCategorySlider: React.FC = () => {
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Create extended array for smooth infinite scrolling
  const extendedSlides = [...slides, ...slides, ...slides];
  const slideWidth = 320; // 300px card + 20px gap
  const totalWidth = slides.length * slideWidth;

  useEffect(() => {
    const animate = () => {
      setTranslateX(prev => {
        const newTranslateX = prev - 0.5; // Smooth, slow movement
        
        // Reset position when we've scrolled through one complete set
        if (Math.abs(newTranslateX) >= totalWidth) {
          return 0;
        }
        
        return newTranslateX;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [totalWidth]);

  return (
    <div className={styles.sliderTrackOuter}>
      <div className={styles.infiniteSlider}>
        <div 
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <Link 
              key={`${slide.title}-${index}`} 
              href={slide.href}
              className={styles.slideLink}
            >
              <div className={styles.slide}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlayTitle}>{slide.title}</div>
                <div className={styles.overlayArrow}>
                  <img src="/brand/white-arrow.svg" alt="arrow" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipCategorySlider;
