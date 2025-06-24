"use client";

import React from 'react';
import styles from './TelemedicineModule.module.css';

const TelemedicineModule: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.moduleWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.telemedicineInterface}>
            <img 
              src="/modules/staceysmith.webp" 
              alt="Telemedicine consultation interface" 
              className={styles.interfaceImage}
            />
          </div>
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.quoteSection}>
            <blockquote className={styles.quote}>
              With proper supervision from a Vita Bella medical professional, our protocols can effectively optimize patients' mental and physical capabilities.
            </blockquote>
            
            <div className={styles.divider}></div>
            
            <div className={styles.doctorInfo}>
              <div className={styles.doctorImageContainer}>
                <img 
                  src="/brand/doctors/robertlieske.webp" 
                  alt="Dr. Robert Lieske" 
                  className={styles.doctorImage}
                />
              </div>
              <div className={styles.doctorDetails}>
                <h3 className={styles.doctorName}>Dr. Robert Lieske</h3>
                <p className={styles.doctorTitle}>CHIEF MEDICAL OFFICER – MSO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineModule;
