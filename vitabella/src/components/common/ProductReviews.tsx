import React from "react";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./CustomerReviews.module.css";
import reviews from "./ProductReviews/reviews.json";

const VISIBLE_CARDS = 3;

const CARD_MIN_HEIGHT = 520; // px, baseline for short reviews
const CARD_WIDTH = 360; // px, slightly thinner
const IMAGE_HEIGHT = 320; // px, increased for taller images

const ProductReviewCard: React.FC<{ review: typeof reviews[0]; idx: number }> = ({ review, idx }) => {
  return (
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
          padding: 'var(--space-1x)', // uniform padding on all sides
          paddingBottom: 0, // Reduce bottom padding to minimize space below image
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
          paddingTop: 8, // Reduce top padding to minimize space above caption
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
};

interface ProductReviewsProps {
  subheader?: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = () => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", margin: 0, padding: 0, paddingBottom: 'var(--space-2x)' }}>
      <div style={{ width: "100%" }}>
        <VitaBellaSlider
          items={reviews}
          visibleCount={VISIBLE_CARDS}
          renderSlide={(review, idx) => <ProductReviewCard review={review} idx={idx} />}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
