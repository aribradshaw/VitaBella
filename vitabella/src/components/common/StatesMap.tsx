"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './StatesMap.module.css';
import { getAllStateColors, US_STATES, State } from '@/constants/states';

interface StatesMapProps {
  width?: string;
  className?: string;
  showLegend?: boolean;
}

const StatesMap: React.FC<StatesMapProps> = ({ 
  width = '66%', 
  className = '',
  showLegend = true 
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const stateColors = getAllStateColors();  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const forceHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = (event: MouseEvent, content: string) => {
    // Clear any pending hide timeouts
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (forceHideTimeoutRef.current) {
      clearTimeout(forceHideTimeoutRef.current);
      forceHideTimeoutRef.current = null;
    }
    
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        visible: true,
        content,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top - 30, // More offset to avoid cursor interference
      });

      // Force hide after 5 seconds as a failsafe
      forceHideTimeoutRef.current = setTimeout(() => {
        setTooltip({
          visible: false,
          content: '',
          x: 0,
          y: 0
        });
        forceHideTimeoutRef.current = null;
      }, 5000);
    }
  };  const hideTooltip = () => {
    // Clear any existing timeouts first
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (forceHideTimeoutRef.current) {
      clearTimeout(forceHideTimeoutRef.current);
      forceHideTimeoutRef.current = null;
    }
    
    // Use a very small delay to prevent flickering but ensure hiding
    hideTimeoutRef.current = setTimeout(() => {
      setTooltip({
        visible: false,
        content: '',
        x: 0,
        y: 0
      });
      hideTimeoutRef.current = null;
    }, 50); // Reduced delay for more responsive hiding
  };

  const hideTooltipImmediately = () => {
    // Clear all timeouts and hide immediately
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (forceHideTimeoutRef.current) {
      clearTimeout(forceHideTimeoutRef.current);
      forceHideTimeoutRef.current = null;
    }
    
    setTooltip({
      visible: false,
      content: '',
      x: 0,
      y: 0
    });
  };

  useEffect(() => {
    const loadAndColorSVG = async () => {
      try {
        // Fetch the SVG content
        const response = await fetch('/modules/StatesServiced.svg');
        const svgText = await response.text();
        
        if (svgRef.current) {
          // Insert the SVG into the container
          svgRef.current.innerHTML = svgText;
            // Find the SVG element
          const svgElement = svgRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
              // Apply colors to each state and its label
            Object.entries(stateColors).forEach(([stateCode, colors]) => {
              // Apply colors to ALL state shapes (including separate inset boxes for small states)
              const stateElements = svgElement.querySelectorAll(`.sm_state_${stateCode}`);
              
              stateElements.forEach((stateElement) => {
                (stateElement as SVGElement).style.fill = colors.backgroundColor;
                (stateElement as SVGElement).style.stroke = colors.textColor;
                (stateElement as SVGElement).style.strokeWidth = '0.5';
                (stateElement as SVGElement).style.cursor = 'default';
              });
              
              // Apply colors to state labels specifically
              const labelElement = svgElement.querySelector(`.sm_label_${stateCode}`);
              if (labelElement) {
                (labelElement as SVGElement).style.fill = colors.textColor;
                (labelElement as SVGElement).style.cursor = 'default';
                
                // For small northeastern states, also find and color the corresponding rect element
                // These rects share the same transform coordinates as their labels
                const labelTransform = labelElement.getAttribute('transform');
                if (labelTransform) {
                  const rectElements = svgElement.querySelectorAll(`rect[transform="${labelTransform}"]`);
                  rectElements.forEach((rectElement) => {
                    (rectElement as SVGElement).style.fill = colors.backgroundColor;
                    (rectElement as SVGElement).style.stroke = 'none';
                    (rectElement as SVGElement).style.cursor = 'default';
                  });                }
              }
            });            // Add tooltips and help cursor for states with notes
            Object.entries(stateColors).forEach(([stateCode, colors]) => {
              const state = US_STATES.find((s: State) => s.code === stateCode);
              if (state?.notes) {
                const tooltipContent = `${state.name}: ${state.notes}`;
                
                // Collect all elements that should show the tooltip for this state
                const tooltipElements: Element[] = [];
                
                // Add state shapes
                const stateElements = svgElement.querySelectorAll(`.sm_state_${stateCode}`);
                stateElements.forEach((stateElement) => {
                  (stateElement as SVGElement).style.cursor = 'help';
                  tooltipElements.push(stateElement);
                });

                // Add state labels
                const labelElement = svgElement.querySelector(`.sm_label_${stateCode}`);
                if (labelElement) {
                  (labelElement as SVGElement).style.cursor = 'help';
                  tooltipElements.push(labelElement);
                  
                  // Add corresponding rect elements as well
                  const labelTransform = labelElement.getAttribute('transform');
                  if (labelTransform) {
                    const rectElements = svgElement.querySelectorAll(`rect[transform="${labelTransform}"]`);
                    rectElements.forEach((rectElement) => {
                      (rectElement as SVGElement).style.cursor = 'help';
                      tooltipElements.push(rectElement);
                    });
                  }
                }                  // Add consistent event listeners to all elements for this state
                tooltipElements.forEach((element) => {
                  element.addEventListener('mouseenter', (e) => {
                    showTooltip(e as MouseEvent, tooltipContent);
                  });
                  
                  element.addEventListener('mouseleave', () => {
                    hideTooltip();
                  });
                });
              } else {
                // For states without notes, add listeners to hide tooltip if open
                const stateElements = svgElement.querySelectorAll(`.sm_state_${stateCode}`);
                stateElements.forEach((stateElement) => {
                  stateElement.addEventListener('mouseenter', () => {
                    if (tooltip.visible) hideTooltipImmediately();
                  });
                });
                const labelElement = svgElement.querySelector(`.sm_label_${stateCode}`);
                if (labelElement) {
                  labelElement.addEventListener('mouseenter', () => {
                    if (tooltip.visible) hideTooltipImmediately();
                  });
                  // Also handle rects for small states
                  const labelTransform = labelElement.getAttribute('transform');
                  if (labelTransform) {
                    const rectElements = svgElement.querySelectorAll(`rect[transform="${labelTransform}"]`);
                    rectElements.forEach((rectElement) => {
                      rectElement.addEventListener('mouseenter', () => {
                        if (tooltip.visible) hideTooltipImmediately();
                      });
                    });
                  }
                }
              }
            });            // Add a global mouseleave listener to the SVG to ensure tooltip hides
            svgElement.addEventListener('mouseleave', () => {
              hideTooltipImmediately();
            });

            // Add click listener to hide tooltip on any click
            svgElement.addEventListener('click', () => {
              hideTooltipImmediately();
            });
          }
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        // Fallback to regular img tag
        if (svgRef.current) {
          svgRef.current.innerHTML = `<img src="/modules/StatesServiced.svg" alt="States Serviced Map" style="width: 100%; height: auto; display: block;" />`;
        }
      }
    };    loadAndColorSVG();
      // Cleanup function
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (forceHideTimeoutRef.current) {
        clearTimeout(forceHideTimeoutRef.current);
      }
    };
  }, [stateColors]);
  return (
    <div className={`${styles.statesMapContainer} ${className}`}>
      <div className={styles.mapContainer} style={{ width }}>
        <div ref={svgRef} className={styles.statesMap} />
        {tooltip.visible && (
          <div 
            className={styles.tooltip}
            style={{
              left: tooltip.x,
              top: tooltip.y,
            }}
          >
            {tooltip.content}
          </div>
        )}
        {showLegend && (
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <img 
                src="/brand/Brandmark.svg" 
                alt="Service Available" 
                className={`${styles.legendBrandmark} ${styles.legendBrandmarkGreen}`}
                style={{ width: 24, height: 24 }}
              />
              <span className={styles.legendText}>Service Available</span>
            </div>
            <div className={styles.legendItem}>
              <img 
                src="/brand/Brandmark.svg" 
                alt="Service Not Yet Available" 
                className={`${styles.legendBrandmark} ${styles.legendBrandmarkDarkGreen}`}
                style={{ width: 24, height: 24 }}
              />
              <span className={styles.legendText}>Service Not Yet Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatesMap;
