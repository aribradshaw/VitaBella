"use client";

import React from 'react';
import styles from './TrustedAdvisorsModule.module.css';
import VitaBellaButton from '@/components/common/VitaBellaButton';

const TrustedAdvisorsModule: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.moduleWrapper}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img 
              src="/modules/trustedadvisors.webp" 
              alt="Trusted medical advisor" 
              className={styles.doctorImage}
            />
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>                <div className={styles.bulletPoint}>
                  <div className={styles.checkIcon}>✓</div>
                  <div className={styles.bulletText}>
                    <strong>Clinical Experience</strong>
                    Trained at top medical institutions.
                  </div>
                </div>
                <div className={styles.bulletPoint}>
                  <div className={styles.checkIcon}>✓</div>
                  <div className={styles.bulletText}>
                    <strong>Research-Driven Care</strong>
                    Pioneers in hormone and longevity science.
                  </div>
                </div>
                <div className={styles.bulletPoint}>
                  <div className={styles.checkIcon}>✓</div>
                  <div className={styles.bulletText}>
                    <strong>Trusted Advisors</strong>
                    Consultants for leading health organizations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.contentSection}>
          <h2 className={`${styles.title} h2-alt`}>
            Backed by a range of doctors for optimal wellness treatments.
          </h2>
          
          <div className={styles.textContent}>
            <p className="body-text">
              Supported by a team of specialized doctors for optimal wellness treatments.
            </p>
            
            <p className="body-text">
              Our team of dedicated doctors, representing a diverse range of specialties, brings 
              together unique perspectives to provide exceptional care.
            </p>
            
            <p className="body-text">
              By harnessing their collective expertise, and staying current with the latest research, we 
              continuously evaluate innovative treatment options to ensure you receive the highest 
              quality care possible.
            </p>
          </div>
          
          <div className={styles.buttonContainer}>
            <VitaBellaButton href="/treatments">
              Explore Treatments
            </VitaBellaButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedAdvisorsModule;
