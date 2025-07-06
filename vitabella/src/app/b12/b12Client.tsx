

import productsRaw from "../product/products.json";
import styles from "./b12.module.css";
import Link from "next/link";
import VitaBellaButton from "@/components/common/VitaBellaButton";


type Product = {
  Slug?: string;
  Title?: string;
  imageF?: string;
  Price?: number | string;
  application?: string;
  dosage?: string;
  frequency?: string;
  [key: string]: any;
};



export default function B12Client() {
  const products: Product[] = productsRaw as Product[];
  const b12 = products.find(
    (p: Product) => p.Slug === "methylcobalamin-b-12" || p.Title?.toLowerCase().includes("b12")
  );

  return (
    <main className={styles.b12Main}>
      {/* Article Section: SEO-optimized, professional, with mixed layout */}
      <section className={styles.b12ArticleSection}>
        {/* 2-column intro: headline and image */}
        <div className={styles.b12IntroRow}>
          <div className={styles.b12IntroText}>
            <h1 className={styles.b12SeoTitle}>Vitamin B12 Injection Benefits: Beyond the Hype</h1>
            <p>If you’ve recently heard someone talk about how much better they feel after a vitamin B12 injection, you’re not alone. Once mainly for those with diagnosed deficiencies, vitamin B12 injections are now popular among people seeking a science-backed boost in energy, wellness, and cognitive performance. But what are the real vitamin b12 injection benefits, and is this therapy right for you?</p>
          </div>
          <div className={styles.b12IntroImageWrap}>
            <img
              src={b12?.imageBG?.replace('/public', '') || "/products/BG/methylcobalamin-b-12.webp"}
              alt={b12?.Title || "Vitamin B12 Injection"}
              className={styles.b12IntroImage}
              style={{ objectFit: 'cover', width: '100%', minHeight: '450px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,60,50,0.07)' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 1-column main content */}
        <article className="prose prose-lg prose-headings:text-[#012B27] prose-p:mb-4 prose-ul:mb-4 prose-li:marker:text-[#012B27]" style={{ background: 'none', boxShadow: 'none', padding: 0 }}>
          {/* --- Begin B12 Content --- */}
          <h2>What Is Vitamin B12 and Why Does It Matter?</h2>
          <p>Vitamin B12, or cobalamin, is a vital water-soluble nutrient that plays a key role in your body’s health. It’s naturally found in animal-based foods like meat, poultry, fish, eggs, and dairy. For B12 to be absorbed properly, your stomach produces intrinsic factor, a protein essential for uptake.</p>
          <ul>
            <li>Producing healthy red blood cells, which carry oxygen</li>
            <li>Maintaining nerve cell health and neurological function</li>
            <li>DNA synthesis for cell repair and growth</li>
            <li>Metabolic processes and energy production</li>
          </ul>
          <p>A B12 deficiency can cause anemia, neurological symptoms, and cognitive changes, so keeping levels adequate is important at any age.</p>
          <h2>Who Can Benefit Most from Vitamin B12 Injections?</h2>
          <p>While anyone can have low B12, some groups are especially at risk:</p>
          <ul>
            <li>Vegans and vegetarians: Plant-based diets often lack enough B12 since it’s mainly in animal products.</li>
            <li>Older adults: Aging can reduce the body’s ability to absorb B12, even with a good diet.</li>
            <li>People with gastrointestinal or autoimmune conditions: Diseases like Crohn’s, celiac, or pernicious anemia can block B12 absorption.</li>
            <li>Those who’ve had certain surgeries: Gastrointestinal surgeries may reduce intrinsic factor production, limiting B12 uptake from food or oral supplements.</li>
          </ul>
          <p>For these groups, vitamin B12 injection benefits often exceed those of oral supplements, delivering the nutrient directly into the bloodstream for fast, reliable absorption.</p>
          <h2>Vitamin B12 Injection Benefits: What the Science Says</h2>
          <ol>
            <li><strong>Enhanced Energy and Reduced Fatigue</strong><br />Vitamin B12 helps turn food into usable energy and supports red blood cell formation. Studies show people with low B12 often feel tired and weak, and B12 injections can quickly restore energy—especially for those who can’t absorb the vitamin well by mouth.</li>
            <li><strong>Cognitive Clarity and Mood Support</strong><br />B12 is essential for producing neurotransmitters like serotonin and dopamine, which affect mood, memory, and focus. Research indicates vitamin B12 injections may improve concentration, memory, and mental clarity, and reduce symptoms of depression and anxiety, particularly in those with deficiencies.</li>
            <li><strong>Cardiovascular and Metabolic Health</strong><br />Vitamin B12 helps regulate homocysteine levels, a marker linked to heart disease risk. B12 injections can lower homocysteine, supporting heart health when combined with folic acid and other B vitamins. Some evidence also suggests B12 supports weight management and metabolism, making it a helpful addition to medically supervised weight loss programs.</li>
            <li><strong>Nerve Health and Injury Recovery</strong><br />Adequate B12 is crucial for nerve maintenance and repair. B12 injections are sometimes used clinically to treat neuropathy and nerve injuries, providing support for chronic nerve pain or recovery.</li>
            <li><strong>Bone Health and Longevity</strong><br />Low B12 levels have been linked to lower bone density and higher fracture risk. Correcting deficiencies with B12 injections supports bone health and may help prevent osteoporosis, especially in older adults.</li>
          </ol>
          <h2>Should You Consider Vitamin B12 Injections?</h2>
          <p>Vitamin B12 injection benefits are strongest for people with absorption problems, strict dietary restrictions, or diagnosed deficiencies. Still, many adults are trying B12 injections as part of a proactive health and wellness plan. If you feel chronically tired, mentally foggy, or have symptoms of B12 deficiency, talk to your healthcare provider about testing your levels and exploring injection therapy.</p>
          <h2>Latest Research on B12 Injections and Wellness</h2>
          <p>For those interested in the science behind vitamin B12 injection benefits, here are recent studies:</p>
          <ul>
            <li>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/24379897/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#012B27", textDecoration: "underline" }}
              >
                Oral Vitamin B12 Supplementation and Improvement of Cognitive Function in Older Adults with Mild Cognitive Impairment
              </a>
              </li>
            <li>
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6483699/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#012B27", textDecoration: "underline" }}
              >
                Vitamin B12, Folic Acid, and Homocysteine Lowering for Preventing Vascular Events in Elderly Persons
              </a>
            </li>
            <li>
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7688056/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#012B27", textDecoration: "underline" }}
              >
                Vitamin B12 for Treatment of Depression: Meta-Analysis of Double-Blind Randomized Controlled Trials
              </a>
              </li>    </ul>
        </article>
      </section>

      {/* Bottom Section: 2-column CTA + Product */}
      {b12 && (
        <section className={styles.b12BottomSection}>
          <div className={styles.b12BottomRow}>
            {/* Left: CTA */}
            <div className={styles.b12BottomCta}>
              <h2>Take the Next Step Toward Better Health</h2>
            <p>
                Ready to experience the potential benefits of vitamin B12 injections? Vita Bella’s science-backed approach can help you optimize your well-being and regain your energy and confidence. Reach out to your healthcare provider or{' '}
                <Link href="/membership" className={styles.b12MembershipLink}>
                    contact our team
                </Link>
                {' '}to see if vitamin B12 injection therapy fits your needs.
            </p>    <VitaBellaButton
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
            <div className={styles.b12BottomProductBox} itemScope itemType="https://schema.org/Product">
              <meta itemProp="name" content={b12.Title || "Vitamin B12 Injection"} />
              <meta itemProp="description" content={b12["Short Description"] || "Vitamin B12 injection benefits and product details."} />
              <meta itemProp="image" content={b12.imageF?.replace('/public', '') || "/products/Female/methylcobalamin-b-12.webp"} />
              <div className={styles.b12ProductBox}>
                <div className={styles.b12ProductImage}>
                  <img
                    src={b12.imageF?.replace('/public', '') || "/products/Female/methylcobalamin-b-12.webp"}
                    alt={b12.Title}
                    className={styles.b12HeroImage}
                    style={{ objectFit: 'contain', width: '100%', maxHeight: 320, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(44,60,50,0.07)' }}
                    loading="lazy"
                    itemProp="image"
                  />
                </div>
                <div className={styles.b12ProductDetails}>
                  <h2 className={styles.b12ProductTitle} itemProp="name">{b12.Title}</h2>
                  <p className={styles.b12ProductDesc} itemProp="description">{b12["Short Description"]}</p>
                  <ul className={styles.b12ProductList}>
                    <li><strong>Price:</strong> <span itemProp="offers" itemScope itemType="https://schema.org/Offer"><span itemProp="priceCurrency" content="USD">$</span><span itemProp="price">{b12.Price}</span></span></li>
                    <li><strong>Application:</strong> {b12.application}</li>
                    <li><strong>Dosage:</strong> {b12.dosage}</li>
                    <li><strong>Frequency:</strong> {b12.frequency}</li>
                  </ul>
                  <VitaBellaButton
                    href={`/product/${b12.Slug}`}
                    label="View Product Details"
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
                    itemProp="url"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
