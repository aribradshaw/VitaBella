"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './BenefitsModule.module.css';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import { 
  FaFlask, 
  FaPills, 
  FaUserMd, 
  FaClipboardList, 
  FaBox, 
  FaLightbulb, 
  FaCogs, 
  FaDollarSign 
} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

interface Benefit {
  id: string;
  icon: string;
  title: string;
  content: string;
}

interface BenefitsModuleProps {
  onMembershipPage?: boolean;
}

const benefits: Benefit[] = [
  {
    id: 'clinically-proven',
    icon: 'FaFlask',
    title: 'Clinically-Proven Results',
    content: 'We utilize science-based treatments, rigorously evaluated to support safety and potential health benefits.'
  },
  {
    id: 'high-quality-medications',
    icon: 'FaPills',
    title: 'High-Quality, US Compounded Medications',
    content: 'All active pharmaceutical ingredients from FDA-Approved manufacturing facilities in the United States.'
  },
  {
    id: 'physician-care',
    icon: 'FaUserMd',
    title: '1:1 Physician-Led Care, Quarterly',
    content: 'Make adjustments and track your progress with quarterly check-ins, included in your membership.'
  },
  {
    id: 'tailored-treatment',
    icon: 'FaClipboardList',
    title: 'Tailored Treatment Plans',
    content: 'Personalized care, personalized results: experience treatment plans crafted to your specific needs.'
  },
  {
    id: 'necessary-supplies',
    icon: 'FaBox',
    title: 'All Necessary Supplies - Always Free',
    content: 'We don’t nickel and dime on supplies. Get the needed supplies for your products included. No really, no charge.'
  },
  {
    id: 'ongoing-coaching',
    icon: 'FaLightbulb',
    title: 'Ongoing Coaching & Education',
    content: 'Your health, supported: access continuous coaching and education for sustained results.'
  },
  {
    id: 'treatment-options',
    icon: 'FaCogs',
    title: 'The Most Treatment Options, Period',
    content: 'Unrivaled selection: the widest range of treatments, bar none.'
  },
  {
    id: 'medication-prices',
    icon: 'FaDollarSign',
    title: 'Best Medication Prices in History',
    content: 'Revolutionizing affordability: the best medication pricing in history, now available.'
  }
];

const BenefitsModule: React.FC<BenefitsModuleProps> = ({ onMembershipPage = false }) => {
  const [activeSection, setActiveSection] = useState<string>('clinically-proven');
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const updateImageHeight = () => {
    if (imageContainerRef.current && rightSectionRef.current) {
      const rightSectionHeight = rightSectionRef.current.offsetHeight;
      // Subtract some padding to account for spacing
      const adjustedHeight = rightSectionHeight - 16; // Approximately --space-1x
      imageContainerRef.current.style.height = `${adjustedHeight}px`;
    }
  };
  useEffect(() => {
    updateImageHeight();
    
    // Update height on window resize
    const handleResize = () => updateImageHeight();
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver to track right section height changes
    const resizeObserver = new ResizeObserver(() => {
      updateImageHeight();
    });
    
    if (rightSectionRef.current) {
      resizeObserver.observe(rightSectionRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);useEffect(() => {
    // Update height when active section changes
    // Wait for animation to complete (slideDown is 0.3s)
    setTimeout(updateImageHeight, 350);
  }, [activeSection]);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? '' : sectionId);
  };

  const handleButtonClick = () => {
    if (onMembershipPage) {
      // Scroll to MembershipPlans section
      const membershipPlansElement = document.querySelector('[data-section="membership-plans"]');
      if (membershipPlansElement) {
        membershipPlansElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to membership page
      window.location.href = '/membership';
    }
  };
  const renderIcon = (iconName: string) => {
    const iconProps = { size: 16, color: 'var(--e-global-color-dark-green)' };
    switch (iconName) {
      case 'FaFlask': return <FaFlask {...iconProps} />;
      case 'FaPills': return <FaPills {...iconProps} />;
      case 'FaUserMd': return <FaUserMd {...iconProps} />;
      case 'FaClipboardList': return <FaClipboardList {...iconProps} />;
      case 'FaBox': return <FaBox {...iconProps} />;
      case 'FaLightbulb': return <FaLightbulb {...iconProps} />;
      case 'FaCogs': return <FaCogs {...iconProps} />;
      case 'FaDollarSign': return <FaDollarSign {...iconProps} />;
      default: return <FaFlask {...iconProps} />; // fallback icon
    }
  };

  return (
    <section className={styles.benefitsModule}>      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.imageContainer} ref={imageContainerRef}>
            <img 
              src="/modules/membershipleft.webp" 
              alt="Health tracking interface" 
              className={styles.membershipImage}
            />
          </div>
        </div>
        
        <div className={styles.rightSection} ref={rightSectionRef}>
          <div className={styles.benefitsList}>
            {benefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitItem}>                <button
                  className={`${styles.benefitHeader} ${activeSection === benefit.id ? styles.active : ''}`}
                  onClick={() => toggleSection(benefit.id)}
                >
                  <div className={styles.benefitIcon}>{renderIcon(benefit.icon)}</div>
                  <span className={styles.benefitTitle}>{benefit.title}</span>
                  <div className={`${styles.expandIcon} ${activeSection === benefit.id ? styles.expanded : ''}`}>
                    +
                  </div>
                </button>
                
                {activeSection === benefit.id && (
                  <div className={styles.benefitContent}>
                    <p>{benefit.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>          <div className={styles.actionSection}>
            {onMembershipPage ? (
              <VitaBellaButton onClick={handleButtonClick}>
                Start Your Transformation
              </VitaBellaButton>
            ) : (
              <VitaBellaButton href="/membership">
                Start Your Transformation
              </VitaBellaButton>
            )}
              <div className={styles.reviewsSection}>
              <div className={styles.stars}>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <span className={styles.reviewText}>4.9/5 Star Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsModule;
