"use client";
import React, { useState, useRef, useEffect } from "react";
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
  currentIndex?: number;
  onSlideChange?: (idx: number) => void;
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
  currentIndex,
  onSlideChange,
}: VitaBellaSliderProps<T>) {
  const [index, setIndex] = useState(currentIndex || 0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Sync with controlled currentIndex
  useEffect(() => {
    if (typeof currentIndex === 'number' && currentIndex !== index) {
      setDirection(currentIndex > index ? 1 : -1);
      setIndex(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Clean infinite loop logic
  const handlePrev = () => {
    setDirection(-1);
    const newIndex = (index - 1 + items.length) % items.length;
    setIndex(newIndex);
    if (onSlideChange) onSlideChange(newIndex);
  };
  const handleNext = () => {
    setDirection(1);
    const newIndex = (index + 1) % items.length;
    setIndex(newIndex);
    if (onSlideChange) onSlideChange(newIndex);
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
  const slides = Array.from({ length: visibleCount }, (_, i) => {
    const idx = (index + i) % items.length;
    return items[idx];
  });

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
          >            <motion.div
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
              style={{ display: "flex", gap: '12px', alignItems: 'stretch', height: '100%' }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {slides.map((item, i) => (                  <motion.div
                    key={i}
                    layout
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                    style={{ height: "100%", display: "flex", alignItems: "stretch" }}
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
