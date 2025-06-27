"use client";

import React from 'react';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import styles from './ScienceModule.module.css';

const ScienceModule: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.moduleWrapper}>
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>
            Driven and backed by{' '}
            <span className={styles.highlightText}>science.</span>
          </h2>
          
          <p className={styles.description}>
            Our unwavering commitment to providing the highest quality care 
            drives us to continually seek out and implement the latest scientific 
            advancements.
          </p>
          
          <p className={styles.additionalText}>
            By staying at the forefront of medical research, we ensure that our 
            protocols and programs are based on the most current scientific 
            evidence, enabling us to deliver effective and innovative treatments 
            that improve patient outcomes.
          </p>
          
          <div className={styles.buttonWrapper}>
            <VitaBellaButton
              href="/product"
              label="Explore Treatments"
              bg="var(--e-global-color-dark-green)"
              bgHover="var(--e-global-color-lightgreen)"
              text="var(--e-global-color-white)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-lightgreen)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-dark-green)"
              arrowPathColorHover="var(--e-global-color-lightgreen)"
              style={{ minWidth: 150, padding: "0.4rem 0.4rem 0.4rem 1rem", width: "auto", display: "inline-flex" }}
            />
          </div>
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.visualContainer}>
            <video 
              className={styles.dnaVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              aria-label="DNA helix animation representing scientific research"
            >
              <source src="/modules/dna.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className={styles.clinicallyProvenBadge}>
              <img 
                src="/modules/clinically-proven.svg" 
                alt="Microscope icon" 
                className={styles.microscopeIcon}
              />
              <span className={styles.badgeText}>Clinically Proven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceModule;
