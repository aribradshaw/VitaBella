import React from "react";
import Image from "next/image";
import styles from "./AboutStorySection.module.css";

const AboutStorySection = () => (
  <section className={styles["about-story-section"] + " container"}>
    {/* Left: Group photo */}
    <div className={styles["about-story-photo"]}>
      <Image
        src="/modules/aboutpeople.webp"
        alt="Vita Bella team group photo"
        width={480}
        height={480}
        style={{ borderRadius: 32, width: "100%", height: "auto", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
        className="img"
        priority
      />
    </div>
    {/* Right: Story and quote */}
    <div className={styles["about-story-content"]}>
      <h2 className="h2" style={{ fontWeight: 700, fontSize: 50, marginTop: 0, marginBottom: 16, lineHeight: 1.1 }}>
        Created as an affordable, high-quality wellness program.
      </h2>
      <div className="body-text" style={{ marginBottom: 32 }}>
        <p style={{ margin: 0 }}>
          Behind all passionate companies is a <b>story</b>.<br /><br />
          The story of our founder – who after a traumatic injury and surgery, was looking for a better way to heal and get back to his pre-injury self faster.<br /><br />
          After doing his research, he discovered the medicine that could help him was available, but its cost was extremely high, and thus not available to the general public.<br /><br />
          That is how <b>Vita Bella</b> was born!
        </p>
      </div>
      {/* Quote box */}
      <div
        className={styles["about-story-quote-box"]}
      >
        <div className={styles["about-story-quote-photo-wrapper"]}>
          <Image
            src="/modules/PhilVella.webp"
            alt="Phil Vella, Founder & CEO"
            width={140}
            height={110}
            className={styles["about-story-quote-photo"]}
            priority
          />
        </div>
        <div className={styles["about-story-quote-content"]}>
          <div style={{ fontSize: 21, fontStyle: "italic", marginBottom: 16, color: "#012B27" }}>
            “Frustration turned into a mission to build a company that helps healthcare become accessible to all.”
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#012B27" }}>Phil Vella</div>
          <div style={{ fontSize: 16, color: "#555" }}>Founder & CEO</div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutStorySection;
