"use client";


import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { heroData } from './heroData';
import Image from 'next/image';
import VitaBellaButton from '../common/VitaBellaButton';

// Type for category keys
const categoryKeys = Object.keys(heroData) as Array<keyof typeof heroData>;

type HeroKey = keyof typeof heroData;

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with hormone-therapy
  const [isMobile, setIsMobile] = useState(false); // Default to false for SSR
  const [fading, setFading] = useState<'none' | 'out' | 'in'>('none'); // For mobile nav fade
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentKey = categoryKeys[currentIndex];
  const data = heroData[currentKey];

  // Handle auto-rotation
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % categoryKeys.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Handle resize and set initial isMobile
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 767);
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navbar button click (mobile: fade, desktop: instant)
  const handleNavClick = (idx: number) => {
    if (isMobile && idx !== currentIndex) {
      setFading('out');
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        setCurrentIndex(idx);
        setFading('in');
        fadeTimeout.current = setTimeout(() => {
          setFading('none');
        }, 300);
      }, 300);
    } else {
      setCurrentIndex(idx);
    }
  };

  // Mobile infinite slider logic: show prev, current, next, allow click/tap/swipe
  const getMobileNavIndices = () => {
    const prev = (currentIndex - 1 + categoryKeys.length) % categoryKeys.length;
    const next = (currentIndex + 1) % categoryKeys.length;
    return [prev, currentIndex, next];
  };

  // Touch/swipe handlers for mobile slider
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      // swipe left
      if (fading === 'none') handleNavClick((currentIndex + 1) % categoryKeys.length);
    } else if (touchEndX.current - touchStartX.current > 40) {
      // swipe right
      if (fading === 'none') handleNavClick((currentIndex - 1 + categoryKeys.length) % categoryKeys.length);
    }
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
        <div className="hero-heading-test">CLINICALLY PROVEN</div>
        <h1 className="highlight" style={{ color: data.mainColor }}>{data.categoryName}</h1>
        <p className="subtext">
          Clinically-proven, doctor-backed solutions to help {data.solutionsText}.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 20,
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: isMobile ? '100%' : 'auto',
            marginBottom: isMobile ? '-var(--space-1x)' : 0,
          }}
        >
          <VitaBellaButton
            label="Start Your Treatment"
            href="/membership/"
            bg={data.mainColor}
            bgHover={data.backgroundColor}
            text={data.backgroundColor}
            textHover="var(--e-global-color-white)"
            arrowCircleColor={data.backgroundColor}
            arrowCircleColorHover={data.mainColor}
            arrowPathColor={data.mainColor}
            arrowPathColorHover={data.backgroundColor}
            style={{
              minWidth: 200,
              width: isMobile ? '70%' : 250,
              alignSelf: isMobile ? 'center' : 'flex-start',
              fontSize: '1.1rem',
              boxShadow: '0 2px 8px rgba(44, 60, 50, 0.07)',
            }}
          />
          <VitaBellaButton
            label="Learn More"
            href={`/${data.slug}`}
            bg="#fff"
            bgHover="0% transparent"
            text={data.backgroundColor}
            textHover="var(--e-global-color-white)"
            arrowCircleColor={data.backgroundColor}
            arrowCircleColorHover={data.mainColor}
            arrowPathColor={data.mainColor}
            arrowPathColorHover={data.backgroundColor}
            style={{
              minWidth: 150,
              width: isMobile ? '50%' : 175,
              alignSelf: isMobile ? 'center' : 'flex-start',
              fontSize: '1.1rem',
              marginBottom: isMobile ? 8 : 0,
              boxShadow: '0 2px 8px rgba(44, 60, 50, 0.07)',
            }}
          />
        </div>
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
          {isMobile ? (
            <div
              style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 0 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {getMobileNavIndices().map((idx) => {
                const navData = heroData[categoryKeys[idx]];
                const isCurrent = idx === currentIndex;
                // Only the current button gets the fade effect
                let fadingClass = '';
                if (isCurrent && fading === 'out') fadingClass = 'active fading';
                else if (isCurrent && fading === 'in') fadingClass = 'active';
                else if (isCurrent) fadingClass = 'active';
                else if (fading !== 'none') fadingClass = 'fading';
                return (
                  <button
                    key={categoryKeys[idx]}
                    data-category={categoryKeys[idx]}
                    className={fadingClass}
                    style={{
                      backgroundColor: isCurrent ? data.backgroundColor : '#F3EFEA',
                      color: isCurrent ? '#fff' : '#333',
                      flex: '1 1 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: isCurrent ? 0 : 12,
                      minWidth: 0,
                      padding: '10px 0',
                      margin: 0,
                      border: 'none',
                      opacity: isCurrent ? 1 : 0.7,
                      fontWeight: isCurrent ? 600 : 400,
                      fontSize: isCurrent ? 14 : 14,
                      zIndex: isCurrent ? 2 : 1,
                      boxShadow: isCurrent ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                      cursor: isCurrent ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => !isCurrent && handleNavClick(idx)}
                    aria-current={isCurrent ? 'true' : undefined}
                  >
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}}>
                      <Image
                        src={getNavIcon(categoryKeys[idx])}
                        alt={`${navData.categoryName} Icon`}
                        width={isCurrent ? 28 : 22}
                        height={isCurrent ? 28 : 22}
                        style={{ width: isCurrent ? '28px' : '22px', height: isCurrent ? '28px' : '22px', marginBottom: 10, opacity: isCurrent ? 1 : 0.7 }}
                      />
                      <span style={{ fontSize: isCurrent ? 14 : 12, fontWeight: isCurrent ? 600 : 400 }}>{navData.categoryName}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            categoryKeys.map((key, idx) => {
              const navData = heroData[key];
              return (
                <button
                  key={key}
                  data-category={key}
                  className={idx === currentIndex ? 'active' : ''}
                  style={idx === currentIndex ? { backgroundColor: data.backgroundColor, color: '#fff' } : {}}
                  onClick={() => handleNavClick(idx)}
                >
                  <span style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <Image
                      src={getNavIcon(key)}
                      alt={`${navData.categoryName} Icon`}
                      width={40}
                      height={40}
                      style={{ width: '40px', height: '40px' }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{navData.categoryName}</span>
                  </span>
                </button>
              );
            })
          )}
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
