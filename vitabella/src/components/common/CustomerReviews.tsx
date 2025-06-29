"use client";

import React, { useEffect, useRef, useState } from "react";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./CustomerReviews.module.css";

const reviews = [
	{
		image: "/testimonial/CustomerReviews/JaimyW.webp",
		name: "Jaimy W.",
		title: "My overall health has seen significant enhancement",
		text: "I have been very satisfied with my experience at Vita Bella. The physicians have been extremely knowledgeable. The customer service team is notably professional, supportive, amicable, and prompt in their assistance. Discovering Vita Bella has been a source of gratitude for me.",
	},
	{
		image: "/testimonial/CustomerReviews/KelleyJ.webp",
		name: "Kelley J.",
		title: "Vita Bella showed me exactly where I was deficient",
		text: "I thought low energy was just part of getting older until Vita Bella showed me exactly where I was deficient. Now I’ve got the energy back to dominate in business and still have energy for time for my family.",
	},
	{
		image: "/testimonial/CustomerReviews/JonathanM.webp",
		name: "Jonathan M.",
		title: "My overall health has seen significant enhancement",
		text: "I can honestly say their team has made a huge difference in my life. After consulting with their doctors and following their expert guidance, I’ve seen a remarkable improvement in my overall performance levels. Their personalized approach is second to none, and the support I’ve received has been incredibly valuable.",
	},
	{
		image: "/testimonial/CustomerReviews/BradO.webp",
		name: "Brad O.",
		title: "Definitely happy I made the choice to join Vita Bella",
		text: "Vita Bella has a friendly and knowledgeable medical team that helps you develop a health plan that fits your needs. They have developed cost efficient plans to allow anyone to be able to achieve their health goals.",
	},
	{
		image: "/testimonial/CustomerReviews/AshleyP.webp",
		name: "Ashley P.",
		title: "Thank you Vita Bella!",
		text: "I’ve been battling chronic diseases for over a decade. Since applying Vita Bella to my wellness protocol, in a short time, I have already noticed a significant improvement to my energy levels. I’m able to show up for my relationships and my clients in a whole new way.",
	},
	{
		image: "/testimonial/CustomerReviews/RyanU.webp",
		name: "Ryan U.",
		title: "I didn't think I would ever grow this much hair again",
		text: "I thought my balding was unreversible. Today, I have more hair than I've had in over a decade!",
	},
	{
		image: "/testimonial/CustomerReviews/StaceyD.webp",
		name: "Stacey D.",
		title: "Incredible experience with every aspect of Vita Bella",
		text: "Such an incredible experience with every aspect of Vita Bella✨ From the customer service, to the quality of product, support, guidance, knowledge, cost, and professionalism. I feel and look the best I ever have at the age of 46.",
	},
	{
		image: "/testimonial/CustomerReviews/AndrewS.webp",
		name: "Andrew S.",
		title: "My Vita Bella provider knew everything",
		text: "Vita Bella guided me to shed the extra weight and reclaim my health—I’m in the best shape of my life now!",
	},
	{
		image: "/testimonial/CustomerReviews/JimC.webp",
		name: "Jim C.",
		title: "Affordable wellness solutions are a reality with Vita Bella",
		text: "Vita Bella is by far the best hormone therapy treatment available today. I have experienced several, and the medical supervision combined with the customer service, is second to none. Affordable wellness solutions are a reality with Vita Bella. Men and Women can elevate their lifestyles!",
	},
	{
		image: "/testimonial/CustomerReviews/DougL.webp",
		name: "Doug L.",
		title: "My go-to source I trust with my health and vitality!",
		text: "At 43 and a lifelong athlete I can say that I’m at my best functional shape I have ever been in. As us men age it is more important than ever to maintain optimal health and performance.",
	},
	{
		image: "/testimonial/CustomerReviews/BrentO.webp",
		name: "Brent O.",
		title: "If you are in the chapter of life where health is your top priority, there is no better than Vita Bella",
		text: "Joining Vita Bella was hands down one of the most game changing decisions I have made in the past few years. They have been able to customize solution to help me optimize my health and become the best version possible.",
	},
];

// Responsive visible cards
const getVisibleCards = () => {
  if (typeof window !== "undefined" && window.innerWidth <= 600) {
	return 1;
  }
  return 2;
};

const useVisibleCards = () => {
  const [visible, setVisible] = useState(getVisibleCards());
  useEffect(() => {
	const handleResize = () => setVisible(getVisibleCards());
	window.addEventListener("resize", handleResize);
	return () => window.removeEventListener("resize", handleResize);
  }, []);
  return visible;
};

