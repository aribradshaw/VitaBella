"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MembershipPlans.module.css';

interface PlanFeature {
  name: string;
  foundation: boolean | 'limited';
  performance: boolean;
}

const planFeatures: PlanFeature[] = [
  { name: 'TRT-Testosterone', foundation: true, performance: true },
  { name: 'Anti-Aging', foundation: true, performance: true },
  { name: 'Cognitive Health', foundation: true, performance: true },
  { name: 'Skin Care', foundation: true, performance: true },
  { name: 'Hair Loss Therapy', foundation: true, performance: true },
  { name: 'Sexual Wellness', foundation: true, performance: true },
  { name: 'Weight loss', foundation: 'limited', performance: true },
  { name: 'Peptide therapy', foundation: 'limited', performance: true },
  { name: 'Injury and Recovery', foundation: 'limited', performance: true },
];

const MembershipPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');
  const router = useRouter();

  const getPlanData = () => {
    if (activeTab === 'monthly') {
      return {
        foundation: {
          price: '$99',
          period: 'MONTH',
          originalPrice: '$120',
        },
        performance: {
          price: '$179',
          period: 'MONTH',
          originalPrice: '$215',
        }
      };
    } else {
      return {
        foundation: {
          price: '$900',
          period: 'YEAR',
          originalPrice: '$1,188',
        },
        performance: {
          price: '$1,700',
          period: 'YEAR',
          originalPrice: '$2,148',
        }
      };
    }
  };

  const planData = getPlanData();

  const renderFeatureValue = (value: boolean | 'limited') => {
    if (value === true) {
      return <span className={styles.featureYes}>Yes</span>;
    } else if (value === 'limited') {
      return <span className={styles.featureLimited}>No</span>;
    } else {
      return <span className={styles.featureNo}>No</span>;
    }
  };

  // Add these handlers
  const handleFoundationClick = () => {
    router.push(activeTab === 'monthly' ? '/form?fm' : '/form?fa');
  };

  const handlePerformanceClick = () => {
    router.push(activeTab === 'monthly' ? '/form?pm' : '/form?pa');
  };

  return (
    <section id="membership-plans" className={styles.membershipPlans} data-section="membership-plans">
      <div className={styles.container}>
        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            className={`${styles.tabButton} ${activeTab === 'monthly' ? styles.active : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'yearly' ? styles.active : ''}`}
            onClick={() => setActiveTab('yearly')}
          >
            Yearly
          </button>
        </div>

        {/* Plans Container */}
        <div className={styles.plansContainer}>
          {/* Foundation Plan */}
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>FOUNDATION</h3>
              <div className={styles.planPricing}>
                <span className={styles.planPrice}>
                  {planData.foundation.price}/{planData.foundation.period}
                </span>
                <span className={styles.originalPrice}>
                  {planData.foundation.originalPrice}
                </span>
                <span className={styles.costNote}>+ cost of medication</span>
              </div>
            </div>

            <div className={styles.planFeatures}>
              <div className={styles.featureItem}>
                <span>✓ 1:1 quarterly telehealth visits with provider</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Custom-tailored treatment plan by a medical provider</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Direct provider messaging access</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Zero-cost injection supplies</span>
              </div>
            </div>

            <div className={styles.accessSection}>
              <h4 className={styles.accessTitle}>ACCESS TO</h4>
              <div className={styles.accessList}>
                {planFeatures.map((feature, index) => (
                  <div key={index} className={styles.accessItem}>
                    <span className={styles.accessName}>{feature.name}</span>
                    {renderFeatureValue(feature.foundation)}
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.selectPlanButton}
              onClick={handleFoundationClick}
            >
              <span>Pick This Plan</span>
              <div className={styles.buttonArrow}>
                <img src="/brand/white-arrow.svg" alt="Arrow" width="24" height="24" />
              </div>
            </button>
          </div>

          {/* Performance Plan */}
          <div className={`${styles.planCard} ${styles.performancePlan}`}>
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>PERFORMANCE</h3>
              <div className={styles.planPricing}>
                <span className={styles.planPrice}>
                  {planData.performance.price}/{planData.performance.period}
                </span>
                <span className={styles.originalPrice}>
                  {planData.performance.originalPrice}
                </span>
                <span className={styles.costNote}>+ cost of medication</span>
              </div>
            </div>

            <div className={styles.planFeatures}>
              <div className={styles.featureItem}>
                <span>✓ 1:1 quarterly telehealth visits with provider</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Custom-tailored treatment plan by a medical provider</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Direct provider messaging access</span>
              </div>
              <div className={styles.featureItem}>
                <span>✓ Zero-cost injection supplies</span>
              </div>
            </div>

            <div className={styles.accessSection}>
              <h4 className={styles.accessTitle}>ACCESS TO</h4>
              <div className={styles.accessList}>
                {planFeatures.map((feature, index) => (
                  <div key={index} className={styles.accessItem}>
                    <span className={styles.accessName}>{feature.name}</span>
                    {renderFeatureValue(feature.performance)}
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`${styles.selectPlanButton} ${styles.performanceButton}`}
              onClick={handlePerformanceClick}
            >
              <span>Pick This Plan</span>
              <div className={styles.buttonArrow}>
                <img src="/brand/white-arrow.svg" alt="Arrow" width="24" height="24" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
