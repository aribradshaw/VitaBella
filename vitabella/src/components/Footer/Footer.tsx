"use client";
import React from 'react';
import Link from 'next/link';
import VitaBellaLogo from '../common/VitaBellaLogo';
import './Footer.css';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../../constants/contacts';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const SOCIAL_ICON_MAP: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-col brand">
          <div className="footer-logo-row">
            <a href="/" aria-label="Vita Bella Home" style={{ display: 'inline-block' }}>
              <VitaBellaLogo style={{ height: 40, marginBottom: 8, color: 'var(--e-global-color-text, #012B27)' }} />
            </a>
          </div>
          <p className="footer-brand-desc">
            Unlock your optimal health and reclaim your confidence with our cutting-edge, science-backed approach.
          </p>
          <hr className="footer-divider" />
          <div className="footer-inquiries">
            <div className="footer-inquiries-title">INQUIRIES</div>
            <div className="footer-inquiries-list">
              <div>
                <span role="img" aria-label="email">✉️</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                <span role="img" aria-label="phone">📞</span>
                <a href="tel:4806020444">(480) 602-0444</a>
              </div>
              <div>
                <span role="img" aria-label="location">📍</span>
                <span>7014 E Camelback Rd Suite B100A,<br />Scottsdale, AZ 85251</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">TREATMENTS</div>
          <ul>
            <li><Link href="/weight-loss">Weight Loss</Link></li>
            <li><Link href="/hormone-therapy">Hormone Therapy</Link></li>
            <li><Link href="/anti-aging">Anti-Aging</Link></li>
            <li><Link href="/sexual-wellness">Sexual Wellness</Link></li>
            <li><Link href="/cognitive-health">Cognitive Health</Link></li>
            <li><Link href="/hair-loss">Hair Loss Treatment</Link></li>
            <li><Link href="/injury-recovery">Injury & Recovery</Link></li>
            <li><Link href="/skin-care">Skin Care</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">VITA BELLA</div>
          <ul>
            <li><Link href="/membership">Become a Member</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><a href="https://us.fullscript.com/login/vitabellahealth" target="_blank" rel="noopener noreferrer">Supplements</a></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><a href="https://vitabella.md-hq.com/" target="_blank" rel="noopener noreferrer">Member Login</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">NEWSLETTER: STAY IN TOUCH!</div>
          <p>Subscribe to our newsletter to never miss a deal or coupon code.</p>
          <form className="footer-newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your e-mail address" required />
            <button type="submit">
              Subscribe
              <span className="footer-newsletter-arrow" aria-hidden="true">↗</span>
            </button>
          </form>
          <div className="footer-social-title">FOLLOW US ON SOCIAL MEDIA</div>
          <div className="footer-social">
            {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
              const Icon = SOCIAL_ICON_MAP[key];
              return Icon ? (
                <a
                  key={key}
                  href={url}
                  aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span><Icon /></span>
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <div className="footer-bottom">
          <div>
            Copyright 2025 © Vita Bella Health LLC<br />
            Vita Bella® is a registered trademark of Vita Bella Health LLC
          </div>
          <nav className="footer-bottom-links">
            <Link href="/privacy-policy"><span role="img" aria-label="privacy">🛡️</span> Privacy Policy</Link>
            <Link href="/terms"><span role="img" aria-label="terms">📄</span> Terms of Service</Link>
            <a href="/sitemap.xml"><span role="img" aria-label="sitemap">🗺️</span> Sitemap</a>
            <Link href="/accessibility"><span role="img" aria-label="accessibility">♿</span> Accessibility</Link>
          </nav>
        </div>
        <div className="footer-disclaimer">
          We improve our products and advertising by using Microsoft Clarity to see how you use our website. By using our site, you agree that we and Microsoft can collect and use this data. Our <Link href="/privacy-policy">privacy policy</Link> has more details.
        </div>
      </div>
    </footer>
  );
};

export default Footer;