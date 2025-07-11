"use client";

import React from "react";
import Image from "next/image";
import styles from "./DUPRWhyItMatters.module.css";

const DUPRWhyItMatters: React.FC = () => {
  return (
    <section className={styles.whySection}>
      <div className={styles.whyInner}>
        <div className={styles.imageCol}>
          <Image
            src="/modules/dupr/ball.webp"
            alt="Athlete holding pickleball"
            fill
            priority
            className={styles.whyImage}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.whyLabel}>WHY IT MATTERS</div>
          <h2 className={styles.whyTitle}>
            Built For Athletes Who Aren’t Slowing Down
          </h2>
          <div className={styles.whyDesc}>
            Vita Bella is one of the most advanced health and wellness platforms in the U.S., helping athletes 25+ push their performance further with physician-guided protocols.<br /><br />
            From Peptide Therapy and Hormone Optimization to modern treatments like NAD+, our programs are engineered to support:
          </div>
          <ul className={styles.whyList}>
            <li> Explosive endurance</li>
            <li> Mental clarity and focus</li>
            <li> Physical power and energy</li>
            <li> Injury, recovery and repair</li>
          </ul>
          <div className={styles.whyFootnote}>
            This isn’t surface-level wellness. It’s precision-based performance care for serious players.
          </div>
        </div>
      </div>
    </section>
  );
};

export default DUPRWhyItMatters;
