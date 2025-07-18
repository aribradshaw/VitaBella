"use client";
import React, { useState, useRef, useEffect } from "react";
import MobileLabPopup from "./MobileLabPopup";

// Simple Tooltip component (no SSR/hydration issues)
export default function Tooltip({ content, children, onMobileClick, mobilePopupProps, mobileContent }: { 
  content: React.ReactNode, 
  children: React.ReactNode, 
  onMobileClick?: () => void,
  mobilePopupProps?: {
    onAdd?: () => void;
    addButtonText?: string;
    showAddButton?: boolean;
  },
  mobileContent?: React.ReactNode
}) {
  const [visible, setVisible] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [position, setPosition] = useState({ left: '50%', transform: 'translateX(-50%)' });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  let showTimeout: any;
  let hideTimeout: any;
  
  const show = () => { 
    if (isMobile) return; // Don't show tooltip on mobile
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => setVisible(true), 120); 
  };
  
  const hide = () => { 
    if (isMobile) return; // Don't hide tooltip on mobile (it won't be shown)
    clearTimeout(showTimeout); 
    hideTimeout = setTimeout(() => setVisible(false), 150);
  };
  
  const cancelHide = () => {
    if (isMobile) return; // Don't cancel hide on mobile
    clearTimeout(hideTimeout);
  };

  const handleClick = () => {
    if (isMobile && !showMobilePopup) { // Only open if not already open
      setShowMobilePopup(true);
      if (onMobileClick) {
        onMobileClick();
      }
    }
  };

  const closeMobilePopup = () => {
    setShowMobilePopup(false);
  };
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (visible && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Get the actual tooltip width after rendering
      const tooltipWidth = tooltip.offsetWidth;
      
      // Calculate optimal position
      const tooltipLeft = rect.left + (rect.width / 2) - (tooltipWidth / 2);
      const tooltipRight = tooltipLeft + tooltipWidth;
      
      if (tooltipLeft < 20) {
        // Tooltip overflows on the left - position it at the left edge with padding
        const leftOffset = Math.max(20 - rect.left, 0);
        setPosition({ left: `${leftOffset}px`, transform: 'translateX(0)' });
      } else if (tooltipRight > viewportWidth - 20) {
        // Tooltip overflows on the right - position it at the right edge with padding
        const rightOffset = Math.max(tooltipRight - (viewportWidth - 20), 0);
        setPosition({ left: '50%', transform: `translateX(calc(-50% - ${rightOffset}px))` });
      } else {
        // Tooltip fits, center it
        setPosition({ left: '50%', transform: 'translateX(-50%)' });
      }
    }
  }, [visible]);
  
  return (
    <>
      <span 
        ref={containerRef}
        onMouseEnter={show} 
        onMouseLeave={hide} 
        onFocus={show} 
        onBlur={hide}
        onClick={handleClick}
        style={{
          position: 'relative', 
          display: 'inline-block',
          cursor: isMobile ? 'pointer' : 'help'
        }}
      >
        {children}
        {visible && !isMobile && (
          <div 
            ref={tooltipRef}
            style={{
              position: 'absolute',
              left: position.left,
              bottom: '110%',
              transform: position.transform,
              background: '#fff',
              color: '#113c1c',
              border: '1px solid #b6d7b9',
              borderRadius: 8,
              boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
              padding: 16,
              zIndex: 9999,
              minWidth: isMobile ? 200 : 220,
              fontSize: isMobile ? 16 : 15,
              pointerEvents: 'auto',
            }}
            onMouseEnter={cancelHide}
            onMouseLeave={hide}
          >
            {content}
          </div>
        )}
      </span>
      
      {/* Mobile popup */}
      <MobileLabPopup
        isOpen={showMobilePopup}
        onClose={closeMobilePopup}
        content={mobileContent || content}
        onAdd={mobilePopupProps?.onAdd}
        addButtonText={mobilePopupProps?.addButtonText}
        showAddButton={mobilePopupProps?.showAddButton}
      />
    </>
  );
}
