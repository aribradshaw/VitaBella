"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutHero.module.css';
import '../globals.css';
import AboutStorySection from "./AboutStorySection";
import SectionHeader from '@/components/SectionHeader/SectionHeader';

const FADE_DURATION = 2; // seconds

const AboutClient: React.FC = () => {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState<'A' | 'B'>('A');
    const [opacityA, setOpacityA] = useState(1);
    const [opacityB, setOpacityB] = useState(0);
    const fadeRef = useRef<number | null>(null);

    useEffect(() => {
        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;

        videoA.loop = false;
        videoB.loop = false;

        let fading = false;
        let fadeStart = 0;
        let fadeTimeout: NodeJS.Timeout;

        const crossfade = (from: 'A' | 'B', to: 'A' | 'B') => {
            fading = true;
            fadeStart = performance.now();
            const animate = (now: number) => {
                const elapsed = (now - fadeStart) / 1000;
                const t = Math.min(elapsed / FADE_DURATION, 1);
                if (from === 'A') {
                    setOpacityA(1 - t);
                    setOpacityB(t);
                } else {
                    setOpacityA(t);
                    setOpacityB(1 - t);
                }
                if (t < 1) {
                    fadeRef.current = requestAnimationFrame(animate);
                } else {
                    setActive(to);
                    setOpacityA(to === 'A' ? 1 : 0);
                    setOpacityB(to === 'B' ? 1 : 0);
                    fading = false;
                }
            };
            fadeRef.current = requestAnimationFrame(animate);
        };

        const handleTimeUpdate = () => {
            const activeVideo = active === 'A' ? videoA : videoB;
            const nextVideo = active === 'A' ? videoB : videoA;
            if (
                activeVideo.duration - activeVideo.currentTime < FADE_DURATION &&
                !fading &&
                nextVideo.paused
            ) {
                nextVideo.currentTime = 0;
                nextVideo.play();
                crossfade(active, active === 'A' ? 'B' : 'A');
                fadeTimeout = setTimeout(() => {
                    activeVideo.pause();
                }, FADE_DURATION * 1000);
            }
        };

        const activeVideo = active === 'A' ? videoA : videoB;
        activeVideo.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
            if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
            clearTimeout(fadeTimeout);
        };
    }, [active]);

    return (
        <>
            {/* Full-width hero section, outside container */}
            <section className={styles['about-hero-section']} style={{ margin: 0, width: '100vw', left: '50%', right: '50%', position: 'relative', transform: 'translateX(-50%)' }}>
                <video
                    ref={videoARef}
                    className={styles['about-hero-video']}
                    src="/brand/about.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{ opacity: opacityA, transition: `opacity 0.2s linear` }}
                />
                <video
                    ref={videoBRef}
                    className={styles['about-hero-video']}
                    src="/brand/about.mp4"
                    autoPlay
                    muted
                    playsInline
                    loop
                    style={{ opacity: opacityB, transition: `opacity 0.2s linear` }}
                />
                <div className={styles['about-hero-darken']} />
                <div className={styles['about-hero-overlay']} />
                <div className={styles['about-hero-content']}>
                    <div className={styles['aboutHeader']}>A healthcare</div>
                    <h1 className={styles['about-hero-title']}>
                        <span className={styles['about-hero-italic']}>revolution</span>
                    </h1>
                    <p className={styles['about-hero-subtitle']}>
                        Vita Bella is changing healthcare. We are building a community<br />
                        of like-minded individuals who have a focus and passion for<br />
                        improving their health and well-being.
                    </p>
                </div>
            </section>
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
        <SectionHeader
          left={{
            h2Alt: 'Empower Your Health,',
            h2: 'Transform Your Life',
          }}
          right={
            <>Your wellness revolution starts now: Doctor-backed, science-driven solutions to empower your radical transformation.</>
          }
        />
        <SectionHeader
          left={{
            h2Alt: 'Join 10,000+',
            h2: 'patients and counting.',
          }}
          right={
            <>Stop settling for less; seize control of your health, and unleash your radiance with our results-driven medical program.</>
          }
        />
        {/* SimpleCustomerSlider below this line */}
        {/*** SimpleCustomerSlider ***/}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <React.Suspense fallback={null}>
            {typeof window !== 'undefined' && (
              require('@/components/SimpleCustomerSlider/SimpleCustomerSlider').default &&
              React.createElement(require('@/components/SimpleCustomerSlider/SimpleCustomerSlider').default)
            )}
          </React.Suspense>
        </div>
        </>
    );
};

export default AboutClient;
