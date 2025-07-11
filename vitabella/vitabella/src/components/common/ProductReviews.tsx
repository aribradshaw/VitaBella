"use client";
import React from "react";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./CustomerReviews.module.css";
import reviews from "./ProductReviews/reviews.json";
import { useEffect, useState } from "react";

const VISIBLE_CARDS = 3;


const CARD_MIN_HEIGHT = 520; // px, baseline for short reviews
const CARD_WIDTH = 360; // px, desktop
const IMAGE_HEIGHT = 320; // px, desktop

// Mobile card sizing (from SimpleCustomerSlider)
const MOBILE_CARD_MIN_WIDTH = 260;
const MOBILE_CARD_MAX_WIDTH = 160;
const MOBILE_IMAGE_WIDTH = 200;
const MOBILE_IMAGE_HEIGHT = 200;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile;
}

// Desktop card (unchanged)
const ProductReviewCard: React.FC<{ review: typeof reviews[0]; idx: number }> = ({ review, idx }) => (
  <div
    className={styles.reviewCard}
    key={idx}
    style={{
      minWidth: CARD_WIDTH,
      maxWidth: CARD_WIDTH,
      minHeight: CARD_MIN_HEIGHT,
      height: 'auto',
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      margin: "0 10px",
      padding: 0,
      boxSizing: "border-box",
    }}
  >
    <div
      className={styles.reviewImageWrap}
      style={{
        width: '100%',
        height: IMAGE_HEIGHT,
        alignSelf: "center",
        minWidth: '100%',
        minHeight: IMAGE_HEIGHT,
        maxWidth: '100%',
        maxHeight: IMAGE_HEIGHT,
        margin: 0,
        borderRadius: "1rem 1rem 0 0",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: 'none',
        boxSizing: 'border-box',
        padding: 'var(--space-1x)',
        paddingBottom: 0,
      }}
    >
      <img
        src={
          review.image.startsWith("/") || review.image.startsWith("http")
            ? review.image
            : "/" + review.image.replace(/^vitabella\/(public\/?)/, "")
        }
        alt={review.name}
        className={styles.reviewImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: "cover",
          borderRadius: "1rem",
          display: "block",
        }}
      />
    </div>
    <div
      className={styles.reviewTextWrap}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 'var(--space-2x)',
        paddingTop: 8,
      }}
    >
      <div className={styles.reviewTitle} style={{ textTransform: "uppercase", marginBottom: 6, marginTop: 0 }}>{review.caption}</div>
      <div className={styles.reviewText} style={{ marginBottom: 10, fontSize: "1.05rem" }}>&ldquo;{review.review}&rdquo;</div>
      <div className={styles.reviewName} style={{ marginTop: "auto" }}>{review.name}</div>
      <div className={styles.verified}>
        <span className={styles.verifiedIcon}>✔</span> Verified Patient
      </div>
    </div>
  </div>
);

// Mobile card (adopts sizing from SimpleCustomerSlider)
const ProductReviewCardMobile: React.FC<{ review: typeof reviews[0]; idx: number }> = ({ review, idx }) => (
  <div
    className={styles.reviewCard}
    key={idx}
    style={{
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 2px 8px rgba(44, 60, 50, 0.07)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: MOBILE_CARD_MIN_WIDTH,
      maxWidth: MOBILE_CARD_MAX_WIDTH,
      flex: '1 1 0',
      padding: 'var(--space-1x)',
      margin: '0 2px',
      boxSizing: 'border-box',
      minHeight: CARD_MIN_HEIGHT,
      height: 'auto',
      justifyContent: 'flex-start',
    }}
  >
    <img
      src={
        review.image.startsWith("/") || review.image.startsWith("http")
          ? review.image
          : "/" + review.image.replace(/^vitabella\/(public\/?)/, "")
      }
      alt={review.name}
      className={styles.reviewImage}
      style={{
        width: MOBILE_IMAGE_WIDTH,
        height: MOBILE_IMAGE_HEIGHT,
        objectFit: 'cover',
        borderRadius: 'var(--border-radius, 1rem)',
        marginBottom: '0.1rem',
        background: '#e0e0e0',
        boxShadow: '0 2px 8px rgba(44, 60, 50, 0.07)',
        display: 'block',
      }}
    />
    <div
      className={styles.reviewTextWrap}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 'var(--space-1x)',
        paddingTop: 8,
      }}
    >
      <div className={styles.reviewTitle} style={{ textTransform: "uppercase", marginBottom: 6, marginTop: 0 }}>{review.caption}</div>
      <div className={styles.reviewText} style={{ marginBottom: 10, fontSize: "1.05rem" }}>&ldquo;{review.review}&rdquo;</div>
      <div className={styles.reviewName} style={{ marginTop: "auto" }}>{review.name}</div>
      <div className={styles.verified}>
        <span className={styles.verifiedIcon}>✔</span> Verified Patient
      </div>
    </div>
  </div>
);

interface ProductReviewsProps {
  subheader?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", margin: 0, padding: 0, paddingBottom: 'var(--space-2x)' }}>
      <div style={{ width: "100%" }}>
        {isMobile ? (
          <VitaBellaSlider
            items={reviews}
            visibleCount={1}
            renderSlide={(review, idx) => <ProductReviewCardMobile review={review} idx={idx} />}
          />
        ) : (
          <VitaBellaSlider
            items={reviews}
            visibleCount={VISIBLE_CARDS}
            renderSlide={(review, idx) => <ProductReviewCard review={review} idx={idx} />}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
