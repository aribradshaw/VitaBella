import React, { useState } from "react";
import styles from "./SimpleCustomerSlider.module.css";

const testimonials = [
  {
    src: "/testimonial/simple/breanna.webp",
    alt: "Breanna S. standing in a modern kitchen",
    caption: "Breanna S."
  },
  {
    src: "/testimonial/simple/marilyn.webp",
    alt: "Marilyn C. posing with arms crossed",
    caption: "Marilyn C."
  },
  {
    src: "/testimonial/simple/amir.webp",
    alt: "Amir V. showing fitness progress",
    caption: "Amir V."
  },
  {
    src: "/testimonial/simple/jonathan.webp",
    alt: "Jonathan C. taking a mirror selfie in an elevator",
    caption: "Jonathan C."
  }
];

const SimpleCustomerSlider = () => {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;
  const maxIndex = testimonials.length - visibleCount;

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className={styles.sliderWrapper}>
      <button
        className={styles.arrowBtn}
        onClick={handlePrev}
        disabled={index === 0}
        aria-label="Previous testimonials"
      >
        &#x2039;
      </button>
      <div className={styles.sliderTrack}>
        {testimonials.slice(index, index + visibleCount).map((t, i) => (
          <div className={styles.slide} key={t.caption}>
            <img
              src={t.src}
              alt={t.alt}
              className={styles.photo}
              draggable={false}
            />
            <div className={styles.caption}>{t.caption}</div>
          </div>
        ))}
      </div>
      <button
        className={styles.arrowBtn}
        onClick={handleNext}
        disabled={index === maxIndex}
        aria-label="Next testimonials"
      >
        &#x203A;
      </button>
    </div>
  );
};

export default SimpleCustomerSlider;
