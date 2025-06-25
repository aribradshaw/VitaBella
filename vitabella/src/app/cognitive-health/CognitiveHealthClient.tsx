"use client";

import React, { useRef, useEffect, useState } from 'react';
import '../globals.css';
import BenefitsBar from '../../components/common/BenefitsBar';
import StopWaitingModule from '../about/StopWaitingModule';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import CustomerReviews from '@/components/common/CustomerReviews';
import NoInsuranceModule from '@/components/common/NoInsuranceModule';
import BenefitsModule from '@/components/common/BenefitsModule';
import HowItWorks from '@/components/HowItWorks/HowItWorks';

const CognitiveHealthClient: React.FC = () => {
    const pageTitle = "Cognitive Health";
    
    return (
        <>
            <BenefitsBar />
            <SectionHeader
              left={{
                h2Alt: 'Doctor-Trusted',
                h2: `${pageTitle} Options`,
              }}
              right={
                <>Under proper supervision of a Vita Bella medical professional, our medicine can safely boost both mental and physical capabilities.</>
              }            
            />
            <SectionHeader
              left={{
                h2Alt: 'One simple process.',
                h2: 'A lifetime of benefits.',
              }}
              right={
                <>Whether you’re looking to unlock your body’s full potential, elevate your fitness, or reclaim your confidence, we’re here to guide and support you every step of the way.</>
              }            
            />
            <HowItWorks />
            <BenefitsModule onMembershipPage={false} />
            <NoInsuranceModule pageTitle={pageTitle} />
            <SectionHeader
              left={{
                h2Alt: 'How You Get',
                h2: 'Your Prescriptions',
              }}
              right={
                <>After becoming a Vita Bella member, you will onboard and have a consultation with a licensed provider. During this consultation, you can discuss your goals and explore all treatments available to assist you with your {pageTitle} goals.</>
              }
              variant="stacked"
            />
            <CustomerReviews page="other" pageTitle={pageTitle} />
            <StopWaitingModule />
        </>
    );
    };

export default CognitiveHealthClient;