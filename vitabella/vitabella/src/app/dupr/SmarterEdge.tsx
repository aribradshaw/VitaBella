"use client";

import React from "react";
import Image from "next/image";
import styles from "./SmarterEdge.module.css";

const SmarterEdge: React.FC = () => {
  return (
    <section className={styles.smarterSection}>
      <div className={styles.bgWrap}>
        <Image
          src="/modules/dupr/purple.webp"
          alt="Purple pickleball background"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.topFan} />
        <div className={styles.bottomFan} />
        <div className={styles.topGradient} />
      </div>
      <div className={styles.smarterContent}>
        <div className={styles.smarterLabel}>WHY IT MATTERS FOR PICKLEBALL</div>
        <h2 className={styles.smarterTitle}>
          Competitive Pickleball Demands A Smarter Edge
        </h2>
        <div className={styles.smarterDesc}>
          Pickleball is fast, dynamic, and demanding, especially as we age.<br />
          You’ve already got the skill. Vita Bella brings the medical performance tools to help you unlock it.
        </div>
        <blockquote className={styles.smarterQuote}>
          “We treat many patients, but active Pickleball players often benefit from advanced peptide therapy, hormone therapy, and NAD+ — for enhanced performance and increased endurance.”
        </blockquote>
        <div className={styles.smarterAuthor}>
          Phil Vella, CEO & Founder of Vita Bella
        </div>
      </div>
    </section>
  );
};

export default SmarterEdge;
