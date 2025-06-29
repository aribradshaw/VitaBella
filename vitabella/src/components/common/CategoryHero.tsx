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
          backgroundImage: `url('${data.mainImage}')`,
          gap: 'var(--space-1x)',
        }}
      >
        <div className="hero-heading" style={{ color: '#fff', marginBottom: 'var(--space-1x)' }}>{data.categoryName.toUpperCase()}</div>
        <div
          className="hero-heading"
          style={{ color: data.mainColor, marginTop: '-8px', fontSize: 80, lineHeight: '80px', marginBottom: 'var(--space-1x)' }}
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
        <div className="divider" style={{ margin: 'var(--space-1x) 0 0 0', borderColor: data.mainColor }} />
        <div style={{ marginTop: 'var(--space-1x)' }}>
          {[data.pointOne, data.pointTwo, data.pointThree].map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1x)',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.00) 100%)',
                borderRadius: 24,
                padding: '10px 18px',
                marginBottom: 'var(--space-1x)',
                color: '#fff',
                fontSize: 18,
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
        {/* 10k patients pill box, styled and positioned to the right */}
        <div
          style={{
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
          }}
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
