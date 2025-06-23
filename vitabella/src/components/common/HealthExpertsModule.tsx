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

const HealthExpertsModule: React.FC = () => {
  return (
    <section className={styles.healthExpertsModule}>
      <div className="container">
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
      </div>
    </section>
  );
};

export default HealthExpertsModule;
