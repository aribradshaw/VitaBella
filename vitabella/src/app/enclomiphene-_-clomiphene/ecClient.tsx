import React from "react";
import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";


import ProductCard from "@/components/common/ProductCard";
import ProductPhoto from "@/components/common/ProductPhoto";

export default function EcClient() {


  return (
    <main className={styles.b12Main}>
      <section className={styles.b12ArticleSection}>
        {/* Stack H1, intro text, and images vertically with minimal spacing */}
        <div className={styles.b12IntroRow} style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.2rem 1rem 1.2rem 1rem', marginBottom: '1rem', gap: '0.5rem' }}>
          <h1 className={styles.b12SeoTitle} style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem', marginTop: 0 }}>
            Enclomiphene vs Clomiphene: Boosting Testosterone and Fertility the Smart Way
          </h1>
          <div className={styles.b12IntroText} style={{ width: '100%', maxWidth: 700, margin: '0 auto 0.7rem auto', textAlign: 'center' }}>
            <p>
              Understand the difference between enclomiphene and clomiphene for men with low testosterone or fertility concerns. Learn the science, pros, cons, and which is right for you.
            </p>
          </div>
          {/* Both product images side by side, centered, taller and object-fit: contain */}
          <div className={styles.b12IntroImageWrap} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', width: '60%', margin: '0 auto' }}>
            {/* Only product images, not full modules */}
            <ProductPhoto product="enclomiphene" />
            <ProductPhoto product="clomiphene" />
          </div>
        </div>
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>Understanding the Difference: Enclomiphene vs Clomiphene</h2>
          <p>If you’re struggling with low testosterone or fertility, understanding your options is key. Both enclomiphene and clomiphene are SERMs (selective estrogen receptor modulators) used to boost testosterone and sperm count, but they work differently and have unique pros and cons.</p>
          <ul>
            <li><strong>Clomiphene:</strong> Increases both testosterone and sperm count. Generally cost-effective. Cons: Broader estrogen receptor activity can increase the risk of side effects like mood swings and visual disturbances. Some men experience estrogenic side effects, including gynecomastia.</li>
            <li><strong>Enclomiphene:</strong> A newer, more selective isomer derived from clomiphene. Mainly targets the estrogen receptors that regulate testosterone production, while minimizing action on other receptors. Pros: More targeted mechanism, reducing unwanted side effects. Shorter half-life allows easier dose adjustments. Lower risk of gynecomastia and mood-related side effects. Cons: Typically higher cost than clomiphene. Less long-term data, though recent studies are promising.</li>
          </ul>
          <h2>Head-to-Head: Enclomiphene vs Clomiphene in Clinical Practice</h2>
          <h3>Testosterone Enhancement</h3>
          <p>Both enclomiphene and clomiphene significantly increase serum testosterone in men with low T. Several 2023-2024 clinical trials show enclomiphene may provide a more consistent testosterone boost with fewer fluctuations, while clomiphene remains highly effective for most men.</p>
          <h3>Fertility and Sperm Quality</h3>
          <p>Both medications improve sperm count and motility—key factors for natural conception. Emerging evidence suggests enclomiphene may lead to better improvements in total motile sperm count compared to clomiphene, especially in men with secondary hypogonadism.</p>
          <h3>Side Effects and Tolerability</h3>
          <p>Clomiphene’s broader receptor activity can cause side effects like mood changes or visual symptoms. Enclomiphene’s selective action means these side effects are less common, making it a preferred option for men sensitive to these issues or those seeking a gentler approach.</p>
          <h2>Which is Right for You?</h2>
          <p>Choosing between enclomiphene and clomiphene depends on your health profile, goals, and preferences. Enclomiphene’s targeted action, reduced side effect risk, and dosing flexibility make it a strong option for many men, especially younger patients or those prioritizing fertility preservation. Clomiphene remains a reliable, affordable choice—especially for those comfortable with its broader action and longer track record.</p>
          <h2>Recent Studies and Resources</h2>
          <ul>
            <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10404117/" target="_blank" rel="noopener">Efficacy of Clomiphene Citrate Versus Enclomiphene Citrate for Male Infertility Treatment. UroToday. 2020.</a></li>
            <li><a href="https://www.gavinpublishers.com/article/view/successful-management-of-secondary-hypogonadism-with-enclomiphene-citrate--a-case-report-highlighting-advantages-over-clomid-and-other-aromatase-inhibitors-" target="_blank" rel="noopener">Successful Management of Secondary Hypogonadism with Enclomiphene Citrate: A Case Report Highlighting Advantages over Clomid and other Aromatase Inhibitors. Gavin Publishers. 2020.</a></li>
            <li><a href="https://pubmed.ncbi.nlm.nih.gov/12904801/" target="_blank" rel="noopener">Guay, A., Jacobson, J., Perez, J., et al. (2003). Clomiphene increases free testosterone levels in men with both secondary hypogonadism and erectile dysfunction. International Journal of Impotence Research, 15(2), 156-165.</a></li>
            <li><a href="https://pubmed.ncbi.nlm.nih.gov/31120775/" target="_blank" rel="noopener">Cannarella, R., Condorelli, R. A., et al. (2019). Effects of selective estrogen receptor modulators for male infertility: a systematic review and meta-analysis.</a></li>
          </ul>
        </article>
      </section>
      {/* Bottom Section: CTA above, then 2-column products */}
      <section className={styles.b12BottomSection}>
        <div className={styles.b12BottomRow} style={{ flexDirection: 'column' }}>
          {/* CTA at the top */}
          <div className={styles.b12BottomCta} style={{ marginBottom: '2.5rem', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }}>
            <h2>Take the Next Step Toward Optimal Health</h2>
            <p style={{ textAlign: 'center' }}>Ready to explore your options for low testosterone or fertility support? Unlock your optimal health and reclaim your confidence with Vita Bella’s science-backed, patient-centered approach. Reach out today to schedule a personalized consultation and discover which therapy fits your health goals best.</p>
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
            className="ec-product-row-responsive"
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
            <ProductCard product="enclomiphene" />
            <ProductCard product="clomiphene" />
          </div>
          <style>{`
            @media (min-width: 900px) {
              .ec-product-row-responsive {
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
