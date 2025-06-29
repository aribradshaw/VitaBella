"use client";

import React from 'react';
import MembershipCategorySlider from './MembershipCategorySlider';
import MembershipPlans from './MembershipPlans';
import BenefitsModule from '@/components/common/BenefitsModule';
import FeelTheDifferenceModule from '@/components/common/FeelTheDifferenceModule';
import HealthExpertsModule from '@/components/common/HealthExpertsModule';
import StatesMap from '@/components/common/StatesMap';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import styles from './Membership.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import AboutStats from '../about/AboutStats';
import CalendlyScheduler from '../../components/common/CalendlyScheduler';

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
  const handleHeroButtonClick = () => {
    const membershipPlansElement = document.querySelector('#membership-plans');
    if (membershipPlansElement) {
      membershipPlansElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main style={{
        background: `linear-gradient(180deg, rgb(24,39,33) 0%, #0D1814 100%)`,
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
          padding: 'var(--space-2x) var(--space-1x) var(--space-2x) var(--space-1x)',
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-1x)',
              margin: '0 0 var(--space-1x) 0',
              flexWrap: 'wrap',
            }}
          >
            {features.map((f, i) => (
              <span
                key={f}
                className="membership-feature-badge"
              >
                <span className="membership-feature-check">✔</span>{' '}
                {f}
              </span>
            ))}
          </div>
          <p style={{ color: '#e0e0e0', fontSize: '1.08rem', fontWeight: 400, marginBottom: 'var(--space-1x)', marginTop: 0 }}>
            Join the most exclusive wellness membership with 8+ treatment categories, expert medical support, and unbeatable savings – all designed for your long-term success.
          </p>          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 0' }}>
            <VitaBellaButton 
              label="Let's Get Started"
              href="#membership-plans"
              onClick={handleHeroButtonClick}
              bg="var(--e-global-color-lightgreen)"
              bgHover="var(--e-global-color-green)"
              text="var(--e-global-color-dark-green)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-dark-green)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-lightgreen)"
              arrowPathColorHover="var(--e-global-color-green)"
              style={{ 
                minWidth: 'unset', 
                maxWidth: 260, 
                width: 'auto', 
                fontSize: '1rem', 
                fontWeight: 700, 
                borderRadius: '2rem',
                whiteSpace: 'nowrap',
              }}
            />
          </div>
        </section>
        <section style={{ marginBottom: 'var(--space-1x)', width: '100vw', maxWidth: '100vw', padding: 0 }}>
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
          h2Alt: 'Schedule to Speak',
          h2: 'with a Member Specialist!',
        }}
        right={
          <>Do you have any questions about our services? Schedule a call today.</>        }
      />   
      <CalendlyScheduler type="roundrobin" />
      <SectionHeader
        left={{
          h2Alt: 'The membership that works',
          h2: 'as hard as you do.',
        }}
        right={
          <><div><strong>THE FUTURE OF PERSONALIZED HEALTHCARE.</strong></div> More than just a medication. You get expert-led care, personalized treatment, and ongoing support.</>
        }
      />
      <BenefitsModule onMembershipPage={true} />
      <SectionHeader
        left={{
          h2Alt: 'How it works',
          h2: 'Simple, Smart, Seamless.',
        }}
        right={
          <>We’ll guide and support you as you unlock your potential, elevate your fitness, and reclaim your confidence.</>        }
      />      
      <HowItWorks />
      <FeelTheDifferenceModule onMembershipPage={true} />
      <SectionHeader
        left={{
          h2Alt: 'Backed by the country’s',
          h2: 'leading health experts.',
        }}
        right={
          <>With decades of experience and proven medical  advancements: real expertise, not generic advice.</>        }
      />
      <HealthExpertsModule />      
      <SectionHeader
        left={{
          h2Alt: 'Near-nationwide',
          h2: 'coverage.',
        }}
        right={
          <>Full service to all qualifying states. We are working hard to bring Vita Bella to as many US states as possible!</>        }
      />
      <StatesMap />
      <SectionHeader
        left={{
          h2Alt: "We've transformed",
          h2: '10,000 lives.',
        }}
        right={
          <>Stop settling for less; seize control of your health, and unleash your radiance with our results-driven medical program.</>        }
      />
      <AboutStats onMembershipPage={true} />
    </>
  );
};

export default MembershipClient;
