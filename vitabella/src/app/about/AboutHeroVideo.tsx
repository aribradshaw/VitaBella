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
    const playPromiseA = useRef<Promise<void> | null>(null);
    const playPromiseB = useRef<Promise<void> | null>(null);

    // Helper function to safely play video
    const safePlay = async (video: HTMLVideoElement, promiseRef: React.MutableRefObject<Promise<void> | null>) => {
        try {
            const promise = video.play();
            promiseRef.current = promise;
            await promise;
        } catch (error) {
            // Ignore AbortError which happens when play is interrupted
            if (error instanceof Error && error.name !== 'AbortError') {
                console.warn('Video play error:', error);
            }
        }
    };

    // Helper function to safely pause video
    const safePause = async (video: HTMLVideoElement, promiseRef: React.MutableRefObject<Promise<void> | null>) => {
        try {
            // Wait for any pending play promise to resolve first
            if (promiseRef.current) {
                await promiseRef.current.catch(() => {}); // Ignore errors
            }
            video.pause();
        } catch (error) {
            console.warn('Video pause error:', error);
        }
    };

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

        const initializeVideos = async () => {
            videoA.currentTime = 0;
            videoB.currentTime = 0;
            
            // Safely pause both videos first
            await safePause(videoA, playPromiseA);
            await safePause(videoB, playPromiseB);
            
            setOpacityA(active === 'A' ? 1 : 0);
            setOpacityB(active === 'B' ? 1 : 0);
            
            // Play the active video
            if (active === 'A') {
                await safePlay(videoA, playPromiseA);
            } else {
                await safePlay(videoB, playPromiseB);
            }
        };

        initializeVideos();

        function loop() {
            const currentVideo = active === 'A' ? videoA : videoB;
            const nextVideo = active === 'A' ? videoB : videoA;
            const nextPromiseRef = active === 'A' ? playPromiseB : playPromiseA;
            
            if (!fading && currentVideo.duration - currentVideo.currentTime <= FADE_DURATION) {
                fading = true;
                fadeStart = performance.now();
                fadeFrom = active;
                fadeTo = active === 'A' ? 'B' : 'A';
                nextVideo.currentTime = 0;
                safePlay(nextVideo, nextPromiseRef);
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
                    const oldVideo = fadeFrom === 'A' ? videoA : videoB;
                    const oldPromiseRef = fadeFrom === 'A' ? playPromiseA : playPromiseB;
                    
                    safePause(oldVideo, oldPromiseRef);
                    setActive(fadeTo);
                    fading = false;
                    fadeStart = null;
                    
                    setTimeout(() => {
                        oldVideo.currentTime = 0;
                    }, 100);
                }
            }
            
            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            // Clean up any pending promises
            playPromiseA.current = null;
            playPromiseB.current = null;
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
                <h1 className={styles['about-hero-title']}>
                    <span className={styles['about-hero-standard']}>A HEALTHCARE </span>
                    <span className={styles['about-hero-italic']}>REVOLUTION</span>
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
