"use client";

import React from "react";
import Image from "next/image";
import "../Hero/Hero.css";
import { heroData } from "../Hero/heroData";

interface CategoryHeroProps {
  category: keyof typeof heroData;
  buttonHref?: string;
  buttonText?: string;
  testimonialImg?: string;
  testimonialTitle?: string;
  testimonialText?: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({
  category,
  buttonHref = "/membership/",
  buttonText = "Start Your Treatment",
  testimonialImg = "/modules/fourreviewpeople.webp",
  testimonialTitle = "10,000+ Patients",
  testimonialText = "reached their weight loss goals",
}) => {
  const data = heroData[category];
  // Responsive: use mobile image and 10k box placement like Hero.tsx
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
  const heroContainerBg = isMobile ? data.mobileImage : data.mainImage;
  return (
    <div
      className="hero-body"
      style={{
        backgroundImage: `url('${data.backgroundImage}')`,
        backgroundColor: data.backgroundColor,
        paddingBottom: 'var(--space-2x)',
      }}
    >
      <div
        className="hero-container"
        style={{
          backgroundImage: `url('${heroContainerBg}')`,
          gap: 'var(--space-1x)'
        }}
      >
        <div className="hero-heading" style={{ color: '#fff', marginBottom: 'var(--space-1x)' }}>{data.categoryName.toUpperCase()}</div>
        <div
          className="highlight"
          style={{ color: data.mainColor, marginTop: '-8px', marginBottom: 'var(--space-1x)' }}
        >
          TREATMENTS
        </div>
        <a
          href={buttonHref}
          className="cta-button"
          style={{ backgroundColor: data.mainColor, color: data.backgroundColor, backgroundImage: `url('${data.buttonIcon}')`, marginBottom: 'var(--space-1x)' }}
        >
          {buttonText}
        </a>
        <div className="divider" style={{ margin: '0 0 0 0', borderColor: data.mainColor }} />
        <div style={{ marginTop: 'var(--space-1x)' }}>
          {[data.pointOne, data.pointTwo, data.pointThree].map((point, idx) => (
            <div
              key={idx}
              className="category-hero-point"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1x)',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.00) 100%)',
                borderRadius: 24,
                padding: '10px 18px',
                marginBottom: 'var(--space-1x)',
                color: '#fff',
                fontSize: '1rem',
                fontFamily: 'Switzer, Arial, Helvetica, sans-serif',
                fontWeight: 400,
                maxWidth: 540,
              }}
            >
              <span style={{ color: data.mainColor, fontSize: 22, marginRight: 8 }}>✔</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
        {/* 10k patients pill box, styled and placed below content on mobile, right on desktop */}
        <div
          className="category-hero-10k"
          style={
            isMobile
              ? {
                  position: 'static',
                  margin: '0 auto 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fff',
                  borderRadius: 40,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  padding: '12px 32px 12px 12px',
                  minWidth: 0,
                  maxWidth: 340,
                  height: '48px',
                  gap: 16,
                  width: '90%',
                  justifyContent: 'center',
                }
              : {
                  position: 'absolute',
                  right: '5vw',
                  bottom: 'var(--space-2x)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fff',
                  borderRadius: 40,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  padding: '12px 32px 12px 12px',
                  minWidth: 370,
                  maxWidth: 440,
                  height: '48px',
                  gap: 16,
                }
          }
        >
          <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Image
              src={testimonialImg}
              alt="review people"
              width={142}
              height={49}
              priority
              style={{ height: '100%', width: 'auto', borderRadius: 24, objectFit: 'contain', background: 'transparent', padding: 0 }}
            />
          </div>
          <div className="testimonial-text" style={{ color: '#111', fontFamily: 'Switzer, Arial, Helvetica, sans-serif', whiteSpace: 'nowrap' }}>
            <h4 style={{ fontSize: 22, margin: 0, fontWeight: 700, color: '#111' }}>{testimonialTitle}</h4>
            <p style={{ color: '#111', fontSize: 15, margin: 0 }}>{testimonialText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
