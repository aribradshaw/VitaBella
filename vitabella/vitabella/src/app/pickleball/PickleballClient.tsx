"use client";

import React, { useRef, useEffect, useState } from 'react';
import '../globals.css';
import CalendlyScheduler from '../../components/common/CalendlyScheduler';
import DUPRHero from '../dupr/DUPRHero';
import DUPRWhyItMatters from '../dupr/DUPRWhyItMatters';
import SmarterEdge from '../dupr/SmarterEdge';
import DUPRGetStarted from '../dupr/DUPRGetStarted';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import MembershipPlans from '../membership/MembershipPlans';
import DUPRStats from '../dupr/DUPRStats';
import DUPRVideo from '../dupr/DUPRVideo';

const PickleballClient: React.FC = () => {
    const pageTitle = "For Pickleball Players";

    // Smooth scroll handler for MembershipPlans
    const handleScrollToMembership = () => {
        const el = document.getElementById('membershipplans');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <DUPRHero onStartPlanClick={handleScrollToMembership} type="pickleball" />
            <DUPRWhyItMatters />
            <SmarterEdge />
            {/* DUPRGetStarted module below SmarterEdge */}
            <DUPRGetStarted type="pickleball" />
            <SectionHeader
                left={{
                h2Alt: 'Explore Our.',
                h2: 'Memberships.',
                }}
                right={
                <>Both plans begin with a one-time $99 consultation fee (45-minute appointment) and entail a six-month minimum commitment.</>
                }
            />
            <div id="membershipplans">
                <MembershipPlans />
            </div>
            <SectionHeader
                left={{
                h2Alt: 'Schedule to Speak',
                h2: 'with a Member Specialist!',
                }}
                right={
                    <>Do you have any questions about our services? Schedule a call today.</>
                }
            />
            <CalendlyScheduler type="roundrobin" />
            <DUPRStats />
            {/* DUPRVideo module below stats */}
            <DUPRVideo />
        </div>
    );
};

export default PickleballClient;