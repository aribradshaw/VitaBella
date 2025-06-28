"use client";

import React from "react";
import CountUp from "react-countup";
import styles from "./DUPRStats.module.css";

const stats = [
  { value: "10,000", label: "Members Served" },
  { value: "15,000", label: "Provider Consultations" },
  { value: "90%", label: "Report Improved Performance" },
];




const START_POINTS = 4560900;
const POINTS_PER_SECOND = 0.022;



const DUPRStats: React.FC = () => {
  // Calculate how many seconds since navigationStart for SSR hydration safety
  let initial = START_POINTS;
  if (typeof window !== "undefined" && window.performance && window.performance.timing) {
    const now = Date.now();
    const elapsed = (now - window.performance.timing.navigationStart) / 1000;
    initial = Math.floor(START_POINTS + elapsed * POINTS_PER_SECOND);
  }


  return (
    <section className={styles.statsSection}>
      <div className={styles.statsBg} />
      <div className={styles.statsInner}>
        <div className={styles.statCol}>
          <div className={styles.statValue}>10,000</div>
          <div className={styles.statLabel}>Members Served</div>
        </div>
        <div className={styles.statCol}>
          <div className={styles.statValue}>15,000</div>
          <div className={styles.statLabel}>Provider Consultations</div>
        </div>
        <div className={styles.statCol}>
          <div className={styles.statValue}>90%</div>
          <div className={styles.statLabel}>Report Improved<br />Performance</div>
        </div>
        <div className={styles.statCol}>
          <div className={styles.statValue}>
            <CountUp
              start={initial}
              end={initial + 10000000}
              duration={1000000} // Much faster: 1,000,000 in 10,000 seconds (~1.15 days)
              separator="," 
              useEasing={false}
              redraw={false}
              preserveValue={true}
              suffix=""
            />
          </div>
          <div className={styles.statLabel}>DUPR Rating Points<br />Improved</div>
        </div>
      </div>
    </section>
  );
};

export default DUPRStats;
