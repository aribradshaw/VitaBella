import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface MobileHamburgerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

/**
 * MobileHamburger: Hamburger/X button for mobile header
 * - Always top right, vertically centered to header
 * - Never overflows, never appears on desktop
 * - High z-index, no background on desktop
 */
const MobileHamburger: React.FC<MobileHamburgerProps> = ({ isOpen, setIsOpen }) => {
  // Only show on mobile (max-width: 900px)
  // Use CSS for positioning, not inline styles
  return (
    <button
      className="hamburger"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      tabIndex={0}
    >
      {isOpen ? (
        <FiX size={32} color="#fff" />
      ) : (
        <FiMenu size={28} color="#fff" />
      )}
    </button>
  );
};

export default MobileHamburger;
