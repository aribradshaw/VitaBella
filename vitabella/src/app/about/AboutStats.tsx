
"use client";
import "./aboutstats.css";


import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";

const stats = [
  { value: "10k+", label: "Lives Transformed" },
  { value: "OVER 15k+", label: "Provider Consultations" },
  { value: "10k+", label: "Men & Women Treated" },
];

interface AboutStatsProps {
  onMembershipPage?: boolean;
}

const AboutStats: React.FC<AboutStatsProps> = ({ onMembershipPage }) => {
  const handleButtonClick = () => {
	const el =
	  document.querySelector('[data-section="membership-plans"]') ||
	  document.querySelector("#membership-plans");
	if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
	<div className="about-stats-row">
	  {/* Desktop: show first two stats in a row, hide third; Mobile: show all */}
	  <div className="about-stats-tiles-group">
		<div className="about-stats-tile">
		  <div className="about-stats-value">10k+</div>
		  <div className="about-stats-label">Lives Transformed</div>
		</div>
		<div className="about-stats-tile">
		  <div className="about-stats-value">OVER 15k+</div>
		  <div className="about-stats-label">Provider Consultations</div>
		</div>
		<div className="about-stats-tile about-stats-hide-desktop">
		  <div className="about-stats-value">10k+</div>
		  <div className="about-stats-label">Men & Women Treated</div>
		</div>
	  </div>
	  <div className="about-stats-transform-tile">
		{/* Overlay image */}
		{/* eslint-disable-next-line @next/next/no-img-element */}
		<img
		  src="/modules/armgreen.webp"
		  alt="Decorative arm"
		  className="about-stats-transform-img"
		/>
		{/* Left: Stars and reviews */}
		<div className="about-stats-transform-left">
		  <div className="about-stats-stars-row">
			{[...Array(5)].map((_, i) => (
			  <svg
				key={i}
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="var(--e-global-color-lightgreen)"
				style={{ display: "inline-block" }}
			  >
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			  </svg>
			))}
		  </div>
		  <span className="about-stats-transform-reviews">4.9/5 Star Reviews</span>
		</div>
		{/* Right: Headline and button */}
		<div className="about-stats-transform-right">
		  <div className="about-stats-transform-headline">
			<span>TRANSFORM YOUR LIFE.</span>
			<span>YOU OWE IT TO YOURSELF</span>
		  </div>
		  {onMembershipPage ? (
			<VitaBellaButton
			  label="Join Vita Bella"
			  href="#membership-plans"
			  onClick={handleButtonClick}
			  bg="var(--e-global-color-lightgreen)"
			  bgHover="var(--e-global-color-green)"
			  text="var(--e-global-color-dark-green)"
			  textHover="var(--e-global-color-dark-green)"
			  arrowCircleColor="var(--e-global-color-dark-green)"
			  arrowCircleColorHover="var(--e-global-color-dark-green)"
			  arrowPathColor="var(--e-global-color-lightgreen)"
			  arrowPathColorHover="var(--e-global-color-lightgreen)"
			  style={{ minWidth: 180, width: 'fit-content', maxWidth: '100%' }}
			/>
		  ) : (
			<VitaBellaButton
			  label="Join Vita Bella"
			  href="/membership"
			  bg="var(--e-global-color-lightgreen)"
			  bgHover="var(--e-global-color-green)"
			  text="var(--e-global-color-dark-green)"
			  textHover="var(--e-global-color-dark-green)"
			  arrowCircleColor="var(--e-global-color-dark-green)"
			  arrowCircleColorHover="var(--e-global-color-dark-green)"
			  arrowPathColor="var(--e-global-color-lightgreen)"
			  arrowPathColorHover="var(--e-global-color-lightgreen)"
			  style={{ minWidth: 180, width: 'fit-content', maxWidth: '100%' }}
			/>
		  )}
		</div>
	  </div>
	</div>
  );
};

export default AboutStats;
