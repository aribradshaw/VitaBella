import React from "react";
import Image from "next/image";
import styles from "./Newsletter.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";

const Newsletter = () => {
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
          <form className={styles.form} autoComplete="off">
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your e-mail address"
              required
            />
            <VitaBellaButton type="submit" className={styles.signupBtn}>
              Sign Up
            </VitaBellaButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
