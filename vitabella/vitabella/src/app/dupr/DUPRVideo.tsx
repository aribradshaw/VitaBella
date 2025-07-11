"use client";


import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import styles from "./DUPRVideo.module.css";

const videoUrl = "/modules/dupr/VitaBellaxDUPR.mp4"; // Use your local video file for best compatibility

const DUPRVideo: React.FC = () => {
  return (
    <section className={styles.videoSection}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoBg}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          Sorry, your browser does not support embedded videos.
        </video>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h2 className={styles.headline}>
            WANT A HIGHER RATING? START WITH SMARTER HEALTH.
          </h2>
          <VitaBellaButton
            label="Claim Your Offer Now"
            href="#membershipplans"
            className={styles.ctaButton}
            bg="var(--e-global-color-green)"
            bgHover="var(--e-global-color-white)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-light-green)"
            arrowPathColor="var(--e-global-color-green)"
            arrowPathColorHover="var(--e-global-color-green)"
          />
        </div>
      </div>
    </section>
  );
};

export default DUPRVideo;
