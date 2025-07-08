"use client";
import React, { useState, useRef, useEffect } from "react";

// Simple Tooltip component (no SSR/hydration issues)
export default function Tooltip({ content, children }: { content: React.ReactNode, children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: '50%', transform: 'translateX(-50%)' });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  let showTimeout: any;
  let hideTimeout: any;
  
  const show = () => { 
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => setVisible(true), 120); 
  };
  
  const hide = () => { 
    clearTimeout(showTimeout); 
    hideTimeout = setTimeout(() => setVisible(false), 150);
  };
  
  const cancelHide = () => {
    clearTimeout(hideTimeout);
  };
  
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
    <span 
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={show} 
      onMouseLeave={hide} 
      onFocus={show} 
      onBlur={hide}
    >
      {children}
      {visible && (
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
            minWidth: 220,
            fontSize: 15,
            pointerEvents: 'auto',
          }}
          onMouseEnter={cancelHide}
          onMouseLeave={hide}
        >
          {content}
        </div>
      )}
    </span>
  );
}
