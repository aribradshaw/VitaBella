"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';
import VitaBellaLogo from '../common/VitaBellaLogo';
import VitaBellaArrow from '../common/VitaBellaArrow';

// Treatment categories and images (replace src with your actual images)
const treatmentCategories = [
	{
		name: 'Weight Loss',
		slug: '/weight-loss',
		img: '/modules/menu/weightloss.webp',
	},
	{
		name: 'Hormone Therapy',
		slug: '/hormone-therapy',
		img: '/modules/menu/hormonetherapy.webp',
	},
	{
		name: 'Anti-Aging',
		slug: '/anti-aging',
		img: '/modules/menu/antiaging.webp',
	},
	{
		name: 'Sexual Wellness',
		slug: '/sexual-wellness',
		img: '/modules/menu/sexualwellness.webp',
	},
	{
		name: 'Cognitive Health',
		slug: '/cognitive-health',
		img: '/modules/menu/cognitivehealth.webp',
	},
	{
		name: 'Hair Loss',
		slug: '/hair-loss',
		img: '/modules/menu/hairloss.webp',
	},
	{
		name: 'Injury & Recovery',
		slug: '/injury-and-recovery',
		img: '/modules/menu/injuryandrecovery.webp',
	},
	{
		name: 'Skin Care',
		slug: '/skin-care',
		img: '/modules/menu/skincare.webp',
	},
];

const Header: React.FC = () => {
	const [treatmentOpen, setTreatmentOpen] = useState(false);
	const [resourcesOpen, setResourcesOpen] = useState(false);
	const treatmentRef = useRef<HTMLLIElement>(null);
	const resourcesRef = useRef<HTMLLIElement>(null);
	const pathname = usePathname();

	// Close dropdowns on outside click
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				treatmentRef.current &&
				!treatmentRef.current.contains(e.target as Node) &&
				resourcesRef.current &&
				!resourcesRef.current.contains(e.target as Node)
			) {
				setTreatmentOpen(false);
				setResourcesOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	return (
		<header className="header">
			<div className="header-container">
				<div className="logo">
					<Link href="/">
						<VitaBellaLogo style={{ height: '2.2rem', display: 'block' }} />
					</Link>
				</div>
				<nav className="navigation">
					<ul className="nav-list">
						<li className={pathname === '/about' ? 'active' : ''}>
							<Link href="/about">About</Link>
						</li>
						<li className={pathname === '/membership' ? 'active' : ''}>
							<Link href="/membership">Membership</Link>
						</li>
						<li
							className={`dropdown-parent${treatmentOpen ? ' open' : ''}`}
							ref={treatmentRef}
							onMouseEnter={() => setTreatmentOpen(true)}
							onMouseLeave={() => setTreatmentOpen(false)}
						>
							<button
								className="dropdown-toggle"
								aria-haspopup="true"
								aria-expanded={treatmentOpen}
							>
								Treatment
							</button>
							<div className={`dropdown-menu treatment-dropdown${treatmentOpen ? ' open' : ''}`}
								style={{ pointerEvents: treatmentOpen ? 'auto' : 'none' }}
							>
								<div className="dropdown-title">Explore Treatments</div>
								<div className="treatment-grid">
									{treatmentCategories.map((cat) => (
										<Link
											href={cat.slug}
											className="treatment-item"
											key={cat.slug}
											onClick={() => setTreatmentOpen(false)}
										>
											<div className="treatment-img">
												<img src={cat.img} alt={cat.name} />
											</div>
											<div className="treatment-label">{cat.name}</div>
										</Link>
									))}
								</div>
							</div>
						</li>
						<li
							className={`dropdown-parent${resourcesOpen ? ' open' : ''}`}
							ref={resourcesRef}
							onMouseEnter={() => setResourcesOpen(true)}
							onMouseLeave={() => setResourcesOpen(false)}
						>
							<button
								className="dropdown-toggle"
								aria-haspopup="true"
								aria-expanded={resourcesOpen}
							>
								Resources
							</button>
							<div className={`dropdown-menu resources-dropdown${resourcesOpen ? ' open' : ''}`}
								style={{ pointerEvents: resourcesOpen ? 'auto' : 'none' }}
							>
								<Link href="/faq" onClick={() => setResourcesOpen(false)}>FAQ</Link>
								<Link href="/blog" onClick={() => setResourcesOpen(false)}>Blog</Link>
							</div>
						</li>
					</ul>
				</nav>
				<div className="header-actions">
					<Link href="/membership" className="get-started-btn">
						<span>Get Started</span>
						<VitaBellaArrow />
					</Link>
					<a
						href="https://vitabella.md-hq.com/"
						className="login-btn"
						target="_blank"
						rel="noopener noreferrer"
					>
						Login
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;