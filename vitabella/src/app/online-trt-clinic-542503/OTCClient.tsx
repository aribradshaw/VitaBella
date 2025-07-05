
"use client";

import React from "react";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import ProductReviews from '@/components/common/ProductReviews';
import employees from '@/constants/employees.json';

const OTCClient: React.FC = () => {
    const drLieske = employees.find(e => e.name === 'Dr. Robert Lieske');
    return (
        <div style={{ paddingTop: 64 }}>
            <div>
                <h1>Online Testosterone Replacement Therapy Clinic</h1>
                <p>
                    Experience renewed energy, confidence, and vitality with doctor-led online TRT from Vita Bella. Our board-certified providers deliver personalized testosterone replacement therapy, shipped directly to you from U.S. pharmacies.
                </p>
                <ul className="list-disc list-inside my-4">
                    <li>Top-quality testosterone, shipped directly to you from U.S. pharmacies</li>
                    <li>Licensed providers offering personalized and individualized care for your hormone needs</li>
                    <li>FDA-approved products, affordable membership pricing</li>
                </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', margin: '2.5rem 0' }}>
                <div style={{ flex: '0 0 25%', maxWidth: '25%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {drLieske && (
                        <img
                            src={drLieske.image}
                            alt={drLieske.name}
                            style={{ width: '100%', borderRadius: 24, objectFit: 'cover', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
                        />
                    )}
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 20, color: '#012B27' }}>{drLieske?.name}</div>
                        <div style={{ fontSize: 15, color: '#555', marginTop: 2 }}>{drLieske?.role}</div>
                    </div>
                </div>
                <div style={{ flex: '0 0 75%', maxWidth: '75%' }}>
                    <div style={{ background: '#012B27', color: '#fff', borderRadius: 28, padding: '2rem 2.5rem', fontSize: 22, fontFamily: 'Switzer, Arial, Helvetica, sans-serif', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 180 }}>
                        <div>&quot;With expert medical supervision, our TRT program is designed to safely restore your vitality and well-being.&quot;</div>
                        <div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 24, color: '#D6FEA1' }}>{drLieske?.name}</div>
                    </div>
                </div>
            </div>
            <SectionHeader
                left={{
                    h2Alt: 'Our Prescription',
                    h2: 'Hormone Therapy Options',
                }}
                right={<></>}
            />
            {/* Use the correct category name as in your products.json, e.g. 'Hormone Therapy' or 'TRT' if 'Testosterone' does not match */}
            <ProductCategorySlider category="Hormone Therapy" visibleCount={3} />
            <SectionHeader
                left={{
                    h2Alt: 'Real Results for',
                    h2: 'Testosterone Therapy',
                }}
                right={
                    <>Vita Bella’s online TRT clinic stands out for its safety, affordability, and ongoing support. Our board-certified providers use the latest research to guide every treatment, ensuring you achieve optimal results with minimal risk. All plans include supplies and regular check-ins for your success.</>
                }
            />
            <ProductReviews subheader="Real Stories, Real Transformations" />
            <div className="awlc-columns">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How does Vita Bella make TRT affordable and accessible?</h3>
                        <p>
                            Vita Bella offers wholesale pricing and comprehensive membership benefits, including all necessary medical supplies at no extra cost. Our model ensures high-quality care is accessible to everyone.
                        </p>
                        <p className="italic">
                            How would affordable, expert-led TRT impact your health journey?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What makes Vita Bella’s TRT delivery model innovative?</h3>
                        <p>
                            We ship directly from U.S. pharmacies for timely access and seamless care. Our direct-to-door approach supports adherence and integrates easily into your lifestyle.
                        </p>
                        <p className="italic">
                            How could this level of convenience improve your engagement with TRT?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How does Vita Bella support its TRT members?</h3>
                        <p>
                            Our members receive ongoing support, regular virtual check-ins, and access to a dedicated care team. This community-driven approach keeps you motivated and informed.
                        </p>
                        <p className="italic">
                            What role does support play in your health goals?
                        </p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Seamless Care Delivery</h3>
                        <p>
                            Medications and supplies are shipped directly from U.S. pharmacies, ensuring timely access and continuity. This approach encourages adherence and empowers you to stay on track.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Stories of Success</h3>
                        <p>
                            Our patients share stories of renewed energy, improved strength, and better quality of life. Testimonials highlight our personalized care, affordability, and expert guidance.
                        </p>
                        <p>
                            <a href="https://www.google.com/search?q=Vita+Bella+Health+reviews" target="_blank" rel="noopener noreferrer">
                                See our Google Reviews.
                            </a>
                        </p>
                        <p>
                            These stories show the power of holistic, individualized TRT care in transforming lives.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What impact do stories of transformation have for those considering TRT?</h3>
                        <p>
                            Patient testimonials inspire and affirm the effectiveness of our TRT programs. Real-life experiences highlight the benefits of expert-led, comprehensive care.
                        </p>
                        <p className="italic">
                            What matters most to you—success stories, expert guidance, or affordability?
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ height: 'var(--space-4x)' }} />
        </div>
    );
};

export default OTCClient;