// Individual review card component with responsive sizing
const ReviewCard: React.FC<{ review: typeof reviews[0]; idx: number }> = ({ review, idx }) => {
	const textRef = useRef<HTMLDivElement>(null);
	const [textHeight, setTextHeight] = useState(0);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (textRef.current && isClient) {
			const updateHeight = () => {
				const height = textRef.current?.scrollHeight || 0;
				setTextHeight(height);
			};
			
			updateHeight();
			window.addEventListener('resize', updateHeight);
			return () => window.removeEventListener('resize', updateHeight);
		}
	}, [isClient, review.text]);

	// Enhanced algorithm for extremely short text
	const getFlexRatios = (text: string, measuredHeight: number) => {
		const textLength = text.length;
		const baseTextFlex = 1;
		const baseImageFlex = 1;
		
		// For Andrew's super short text, make image huge
		if (textLength < 120) {
			const ultraShortBonus = (120 - textLength) / 20;
			return {
				textFlex: (baseTextFlex * 0.25).toFixed(2), // Compress text even more
				imageFlex: (baseImageFlex + ultraShortBonus * 2).toFixed(2) // Even bigger image
			};
		}
		
		// For very short text (< 150 chars), make images massive
		if (textLength < 150) {
			const veryShortBonus = (150 - textLength) / 30;
			return {
				textFlex: (baseTextFlex * 0.3).toFixed(2),
				imageFlex: (baseImageFlex + veryShortBonus * 1.5).toFixed(2)
			};
		}
		
		// For short text (150-200 chars), still dramatic increase
		if (textLength < 200) {
			const shortTextBonus = (200 - textLength) / 40;
			return {
				textFlex: (baseTextFlex * 0.6).toFixed(2),
				imageFlex: (baseImageFlex + shortTextBonus * 0.8).toFixed(2)
			};
		}
		
		// For long text (> 300 chars), dramatically decrease image size
		if (textLength > 300) {
			const longTextPenalty = (textLength - 300) / 80;
			return {
				textFlex: (baseTextFlex + longTextPenalty * 0.6).toFixed(2),
				imageFlex: (baseImageFlex * 0.3).toFixed(2)
			};
		}
		
		// Medium length text gets standard ratios
		return {
			textFlex: baseTextFlex.toFixed(2),
			imageFlex: baseImageFlex.toFixed(2)
		};
	};

	const { textFlex, imageFlex } = getFlexRatios(review.text, textHeight);

	return (
		<div className={styles.reviewCard} key={idx}>
			<div 
				ref={textRef}
				className={styles.reviewTextWrap}
				style={{ flex: `${textFlex} 1 200px` }}
			>
				<div className={styles.reviewTitle}>{review.title}</div>
				<div className={styles.reviewText}>
					&ldquo;{review.text}&rdquo;
				</div>
				<div className={styles.reviewName}>{review.name}</div>
				<div className={styles.verified}>
					<span className={styles.verifiedIcon}>✔</span> Verified
					Patient
				</div>
			</div>
			<div 
				className={styles.reviewImageWrap}
				style={{ flex: `${imageFlex} 1 120px` }}
			>
				<img
					src={review.image}
					alt={review.name}
					className={styles.reviewImage}
				/>
			</div>
		</div>
	);
};

interface CustomerReviewsProps {
	page?: 'about' | 'other';
	pageTitle?: string;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ page = 'other', pageTitle }) => {
  // Determine background image and color based on page
  const backgroundImage = page === 'about'
	? "url('/modules/customerreviews.webp')"
	: "url('/modules/membershipmountain.webp')";
  const backgroundColor = page === 'about' ? '#4E604F' : '#032B27';
  const sectionStyle = {
	backgroundImage: backgroundImage,
	backgroundColor: backgroundColor,
	backgroundPosition: 'center top',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% auto',
  };
  const visibleCount = useVisibleCards();

  return (
	<section className={styles.customerReviewsSection} style={sectionStyle}>
	  <div className={styles.bgTop} />
	  {/* Absolutely positioned stars badge for mobile */}
	  <div className={styles.starsWrap}>
		<span className={styles.stars}>★★★★★</span>
		<span className={styles.starsText}>
		  Close to perfect,
		  <br />4.9 star reviews
		</span>
	  </div>
	  <div className={styles.customerReviewsContent}>
		<div className={styles.headerWrap}>
		  <div className={styles.headerText}>
			<div className={styles.reviewsLabel}>Customer Reviews</div>
			<h2 className={styles.reviewsTitle}>
			  {page === 'about' ? (
				<>See why people love their <br /> Vita Bella transformation</>
			  ) : (
				<>
				  <span style={{ 
					fontWeight: 600, 
					color: 'var(--e-global-color-green)' 
				  }}>
					10K+
				  </span>{' '}
				  <span style={{ 
					fontWeight: 400, 
					color: 'var(--e-global-color-white)' 
				  }}>
					reached their <br /> {pageTitle} goals
				  </span>
				</>
			  )}
			</h2>
		  </div>
		</div>
		<div className={styles.sliderOuterContainer}>
		  <div className={styles.sliderWrap}>
			<VitaBellaSlider
			  items={reviews}
			  visibleCount={visibleCount}
			  renderSlide={(review, idx) => (
				<ReviewCard review={review} idx={idx} />
			  )}
			/>
		  </div>
		</div>
	  </div>
	</section>
  );
};

export default CustomerReviews;
