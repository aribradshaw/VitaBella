import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./VitaBellaSlider.module.css";

interface VitaBellaSliderProps<T> {
  items: T[];
  visibleCount: number;
  renderSlide: (item: T, idx: number) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  prevArrow?: React.ReactNode;
  nextArrow?: React.ReactNode;
}

const fadeVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

function VitaBellaSlider<T>({
  items,
  visibleCount,
  renderSlide,
  className = "",
  style = {},
  prevArrow,
  nextArrow,
}: VitaBellaSliderProps<T>) {
  const [index, setIndex] = useState(0);
  const maxIndex = items.length - visibleCount;
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Drag/Swipe logic
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };
  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current || dragStartX.current === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handlePrev();
      else handleNext();
      dragging.current = false;
      dragStartX.current = null;
    }
  };
  const onDragEnd = () => {
    dragging.current = false;
    dragStartX.current = null;
  };

  // Prepare visible slides (looping)
  const slides = items
    .slice(index, index + visibleCount)
    .concat(
      index + visibleCount > items.length
        ? items.slice(0, (index + visibleCount) % items.length)
        : []
    );

  return (
    <div className={`${styles.sliderWrapper} ${className}`.trim()} style={style}>
      <div className={styles.sliderContainer}>
        <button
          className={styles.arrowBtn}
          onClick={handlePrev}
          aria-label="Previous"
          type="button"
        >
          {prevArrow || "\u2039"}
        </button>
        <div className={styles.slidesFlex}>
          <div
            className={styles.sliderTrack}
            ref={sliderRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
            style={{ cursor: 'grab', userSelect: 'none' }}
          >
            <motion.div
              key={index}
              initial={{ x: direction > 0 ? 340 : -340 }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? -340 : 340 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                duration: 0.4,
              }}
              style={{ display: "flex", gap: 'var(--space-1x)' }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {slides.map((item, i) => (
                  <motion.div
                    key={i}
                    layout
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                    style={{ height: "100%" }}
                  >
                    {renderSlide(item, (index + i) % items.length)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <button
          className={styles.arrowBtn}
          onClick={handleNext}
          aria-label="Next"
          type="button"
        >
          {nextArrow || "\u203A"}
        </button>
      </div>
    </div>
  );
}

export default VitaBellaSlider;
