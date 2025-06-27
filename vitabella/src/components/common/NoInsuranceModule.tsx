import React from 'react';
import VitaBellaButton from './VitaBellaButton';
import styles from './NoInsuranceModule.module.css';

interface NoInsuranceModuleProps {
  pageTitle?: string;
}

const NoInsuranceModule: React.FC<NoInsuranceModuleProps> = ({ pageTitle = "Sexual Wellness" }) => {
  return (
    <section 
      className={styles.noInsuranceSection}
      style={{ margin: 0, width: '100vw', left: '50%', right: '50%', position: 'relative', transform: 'translateX(-50%)' }}
    >
      <div className={styles.innerContainer}>
        <div className={styles.contentWrap}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <img 
                src="/modules/suncheck.svg" 
                alt="No Insurance Needed" 
                className={styles.headerIcon}
              />
              <span className={styles.headerText}>No Insurance Needed</span>
            </div>
            
            <h3 className={styles.cardTitle}>What's included?</h3>
            
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.checkIcon}>✓</div>
                <span className={styles.benefitText}>Expert {pageTitle.toLowerCase()} consultation</span>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.checkIcon}>✓</div>
                <span className={styles.benefitText}>Ongoing check-ins & support</span>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.checkIcon}>✓</div>
                <span className={styles.benefitText}>Nutritional guidance</span>
              </div>
            </div>
            
            <VitaBellaButton 
              href="/membership"
              className={styles.ctaButton}
              label="Start Your Journey"
              bg="var(--e-global-color-dark-green)"
              bgHover="var(--e-global-color-green)"
              text="var(--e-global-color-white)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-green)"
              arrowPathColor="var(--e-global-color-dark-green)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColorHover="var(--e-global-color-green)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoInsuranceModule;
