import React from "react";
import Image from "next/image";
import styles from "../../app/about/AboutStorySection.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";

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
      <div className={styles["clinically-proven-box"]}>
        <Image
          src="/modules/doctorgirl.webp"
          alt="Clinically-Proven Solutions"
          width={220}
          height={140}
          className={styles["clinically-proven-img"]}
          priority
        />
        <div className={styles["clinically-proven-content"]}>
          <div style={{ fontWeight: 700, fontSize: 19, color: "#012B27", marginBottom: 4 }}>
            Clinically-Proven Solutions <span style={{ fontWeight: 400 }}>Backed by Experts</span>
          </div>
          <div style={{ fontSize: 15, color: "#333", marginBottom: 12 }}>
            At Vita Bella, we use the latest science-backed treatments to help you meet your goals safely and effectively.
          </div>
          <VitaBellaButton 
            href="/membership"
            label="Get Started"
            bg="var(--e-global-color-dark-green)"
            bgHover="var(--e-global-color-lightgreen)"
            text="var(--e-global-color-white)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-lightgreen)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-dark-green)"
            arrowPathColorHover="var(--e-global-color-lightgreen)"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HealthyHome;
