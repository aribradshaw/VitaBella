"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Newsletter.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import { newsletterSubmit } from "@/lib/newsletterSubmit";

const RECAPTCHA_SITE_KEY = "6Lfy92IrAAAAADLslEBpVbu9fGpkzBdatjtcXw9C";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Get reCAPTCHA v3 token
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
    <section className={styles.newsletterSection}>
      <div className={styles.bgWrap}>
        <Image
          src="/modules/newsletterbg.webp"
          alt="Newsletter background"
          fill
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.bgGradient} />
      </div>
      <div className="container">
        <div className={styles.contentBox}>
          <h2 className={styles.newsletterTitle}>
            <span className={styles.newsletterTitleMain}>NEVER MISS A THING</span><br />
            <span className={styles.newsletterTitleSub}>SIGN UP FOR OUR NEWSLETTER</span>
          </h2>
          <div className={styles.newsletterDesc}>
            Sign up to our newsletter to stay in front of all the future deals, promotions and new treatments. Stay up-to-date with the future you.
          </div>
          <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your e-mail address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              ref={inputRef}
              disabled={loading || success}
            />
            <VitaBellaButton
              type="submit"
              label={loading ? "Signing Up..." : success ? "Thank You!" : "Sign Up"}
              href="#"
              className={styles.signupBtn}
              bg="var(--e-global-color-dark-green)"
              bgHover="var(--e-global-color-lightgreen)"
              text="var(--e-global-color-white)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-lightgreen)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-dark-green)"
              arrowPathColorHover="var(--e-global-color-lightgreen)"
              disabled={loading || success}
              onClick={() => {}}
            />
          </form>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 8 }}>Thank you for signing up!</div>}
        </div>
      </div>
      {/* reCAPTCHA v3 script */}
      <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}></script>
    </section>
  );
};

export default Newsletter;
