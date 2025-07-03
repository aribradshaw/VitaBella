"use client";

import React from 'react';
import '../globals.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductReviews from '@/components/common/ProductReviews';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import employees from '@/constants/employees.json';

const BOHCClient: React.FC = () => {
    // Find Dr. Robert Lieske from employees.json
    const drRobert = employees.find(e => e.name === 'Dr. Robert Lieske');

    return (
        <div style={{ paddingTop: 64 }}>
            <div>
                <h1>Best Online HRT Clinic</h1>
                <p>
                    Experience the future of hormone health with Vita Bella’s online HRT clinic. Our expert physicians provide personalized hormone replacement therapy (HRT) plans, leveraging the latest medical advancements to help you regain balance, energy, and vitality. With convenient telehealth consultations and direct-to-door delivery, optimizing your hormones has never been easier or more accessible.
                </p>
                <ul className="list-disc list-inside my-4">
                    <li>Personalized HRT plans tailored to your unique needs</li>
                    <li>Board-certified providers with extensive hormone therapy experience</li>
                    <li>High-quality, FDA-approved medications shipped directly to you</li>
                </ul>
                <h2 className="mt-6 mb-2 text-xl font-semibold">Why Choose Vita Bella for HRT?</h2>
                <p>
                    Hormone imbalances can impact every aspect of your well-being, from energy and mood to metabolism and sexual health. Our clinic specializes in evidence-based HRT solutions for both men and women, including testosterone, estrogen, and thyroid optimization. We use advanced diagnostics and ongoing monitoring to ensure safe, effective results.
                </p>
                <p>
                    Our streamlined process means you can access expert care from the comfort of your home. After a comprehensive virtual consultation, your provider will design a treatment plan that fits your goals and lifestyle. Medications are shipped discreetly and securely, and our team is always available for support and follow-up.
                </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', margin: '2.5rem 0' }}>
                <div style={{ flex: '0 0 25%', maxWidth: '25%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={drRobert?.image}
                        alt={drRobert?.name}
                        style={{ width: '100%', borderRadius: 24, objectFit: 'cover', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
                    />
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 20, color: '#012B27' }}>{drRobert?.name}</div>
                        <div style={{ fontSize: 15, color: '#555', marginTop: 2 }}>{drRobert?.role}</div>
                    </div>
                </div>
                <div style={{ flex: '0 0 75%', maxWidth: '75%' }}>
                    <div style={{ background: '#012B27', color: '#fff', borderRadius: 28, padding: '2rem 2.5rem', fontSize: 22, fontFamily: 'Switzer, Arial, Helvetica, sans-serif', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 180 }}>
                        <div>&quot;Our mission is to empower you to feel your best at every stage of life. With safe, effective HRT, you can reclaim your energy, confidence, and well-being.&quot;</div>
                        <div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 24, color: '#D6FEA1' }}>{drRobert?.name}</div>
                    </div>
                </div>
            </div>
            <SectionHeader
                left={{
                    h2Alt: 'Personalized',
                    h2: 'Hormone Therapy Options',
                }}
                right={<></>}
            />
            <ProductCategorySlider category="Hormone Therapy" visibleCount={3} />
            <SectionHeader
                left={{
                    h2Alt: 'Real Results for',
                    h2: 'Hormone Health',
                }}
                right={
                    <>Vita Bella’s online HRT clinic stands out for its commitment to safety, science, and patient-centered care. Our board-certified providers use the latest research to guide every treatment, ensuring you achieve optimal results with minimal risk. From testosterone and estrogen to thyroid support, we offer comprehensive solutions for lasting wellness.</>
                }
            />
            <ProductReviews />
            <div className="bohc-columns">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How does Vita Bella make HRT accessible?</h3>
                        <p>
                            We believe everyone deserves access to high-quality hormone care. Our telehealth platform removes barriers, allowing you to connect with experts from anywhere. Medications are delivered directly to your door, and our transparent pricing ensures you always know what to expect.
                        </p>
                        <p className="italic">
                            How might convenient, affordable HRT change your approach to wellness?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What makes our HRT approach unique?</h3>
                        <p>
                            Vita Bella’s approach is rooted in science and compassion. We tailor every plan to your unique needs, monitor your progress closely, and adjust as needed for the best outcomes. Our providers are always available for questions and support.
                        </p>
                        <p className="italic">
                            What would you look for in a hormone health partner?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Comprehensive Support</h3>
                        <p>
                            From your first consultation to ongoing care, Vita Bella is with you every step of the way. Our team provides education, encouragement, and expert guidance to help you thrive.
                        </p>
                        <p className="italic">
                            How important is ongoing support in your health journey?
                        </p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Seamless Care Delivery</h3>
                        <p>
                            Our streamlined process ensures you get the care you need, when you need it. No waiting rooms, no hassle—just expert care and fast, secure delivery of your medications.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Patient Success Stories</h3>
                        <p>
                            Our patients’ stories speak for themselves. From renewed energy to improved mood and vitality, countless individuals have transformed their lives with Vita Bella’s HRT solutions. See what’s possible when you partner with a clinic that puts your needs first.
                        </p>
                        <p>
                            <a href="https://www.google.com/search?q=Vita+Bella+Health+reviews" target="_blank" rel="noopener noreferrer">
                                See our Google Reviews.
                            </a>
                        </p>
                        <p>
                            These testimonials highlight the real-world impact of our personalized, science-backed approach to hormone health.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What inspires you to take charge of your hormone health?</h3>
                        <p>
                            Whether it’s expert guidance, proven results, or the promise of a better quality of life, Vita Bella is here to help you achieve your goals. Let us support you on your journey to optimal wellness.
                        </p>
                        <p className="italic">
                            What would motivate you to start your HRT journey?
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ height: 'var(--space-4x)' }} />
        </div>
    );
};

export default BOHCClient;
