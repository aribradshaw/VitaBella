"use client";

import React, { useState, useEffect } from 'react';
import './Hero.css';
import { heroData } from './heroData';
import Image from 'next/image';

// Type for category keys
const categoryKeys = Object.keys(heroData) as Array<keyof typeof heroData>;

type HeroKey = keyof typeof heroData;

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with hormone-therapy
  const [isMobile, setIsMobile] = useState(false); // Default to false for SSR

  const currentKey = categoryKeys[currentIndex];
  const data = heroData[currentKey];

  // Handle auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categoryKeys.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle resize and set initial isMobile
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 767);
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navbar button click
  const handleNavClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Mobile carousel logic
  const getMobileNavIndices = () => {
    const prev = (currentIndex - 1 + categoryKeys.length) % categoryKeys.length;
    const next = (currentIndex + 1) % categoryKeys.length;
    return [prev, currentIndex, next];
  };

  // Dynamic styles
  const heroBodyStyle = {
    backgroundImage: `url('${data.backgroundImage}')`,
    backgroundColor: data.backgroundColor,
  } as React.CSSProperties;
  const heroContainerStyle = {
    backgroundImage: `url('${isMobile ? data.mobileImage : data.mainImage}')`,
  } as React.CSSProperties;

  return (
    <div className="hero-body" style={heroBodyStyle}>
      <div className="hero-container" style={heroContainerStyle}>
        <div className="hero-heading">CLINICALLY PROVEN</div>
        <h2 className="hero-heading highlight" style={{ color: data.mainColor }}>{data.categoryName}</h2>
        <p className="subtext">
          Clinically-proven, doctor-backed solutions to help {data.solutionsText}.
        </p>
        <a href="/membership/" className="cta-button" style={{ backgroundColor: data.mainColor, color: data.backgroundColor, backgroundImage: `url('${data.buttonIcon}')` }}>
          Start Your Treatment
        </a>
        <div className="divider"></div>
        <div className="testimonial">
          <Image
            src="/modules/fourreviewpeople.webp"
            alt="review people"
            width={142}
            height={49}
            priority
            style={{ width: '142px', height: '49px' }}
          />
          <div className="testimonial-text">
            <h4>10,000+ Customers</h4>
            <p style={{ color: data.mainColor }}>reached their {data.goalsText} goals</p>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <div className="navbar" style={{ borderTopColor: data.mainColor }}>
        <div className="navbar-inner">
          {categoryKeys.map((key, idx) => {
            // Mobile: only show prev, current, next
            if (isMobile && !getMobileNavIndices().includes(idx)) return null;
            const navData = heroData[key];
            return (
              <button
                key={key}
                data-category={key}
                className={idx === currentIndex ? 'active' : ''}
                style={idx === currentIndex ? { backgroundColor: data.backgroundColor, color: '#fff' } : {}}
                onClick={() => handleNavClick(idx)}
              >
                <Image
                  src={getNavIcon(key)}
                  alt={`${navData.categoryName} Icon`}
                  width={40}
                  height={40}
                  style={{ width: '40px', height: '40px' }}
                />
                {navData.categoryName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper to get the correct icon for each category
function getNavIcon(key: HeroKey) {
  switch (key) {
    case 'weight-loss':
      return '/modules/weightloss.svg';
    case 'hormone-therapy':
      return '/modules/hormonetherapy.svg';
    case 'anti-aging':
      return '/modules/antiaging.svg';
    case 'sexual-wellness':
      return '/modules/sexualwellness.svg';
    case 'cognitive-health':
      return '/modules/cognitivehealth.svg';
    case 'hair-loss':
      return '/modules/hair-loss.svg';
    case 'injury-recovery':
      return '/modules/injuryrecovery.svg';
    case 'skin-care':
      return '/modules/skincare.svg';
    default:
      return '';
  }
}

export default Hero;
