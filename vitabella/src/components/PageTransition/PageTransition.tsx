"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import VitaBellaLogo from "../common/VitaBellaLogo";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tiles = 6; // 6x6 grid
  const tileArray = Array.from({ length: tiles * tiles });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [displayedPath, setDisplayedPath] = useState(pathname);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setShowOverlay(true);
  }, [pathname]);

  // When overlay animation is done, show the new page
  const handleOverlayComplete = () => {
    setShowOverlay(false);
    setDisplayedChildren(children);
    setDisplayedPath(pathname);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {showOverlay && (
          <motion.div
            key={pathname + "-overlay"}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--e-global-color-text)",
              overflow: "hidden",
              flexDirection: "column",
            }}
            onAnimationComplete={handleOverlayComplete}
          >
            {/* Animated accent color fill from bottom to top */}
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: 0, opacity: 1 }}
              exit={{ height: "100%", opacity: 0 }}
              transition={{ height: { duration: 0.7, ease: "easeInOut" }, opacity: { duration: 0.7, ease: "easeInOut" } }}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background: "var(--e-global-color-accent)",
                zIndex: 1,
              }}
            />
            <div style={{ textAlign: "center", zIndex: 2, position: "relative" }}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <VitaBellaLogo style={{ width: 120, height: 120, margin: "0 auto", display: "block", color: "var(--e-global-color-secondary)" }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={containerRef} style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {displayedChildren}
      </div>
    </div>
  );
}
