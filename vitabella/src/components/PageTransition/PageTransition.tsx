"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tiles = 6; // 6x6 grid
  const tileArray = Array.from({ length: tiles * tiles });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        {/* Checkerboard overlay for transition - only on client */}
        {isClient && (
          <AnimatePresence>
            <motion.div
              key={pathname + "-tiles"}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1000,
                pointerEvents: "none",
                display: "grid",
                gridTemplateColumns: `repeat(${tiles}, 1fr)`,
                gridTemplateRows: `repeat(${tiles}, 1fr)`,
              }}
            >
              {tileArray.map((_, i) => {
                const row = Math.floor(i / tiles);
                const col = i % tiles;
                // Stagger delay for checkerboard effect
                const delay = (row + col) * 0.05;
                return (
                  <motion.div
                    key={i}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 90 }}
                    exit={{ rotateY: 0 }}
                    transition={{ duration: 0.5, delay, ease: "easeInOut" }}
                    style={{
                      background: "#fff",
                      width: "100%",
                      height: "100%",
                      transformStyle: "preserve-3d",
                    }}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
        <div ref={containerRef} style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
