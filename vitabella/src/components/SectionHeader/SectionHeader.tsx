import React from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ left, right }) => (
  <div className={styles.sectionHeader}>
    <div className={styles.left}>{left}</div>
    <div className={styles.right}>{right}</div>
  </div>
);

export default SectionHeader;
