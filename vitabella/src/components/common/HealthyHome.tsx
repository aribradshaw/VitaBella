import React from "react";
import Image from "next/image";
import styles from "../../app/about/AboutStorySection.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import buttonStyles from "./NoInsuranceModule.module.css"; // Import the button styles

const HealthyHome = () => (
  <section
    className={styles["about-story-section"] + " container"}
    style={{ display: 'flex', alignItems: 'stretch' }} // Make section a flex container
  >
    {/* Left: Yoga photo */}
    <div
      className={styles["about-story-photo"]}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, position: 'relative', minHeight: 400 }} // Add position: relative and minHeight
    >
      <Image
        src="/modules/yoga.webp"
        alt="Healthy lifestyle yoga pose"
        fill // Use fill to cover the container
        style={{ borderRadius: 32, objectFit: "cover", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", width: '100%', height: '100%' }}
        className="img"
        priority
      />
    </div>
    {/* Right: Story and clinically-proven box */}
    <div
      className={styles["about-story-content"]}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'auto' }} // Remove fixed height
    >
      <h2 className="h2" style={{ fontWeight: 700, fontSize: 50, marginTop: 0, marginBottom: 16, lineHeight: 1.1 }}>
        Healthy,<br />Not Just For The Wealthy
      </h2>
      <div className="body-text" style={{ marginBottom: 32 }}>
        <p style={{ margin: 0 }}>
          We’re on a mission to make accessible wellness solutions a reality for everyone. In industry where treatment costs can be sky high, we offer affordability without burning a hole in your pocket. Our commitment is to create high-quality solutions that seamlessly integrate into and elevate your lifestyle.
        </p>
        <ul style={{ margin: '18px 0 0 0', padding: '0 0 0 18px', fontSize: 16, color: '#333', lineHeight: 1.6 }}>
          <li>Huge savings with wholesale pricing on all medications</li>
          <li>Top Quality: FDA-Approved medication or US-Compounded medication</li>
          <li>Regular virtual check-ins for consistent and accountable support</li>
          <li>Diverse treatment options for custom tailored plans</li>
          <li>Licensed providers offering personalized and individualized care</li>
        </ul>
      </div>
      {/* Clinically-Proven Solutions box */}
      <div style={{ background: "var(--e-global-color-off-white)", borderRadius: 24, display: "flex", alignItems: "center", gap: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #e0e0e0", width: "100%", marginTop: 'auto', minHeight: 140 }}>
        <Image
          src="/modules/doctorgirl.webp"
          alt="Clinically-Proven Solutions"
          width={220}
          height={140}
          style={{ borderRadius: 16, objectFit: "cover", minWidth: 220, maxWidth: 220, height: 140, margin: 'var(--space-1x) 0 var(--space-1x) var(--space-1x)' }}
          priority
        />
        <div style={{ flex: 1, paddingRight: "var(--space-1x)", background: "var(--e-global-color-off-white)" }}>
          <div style={{ fontWeight: 700, fontSize: 19, color: "#012B27", marginBottom: 4 }}>
            Clinically-Proven Solutions <span style={{ fontWeight: 400 }}>Backed by Experts</span>
          </div>
          <div style={{ fontSize: 15, color: "#333", marginBottom: 12 }}>
            At Vita Bella, we use the latest science-backed treatments to help you meet your goals safely and effectively.
          </div>
          <VitaBellaButton 
            href="/membership" 
            style={{ minWidth: 0, width: 180, fontSize: '1rem', padding: '0.4rem' }}
            className={buttonStyles.ctaButton}
          >
            Get Started
          </VitaBellaButton>
        </div>
      </div>
    </div>
  </section>
);

export default HealthyHome;
