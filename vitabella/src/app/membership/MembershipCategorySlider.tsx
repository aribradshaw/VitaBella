import React from 'react';
import Image from 'next/image';
import VitaBellaSlider from '@/components/common/VitaBellaSlider';
import styles from './MembershipCategorySlider.module.css';

const slides = [
  { title: 'Anti-Aging', image: '/modules/menu/antiaging.webp' },
  { title: 'Cognitive Health', image: '/modules/menu/cognitivehealth.webp' },
  { title: 'Hair Loss', image: '/modules/menu/hairloss.webp' },
  { title: 'Hormone Therapy', image: '/modules/menu/hormonetherapy.webp' },
  { title: 'Injury & Recovery', image: '/modules/menu/injuryandrecovery.webp' },
  { title: 'Sexual Wellness', image: '/modules/menu/sexualwellness.webp' },
  { title: 'Skin Care', image: '/modules/menu/skincare.webp' },
  { title: 'Weight Loss', image: '/modules/menu/weightloss.webp' },
];

const MembershipCategorySlider: React.FC = () => {
  return (
    <div className={styles.sliderTrackOuter}>
      <VitaBellaSlider
        items={slides}
        visibleCount={5}
        renderSlide={(slide) => (
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
            </div>          </div>
        )}
        className={styles.customSlider}
      />
    </div>
  );
};

export default MembershipCategorySlider;
