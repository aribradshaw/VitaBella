import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./CategorySlider.module.css";

const categories = [
	{
		key: "sexual-wellness",
		title: "Sexual Wellness",
		desc: "Clinically-proven treatments like Sildenafil, Tadalafil, and Oxytocin can help improve sexual function and intimacy.",
		image: "", // Add image path here
		href: "/sexual-wellness",
	},
	{
		key: "cognitive-health",
		title: "Cognitive Health",
		desc: "Clinically-proven treatments like NAD+ and Methylene Blue to help promote optimal cognitive function and execution.",
		image: "", // Add image path here
		href: "/cognitive-health",
	},
	{
		key: "hormone-therapy",
		title: "Hormone Therapy",
		desc: "Clinically-proven treatments like Testosterone help boost you to your optimal self.",
		image: "", // Add image path here
		href: "/hormone-therapy",
	},
	{
		key: "anti-aging",
		title: "Anti-Aging",
		desc: "Science-backed therapies to help you look and feel younger, longer.",
		image: "", // Add image path here
		href: "/anti-aging",
	},
	{
		key: "hair-loss",
		title: "Hair Loss",
		desc: "Effective solutions to help restore hair growth and confidence.",
		image: "", // Add image path here
		href: "/hair-loss",
	},
	{
		key: "injury-recovery",
		title: "Injury & Recovery",
		desc: "Advanced treatments to accelerate your recovery and get you back to your best.",
		image: "", // Add image path here
		href: "/injury-recovery",
	},
	{
		key: "skin-care",
		title: "Skin Care",
		desc: "Medical-grade skincare for radiant, healthy skin.",
		image: "", // Add image path here
		href: "/skin-care",
	},
	{
		key: "weight-loss",
		title: "Weight Loss",
		desc: "Personalized programs to help you achieve and maintain your ideal weight.",
		image: "", // Add image path here
		href: "/weight-loss",
	},
];

const VISIBLE_CARDS = 4;

const CategorySlider: React.FC = () => {
	return (
		<VitaBellaSlider
			items={categories}
			visibleCount={VISIBLE_CARDS}
			renderSlide={(cat) => (
				<div className={styles.card}>
					<div className={styles.imageHolder}>
						{/* Place category image here */}
					</div>
					<div className={styles.cardContent}>
						<div className={styles.cardTitle}>{cat.title}</div>
						<div className={styles.cardDesc}>{cat.desc}</div>
						<div className={styles.buttonBottom}>
							<VitaBellaButton
								href={cat.href}
								style={{
									background: "#fff",
									color: "var(--e-global-color-dark-green)",
									border: "none",
									boxShadow: "none",
									minWidth: 0,
									padding: "0.4rem 1.2rem",
									fontWeight: 700,
									fontSize: "1rem",
									marginTop: 0,
								}}
							>
								Get Started Today
							</VitaBellaButton>
						</div>
					</div>
				</div>
			)}
		/>
	);
};

export default CategorySlider;
