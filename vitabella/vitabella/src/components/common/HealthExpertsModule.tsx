"use client";

import React from 'react';
import styles from './HealthExpertsModule.module.css';

const healthExperts = [
  {
    src: '/brand/doctors/robertlieske.webp',
    name: 'Dr. Robert Lieske',
    title: 'Chief Medical Officer – MSO',
    subtitle: 'Anti-aging and Hormone specialist'
  },
  {
    src: '/brand/doctors/danielbryan.webp',
    name: 'Dr. Daniel Bryan',
    title: 'Chief Medical Advisor – PC',
    subtitle: 'Anesthesiologist, Hormone & Peptide specialist'
  },
  {
    src: '/brand/doctors/irshadshakir.webp',
    name: 'Dr. Irshad Shakir',
    title: 'Head Collaborating Physician',
    subtitle: 'Orthopedic Surgeon, Injury & Recovery Specialist'
  },
  {
    src: '/brand/doctors/brookeblumetti.webp',
    name: 'Dr. Brooke Blumetti',
    title: 'Chief of Dermatology',
    subtitle: 'Dermatologist, Advanced Skin-Care Specialist'
  }
];


import VitaBellaSlider from './VitaBellaSlider';

const HealthExpertsModule: React.FC = () => {
  // Use 1 slide on mobile, 2 on tablet, 4 on desktop
  const [visibleCount, setVisibleCount] = React.useState(4);

  React.useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 700) setVisibleCount(1);
      else if (window.innerWidth <= 1100) setVisibleCount(2);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  return (
    <section className={styles.healthExpertsModule}>
      <div className="container">
        {/* Show slider on mobile/tablet, grid on desktop */}
        {visibleCount === 4 ? (
          <div className={styles.expertsGrid}>
            {healthExperts.map((expert, index) => (
              <div key={index} className={styles.expertCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={expert.src}
                    alt={expert.name}
                    title={expert.name}
                    className={styles.expertImage}
                  />
                </div>
                <div className={styles.expertInfo}>
                  <h3 className={styles.expertName}>{expert.name}</h3>
                  <p className={styles.expertTitle}>{expert.title}</p>
                  <p className={styles.expertSubtitle}>{expert.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <VitaBellaSlider
            items={healthExperts}
            visibleCount={visibleCount}
            renderSlide={(expert) => (
              <div className={styles.expertCard} style={{ minWidth: 0, width: '100%' }}>
                <div className={styles.imageContainer}>
                  <img
                    src={expert.src}
                    alt={expert.name}
                    title={expert.name}
                    className={styles.expertImage}
                  />
                </div>
                <div className={styles.expertInfo}>
                  <h3 className={styles.expertName}>{expert.name}</h3>
                  <p className={styles.expertTitle}>{expert.title}</p>
                  <p className={styles.expertSubtitle}>{expert.subtitle}</p>
                </div>
              </div>
            )}
            className={styles.sliderOverride}
            style={{ width: '100%' }}
          />
        )}
      </div>
    </section>
  );
};

export default HealthExpertsModule;
