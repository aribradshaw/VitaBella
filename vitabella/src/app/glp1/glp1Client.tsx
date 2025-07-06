
import React from "react";
import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import ProductCard from "@/components/common/ProductCard";
import ProductPhoto from "@/components/common/ProductPhoto";

export default function Glp1Client() {
  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow} style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.2rem 1rem 1.2rem 1rem', marginBottom: '1rem', gap: '0.5rem' }}>
          <h1 className={styles.b12SeoTitle} style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem', marginTop: 0 }}>
            GLP-1 Medications for Weight Loss: Science-Backed Solutions at Vita Bella
          </h1>
          <div className={styles.b12IntroText} style={{ width: '100%', maxWidth: 700, margin: '0 auto 0.7rem auto', textAlign: 'center' }}>
            <p>
              Discover how GLP-1 medications like semaglutide and tirzepatide can help you achieve lasting weight loss, improved metabolic health, and a better quality of life. Learn the science, benefits, and what to expect from these breakthrough therapies.
            </p>
          </div>
          {/* Both product images side by side, centered, taller and object-fit: contain */}
          <div className={styles.b12IntroImageWrap} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '0 auto' }}>
            <ProductPhoto product="semaglutide" />
            <ProductPhoto product="tirzepatide" />
          </div>
        </div>
        {/* Main article content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>How GLP-1 Medications Help You Feel Full and Lose Weight</h2>
          <p>If you’ve been frustrated by fad diets and fleeting results, it’s time to try a new, science-backed approach to weight loss. GLP-1 medications for weight loss are quickly becoming the go-to solution for people looking to shed pounds and maintain long-term health. Originally developed for diabetes management, these medications are now widely recognized for their powerful role in sustainable weight loss.</p>
          <p>GLP-1 medications, such as semaglutide and tirzepatide, mimic the natural hormone glucagon-like peptide-1 (GLP-1) in your body. This hormone helps regulate appetite by signaling your brain that you’re full and slowing the rate at which your stomach empties. The result is reduced cravings, smaller portion sizes, and greater satisfaction after meals—removing two of the biggest hurdles in any weight loss journey.</p>
          <h2>What Are GLP-1 Medications for Weight Loss?</h2>
          <p>Think of GLP-1 medications as strategic allies in your weight management program. By imitating the effects of your body’s own GLP-1 hormone, these medications essentially “hack” your hunger hormones, helping you feel satisfied on less food. This mechanism not only decreases calorie intake but also improves adherence to healthy habits, making long-term weight loss more achievable.</p>
          <p>Recent studies show their effectiveness: patients have seen average weight loss of 10-20%, compared to only 2-4% with diet and exercise alone. For someone weighing 200 pounds, this could mean losing 20-40 pounds—results that were once out of reach for many.</p>
          <h2>Beyond Weight Loss: Additional Health Benefits of GLP-1 Medications</h2>
          <ul>
            <li><strong>Blood Sugar Control:</strong> GLP-1 medications help stabilize blood glucose levels, lowering the risk of developing or worsening diabetes.</li>
            <li><strong>Cardiovascular Health:</strong> Studies in peer-reviewed journals such as JAMA Internal Medicine and Diabetes Care show reductions in LDL cholesterol and blood pressure, as well as a decreased risk of heart attack and stroke.</li>
            <li><strong>Long-Term Wellness:</strong> Ongoing research continues to reveal additional benefits, including potential support for liver health and reduction of inflammation.</li>
          </ul>
          <p>These positive outcomes are strongest when GLP-1 medications are combined with a balanced diet and regular exercise.</p>
          <h2>What to Expect: Effectiveness, Safety, and Considerations</h2>
          <p>GLP-1 medications for weight loss are not magic pills, but they do offer a valuable boost for those who have struggled with traditional methods. Clinical trials—including recent FDA-approved studies—show significant weight loss and improved metabolic health in patients with obesity, even for those without diabetes.</p>
          <p>However, like any prescription therapy, there can be side effects such as nausea, vomiting, and constipation. Most people find these ease over time, but it’s important to consult your healthcare provider to see if GLP-1 therapy fits your health goals and medical history.</p>
          <h2>The Future of Weight Management: Why Choose GLP-1 Medications?</h2>
          <p>GLP-1 medications for weight loss represent a major advancement in modern weight management. With new formulations and combination therapies being developed, these medications are setting a new standard for safe, effective, and sustainable results.</p>
          <h2>Explore the Science: Key Studies on GLP-1 Medications for Weight Loss</h2>
          <ul>
            <li>
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9181568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Efficacy of Liraglutide in Non-Diabetic Obese Adults: A Systematic Review and Meta-Analysis of Randomized Controlled Trials.” PMC, 2022.
              </a>
            </li>
            <li>
              <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)00213-0/abstract" target="_blank" rel="noopener noreferrer">
                “Semaglutide 2·4 mg once a week in adults with overweight or obesity, and type 2 diabetes (STEP 2): a randomised, double-blind, double-dummy, placebo-controlled, phase 3 trial.” The Lancet, 2021.
              </a>
            </li>
            <li>
              <a href="https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.118.034516" target="_blank" rel="noopener noreferrer">
                “Impact of Liraglutide on Cardiovascular Events in Patients with Overweight or Obesity and Type 2 Diabetes.” JAMA Intern Med, 2022
              </a>
            </li>
          </ul>
        </article>
      </section>

      {/* Bottom Section: CTA above, then 2-column products */}
      <section className={styles.b12BottomSection}>
        <div className={styles.b12BottomRow} style={{ flexDirection: 'column' }}>
          {/* CTA at the top */}
          <div className={styles.b12BottomCta} style={{ marginBottom: '2.5rem', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }}>
            <h2>Take the Next Step Toward Lasting Weight Loss</h2>
            <p style={{ textAlign: 'center' }}>
              GLP-1 medications for weight loss, including semaglutide and tirzepatide, are transforming obesity care. With ongoing research and new approvals, these therapies are more accessible and effective than ever. If you want to find out whether GLP-1 medications are right for you, our expert team at Vita Bella is here to guide you. Unlock your optimal health and confidence with a cutting-edge, science-backed approach personalized to your needs.
            </p>
            <VitaBellaButton
              href="/membership"
              label="Speak With a Specialist"
              bg="var(--e-global-color-dark-green)"
              bgHover="var(--e-global-color-green)"
              text="var(--e-global-color-white)"
              textHover="var(--e-global-color-dark-green)"
              arrowCircleColor="var(--e-global-color-lightgreen)"
              arrowCircleColorHover="var(--e-global-color-dark-green)"
              arrowPathColor="var(--e-global-color-dark-green)"
              arrowPathColorHover="var(--e-global-color-green)"
              className={styles.b12ProductBtn}
              style={{ marginTop: '1.2rem', width: '90%' }}
            />
          </div>
          {/* Products side by side (stack on mobile, side by side on desktop) */}
          <div
            className="glp1-product-row-responsive"
            style={{
              display: 'flex',
              flexDirection: 'column', // fallback for mobile
              gap: '2rem',
              width: '100%',
              maxWidth: 900,
              margin: '0 auto',
              justifyContent: 'center'
            }}
          >
            <ProductCard product="semaglutide" />
            <ProductCard product="tirzepatide" />
          </div>
          <style>{`
            @media (min-width: 900px) {
              .glp1-product-row-responsive {
                flex-direction: row !important;
                align-items: stretch;
              }
            }
          `}</style>
        </div>
      </section>
    </main>
  );
}
