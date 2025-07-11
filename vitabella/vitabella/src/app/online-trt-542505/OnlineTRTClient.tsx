
import React from "react";
import '../globals.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductReviews from '@/components/common/ProductReviews';
import ProductCategorySlider from '@/components/common/ProductCategorySlider';
import employees from '@/constants/employees.json';

const faqs = [
  {
    question: "What is Online TRT?",
    answer: (
      <>
        <strong>Online TRT</strong> (Testosterone Replacement Therapy) is a modern, virtual approach to hormone health. It connects you with board-certified providers for personalized consultations, lab work, and prescription medications—all from the comfort and privacy of your home. With <strong>Vita Bella</strong>, you receive safe, effective, and convenient care, eliminating the need for frequent in-person visits.
      </>
    ),
  },
  {
    question: "How does Online TRT work?",
    answer: (
      <>
        The process starts with an online assessment and lab testing. After reviewing your results, you’ll have a virtual consultation with a licensed physician to create a tailored treatment plan. Medications and supplies are shipped directly to your door, and regular virtual check-ins ensure your therapy is safe and effective. <strong>Vita Bella</strong> prioritizes convenience, privacy, and results—no in-person visits required.
      </>
    ),
  },
  {
    question: "What are the benefits of Online TRT?",
    answer: (
      <ul className="list-disc list-inside">
        <li><strong>Accessibility:</strong> Receive care regardless of your location.</li>
        <li><strong>Convenience:</strong> Virtual consultations and home delivery of medications.</li>
        <li><strong>Confidentiality:</strong> Secure, private telehealth platform.</li>
        <li><strong>Personalization:</strong> Treatment plans tailored to your unique health profile.</li>
      </ul>
    ),
  },
  {
    question: "Can you get prescribed TRT online?",
    answer: (
      <>
        Absolutely! After your online assessment and lab work, our licensed physicians review your results and, if appropriate, prescribe TRT. Your medications are shipped directly from U.S. pharmacies, ensuring safety and authenticity.
      </>
    ),
  },
  {
    question: "Can I get TRT without seeing a doctor?",
    answer: (
      <>
        No. Professional oversight is essential for safe and effective hormone therapy. At <strong>Vita Bella</strong>, all TRT plans are supervised by experienced, licensed physicians who guide you through every step and address your concerns during virtual consultations.
      </>
    ),
  },
  {
    question: "Can I start TRT at 30?",
    answer: (
      <>
        Yes, starting TRT at 30 is not uncommon if you have symptoms of low testosterone. Age is not the only factor—your health, symptoms, and lab results guide the decision. <strong>Vita Bella</strong> conducts thorough assessments to ensure TRT is right for you.
      </>
    ),
  },
  {
    question: "How much is TRT per month?",
    answer: (
      <>
        Costs vary based on your treatment plan and medication needs, but most patients pay <strong>$150–$200/month</strong>. <strong>Vita Bella</strong> offers wholesale pricing and includes all necessary medical supplies at no extra cost.
      </>
    ),
  },
  {
    question: "How does licensed professional oversight enhance online TRT?",
    answer: (
      <>
        Licensed professional oversight ensures your therapy is safe, effective, and continuously optimized. Our team of board-certified physicians—including Dr. Daniel Bryan and Dr. Robert Lieske—monitors your progress, answers your questions, and adjusts your plan as needed.
      </>
    ),
  },
];

const OnlineTRTClient: React.FC = () => {
  // Find Dr. Daniel Bryan from employees.json
  const drDaniel = employees.find(e => e.name === 'Dr. Daniel Bryan');

  return (
    <main className="bg-white text-[#012B27] font-sans leading-relaxed" style={{ marginTop: '120px' }}>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-bold text-center">Online TRT: Testosterone Replacement Therapy</h1>
        <p className="text-lg md:text-xl mb-6 text-center">
          Experience expert <strong>Testosterone Replacement Therapy (TRT)</strong> online with Vita Bella. Our board-certified providers deliver FDA-approved medications and convenient telehealth care for men’s health. Affordable, doctor-led TRT plans are shipped directly to you, ensuring safe and effective treatment from the comfort of your home.
        </p>
        <ul className="list-disc list-inside my-4 text-base md:text-lg max-w-2xl mx-auto">
          <li>Access testosterone therapy at wholesale prices</li>
          <li>Licensed providers offering personalized and individualized care for your hormone health</li>
          <li>Top-quality, FDA approved products shipped directly to you from U.S. pharmacies</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0 w-48 md:w-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={drDaniel?.image}
            alt={drDaniel?.name}
            className="rounded-2xl shadow-md object-cover w-full h-60 md:h-72"
            loading="lazy"
          />
          <div className="mt-4 text-center">
            <div className="font-bold text-xl text-[#012B27]">{drDaniel?.name}</div>
            <div className="text-base text-gray-600 mt-1">{drDaniel?.role}</div>
          </div>
        </div>
        <div className="flex-1">
          <blockquote className="bg-[#012B27] text-white rounded-2xl p-8 text-lg md:text-2xl font-medium shadow-md flex flex-col justify-center min-h-[180px]">
            <span>&ldquo;With Vita Bella’s online TRT, you receive safe, effective care and ongoing support from our expert medical team—delivered directly to your home.&rdquo;</span>
            <span className="mt-4 italic text-xl text-[#D6FEA1]">{drDaniel?.name}</span>
          </blockquote>
        </div>
      </section>

      <SectionHeader
        left={{ h2Alt: 'Our Prescription', h2: 'Hormone Therapy' }}
        right={<></>}
      />
      <ProductCategorySlider category="Hormone Therapy" visibleCount={3} />

      <SectionHeader
        left={{ h2Alt: 'Real Results for', h2: 'Testosterone Therapy' }}
        right={
          <>Vita Bella’s online TRT clinic stands out by offering advanced medical treatments under the guidance of experienced professionals. Each plan is developed by licensed physicians who ensure the highest standards of safety and efficacy. From FDA-approved medications to comprehensive support, every solution is curated with your unique needs in mind.</>
        }
      />
      <ProductReviews subheader="Real Stories, Real Transformations" />

      {/* Two-column section with --space-3x margins and FAQ/feature content starting at "What is Online TRT" */}
      <section className="max-w-6xl mx-auto px-4" style={{ marginBottom: 'var(--space-3x)' }}>
        <div className="grid md:grid-cols-2 gap-12 awlc-columns">
          <div className="space-y-10">
            {/* Left column: FAQ 0, 2, 4, 6 */}
            {faqs.filter((_, i) => i % 2 === 0).map((faq, idx) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <div className="text-base md:text-lg text-gray-800">{faq.answer}</div>
              </div>
            ))}
          </div>
          <div className="space-y-10">
            {/* Right column: FAQ 1, 3, 5, 7 */}
            {faqs.filter((_, i) => i % 2 === 1).map((faq, idx) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <div className="text-base md:text-lg text-gray-800">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16" />
    </main>
  );
};

export default OnlineTRTClient;

