
"use client";
import React from "react";
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import ProductReviews from '@/components/common/ProductReviews';
import employees from '@/constants/employees.json';

const SemaglutideArizonaClient: React.FC = () => {
    const drBryan = employees.find(e => e.name === 'Dr. Daniel Bryan');
    const drLieske = employees.find(e => e.name === 'Dr. Robert Lieske');
    const drBumetti = employees.find(e => e.name === 'Dr. Brooke Bumetti');
    return (
        <div style={{ paddingTop: 64 }}>
            <div>
                <h1>Semaglutide Arizona: Effective Weight Loss Solutions</h1>
                <p>
                    Semaglutide is a GLP-1 receptor agonist originally developed for type 2 diabetes, now widely used for weight loss. By mimicking the GLP-1 hormone, it reduces appetite and food intake, making it a powerful tool for sustainable weight management.
                </p>
                <ul className="list-disc list-inside my-4">
                    <li>FDA-approved GLP-1 medication for weight loss</li>
                    <li>Personalized plans and virtual consultations with licensed Arizona providers</li>
                    <li>All medical supplies included—no hidden fees</li>
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
                        <div>&quot;Our semaglutide program is designed for safety, affordability, and real results—guided by board-certified providers every step of the way.&quot;</div>
                        <div style={{ marginTop: 18, fontStyle: 'italic', fontSize: 24, color: '#D6FEA1' }}>{drLieske?.name}</div>
                    </div>
                </div>
            </div>
            <SectionHeader
                left={{
                    h2Alt: 'Our Prescription',
                    h2: 'Weight Loss Options',
                }}
                right={<></>}
            />
            <ProductCategorySlider category="Weight Loss" visibleCount={3} />
            <SectionHeader
                left={{
                    h2Alt: 'Real Results for',
                    h2: 'Weight Loss',
                }}
                right={
                    <>Vita Bella’s Arizona semaglutide program stands out for its safety, affordability, and ongoing support. Our board-certified providers use the latest research to guide every treatment, ensuring you achieve optimal results with minimal risk. All plans include supplies and regular check-ins for your success.</>
                }
            />
            <ProductReviews subheader="Real Stories, Real Transformations" />
            <div className="semaglutide-columns" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How much does semaglutide cost in Arizona?</h3>
                        <p>
                            The cost of semaglutide in Arizona varies, but Vita Bella offers affordable plans that include all medical supplies. Check with your provider or insurance for possible savings.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How to get semaglutide for $25?</h3>
                        <p>
                            Manufacturer savings programs or insurance may reduce your cost. Vita Bella focuses on comprehensive, affordable care with bundled supplies and ongoing support.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">How do you get approved for semaglutide?</h3>
                        <p>
                            Approval starts with a consultation and health assessment by a licensed provider. Vita Bella’s physicians create a personalized plan and monitor your progress for safety and results.
                        </p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Who has Ozempic in stock near Phoenix, AZ?</h3>
                        <p>
                            Major pharmacies like CVS, Walgreens, and Walmart may have Ozempic, but supply can vary. Vita Bella offers direct mail order for reliable access and ongoing support.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What are the common misconceptions about semaglutide?</h3>
                        <p>
                            Semaglutide is not just for diabetes—it’s proven for weight loss. It works best with lifestyle changes, not as a standalone solution. Vita Bella’s holistic approach ensures lasting results.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">What is the future of weight management with semaglutide?</h3>
                        <p>
                            Ongoing research and digital health integration will make semaglutide even more accessible and effective. Vita Bella is committed to innovative, patient-centered care for Arizona residents.
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (min-width: 900px) {
                    .semaglutide-columns {
                        flex-direction: row !important;
                        gap: 3.5rem !important;
                    }
                    .semaglutide-columns > .space-y-8 {
                        width: 50% !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SemaglutideArizonaClient;

