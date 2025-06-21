"use client";

import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutHero.module.css';
import '../globals.css';

const FADE_DURATION = 2; // seconds

const About: React.FC = () => {
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
                    poster="/brand/about-poster.jpg"
                    style={{ opacity: opacityA, transition: `opacity 0.2s linear` }}
                />
                <video
                    ref={videoBRef}
                    className={styles['about-hero-video']}
                    src="/brand/about.mp4"
                    autoPlay={false}
                    muted
                    playsInline
                    poster="/brand/about-poster.jpg"
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
            {/* Main about content inside container for normal width */}
            <div className="container">
                <h1>About Vita Bella</h1>
                <p>
                    Vita Bella is dedicated to providing clinically proven, doctor-backed solutions for various health and wellness needs. Our mission is to empower individuals to achieve their health goals through personalized care and innovative treatments.
                </p>
                <p>
                    With a focus on safety and effectiveness, we offer a range of services including weight loss programs, hormone therapy, anti-aging treatments, and more. Our team of experienced professionals is committed to guiding you on your journey to better health.
                </p>
                <p>
                    At Vita Bella, we believe in a holistic approach to wellness, ensuring that each client receives the support and resources they need to thrive. Join us in discovering a healthier, happier you!
                </p>
            </div>
        </>
    );
};

export default About;
