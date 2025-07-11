
import Head from "next/head";
import TestosteroneClient from "./testosteroneClient";

export default function Page() {
  return (
    <>
      <Head>
        <title>Testosterone Replacement Therapy: Elevate Your Health and Vitality | Vita Bella</title>
        <meta name="description" content="Explore testosterone replacement therapy (TRT) at Vita Bella. Learn about benefits, risks, and discover all our testosterone-related products for optimal health and vitality." />
        <meta property="og:title" content="Testosterone Replacement Therapy: Elevate Your Health and Vitality | Vita Bella" />
        <meta property="og:description" content="Explore testosterone replacement therapy (TRT) at Vita Bella. Learn about benefits, risks, and discover all our testosterone-related products for optimal health and vitality." />
        <meta property="og:image" content="https://vitabella.com/products/BG/Testosterone.jpg" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://vitabella.com/testosterone" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testosterone Replacement Therapy: Elevate Your Health and Vitality | Vita Bella" />
        <meta name="twitter:description" content="Explore testosterone replacement therapy (TRT) at Vita Bella. Learn about benefits, risks, and discover all our testosterone-related products for optimal health and vitality." />
        <meta name="twitter:image" content="https://vitabella.com/products/BG/Testosterone.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "mainEntity": {
                "@type": "MedicalTherapy",
                "name": "Testosterone Replacement Therapy",
                "alternateName": "TRT",
                "description": "Testosterone replacement therapy (TRT) is a medically supervised treatment designed to restore testosterone levels to a healthy, optimal range. Learn about benefits, risks, and available products.",
                "image": "https://vitabella.com/products/BG/Testosterone.jpg",
                "url": "https://vitabella.com/testosterone",
                "procedureType": "Hormone Therapy",
                "recognizingAuthority": {
                  "@type": "Organization",
                  "name": "Vita Bella"
                },
                "study": [
                  {
                    "@type": "MedicalStudy",
                    "name": "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
                    "url": "https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy-in-men-with-hypogonadism"
                  },
                  {
                    "@type": "MedicalStudy",
                    "name": "Effects of Testosterone Therapy on Muscle Mass and Strength in Men with Hypogonadism",
                    "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4364882/"
                  }
                ]
              },
              "about": {
                "@type": "MedicalCondition",
                "name": "Testosterone Deficiency"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Vita Bella",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vitabella.com/brand/Brandmark.svg"
                }
              }
            })
          }}
        />
      </Head>
      <TestosteroneClient />
    </>
  );
}
