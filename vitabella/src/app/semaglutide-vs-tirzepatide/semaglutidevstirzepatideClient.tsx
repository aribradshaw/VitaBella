import React from "react";
import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import ProductCard from "@/components/common/ProductCard";
import ProductPhoto from "@/components/common/ProductPhoto";

export default function SemaglutideVsTirzepatideClient() {
  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow} style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.2rem 1rem 1.2rem 1rem', marginBottom: '1rem', gap: '0.5rem' }}>
          <h1 className={styles.b12SeoTitle} style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem', marginTop: 0 }}>
            Semaglutide vs Tirzepatide for Weight Loss: Which Is Right for You?
          </h1>
          <div className={styles.b12IntroText} style={{ width: '100%', maxWidth: 700, margin: '0 auto 0.7rem auto', textAlign: 'center' }}>
            <p>
              Meet semaglutide and tirzepatide, two groundbreaking once-weekly injectables that are changing how we approach sustainable weight management. These medications offer real, clinically proven results for people struggling to lose weight and keep it off. But when it comes to semaglutide vs tirzepatide for weight loss, which one fits your health goals better? Let’s break down what sets these two medications apart and help you find the best fit for your weight loss strategy.
            </p>
          </div>
          {/* Both product images side by side, centered, taller and object-fit: contain */}
          <div className={styles.b12IntroImageWrap} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
            <ProductPhoto product="semaglutide" />
            <ProductPhoto product="tirzepatide" />
          </div>
        </div>
        {/* Main article content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>What Are GLP-1 and GIP Agonists—and Why Do They Matter?</h2>
          <p>Both semaglutide and tirzepatide belong to a class of medications called GLP-1 receptor agonists. These drugs mimic a natural gut hormone (glucagon-like peptide-1) that signals your brain when you’re full, helping curb appetite and calorie intake. Tirzepatide adds another layer by targeting the GIP (glucose-dependent insulinotropic polypeptide) receptor as well. This dual action not only reduces appetite but can also boost your body’s ability to burn calories more efficiently.</p>
          <h2>Semaglutide vs Tirzepatide for Weight Loss: Comparing the Science</h2>
          <h3>How They Work</h3>
          <ul>
            <li><strong>Semaglutide:</strong> GLP-1 receptor agonist. Widely used for type 2 diabetes and now FDA-approved for chronic weight management.</li>
            <li><strong>Tirzepatide:</strong> Targets both GLP-1 and GIP receptors, offering a double effect for appetite suppression and metabolic support.</li>
          </ul>
          <h3>Weight Loss Results</h3>
          <ul>
            <li><strong>Semaglutide:</strong> Average weight loss is about 10%–15% of body weight over 68 weeks, with some participants losing up to 20%.</li>
            <li><strong>Tirzepatide:</strong> Delivers even greater results for many people—average weight loss of 15%–20% over 72 weeks, and up to 25% for some individuals.</li>
          </ul>
          <h2>Other Health Benefits</h2>
          <ul>
            <li>Improved blood sugar control (ideal for patients with prediabetes or type 2 diabetes)</li>
            <li>Lowered blood pressure</li>
            <li>Better cholesterol profiles</li>
          </ul>
          <p>These benefits make both options appealing for those with metabolic health concerns beyond weight alone.</p>
          <h2>Side Effects: What to Expect</h2>
          <ul>
            <li>Common effects include nausea, diarrhea, vomiting, and constipation. These typically ease as your body adjusts.</li>
            <li>Both medications share a similar side effect profile, but individual tolerance can vary.</li>
          </ul>
          <p>Always talk to your healthcare provider about your medical history to find the best option for you.</p>
          <h2>Semaglutide vs Tirzepatide for Weight Loss: Quick Comparison Table</h2>
          <table style={{ width: '100%', margin: '1.5rem 0', borderCollapse: 'collapse', fontSize: '1rem' }}>
            <thead>
              <tr style={{ background: '#f4f7f6', color: '#012B27' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Feature</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Semaglutide</th>
                <th style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Tirzepatide</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>What is it?</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>GLP-1 receptor agonist</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>GLP-1 and GIP receptor agonist</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Average weight loss</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>10–15% over 68 weeks</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>15–20% over 72 weeks</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Side effects</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Nausea, diarrhea, vomiting, constipation</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Nausea, diarrhea, vomiting, constipation</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Approved uses</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Type 2 diabetes, weight loss</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Type 2 diabetes, weight loss</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Efficacy</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Blood glucose improvement, hunger reduction</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e0e0e0' }}>Superior blood glucose control, greater hunger reduction</td>
              </tr>
            </tbody>
          </table>
          <h2>Choosing the Right Medication for Your Weight Loss Journey</h2>
          <p>Choosing between semaglutide vs tirzepatide for weight loss depends on your health profile, weight loss goals, and how your body responds to each treatment. Your healthcare provider can help you weigh the benefits, side effects, and long-term sustainability of each option.</p>
          <p>Remember, sustainable weight loss is a marathon, not a sprint. These medications, combined with lifestyle changes and support, can be powerful tools on your path to better health.</p>
          <h2>The Bottom Line: A New Era for Weight Loss</h2>
          <p>Semaglutide and tirzepatide are changing the game for evidence-based weight loss. If you’re tired of ineffective diets or have struggled with weight management, consider discussing these options with your healthcare provider. With the right guidance and approach, you can achieve lasting, meaningful results.</p>
          <h2>References</h2>
          <ul>
            <li><a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" target="_blank" rel="noopener noreferrer">Tirzepatide Once Weekly for the Treatment of Obesity</a></li>
            <li><a href="https://www.nejm.org/doi/full/10.1056/nejmoa2107519" target="_blank" rel="noopener noreferrer">Comparative Effectiveness of Semaglutide and Tirzepatide for Weight Loss in Adults with Overweight and Obesity in the US</a></li>
            <li><a href="https://www.nejm.org/doi/full/10.1056/nejmoa2107519" target="_blank" rel="noopener noreferrer">Tirzepatide versus semaglutide for weight loss in patients with type 2 diabetes mellitus: A value for money analysis</a></li>
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
              Not sure which is right for you? Our expert team at Vita Bella can help you compare semaglutide vs tirzepatide for weight loss and find the best fit for your health goals. Unlock your optimal health and confidence with a science-backed, personalized approach.
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
            className="svt-product-row-responsive"
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
              .svt-product-row-responsive {
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

