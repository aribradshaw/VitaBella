import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import ProductCard from "@/components/common/ProductCard";

export default function SermorelinClient() {
  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow}>
          <div className={styles.b12IntroText}>
            <h1 className={styles.b12SeoTitle}>Sermorelin for HGH Therapy: Revitalize Your Health Naturally</h1>
            <p>
              Are you noticing changes in your energy, body composition, or cognitive sharpness as you get older? Many adults experience the effects of declining human growth hormone (HGH) production—fatigue, difficulty maintaining muscle, stubborn weight gain, and even changes in mood and memory. <strong>Sermorelin for HGH therapy</strong> is a modern approach designed to help your body restore more youthful levels of HGH safely and effectively.
            </p>
          </div>
          <div className={styles.b12IntroImageWrap}>
            <img
              src="/products/BG/SermorelinBG.webp"
              alt="Sermorelin Product"
              className={styles.b12IntroImage}
              style={{ objectFit: 'cover', width: '100%', minHeight: '450px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,60,50,0.07)' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 1-column main content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>Understanding Sermorelin for HGH Therapy</h2>
          <p>
            Sermorelin is a synthetic analog of Growth Hormone Releasing Hormone (GHRH), which naturally signals your pituitary gland to increase HGH production. Unlike direct HGH injections, sermorelin for HGH therapy supports your body's own physiological processes, encouraging a more balanced and natural restoration of hormone levels.
          </p>
          <h2>How Sermorelin for HGH Therapy Works</h2>
          <ul>
            <li><strong>Supports Muscle & Fat Metabolism:</strong> Human Growth Hormone is essential for maintaining muscle mass, burning fat, keeping bones strong, supporting cognitive health, and promoting vibrant skin and hair. After age 30, HGH levels decline steadily, which can speed up many unwanted aspects of aging.</li>
            <li><strong>Stimulates Natural HGH Release:</strong> Sermorelin helps counteract this decline by stimulating the pituitary gland to release more of your own HGH. This method is safer and more physiologically aligned than direct HGH supplementation because it relies on your body's feedback mechanisms, reducing the risk of hormone excess.</li>
          </ul>
          <h2>Benefits of Sermorelin for HGH Therapy</h2>
          <ul>
            <li><strong>Reduced Body Fat:</strong> Sermorelin supports fat metabolism, making it easier to lose stubborn abdominal fat and improve overall body composition.</li>
            <li><strong>Increased Lean Muscle Mass:</strong> By promoting endogenous HGH release, sermorelin helps you maintain and build lean muscle, boosting physical strength and stamina.</li>
            <li><strong>Enhanced Sleep Quality:</strong> Improved HGH levels are closely linked to deeper, more restorative sleep—essential for recovery and daily energy.</li>
            <li><strong>Cognitive Support:</strong> Many patients report sharper mental focus, improved memory, and better mood regulation with sermorelin for HGH therapy.</li>
            <li><strong>Revitalized Appearance:</strong> Higher HGH stimulates healthier skin, thicker hair, and stronger nails, contributing to a more youthful look.</li>
            <li><strong>Natural Energy Boost:</strong> Experience more consistent daytime energy and motivation, helping you stay active and engaged.</li>
          </ul>
          <h2>Is Sermorelin for HGH Therapy Safe?</h2>
          <ul>
            <li><strong>Generally Safe:</strong> Sermorelin for HGH therapy has been evaluated in multiple clinical studies and is generally safe when administered under medical supervision. Because sermorelin works through your body's natural hormone pathways, it usually presents fewer risks than direct HGH injections.</li>
            <li><strong>Potential Side Effects:</strong> Common side effects may include temporary injection site reactions, mild headaches, or brief fatigue.</li>
            <li><strong>Ongoing Monitoring:</strong> Long-term safety is still being studied, so ongoing monitoring by a qualified healthcare provider is essential.</li>
            <li><strong>Individualized Therapy:</strong> Therapy should be customized to individual needs and health status—professional assessment is crucial before starting treatment.</li>
          </ul>
          <h2>Important Considerations Before Starting Sermorelin for HGH Therapy</h2>
          <ul>
            <li><strong>Medical Oversight Required:</strong> Sermorelin should only be used under the guidance of a healthcare professional experienced in hormone therapy.</li>
            <li><strong>Individualized Dosing:</strong> Your provider will determine appropriate dosing and frequency based on your medical history, symptoms, and treatment goals.</li>
            <li><strong>Current Research:</strong> While the benefits of sermorelin for HGH therapy are promising, continued research is needed to fully understand long-term outcomes and optimal use.</li>
          </ul>
          <h2>Key Studies Supporting Sermorelin Therapy</h2>
          <ul>
            <li>Molitch et al., "Evaluation and Treatment of Adult Growth Hormone Deficiency," The Journal of Clinical Endocrinology & Metabolism, 2006.</li>
            <li>Sinha et al., "The role of growth hormone secretagogues in body composition management," Transl Androl Urol, 2020.</li>
            <li>Walker RF, "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency?", Clin Interv Aging, 2006.</li>
            <li>Vitiello et al., "Treating age-related changes in somatotrophic hormones, sleep, and cognition," Dialogues Clin Neurosci, 2001.</li>
          </ul>
        </article>
      </section>

      {/* Bottom Section: 2-column CTA + Product */}
      <section className={styles.b12BottomSection}>
        <div className={styles.b12BottomRow}>
          {/* Left: CTA */}
          <div className={styles.b12BottomCta}>
            <h2>Take the Next Step Toward Restoring Your Vitality</h2>
            <p>
              Curious about how sermorelin for HGH therapy could fit into your health journey? Vita Bella’s science-backed approach can help you optimize your well-being and regain your energy and confidence. Reach out to your healthcare provider or{' '}
              <a href="/membership" className={styles.b12MembershipLink} style={{ color: '#012B27', textDecoration: 'underline' }}>
                contact our team
              </a>
              {' '}to see if sermorelin therapy fits your needs.
            </p>
            <VitaBellaButton
              href={`/membership`}
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
          {/* Right: Product Box */}
          <div className={styles.b12BottomProductBox}>
            <ProductCard product="sermorelin" />
          </div>
        </div>
      </section>
    </main>
  );
}