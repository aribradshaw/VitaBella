
"use client";
import React from 'react';
import '../globals.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import ProductReviews from '@/components/common/ProductReviews';
import employees from '@/constants/employees.json';

const TOCClient: React.FC = () => {
    const drRobert = employees.find(e => e.name === 'Dr. Robert Lieske');
    return (
        <div style={{ paddingTop: 64 }}>
            <div>
                <h1>Testosterone Replacement Therapy Online Clinic</h1>
                <p>
                    Vita Bella has revolutionized men’s medical care by offering a highly convenient and affordable online Testosterone Replacement Therapy (TRT) program. By leveraging modern telemedicine, Vita Bella gives expert TRT consultations and treatments, eliminating the need for in-person visits. Boost energy, enhance muscle mass, and improve mood with Vita Bella today!
                </p>
                <ul className="list-disc list-inside my-4">
                    <li>Top-quality Testosterone, shipped directly to you from U.S. pharmacies</li>
                    <li>Helps in repairing muscle, bone density, reducing fat distribution and more</li>
                    <li>Licensed providers offering personalized and individualized care for your hormone needs</li>
                </ul>
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
                        <div>&quot;Our mission is to empower you to feel your best at every stage of life. With safe, effective TRT, you can reclaim your energy, confidence, and well-being.&quot;</div>
                        <div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 24, color: '#D6FEA1' }}>{drRobert?.name}</div>
                    </div>
                </div>
            </div>
            <SectionHeader
                left={{
                    h2Alt: 'Our Prescription',
                    h2: 'TRT Options',
                }}
                right={<></>}
            />
            <ProductCategorySlider category="Hormone Therapy" visibleCount={3} />
            <SectionHeader
                left={{
                    h2Alt: 'Real Results for',
                    h2: 'Testosterone Health',
                }}
                right={
                    <>Vita Bella’s TRT clinic stands out for its commitment to safety, science, and patient-centered care. Our board-certified providers use the latest research to guide every treatment, ensuring you achieve optimal results with minimal risk. From testosterone and HCG to advanced therapies, we offer comprehensive solutions for lasting wellness.</>
                }
            />
            <ProductReviews subheader="Real Stories, Real Transformations" />
            <div className="toc-columns" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }} className="toc-columns-inner">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
                        <div className="space-y-8" style={{ flex: 1 }}>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">How Does Testosterone Replacement Therapy Help?</h3>
                                <p>
                                    Testosterone Replacement Therapy (TRT) can provide significant benefits for both men and women by boosting muscle growth, enhancing libido, and increasing overall vitality. For men, TRT plays a crucial role in improving muscle mass and strength, as testosterone is directly involved in protein synthesis, which is essential for muscle building. With adequate testosterone levels, individuals often see improved muscle tone and energy levels, leading to more active and fulfilling lives.
                                </p>
                                <p>
                                    In addition to physical benefits, TRT can also enhance sexual health. As testosterone levels decrease with age, many men experience a drop in libido. TRT can help restore sexual desire and function, leading to improved intimacy and personal relationships.
                                </p>
                                <p>
                                    Higher testosterone levels are linked to better mood stability, mental clarity, and improved cognitive function. Overall, TRT can revitalize both physical and mental health, giving individuals the energy, confidence, and vitality they need to thrive.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Comprehensive Packages for Simplified Care</h3>
                                <p>
                                    Vita Bella goes beyond providing basic TRT services. Our comprehensive packages include all necessary supplies, such as syringes, medications, and instructional materials. This all-in-one approach not only simplifies the process but also makes the treatment cost-effective. By eliminating the hassle of sourcing individual components, Vita Bella ensures a smooth and straightforward experience for patients.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
                        <div className="space-y-8" style={{ flex: 1 }}>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Can I get TRT without seeing a doctor?</h3>
                                <p>
                                    Testosterone Replacement Therapy (TRT) is a medical treatment that requires oversight by a healthcare professional. It's essential to have a licensed physician assess your symptoms, conduct necessary tests, and confirm a diagnosis before initiating treatment. While it might seem convenient to seek treatment without a doctor's consultation, doing so could pose serious health risks, as TRT involves hormone manipulation that needs careful monitoring. At Vita Bella, virtual consultations with experienced physicians ensure you receive safe and personalized care tailored specifically to your needs. This professional guidance not only optimizes treatment outcomes but also mitigates any potential side effects.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">How much does monthly TRT cost?</h3>
                                <p>
                                    The cost of TRT can vary significantly based on factors such as the type of treatment, the frequency of medication, and the clinic you choose. Typically, monthly costs can range from $100 to $500, depending on these variables. At Vita Bella, we strive to provide cost-effective solutions by offering comprehensive wellness plans at wholesale prices. This includes all necessary medical supplies, such as syringes and alcohol wipes, at no additional charge, which adds considerable value compared to other providers. Understanding the cost structure upfront and exploring the included services can significantly impact your overall treatment experience.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">How to get approved for TRT?</h3>
                                <p>
                                    Approval for TRT begins with a comprehensive evaluation conducted by a licensed healthcare provider. This involves reviewing your medical history, discussing your symptoms, and running specific tests, such as blood tests to measure your testosterone levels. If you are experiencing symptoms like low energy, decreased libido, or mood swings, discussing these with a physician can pave the way for a TRT assessment. Clinics like Vita Bella emphasize a thorough approach to ensure that only those who genuinely need TRT receive it, with expert guidance every step of the way. Regular follow-ups and monitoring are critical components of this approval process, ensuring your safety and the effectiveness of the treatment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (min-width: 900px) {
                    .toc-columns {
                        flex-direction: row !important;
                        gap: 3.5rem !important;
                    }
                    .toc-columns-inner {
                        flex-direction: row !important;
                        gap: 3.5rem !important;
                    }
                    .toc-columns-inner > div {
                        width: 50% !important;
                    }
                }
            `}</style>
            <div style={{ height: 'var(--space-4x)' }} />
        </div>
    );
};

export default TOCClient;