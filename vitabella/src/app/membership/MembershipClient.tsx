"use client";

import React from 'react';
import MembershipCategorySlider from './MembershipCategorySlider';
import MembershipPlans from './MembershipPlans';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import styles from './Membership.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';

const features = [
  'Wholesale priced prescriptions',
  'Backed by licensed physicians',
  '1:1 personalized virtual check-ins',
];

const COLORS = {
  lightGreen: 'var(--e-global-color-lightgreen)',
  green: 'var(--e-global-color-green)',
  darkGreen: 'var(--e-global-color-dark-green)',
  white: 'var(--e-global-color-white)',
};

const MembershipClient: React.FC = () => {
  return (
    <>
      <main style={{
        background: `linear-gradient(180deg, rgb(24,39,33) 0%, #0D1814 100%)`,
        minHeight: '100vh',
        color: COLORS.white,
        fontFamily: 'Switzer, Arial, Helvetica, sans-serif',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
        overflowX: 'hidden',
      }}>
        <section style={{
          textAlign: 'center',
          padding: 'var(--space-4x) var(--space-1x) var(--space-2x) var(--space-1x)',
          width: '100vw',
          maxWidth: '100vw',
          margin: 0,
          boxSizing: 'border-box',
          position: 'relative',
          left: '50%',
          right: '50%',
          transform: 'translateX(-50%)',
        }}>
          <div style={{ margin: '0 auto', maxWidth: 900, paddingTop: 'var(--space-3x)', paddingBottom: 'var(--space-2x)' }}>
            <h1 style={{
              fontFamily: 'Tusker Grotesk, Arial, Helvetica, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              margin: 0,
              color: COLORS.white,
              letterSpacing: '-1.5px',
            }}>
              <span style={{ display: 'block', color: COLORS.white }}>
                THE MOST <span style={{ color: COLORS.green }}>COMPREHENSIVE</span>
              </span>
              <span style={{ display: 'block', color: COLORS.green, marginTop: '0.1em' }}>
                HEALTH <span style={{ color: COLORS.white }}>MEMBERSHIP</span>
              </span>
            </h1>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-2x)',
            margin: 'var(--space-2x) 0 var(--space-2x) 0',
            flexWrap: 'wrap',
          }}>
            {features.map((f, i) => (
              <span key={f} style={{
                background: '#1F2F28',
                borderRadius: '2rem',
                padding: '0.7rem 1.6rem',
                color: COLORS.white,
                fontWeight: 500,
                fontSize: '1.08rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                boxShadow: '0 2px 8px rgba(44,60,50,0.10)',
                minWidth: 220,
                justifyContent: 'center',
                letterSpacing: '-0.2px',
              }}>
                <span style={{ color: COLORS.green, fontSize: '1.3em', fontWeight: 700, marginRight: 6 }}>✔</span> {f}
              </span>
            ))}
          </div>
          <p style={{ color: '#e0e0e0', fontSize: '1.08rem', fontWeight: 400, marginBottom: 'var(--space-3x)', marginTop: 0 }}>
            Join the most exclusive wellness membership with 8+ treatment categories, expert medical support, and unbeatable savings – all designed for your long-term success.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 var(--space-2x) 0' }}>
            <VitaBellaButton 
              href="/get-started" 
              style={{ 
                minWidth: 'unset', 
                maxWidth: 260, 
                width: 'auto', 
                fontSize: '1rem', 
                fontWeight: 700, 
                padding: '0.6rem 1.6rem',
                borderRadius: '2rem',
                whiteSpace: 'nowrap',
              }}
            >Let's Get Started</VitaBellaButton>
          </div>
        </section>
        <section style={{ marginTop: 'var(--space-4x)', width: '100vw', maxWidth: '100vw', padding: 0 }}>
          <MembershipCategorySlider />
        </section>
      </main>
      <SectionHeader
        left={{
          h2Alt: 'Explore Our.',
          h2: 'Memberships.',
        }}
        right={
          <>Both plans begin with a one-time $99 consultation fee (45-minute appointment) and entail a six-month minimum commitment.</>
        }
      />
      <MembershipPlans />
      <SectionHeader
        left={{
          h2Alt: 'The membership that works as',
          h2: 'hard as you do.',
        }}
        right={
          <><strong>THE FUTURE OF PERSONALIZED HEALTHCARE.</strong> More than just a medication. You get expert-led care, personalized treatment, and ongoing support.</>
        }
      />
    </>
  );
};

export default MembershipClient;
