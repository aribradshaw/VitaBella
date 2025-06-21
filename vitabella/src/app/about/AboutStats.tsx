import React from "react";
import VitaBellaArrow from "@/components/common/VitaBellaArrow";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import styles from "./AboutStats.module.css";

const stats = [
	{ value: "10k+", label: "Lives Transformed" },
	{ value: "OVER 15k+", label: "Provider Consultations" },
	{ value: "10k+", label: "Men & Women Treated" },
];

const AboutStats: React.FC = () => (
	<div
		style={{
			display: "flex",
			gap: "var(--space-2x)",
			justifyContent: "center",
			alignItems: "stretch",
			margin: "var(--space-2x) 0",
		}}
	>
		{stats.map((stat, i) => (
			<div
				key={stat.label}
				style={{
					background: "var(--e-global-color-off-white)",
					borderRadius: 16,
					padding: "28px 36px 20px 36px",
					minWidth: 180,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
				}}
			>
				<div
					style={{
						fontFamily:
							"Tusker Grotesk, Arial, Helvetica, sans-serif",
						fontWeight: 600,
						fontSize: 28,
						textTransform: "uppercase",
						color: "var(--e-global-color-grey1)",
						textAlign: "center",
						letterSpacing: 0,
					}}
				>
					{stat.value}
				</div>
				<div
					style={{
						fontFamily:
							"Switzer, Arial, Helvetica, sans-serif",
						fontWeight: 400,
						fontSize: 16,
						color: "var(--e-global-color-grey2)",
						textAlign: "center",
						marginTop: 8,
					}}
				>
					{stat.label}
				</div>
			</div>
		))}
		<div
			style={{
				background: "var(--e-global-color-dark-green)",
				borderRadius: 16,
				padding: "20px 36px 20px 36px",
				minWidth: 360,
				display: "flex",
				flexDirection: "row",
				alignItems: "stretch",
				justifyContent: "space-between",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Overlay image */}
			<img
				src="/modules/armgreen.webp"
				alt="Decorative arm"
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					opacity: 0.8,
					zIndex: 0,
					pointerEvents: "none",
				}}
			/>
			{/* Left: Stars and reviews */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					gap: 0,
					paddingRight: 24,
					borderRight: "1.5px solid var(--e-global-color-off-white)",
					minWidth: 140,
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 0,
						marginBottom: 2,
					}}
				>
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
				<span
					style={{
						color: "var(--e-global-color-off-white)",
						fontWeight: 600,
						fontFamily: "Switzer, Arial, Helvetica, sans-serif",
						fontSize: 16,
						marginTop: 2,
					}}
				>
					4.9/5 Star Reviews
				</span>
			</div>
			{/* Right: Headline and button */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "center",
					gap: 0,
					paddingLeft: 24,
					position: "relative",
					zIndex: 1,
					flex: 1,
				}}
			>
				<div
					style={{
						color: "var(--e-global-color-off-white)",
						fontWeight: 700,
						fontFamily: "Tusker Grotesk, Arial, Helvetica, sans-serif",
						fontSize: 20,
						textTransform: "uppercase",
						marginBottom: 8,
						lineHeight: 1.2,
					}}
				>
					TRANSFORM YOUR LIFE. YOU OWE IT TO YOURSELF
				</div>
				<VitaBellaButton href="/membership">
					Join Vita Bella
				</VitaBellaButton>
			</div>
		</div>
	</div>
);

export default AboutStats;
