"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import VitaBellaLogo from '../common/VitaBellaLogo';
import VitaBellaButton from '../common/VitaBellaButton';
import './Footer.css';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../../constants/contacts';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaLinkedinIn, FaXTwitter, FaEnvelope, FaPhone, FaLocationDot, FaUserShield, FaFile, FaSitemap, FaUniversalAccess } from 'react-icons/fa6';
import Script from "next/script";
import { newsletterSubmit } from '../../lib/newsletterSubmit';

const SOCIAL_ICON_MAP: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
};

const RECAPTCHA_SITE_KEY = "6Lfy92IrAAAAADLslEBpVbu9fGpkzBdatjtcXw9C";

const Footer: React.FC = () => {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputFocus = () => {
    setIsFormExpanded(true);
  };

  const handleFormBlur = (e: React.FocusEvent) => {
    // Check if the focus is moving to another element within the form
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFormExpanded(false);
    }
  };

  // Meta Pixel Lead tracking function
  const trackMetaLead = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const token = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'newsletter' });
      const res = await newsletterSubmit(email, token);
      if (res.success) {
        setSuccess(true);
        setEmail("");
        trackMetaLead();
      } else {
        setError(res.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      {/* HubSpot Embed Code */}
      <Script
        id="hubspot-script"
        src="//js.hs-scripts.com/48837321.js"
        strategy="afterInteractive"
      />
      {/* Meta/Facebook Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
          t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '939687859797994');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=939687859797994&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
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
                <FaEnvelope style={{ marginRight: 6 }} aria-label="email" />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                <FaPhone style={{ marginRight: 6 }} aria-label="phone" />
                <a href="tel:4806020444">(480) 602-0444</a>
              </div>
              <div>
                <FaLocationDot style={{ marginRight: 6 }} aria-label="location" />
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
            <li><Link href="/injury-and-recovery">Injury & Recovery</Link></li>
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
          <form 
            className={`footer-newsletter-form ${isFormExpanded ? 'expanded' : ''}`} 
            onSubmit={handleSubmit}
            onBlur={handleFormBlur}
          >
            <input 
              type="email" 
              placeholder="Enter your e-mail address" 
              required 
              onFocus={handleInputFocus}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading || success}
            />
            <div className="footer-newsletter-button-container">
              <VitaBellaButton
                label={loading ? "Subscribing..." : success ? "Thank You!" : "Subscribe"}
                type="submit"
                href="#"
                bg="var(--e-global-color-dark-green)"
                bgHover="var(--e-global-color-lightgreen)"
                text="var(--e-global-color-white)"
                textHover="var(--e-global-color-dark-green)"
                arrowCircleColor="var(--e-global-color-lightgreen)"
                arrowCircleColorHover="var(--e-global-color-dark-green)"
                arrowPathColor="var(--e-global-color-dark-green)"
                arrowPathColorHover="var(--e-global-color-lightgreen)"
                className="footer-newsletter-btn"
                disabled={loading || success}
                onClick={() => {}}
              />
            </div>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>Thank you for signing up!</div>}
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
          {/* LegitScript Seal (manual embed for React/Next.js) */}
          <a
            href="https://www.legitscript.com/websites/?checker_keywords=vitabella.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Verify LegitScript Approval for www.vitabella.com"
            style={{ display: 'inline-block', margin: '0 16px', verticalAlign: 'middle' }}
          >
            <img
              src="https://static.legitscript.com/seals/4395819.png"
              alt="Verify Approval for www.vitabella.com"
              width={73}
              height={79}
              style={{ border: 0 }}
            />
          </a>
          <nav className="footer-bottom-links">
            <Link href="/privacy-policy"><span style={{ display: 'flex', alignItems: 'center' }}><FaUserShield style={{ marginRight: 4 }} aria-label="privacy" /> Privacy Policy</span></Link>
            <Link href="/terms"><span style={{ display: 'flex', alignItems: 'center' }}><FaFile style={{ marginRight: 4 }} aria-label="terms" /> Terms of Service</span></Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer"><span style={{ display: 'flex', alignItems: 'center' }}><FaSitemap style={{ marginRight: 4 }} aria-label="sitemap" /> Sitemap</span></a>
            <Link href="/accessibility"><span style={{ display: 'flex', alignItems: 'center' }}><FaUniversalAccess style={{ marginRight: 4 }} aria-label="accessibility" /> Accessibility</span></Link>
          </nav>
        </div>
        <div className="footer-disclaimer">
          We improve our products and advertising by using Microsoft Clarity to see how you use our website. By using our site, you agree that we and Microsoft can collect and use this data. Our <Link href="/privacy-policy">privacy policy</Link> has more details.
        </div>
      </div>
      <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}></script>
    </footer>
  );
};

export default Footer;