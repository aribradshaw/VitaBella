"use client";

import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import Image from "next/image";
import styles from "./DUPRHero.module.css";


interface DUPRHeroProps {
  onStartPlanClick?: () => void;
}

const DUPRHero: React.FC<DUPRHeroProps> = ({ onStartPlanClick }) => {
  return (
    <section className={styles.heroSection}>
      <Image
        src="/modules/dupr/armhero.webp"
        alt="DUPR Hero Background"
        fill
        priority
        className={styles.bgImage}
        sizes="100vw"
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>WELCOME DUPR MEMBERS</h1>
        <div className={styles.heroDescBox}>
          <p className={styles.heroDesc}>
            As The Official Wellness Partner of DUPR, Vita Bella offers physician-led programs designed to help athletes 25+ play harder, recover faster, and stay in the game.
          </p>
        </div>
        <div className={styles.buttonRow}>
          <VitaBellaButton
            label="Start My Custom Plan"
            href="#membershipplans"
            onClick={onStartPlanClick}
            bg="var(--e-global-color-green)"
            bgHover="var(--e-global-color-dark-green)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-white)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-green)"
            arrowPathColor="var(--e-global-color-green)"
            arrowPathColorHover="var(--e-global-color-dark-green)"
            style={{ minWidth: 280, fontWeight: 700 }}
            type="button"
          />
          <VitaBellaButton
            label="Learn More"
            href="/"
            bg="var(--e-global-color-white)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-green)"
            arrowPathColorHover="var(--e-global-color-green)"
            style={{ minWidth: 160, fontWeight: 700 }}
          />
        </div>
      </div>
    </section>
  );
};

export default DUPRHero;
