"use client";

import React from 'react';
import '../globals.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductReviews from '@/components/common/ProductReviews';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import employees from '@/constants/employees.json';


const AWLCClient: React.FC = () => {
    // Find Dr. Robert Lieske from employees.json
    const drRobert = employees.find(e => e.name === 'Dr. Robert Lieske');

    return (
        <div style={{ paddingTop: 64 }}>
            <div>
                <h1>Arizona Weight Loss Clinic</h1>
                <p>
                    Our prescription weight loss program features <strong>FDA-approved GLP-1 (Semaglutide)</strong> medications that target the biological factors hindering weight loss for many individuals. These cutting-edge treatments work by regulating hunger, increasing satiety, and stabilizing blood sugar levels, making weight loss more achievable. By addressing core metabolic processes, GLP-1s offer a powerful solution for sustainable weight management, helping individuals effectively manage their weight long-term.
                </p>
                <ul className="list-disc list-inside my-4">
                    <li>Access weight loss medications at wholesale prices</li>
                    <li>Licensed providers offering personalized and individualized care for your weight loss needs</li>
                    <li>Top-quality, FDA approved products shipped directly to you from U.S. pharmacies</li>
                </ul>
                <h2 className="mt-6 mb-2 text-xl font-semibold">The science behind our treatments and your health and safety</h2>
                <p>
                    <strong>GLP-1 (glucagon-like peptide-1)</strong> is a naturally occurring hormone that plays a crucial role in regulating appetite, glucose metabolism, and insulin production. It is released from the intestines after food intake and signals the brain to reduce hunger, which helps control overall food consumption. GLP-1 also enhances insulin secretion in response to meals, improves blood sugar control, and slows gastric emptying, all of which contribute to better weight management. Because of these beneficial effects, GLP-1-based medications have been developed as a treatment for obesity and type 2 diabetes.
                </p>
                <p>
                    These medications work by mimicking the action of the body’s natural GLP-1 hormone. By stimulating the GLP-1 receptors, they promote a feeling of fullness, reduce hunger, and help control blood sugar levels more effectively. GLP-1 treatments, such as semaglutide, have been shown to lead to significant weight loss when combined with a healthy diet and exercise routine. They offer an effective, long-term solution for those struggling with weight management, especially when other methods have not been successful.
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
                        <div>&quot;Under proper supervision of a Vita Bella medical professional, our medicine can safely boost both mental and physical capabilities.&quot;</div>
                        <div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 24, color: '#D6FEA1' }}>{drRobert?.name}</div>
                    </div>
                </div>
            </div>
            <SectionHeader
                left={{
                    h2Alt: 'Our Prescription',
                    h2: 'Weight Loss Options',
                }}
                right={
                    <></>
                }            
            />
            <ProductCategorySlider category="Weight Loss" visibleCount={3} />
            <SectionHeader
                left={{
                    h2Alt: 'Real Results for',
                    h2: 'Weight Loss',
                }}
                right={
                    <>Vita Bella Arizona weight loss clinic sets itself apart by offering cutting-edge medical treatments under the guidance of experienced professionals. Each plan is developed by licensed physicians who ensure the highest standards of safety and efficacy. From FDA-approved medications to advanced therapeutic techniques, every solution is curated with the patient’s unique needs in mind.</>
                }            
            />
            <ProductReviews />
            <div className="awlc-columns">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How is Vita Bella making wellness both affordable and accessible?</h3>
                        <p>
                            At Vita Bella, the mission to democratize wellness is evident through their affordable pricing model and comprehensive service offerings. By providing medications and treatments at wholesale prices, Vita Bella ensures financial constraints don’t impede anyone’s journey to better health. Membership benefits include significant savings and cover all necessary medical supplies at no additional cost, making it easier for patients to focus on their health goals without stress over expenses. This model not only makes high-quality healthcare more attainable but also reflects Vita Bella’s commitment to inclusivity and accessibility.
                        </p>
                        <p className="italic">
                            How might having a more affordable healthcare option impact your willingness to pursue wellness initiatives?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What makes Vita Bella’s health delivery model innovative?</h3>
                        <p>
                            Vita Bella revolutionizes healthcare delivery with a model that emphasizes convenience and accessibility. By shipping directly from U.S. pharmacies, they eliminate unnecessary delays, ensuring timely access to necessary medications. This direct-to-door approach doesn’t just save time; it supports patients in sticking to their treatment plans by integrating seamlessly into their daily lives.
                        </p>
                        <p className="italic">
                            How do you think this level of convenience could influence your engagement with healthcare services?
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How does Vita Bella provide comprehensive support to its members?</h3>
                        <p>
                            Support is a cornerstone of Vita Bella’s approach, offering members not just medical care but a robust network of guidance and encouragement. Regular virtual check-ins create a strong connection between patients and their healthcare team, fostering an environment of trust and accountability. This ongoing support ensures patients feel part of a community, motivating them at every stage of their wellness journey.
                        </p>
                        <p className="italic">
                            What role might such a supportive environment play in achieving your health goals?
                        </p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Seamless Care Delivery</h3>
                        <p>
                            Vita Bella’s streamlined delivery model revolutionizes patient care. Medications and treatment supplies are shipped directly from U.S. pharmacies, ensuring timely access and continuity. This innovative approach not only enhances convenience but also encourages adherence to wellness plans, empowering patients to stay on track with their goals.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Stories of Success</h3>
                        <p>
                            Vita Bella’s impact is best illustrated through the stories of their patients. From significant weight loss to improved cognitive function, countless individuals have experienced life-changing transformations under their care. Testimonials highlight the personalized attention, affordability, and comprehensive approach that make Vita Bella a trusted partner in health.
                        </p>
                        <p>
                            <a href="https://www.google.com/search?q=Vita+Bella+Health+reviews" target="_blank" rel="noopener noreferrer">
                                See our Google Reviews.
                            </a>
                        </p>
                        <p>
                            These success stories underscore the power of holistic, individualized care in fostering not only physical health but also emotional and mental well-being. Vita Bella’s dedication to excellence continues to inspire and transform lives, proving that personalized wellness is the key to enduring health.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What impact do stories of transformation have for individuals considering Vita Bella?</h3>
                        <p>
                            Patient testimonials at Vita Bella serve as powerful, inspiring evidence of the transformative effects of their wellness programs. These stories of weight loss, cognitive health improvements, and overall well-being showcase the real-life impact of personalized and comprehensive care. They not only inspire others to embark on their own health journeys but also affirm Vita Bella’s commitment to changing lives. By highlighting individual experiences and successes, these narratives reinforce the unique benefits of Vita Bella’s approach.
                        </p>
                        <p className="italic">
                            What might be a compelling factor for you when considering a wellness program—personal success stories, expert guidance, or affordability?
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ height: 'var(--space-4x)' }} />
        </div>
    );
};


export default AWLCClient;