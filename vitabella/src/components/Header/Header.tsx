"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';
import VitaBellaLogo from '../common/VitaBellaLogo';
import VitaBellaArrow from '../common/VitaBellaArrow';
import VitaBellaButton from '../common/VitaBellaButton';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import MobileHamburger from './MobileHamburger';

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
  // Desktop submenu state
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesTimeout = useRef<NodeJS.Timeout | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTreatmentOpen, setMobileTreatmentOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const treatmentRef = useRef<HTMLLIElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // Always start mobile dropdowns collapsed when menu opens
  useEffect(() => {
	if (mobileMenuOpen) {
	  setMobileTreatmentOpen(false);
	  setMobileResourcesOpen(false);
	}
  }, [mobileMenuOpen]);


  // Always close desktop resources submenu on route change
  useEffect(() => {
	setResourcesOpen(false);
	if (resourcesTimeout.current) {
	  clearTimeout(resourcesTimeout.current);
	}
  }, [pathname]);

  // Robustly close dropdowns on outside click (desktop only)
  useEffect(() => {
	if (!mobileMenuOpen) {
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
	}
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
	if (mobileMenuOpen) {
	  document.body.style.overflow = 'hidden';
	} else {
	  document.body.style.overflow = '';
	}
  }, [mobileMenuOpen]);


  return (
	<header className="header">
	  <div className="header-container">
		<div className="logo">
		  <Link href="/">
			<VitaBellaLogo style={{ height: '2.2rem', display: 'block' }} />
		  </Link>
		</div>
		{/* Mobile Hamburger Button (modular, always top right, only on mobile) */}
	<MobileHamburger isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
		{/* Desktop navigation */}
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
				<div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
				  <VitaBellaButton
					label="View All Products"
					href="/product"
					bg="var(--e-global-color-dark-green)"
					bgHover="var(--e-global-color-green)"
					text="var(--e-global-color-white)"
					textHover="var(--e-global-color-dark-green)"
					arrowCircleColor="var(--e-global-color-lightgreen)"
					arrowCircleColorHover="var(--e-global-color-dark-green)"
					arrowPathColor="var(--e-global-color-dark-green)"
					arrowPathColorHover="var(--e-global-color-green)"
					onClick={() => setTreatmentOpen(false)}
				  />
				</div>
			  </div>
			</li>
			{/* Desktop Resources Dropdown (only when not mobile menu) */}
			{!mobileMenuOpen && (
			  <li
				className={`dropdown-parent${resourcesOpen ? ' open' : ''}`}
				ref={resourcesRef}
				onMouseEnter={() => {
				  if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
				  setResourcesOpen(true);
				}}
				onMouseLeave={() => {
				  if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
				  resourcesTimeout.current = setTimeout(() => setResourcesOpen(false), 120);
				}}
			  >
				<button
				  className="dropdown-toggle"
				  aria-haspopup="true"
				  aria-expanded={resourcesOpen}
				  onClick={() => setResourcesOpen((open) => !open)}
				  tabIndex={0}
				  onBlur={(e) => {
					// If focus moves outside the menu, close it
					if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
					  setResourcesOpen(false);
					}
				  }}
				>
				  Resources
				</button>
				<div
				  className={`dropdown-menu resources-dropdown${resourcesOpen ? ' open' : ''}`}
				  style={{ pointerEvents: resourcesOpen ? 'auto' : 'none' }}
				  onMouseEnter={() => {
					if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
					setResourcesOpen(true);
				  }}
				  onMouseLeave={() => {
					if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
					resourcesTimeout.current = setTimeout(() => setResourcesOpen(false), 120);
				  }}
				>
				  <Link href="/faq" onClick={() => setResourcesOpen(false)}>FAQ</Link>
				  <Link href="/blog" onClick={() => setResourcesOpen(false)}>Blog</Link>
				</div>
			  </li>
			)}
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
		{/* Mobile menu overlay */}
		<div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
		  <div className="mobile-menu-content" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
			<ul className="mobile-nav-list" style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
			  <li style={{ width: '100%', textAlign: 'center' }}>
				<Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%', display: 'block', textAlign: 'center' }}>About</Link>
			  </li>
			  <li style={{ width: '100%', textAlign: 'center' }}>
				<Link href="/membership" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%', display: 'block', textAlign: 'center' }}>Membership</Link>
			  </li>
			  <li className={`mobile-dropdown-parent${mobileTreatmentOpen ? ' open' : ''}`} style={{ width: '100%', textAlign: 'center' }}>
				<button
				  className="mobile-dropdown-toggle"
				  aria-haspopup="true"
				  aria-expanded={mobileTreatmentOpen}
				  onClick={() => setMobileTreatmentOpen((open) => !open)}
				  style={{ width: '100%', justifyContent: 'center', textAlign: 'center', display: 'flex' }}
				>
				  Treatment
				  {mobileTreatmentOpen ? (
					<FiChevronUp className="mobile-caret" />
				  ) : (
					<FiChevronDown className="mobile-caret" />
				  )}
				</button>
				<div className={`mobile-dropdown-menu treatment-dropdown${mobileTreatmentOpen ? ' open' : ''}`} style={{ margin: '0 auto', paddingLeft: 18, paddingRight: 18 }}>
				  <div className="dropdown-title">Explore Treatments</div>
				  <div className="treatment-grid" style={{ justifyContent: 'center' }}>
					{treatmentCategories.map((cat) => (
					  <Link
						href={cat.slug}
						className="treatment-item"
						key={cat.slug}
						onClick={() => setMobileMenuOpen(false)}
					  >
						<div className="treatment-img">
						  <img src={cat.img} alt={cat.name} />
						</div>
						<div className="treatment-label">{cat.name}</div>
					  </Link>
					))}
				  </div>
				  <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
					<VitaBellaButton
					  label="View All Products"
					  href="/product"
					  bg="var(--e-global-color-dark-green)"
					  bgHover="var(--e-global-color-green)"
					  text="var(--e-global-color-white)"
					  textHover="var(--e-global-color-dark-green)"
					  arrowCircleColor="var(--e-global-color-lightgreen)"
					  arrowCircleColorHover="var(--e-global-color-dark-green)"
					  arrowPathColor="var(--e-global-color-dark-green)"
					  arrowPathColorHover="var(--e-global-color-green)"
					  onClick={() => setMobileMenuOpen(false)}
					/>
				  </div>
				</div>
			  </li>
			{/* Mobile Resources Dropdown (only when mobile menu is open) */}
			{mobileMenuOpen && (
			  <li className={`mobile-dropdown-parent${mobileResourcesOpen ? ' open' : ''}`} style={{ width: '100%', textAlign: 'center' }}>
				<button
				  className="mobile-dropdown-toggle"
				  aria-haspopup="true"
				  aria-expanded={mobileResourcesOpen}
				  onClick={() => setMobileResourcesOpen((open) => !open)}
				  style={{ width: '100%', justifyContent: 'center', textAlign: 'center', display: 'flex' }}
				>
				  Resources
				  {mobileResourcesOpen ? (
					<FiChevronUp className="mobile-caret" />
				  ) : (
					<FiChevronDown className="mobile-caret" />
				  )}
				</button>
				{mobileResourcesOpen && (
				  <div
					className={`mobile-dropdown-menu resources-dropdown open`}
					style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
				  >
					<Link
					  href="/faq"
					  onClick={() => setMobileMenuOpen(false)}
					  className="mobile-resource-link"
					  style={{ display: 'block', width: '100%', textAlign: 'center', marginBottom: 8 }}
					>
					  FAQ
					</Link>
					<Link
					  href="/blog"
					  onClick={() => setMobileMenuOpen(false)}
					  className="mobile-resource-link"
					  style={{ display: 'block', width: '100%', textAlign: 'center' }}
					>
					  Blog
					</Link>
				  </div>
				)}
			  </li>
			)}
			  <li className="mobile-login" style={{ width: '100%', textAlign: 'center' }}>
				<a
				  href="https://vitabella.md-hq.com/"
				  className="login-btn"
				  target="_blank"
				  rel="noopener noreferrer"
				  onClick={() => setMobileMenuOpen(false)}
				>
				  Member Login / Patient Portal
				</a>
			  </li>
			</ul>
		  </div>
		</div>
	  </div>
	</header>
  );
};

export default Header;

// Add mobile resource link hover style
// This should be added to Header.css:
// .mobile-resource-link:hover {
//   background: var(--e-global-color-dark-green);
//   color: var(--e-global-color-white);
//   transition: background 0.2s, color 0.2s;
// }