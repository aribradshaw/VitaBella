import React, { useRef, useEffect, useState } from 'react';
import styles from './AboutHero.module.css';

const FADE_DURATION = 2; // seconds (crossfade duration)

const AboutHeroVideo: React.FC = () => {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState<'A' | 'B'>('A');
    const [opacityA, setOpacityA] = useState(1);
    const [opacityB, setOpacityB] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;
        videoA.loop = false;
        videoB.loop = false;

        let loaded = 0;
        const checkReady = () => {
            loaded++;
            if (loaded === 2) setIsReady(true);
        };
        videoA.addEventListener('loadeddata', checkReady);
        videoB.addEventListener('loadeddata', checkReady);
        return () => {
            videoA.removeEventListener('loadeddata', checkReady);
            videoB.removeEventListener('loadeddata', checkReady);
        };
    }, []);

    useEffect(() => {
        if (!isReady) return;
        const videoA = videoARef.current!;
        const videoB = videoBRef.current!;
        let fadeStart: number | null = null;
        let fading = false;
        let fadeFrom: 'A' | 'B' = active;
        let fadeTo: 'A' | 'B' = active === 'A' ? 'B' : 'A';

        videoA.currentTime = 0;
        videoB.currentTime = 0;
        videoA.pause();
        videoB.pause();
        setOpacityA(active === 'A' ? 1 : 0);
        setOpacityB(active === 'B' ? 1 : 0);
        if (active === 'A') videoA.play();
        else videoB.play();

        function loop() {
            const currentVideo = active === 'A' ? videoA : videoB;
            const nextVideo = active === 'A' ? videoB : videoA;
            if (!fading && currentVideo.duration - currentVideo.currentTime <= FADE_DURATION) {
                fading = true;
                fadeStart = performance.now();
                fadeFrom = active;
                fadeTo = active === 'A' ? 'B' : 'A';
                nextVideo.currentTime = 0;
                nextVideo.play();
            }
            if (fading && fadeStart !== null) {
                const elapsed = (performance.now() - fadeStart) / 1000;
                const t = Math.min(elapsed / FADE_DURATION, 1);
                if (fadeFrom === 'A') {
                    setOpacityA(1 - t);
                    setOpacityB(t);
                } else {
                    setOpacityA(t);
                    setOpacityB(1 - t);
                }
                if (t >= 1) {
                    if (fadeFrom === 'A') videoA.pause();
                    else videoB.pause();
                    setActive(fadeTo);
                    fading = false;
                    fadeStart = null;
                    setTimeout(() => {
                        if (fadeFrom === 'A') {
                            videoA.currentTime = 0;
                        } else {
                            videoB.currentTime = 0;
                        }
                    }, 100);
                }
            }
            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isReady, active]);

    return (
        <section className={styles['about-hero-section']} style={{ margin: 0, width: '100vw', left: '50%', right: '50%', position: 'relative', transform: 'translateX(-50%)' }}>
            <video
                ref={videoARef}
                className={styles['about-hero-video']}
                src="/brand/about.mp4"
                autoPlay
                muted
                playsInline
                style={{ opacity: opacityA, transition: `opacity ${FADE_DURATION}s linear` }}
            />
            <video
                ref={videoBRef}
                className={styles['about-hero-video']}
                src="/brand/about.mp4"
                autoPlay
                muted
                playsInline
                style={{ opacity: opacityB, transition: `opacity ${FADE_DURATION}s linear` }}
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
    );
};

export default AboutHeroVideo;
