import React from "react";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import VitaBellaSlider from "@/components/common/VitaBellaSlider";
import styles from "./CategorySlider.module.css";

const categories = [
	{
		key: "sexual-wellness",
		title: "Sexual Wellness",
		desc: "Clinically-proven treatments like Sildenafil, Tadalafil, and Oxytocin can help improve sexual function and intimacy.",
		image: "/categories/sexual-wellness/sexualwellnessslider.webp",
		href: "/sexual-wellness",
	},
	{
		key: "cognitive-health",
		title: "Cognitive Health",
		desc: "Clinically-proven treatments like NAD+ and Methylene Blue to help promote optimal cognitive function and execution.",
		image: "/categories/cognitive-health/cognitivehealthslider.webp",
		href: "/cognitive-health",
	},
	{
		key: "hormone-therapy",
		title: "Hormone Therapy",
		desc: "Clinically-proven treatments like Testosterone help boost you to your optimal self.",
		image: "/categories/hormone-therapy/hormonetherapyslider.webp",
		href: "/hormone-therapy",
	},
	{
		key: "anti-aging",
		title: "Anti-Aging",
		desc: "Science-backed therapies to help you look and feel younger, longer.",
		image: "/categories/anti-aging/antiagingslider.webp",
		href: "/anti-aging",
	},
	{
		key: "hair-loss",
		title: "Hair Loss",
		desc: "Effective solutions to help restore hair growth and confidence.",
		image: "/categories/hair-loss/hairlossslider.webp",
		href: "/hair-loss",
	},
	{
		key: "injury-recovery",
		title: "Injury & Recovery",
		desc: "Advanced treatments to accelerate your recovery and get you back to your best.",
		image: "/categories/injury-and-recovery/injuryrecoveryslider.webp",
		href: "/injury-and-recovery",
	},
	{
		key: "skin-care",
		title: "Skin Care",
		desc: "Medical-grade skincare for radiant, healthy skin.",
		image: "/categories/skin-care/skincareslider.webp",
		href: "/skin-care",
	},
	{
		key: "weight-loss",
		title: "Weight Loss",
		desc: "Personalized programs to help you achieve and maintain your ideal weight.",
		image: "/categories/weight-loss/weightlossslider.webp",
		href: "/weight-loss",
	},
];


// Responsive visible cards
function useVisibleCards() {
  const [visible, setVisible] = React.useState(4);
  React.useEffect(() => {
	const update = () => {
	  if (window.innerWidth <= 700) setVisible(1);
	  else if (window.innerWidth <= 1100) setVisible(2);
	  else setVisible(4);
	};
	update();
	window.addEventListener('resize', update);
	return () => window.removeEventListener('resize', update);
  }, []);
  return visible;
}


const CategorySlider: React.FC = () => {
  const visibleCount = useVisibleCards();
  // Detect mobile for button label
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 700;
  const [mobile, setMobile] = React.useState(isMobile);
  React.useEffect(() => {
	const update = () => setMobile(window.innerWidth <= 700);
	update();
	window.addEventListener('resize', update);
	return () => window.removeEventListener('resize', update);
  }, []);
  return (
	<VitaBellaSlider
	  items={categories}
	  visibleCount={visibleCount}
	  renderSlide={(cat) => (
		<div className={styles.card}>
		  <div className={styles.imageHolder}>
			<img
			  src={cat.image}
			  alt={cat.title}
			  style={{
				width: "100%",
				height: "100%",
				objectFit: "cover",
				borderRadius: "18px 18px 0 0"
			  }}
			/>
		  </div>
		  <div className={styles.cardContent}>
			<div className={styles.cardTitle}>{cat.title}</div>
			<div className={styles.cardDesc}>{cat.desc}</div>
			<div className={styles.buttonBottom}>
			  <VitaBellaButton
				label={mobile ? "Get Started" : "Get Started Today"}
				href={cat.href}
				bg="var(--e-global-color-white)"
				bgHover="var(--e-global-color-lightgreen)"
				text="var(--e-global-color-dark-green)"
				textHover="var(--e-global-color-dark-green)"
				arrowCircleColor="var(--e-global-color-dark-green)"
				arrowCircleColorHover="var(--e-global-color-dark-green)"
				arrowPathColor="var(--e-global-color-white)"
				arrowPathColorHover="var(--e-global-color-lightgreen)"
			  />
			</div>
		  </div>
		</div>
	  )}
	  style={visibleCount === 1 ? { justifyContent: 'center', display: 'flex' } : {}}
	/>
  );
};

export default CategorySlider;
