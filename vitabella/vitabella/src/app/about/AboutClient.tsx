"use client";

import React from 'react';
// ...existing code...
import '../globals.css';
import AboutStorySection from "./AboutStorySection";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import SimpleCustomerSlider from '@/components/SimpleCustomerSlider/SimpleCustomerSlider';
import AboutStats from './AboutStats';
import StopWaitingModule from './StopWaitingModule';
import AboutHeroVideo from "./AboutHeroVideo";
import CategorySlider from "@/components/common/CategorySlider";
import TrustedAdvisorsModule from './TrustedAdvisorsModule';
import TelemedicineModule from './TelemedicineModule';
import ScienceModule from './ScienceModule';
import CustomerReviews from '@/components/common/CustomerReviews';
import HealthExpertsModule from '@/components/common/HealthExpertsModule';

const AboutClient: React.FC = () => {
    return (
        <>
            {/* Full-width hero section, outside container */}
            <AboutHeroVideo />
            <AboutStorySection />            
            <SectionHeader
              left={{
                h2Alt: 'Trusted and supported by industry leading, licensed doctors.',
                h2: '',
              }}
              right={
                <>Together, we created a fine-tuned set of protocols that our healthcare providers use for all of our clients. These protocols are made with a specific focus on safety, quality, and are results driven.</>
              }            
            />
            <HealthExpertsModule />
            <TelemedicineModule />
            <ScienceModule />
            <TrustedAdvisorsModule />
            <SectionHeader
              left={{
                h2Alt: 'Empower Your Health,',
                h2: 'Transform Your Life',
              }}
              right={
                <>Your wellness revolution starts now: Doctor-backed, science-driven solutions to empower your radical transformation.</>
              }
            />
            <CategorySlider />
            <CustomerReviews page="about" />
            <SectionHeader
              left={{
                h2Alt: 'Join 10,000+',
                h2: 'patients and counting.',
              }}
              right={
                <>Stop settling for less; seize control of your health, and unleash your radiance with our results-driven medical program.</>
              }
            />
            {/* CustomerReviews module inserted above "Join 10,000+" subheader */}
            {/* SimpleCustomerSlider below this line */}
            {/*** SimpleCustomerSlider ***/}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SimpleCustomerSlider />
            </div>
            <AboutStats />
            <StopWaitingModule />
        </>
    );
};

export default AboutClient;
