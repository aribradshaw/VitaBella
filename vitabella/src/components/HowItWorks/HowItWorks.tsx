"use client";

import styles from './HowItWorks.module.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const VitaBellaSlider = dynamic(() => import('../common/VitaBellaSlider'), { ssr: false });

const steps = [
  {
	step: 'STEP 1',
	title: 'Select Program and Labs',
	desc: 'Choose the membership and labs that are best tailored to your unique health needs and goals.',
	img: '/modules/plans.webp',
	imgAlt: 'Program and Labs',
  },
  {
	step: 'STEP 2',
	title: 'Meet With Provider',
	desc: 'Have a virtual 1-on-1 with a licensed provider, at your convenience, to review your health history, evaluate your labs, explore treatments, and set goals.',
	img: '/modules/telemedicine.webp',
	imgAlt: 'Meet With Provider',
  },
  {
	step: 'STEP 3',
	title: 'Begin Treatment',
	desc: 'Your prescriptions will be promptly shipped from our U.S.-based pharmacies via express delivery in discreet packaging, directly to your door.',
	img: '/modules/hormones.webp',
	imgAlt: 'Begin Treatment',
  },
  {
	step: 'STEP 4',
	title: 'Monitor, Adjust, Optimize',
	desc: 'After starting your treatments, your provider will be there along the way with personalized quarterly check-ins included in your membership.',
	img: '/modules/healthrecords.webp',
	imgAlt: 'Monitor, Adjust, Optimize',
  },
];

type Step = {
  step: string;
  title: string;
  desc: string;
  img: string;
  imgAlt: string;
};

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
	const checkMobile = () => setIsMobile(window.innerWidth <= 900);
	checkMobile();
	window.addEventListener('resize', checkMobile);
	return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderCard = (stepObj: Step, idx: number) => (
	<div className={styles.card} key={stepObj.step}>
	  <div className={styles.cardContent}>
		<div className={styles.step}>{stepObj.step}</div>
		<div className={styles.title}>{stepObj.title}</div>
		<div className={styles.desc}>{stepObj.desc}</div>
	  </div>
	  <div
		className={styles.imgWrap}
		style={
		  idx === 0 || idx === 3
			? {
				position: 'relative',
				justifyContent: 'center',
				alignItems: 'flex-start',
				display: 'flex',
			  }
			: {}
		}
	  >
		<Image
		  src={stepObj.img}
		  alt={stepObj.imgAlt}
		  fill
		  sizes="320px"
		  className={'img'}
		  style={{
			objectFit: "cover",
			...(idx === 0 || idx === 3
			  ? { objectPosition: 'top center' }
			  : {})
		  }}
		/>
		{(idx === 0 || idx === 3) && (
		  <div
			style={{
			  position: 'absolute',
			  left: 0,
			  bottom: 0,
			  width: '100%',
			  height: '50%',
			  background:
				'linear-gradient(0deg, var(--e-global-color-accent), transparent)',
			  pointerEvents: 'none',
			  borderBottomLeftRadius: 'var(--border-radius)',
			  borderBottomRightRadius: 'var(--border-radius)',
			}}
		  />
		)}
	  </div>
	</div>
  );

  return (
	<section className={styles.howItWorks} aria-label="How It Works">
	  {isMobile ? (
		<VitaBellaSlider
		  items={steps}
		  visibleCount={1}
		  renderSlide={renderCard as (item: unknown, idx: number) => React.ReactNode}
		/>
	  ) : (
		steps.map(renderCard)
	  )}
	</section>
  );
}
