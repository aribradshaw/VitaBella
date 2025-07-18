"use client";
import React from "react";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./SimpleCustomerSlider.module.css";

const testimonials = [
	{
		src: "/testimonial/simple/jonathanc.webp",
		alt: "Breanna S. standing in a modern kitchen",
		caption: "Jonathan C.",
	},
	{
		src: "/testimonial/simple/ericag.webp",
		alt: "Marilyn C. posing with arms crossed",
		caption: "Erica G.",
	},
	// {
	// 	src: "/testimonial/simple/ankinl.webp",
	// 	alt: "Amir V. showing fitness progress",
	// 	caption: "Ankin L.",
	// },
	{
		src: "/testimonial/simple/bambil.webp",
		alt: "Amir V. showing fitness progress",
		caption: "Bambi L.",
	},
	{
		src: "/testimonial/simple/petes.webp",
		alt: "Amir V. showing fitness progress",
		caption: "Pete S.",
	},
	{
		src: "/testimonial/simple/staceyd.webp",
		alt: "Amir V. showing fitness progress",
		caption: "Stacey D.",
	},
	{
		src: "/testimonial/simple/breannas.webp",
		alt: "Amir V. showing fitness progress",
		caption: "Breanna S.",
	},
	{
		src: "/testimonial/simple/marilync.webp",
		alt: "Amir V. showing fitness progress",
		caption: "Marilyn C.",
	},
	{
		src: "/testimonial/simple/amirv.webp",
		alt: "Jonathan C. taking a mirror selfie in an elevator",
		caption: "Amir V.",
	},
];

const VISIBLE_CARDS = 5;

const SimpleCustomerSlider = () => {
	return (
		<VitaBellaSlider
			items={testimonials}
			visibleCount={VISIBLE_CARDS}
			renderSlide={(t, idx) => (
				<div className={styles.slide} key={idx}>
					<img
						src={t.src}
						alt={t.alt}
						className={styles.photo}
						draggable={false}
						style={{
							width: '100%',
							height: '350px',
							aspectRatio: '1/1',
							objectFit: 'cover',
							borderRadius: '12px'
						}}
						loading="lazy"
					/>
					<div className={styles.caption}>{t.caption}</div>
				</div>
			)}
			// Ensure slider can loop through all items robustly
			key={testimonials.length + "-" + VISIBLE_CARDS}
		/>
	);
};

export default SimpleCustomerSlider;
