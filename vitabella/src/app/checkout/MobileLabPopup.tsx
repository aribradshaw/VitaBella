"use client";
import React, { useEffect } from "react";

interface MobileLabPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  onAdd?: () => void;
  addButtonText?: string;
  showAddButton?: boolean;
}

export default function MobileLabPopup({ isOpen, onClose, content, onAdd, addButtonText = "Add", showAddButton = true }: MobileLabPopupProps) {
  // Handle escape key and background click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          backdropFilter: 'blur(2px)',
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Small delay to prevent immediate reopening
          setTimeout(() => {
            onClose();
          }, 10);
        }}
      />
      
      {/* Popup */}
      <div
        data-mobile-popup="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 9999,
          maxHeight: '70vh',
          overflow: 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-out',
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent clicks from bubbling through
        }}
      >
        {/* Header with add and close buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px 12px 20px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div style={{
            fontWeight: 600,
            fontSize: '18px',
            color: '#113c1c'
          }}>
            Lab Panel Details
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showAddButton && onAdd && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAdd();
                  // Small delay to prevent immediate reopening
                  setTimeout(() => {
                    onClose();
                  }, 10);
                }}
                style={{
                  background: addButtonText === 'Remove' 
                    ? 'var(--e-global-color-dark-green)' 
                    : 'var(--e-global-color-primary, #4263AE)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {addButtonText}
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Small delay to prevent immediate reopening
                setTimeout(() => {
                  onClose();
                }, 10);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1,
                color: '#666',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close popup"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div
          style={{
            padding: '16px 20px 20px 20px',
            maxHeight: 'calc(70vh - 80px)',
            overflowY: 'auto',
            fontSize: '16px',
            lineHeight: 1.5,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', boxSizing: 'border-box' }}>
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
