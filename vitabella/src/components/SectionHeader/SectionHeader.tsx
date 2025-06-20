import React from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderLeft {
  h2Alt: React.ReactNode;
  h2: React.ReactNode;
}

interface SectionHeaderProps {
  left: React.ReactNode | SectionHeaderLeft;
  right: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ left, right }) => {
  if (
    typeof left === "object" &&
    left !== null &&
    "h2Alt" in left &&
    "h2" in left
  ) {
    const l = left as SectionHeaderLeft;
    return (
      <div className={styles.sectionHeader}>
        <div className={styles.left}>
          <div className="h2-alt">{l.h2Alt}</div>
          <div className="h2">{l.h2}</div>
        </div>
        <div className={`${styles.right} body-text`}>{right}</div>
      </div>
    );
  }
  // fallback for legacy usage
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.left}>{left}</div>
      <div className={`${styles.right} body-text`}>{right}</div>
    </div>
  );
};

export default SectionHeader;
