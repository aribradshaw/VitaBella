import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import ProductCard from "@/components/common/ProductCard";

export default function MetforminClient() {
  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow}>
          <div className={styles.b12IntroText}>
            <h1 className={styles.b12SeoTitle}>Metformin for Weight Loss: Can This Longevity Pill Transform Your Health?</h1>
            <p>Forget collagen creams and cryotherapy chambers. The latest buzz in anti-aging and weight loss is metformin, a medication originally prescribed for type 2 diabetes. In recent years, <strong>metformin for weight loss</strong> has gained significant attention, prompting researchers and health enthusiasts to take a closer look.</p>
          </div>
          <div className={styles.b12IntroImageWrap}>
            <img
              src="/products/BG/MetforminBG.webp"
              alt="Metformin Product"
              className={styles.b12IntroImage}
              style={{ objectFit: 'cover', width: '100%', minHeight: '450px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,60,50,0.07)' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 1-column main content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>What is Metformin and How Does it Work?</h2>
          <ul>
            <li><strong>Blood Sugar Regulator:</strong> Metformin signals your liver to reduce excess glucose production, helping stabilize blood sugar levels.</li>
            <li><strong>Metabolic Booster:</strong> By activating AMPK, the body's metabolic “master switch,” metformin encourages cellular repair and energy production, supporting overall metabolic health.</li>
            <li><strong>Weight Loss Ally:</strong> Research shows metformin can decrease appetite, improve insulin sensitivity, and reduce fat storage, making it a promising option for those seeking weight management alongside traditional lifestyle changes.</li>
          </ul>
          <h2>Metformin for Weight Loss: What Does the Research Say?</h2>
          <ul>
            <li><strong>Support Modest Weight Loss:</strong> Clinical trials in people with and without diabetes have found metformin can lead to gradual, sustainable weight loss, especially when combined with a balanced diet and regular exercise.</li>
            <li><strong>Reduce Risk of Age-Related Diseases:</strong> Metformin users may have a lower risk of developing conditions like heart disease and certain cancers, supporting healthy aging.</li>
            <li><strong>Protect Brain Health:</strong> Early findings indicate metformin might help guard against cognitive decline and neurodegenerative diseases such as Alzheimer’s.</li>
          </ul>
          <h2>How Does Metformin Support Weight Management?</h2>
          <ul>
            <li><strong>Appetite Control:</strong> By influencing hormones related to hunger and fullness, metformin may naturally decrease appetite, making calorie control easier.</li>
            <li><strong>Improved Insulin Sensitivity:</strong> Enhanced insulin response means the body stores less fat from glucose, helping prevent weight gain and support fat loss.</li>
            <li><strong>Reduced Fat Storage:</strong> Metformin can change how the body processes and stores fat, contributing to a healthier body composition over time.</li>
          </ul>
          <p>The effects are strongest when paired with healthy lifestyle habits—metformin is not a replacement for diet and exercise but a tool to support your efforts.</p>
          <h2>Is Metformin for Weight Loss Safe?</h2>
          <ul>
            <li><strong>Potential Side Effects:</strong> Common side effects include mild gastrointestinal symptoms such as nausea or diarrhea, which often improve over time.</li>
            <li><strong>Medical Supervision Required:</strong> Metformin should only be taken under the guidance of a healthcare professional, especially for those without diabetes or prediabetes.</li>
            <li><strong>Not a Standalone Solution:</strong> While metformin for weight loss is promising, it works best as part of a holistic health strategy that includes nutritious eating, regular movement, and stress management.</li>
          </ul>
          <h2>Current Research and Clinical Insights</h2>
          <ul>
            <li>Tinetti, M. E., & Kulminski, A. M. (2023). Comparison of long-term effects of metformin on longevity between people with type 2 diabetes and matched non-diabetic controls. BMC Public Health, 23(1). doi:10.1186/s12889-023-15764-y</li>
            <li>Bannister, K. A., et al. (2014). Can metformin use in newly diagnosed type 2 diabetes mellitus patients influence long-term mortality? BMC Public Health, 14, 849. doi:10.1186/1471-2458-14-849</li>
            <li>Cheng, C. Y., et al. (2013). Association between metformin use and long-term survival in patients with type 2 diabetes. JAMA, 310(17), 1838-1844. doi:10.1001/jama.2013.277013</li>
          </ul>
          <p>As research continues, metformin’s role in preventive health and weight management remains a focus for clinicians and patients alike.</p>
        </article>
      </section>

      {/* Bottom Section: 2-column CTA + Product */}
      <section className={styles.b12BottomSection}>
        <div className={styles.b12BottomRow}>
          {/* Left: CTA */}
          <div className={styles.b12BottomCta}>
            <h2>Take the Next Step Toward Better Health</h2>
            <p>
              Curious about how metformin for weight loss could fit into your health journey? Vita Bella’s science-backed approach can help you optimize your well-being and regain your energy and confidence. Reach out to your healthcare provider or{' '}
              <a href="/membership" className={styles.b12MembershipLink} style={{ color: '#012B27', textDecoration: 'underline' }}>
                contact our team
              </a>
              {' '}to see if metformin therapy fits your needs.
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
            <ProductCard product="metformin" />
          </div>
        </div>
      </section>
    </main>
  );
}
