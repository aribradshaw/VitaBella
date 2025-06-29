import React from "react";
import styles from "./DUPRGetStarted.module.css";
import Image from "next/image";
import BrandmarkWireframeWhite from "./BrandmarkWireframeWhite";
import VitaBellaButton from "@/components/common/VitaBellaButton";

interface DUPRGetStartedProps {
  type?: 'dupr' | 'pickleball';
}

const duprCards = [
  {
    front: {
      title: "For All DUPR Members",
      label: "click here",
    },
    back: {
      title: "DUPR Members",
      promo: "$50 off the Performance Membership",
      code: "PROMO CODE: DUPR",
      label: "Click Here",
    },
    image: "/modules/dupr/dupr1.webp",
    hoverImage: "/modules/dupr/dupr2.webp",
    link: "#",
  },
  {
    front: {
      title: "For All DUPR+ Members",
      label: "click here",
    },
    back: {
      title: "DUPR+ Members",
      promo: "$50/month off the Performance Membership",
      extra: "FREE Essential Lab Panel included",
      code: "VISIT your DUPR+ app for promo code",
      label: "Click Here",
    },
    image: "/modules/dupr/dupr3.webp",
    hoverImage: "/modules/dupr/dupr2.webp",
    link: "#",
  },
];

const pickleballCards = [
  {
    front: {
      title: "For All Pickleball Players",
      label: "click here",
    },
    back: {
      title: "Pickleball Player Discount",
      promo: "$50 off the Performance Membership",
      code: "PROMO CODE: PICKLE",
      label: "Click Here",
    },
    image: "/modules/dupr/dupr1.webp",
    hoverImage: "/modules/dupr/dupr2.webp",
    link: "#",
  },
];

const scrollToMembership = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById('membershipplans');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const DUPRGetStarted: React.FC<DUPRGetStartedProps> = ({ type = 'dupr' }) => {
  const cards = type === 'pickleball' ? pickleballCards : duprCards;
  return (
    <section className={styles.wrapper}>
      <h4 className={styles.benefits}>Exclusive Benefits for {type === 'pickleball' ? 'Pickleball Players' : 'DUPR Members'}</h4>
      <h2 className={styles.title}>Unlock Your Member Advantage</h2>
      <div className={styles.cardsContainer}>
        {cards.map((card, idx) => (
          <a
            href="#membershipplans"
            className={styles.cardWrapper}
            key={idx}
            onClick={scrollToMembership}
            tabIndex={0}
            aria-label={card.front.title + ' - ' + card.front.label}
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <div className={styles.card}>
              {/* Card Front */}
              <div className={styles.cardFront}>
                <Image
                  src={card.image}
                  alt={card.front.title}
                  fill
                  className={styles.cardImage}
                  priority
                  sizes="100vw"
                />
                <div className={styles.overlay}>
                  <BrandmarkWireframeWhite className={styles.brandmark} />
                  <h3 className={styles.cardTitle}>{card.front.title}</h3>
                  <span className={styles.cardLabel}>{card.front.label}</span>
                </div>
              </div>
              {/* Card Back */}
              <div className={styles.cardBack}>
                <Image
                  src={card.hoverImage}
                  alt={card.back.title + " back"}
                  fill
                  className={styles.cardImage}
                  priority
                  sizes="100vw"
                />
                <div className={styles.overlay}>
                  <BrandmarkWireframeWhite className={styles.brandmark} />
                  <h3 className={styles.cardTitle}>{card.back.title}</h3>
                  <div className={styles.cardPromo}>{card.back.promo}</div>
                  {typeof (card.back as { extra?: string }).extra === 'string' && (
                    <div className={styles.cardPromo}>{(card.back as { extra?: string }).extra}</div>
                  )}
                  <div className={styles.cardCode}>{card.back.code}</div>
                  <span className={styles.cardLabel}>{card.back.label}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className={styles.bottomText}>
        All plans begin with a one-time $99 consultation and require a six-month commitment.
      </div>
      <div className={styles.ctaWrapper}>
        <VitaBellaButton
            href="#membershipplans"
            label="GET STARTED"
            bg="var(--e-global-color-green)"
            bgHover="var(--e-global-color-white)"
            text="var(--e-global-color-dark-green)"
            textHover="var(--e-global-color-dark-green)"
            arrowCircleColor="var(--e-global-color-dark-green)"
            arrowCircleColorHover="var(--e-global-color-dark-green)"
            arrowPathColor="var(--e-global-color-green)"
            arrowPathColorHover="var(--e-global-color-green)"
            onClick={() => {
              const el = document.getElementById('membershipplans');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
        />
      </div>
    </section>
  );
};

export default DUPRGetStarted;
