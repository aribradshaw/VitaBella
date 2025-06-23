"use client";

import React from 'react';
import styles from './FeelTheDifferenceModule.module.css';
import VitaBellaButton from '@/components/common/VitaBellaButton';

interface FeelTheDifferenceModuleProps {
  onMembershipPage?: boolean;
}

const trustIndicators = [
  { src: '/modules/backedbyexperts.webp', alt: 'Backed by Experts' },
  { src: '/modules/clinicallyprovenresults.webp', alt: 'Clinically Proven Results' },
  { src: '/modules/fastdiscreethipping.webp', alt: 'Fast, Discreet Shipping' },
  { src: '/modules/hipaa.webp', alt: 'HIPAA Compliant' },
];

const FeelTheDifferenceModule: React.FC<FeelTheDifferenceModuleProps> = ({ onMembershipPage = false }) => {
  const handleButtonClick = () => {
    if (onMembershipPage) {
      // Scroll to MembershipPlans section
      const membershipPlansElement = document.querySelector('#membership-plans');
      if (membershipPlansElement) {
        membershipPlansElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to membership page
      window.location.href = '/membership';
    }
  };

  return (
    <section className={styles.feelTheDifferenceModule}>
      <div className={styles.heroSection}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h2 className={styles.title}>
            Feel the Difference
          </h2>
          <p className={styles.subtitle}>
            Powerful, Effective, Lasting.
          </p>
          <div className={styles.divider} />          <div className={styles.buttonContainer}>
            {onMembershipPage ? (
              <VitaBellaButton onClick={handleButtonClick}>
                Start Your Journey
              </VitaBellaButton>
            ) : (
              <VitaBellaButton href="/membership">
                Start Your Journey
              </VitaBellaButton>
            )}
          </div>
            <div className={styles.trustImagesContainer}>
            <div className={styles.scrollingContainer}>
              <div className={styles.scrollingContent}>                {/* First set of indicators */}
                {trustIndicators.map((indicator, index) => (
                  <div key={`first-${index}`} className={styles.trustItem}>
                    <img 
                      src={indicator.src} 
                      alt={indicator.alt}
                      title={indicator.alt}
                      className={styles.trustImage}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless scrolling */}
                {trustIndicators.map((indicator, index) => (
                  <div key={`second-${index}`} className={styles.trustItem}>
                    <img 
                      src={indicator.src} 
                      alt={indicator.alt}
                      title={indicator.alt}
                      className={styles.trustImage}
                    />
                  </div>
                ))}
                {/* Third set for extra seamless loop */}
                {trustIndicators.map((indicator, index) => (
                  <div key={`third-${index}`} className={styles.trustItem}>
                    <img 
                      src={indicator.src} 
                      alt={indicator.alt}
                      title={indicator.alt}
                      className={styles.trustImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeelTheDifferenceModule;
