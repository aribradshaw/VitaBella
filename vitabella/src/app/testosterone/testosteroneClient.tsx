
import styles from "../b12/b12.module.css";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import ProductCard from "@/components/common/ProductCard";

import productsRaw from "../product/products.json";

// Filter and deduplicate testosterone-related products (by Sku or Slug)
const seen = new Set();
const testosteroneProducts = productsRaw.filter((p) => {
  // Only include products with a Title and Slug (skip empty/partial entries)
  if (!p.Title || !p.Slug) return false;
  // Filter by category or slug
  const isTestosterone =
    (p["Product categories"] && p["Product categories"].toLowerCase().includes("hormone therapy")) ||
    (p["Slug"] && p["Slug"].toLowerCase().includes("testosterone"));
  // Deduplicate by Sku or Slug
  const key = p.Sku || p.Slug;
  if (isTestosterone && !seen.has(key)) {
    seen.add(key);
    return true;
  }
  return false;
});

export default function TestosteroneClient() {
  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow}>
          <div className={styles.b12IntroText}>
            <h1 className={styles.b12SeoTitle}>Testosterone Replacement Therapy: Elevate Your Health and Vitality</h1>
            <p>
              Testosterone is much more than a symbol of physical strength. It’s a vital hormone that supports many functions in both men and women. From maintaining bone density and muscle mass to supporting sexual wellness, cognitive clarity, mood, and overall energy, testosterone plays a crucial role in everyday health. As we age or face certain medical conditions, natural testosterone levels can drop, leaving us feeling less energetic, less focused, and less motivated.
            </p>
            <p>
              <strong>Testosterone replacement therapy (TRT)</strong> offers a safe, science-based way to restore hormone balance and help you reclaim your vitality under medical supervision.
            </p>
          </div>
          <div className={styles.b12IntroImageWrap}>
            <img
              src="/products/BG/TestosteroneCypionateBG.webp"
              alt="Testosterone Product"
              className={styles.b12IntroImage}
              style={{ objectFit: 'cover', width: '100%', minHeight: '450px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,60,50,0.07)' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 1-column main content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          <h2>What Is Testosterone Replacement Therapy?</h2>
          <p>
            Testosterone replacement therapy is a medically supervised treatment designed to restore testosterone levels to a healthy, optimal range. Think of testosterone as the body’s project manager—coordinating energy, mood, muscle growth, and cognitive sharpness. When levels fall, things slow down. TRT helps reestablish hormonal balance so your body’s systems can work at their best.
          </p>
          <p>
            TRT isn’t one-size-fits-all. It requires personalized dosing and monitoring to ensure safety and effectiveness, following the latest evidence-based medical protocols.
          </p>
          <h2>How Does Testosterone Replacement Therapy Work?</h2>
          <ul>
            <li><strong>Increased muscle mass and strength:</strong> TRT encourages muscle cells to grow and repair, helping you maintain lean muscle and physical ability. This is especially important as natural testosterone declines with age.</li>
            <li><strong>Improved bone density:</strong> Healthy testosterone levels help bones absorb essential minerals, lowering the risk of osteoporosis and fractures.</li>
            <li><strong>Enhanced energy and stamina:</strong> By promoting red blood cell production, TRT improves oxygen delivery throughout the body, supporting sustained energy and endurance.</li>
            <li><strong>Sharper cognitive function and mood:</strong> Balanced testosterone supports brain health, focus, memory, and emotional well-being, helping you stay clear-headed and positive.</li>
            <li><strong>Boosted sexual wellness:</strong> Testosterone is essential for libido and sexual function in both men and women. TRT can help restore a healthy sex drive.</li>
          </ul>
          <p>
            Recent wellness trends also recognize TRT’s potential to support injury recovery, reduce age-related cognitive decline, and improve overall quality of life when managed responsibly.
          </p>
          <h2>Risks and Considerations: Making Informed Decisions</h2>
          <p>
            Testosterone replacement therapy offers many benefits, but it’s important to approach treatment responsibly. Possible side effects include changes in mood, sleep patterns, or cholesterol levels. Long-term use requires ongoing medical supervision, including routine lab tests and personalized treatment adjustments.
          </p>
          <p>
            Working with a qualified medical provider ensures TRT is tailored to your unique needs, maximizing safety and minimizing risk. At Vita Bella, our team follows evidence-based protocols, thorough screening, and regular follow-up to support your health.
          </p>
          <h2>The Science Behind Testosterone Replacement Therapy</h2>
          <ul>
            <li>A 2005 meta-analysis by Bhasin et al. found TRT significantly increased muscle mass and strength in men with diagnosed hypogonadism.</li>
            <li>Recent research by Wittert et al. (2023) shows TRT can improve quality of life and sexual health in aging adults.</li>
            <li>Additional studies support cognitive benefits for those with low testosterone.</li>
          </ul>
          <h2>Is Testosterone Replacement Therapy Right for You?</h2>
          <p>
            Deciding to start testosterone replacement therapy is a personal choice that should be made with an experienced healthcare provider. At Vita Bella, we empower clients through education, advanced diagnostics, and a patient-centered approach.
          </p>
          <p>
            If you’re experiencing fatigue, decreased muscle mass, low libido, or brain fog, consider having your hormones evaluated. With the right medical support, testosterone replacement therapy could unlock new levels of health and confidence.
          </p>
        </article>
      </section>

      {/* Testosterone Products Section: Multicolumn professional layout */}
      <section className={styles.b12BottomSection} style={{ marginTop: 48 }}>
        <h2 className={styles.b12SeoTitle} style={{ textAlign: 'center', marginBottom: 32 }}>Testosterone & Hormone Therapy Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch',
        }}>
          {testosteroneProducts.map((product) => (
            <div key={product.Sku || product.Slug} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ProductCard product={product.Slug} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.b12BottomSection}>
        <div className={styles.b12BottomRow}>
          {/* Left: CTA */}
          <div className={styles.b12BottomCta}>
            <h2>Take the Next Step Toward Optimal Health</h2>
            <p>
              Ready to see if testosterone replacement therapy is right for you? Connect with our medical team at Vita Bella for a comprehensive, science-backed evaluation and personalized treatment plan. Your journey to renewed vitality starts with trusted guidance and compassionate care.
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
          {/* Right: Product Box (show main testosterone product if available) */}
          <div className={styles.b12BottomProductBox}>
            {testosteroneProducts.length > 0 && (
              <ProductCard product={testosteroneProducts[0].Slug} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
