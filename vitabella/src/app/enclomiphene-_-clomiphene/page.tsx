import "../globals.css";
import Script from "next/script";
import EcClient from "./ecClient";

export const metadata = {
  title: "Enclomiphene vs Clomiphene: Testosterone & Fertility Therapy Compared | Vita Bella Health",
  description: "Compare enclomiphene and clomiphene for testosterone and fertility support. Learn the pros, cons, science, and which therapy is right for you. Patient-centered, science-backed care at Vita Bella Health.",
  openGraph: {
    title: "Enclomiphene vs Clomiphene: Testosterone & Fertility Therapy Compared | Vita Bella Health",
    description: "Compare enclomiphene and clomiphene for testosterone and fertility support. Learn the pros, cons, science, and which therapy is right for you. Patient-centered, science-backed care at Vita Bella Health.",
    url: "https://vitabellahealth.com/enclomiphene-vs-clomiphene",
    type: "article",
    images: [
      {
        url: "https://vitabellahealth.com/products/Male/enclomiphene-vs-clomiphene.webp",
        width: 1200,
        height: 630,
        alt: "Enclomiphene vs Clomiphene - Vita Bella Health",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enclomiphene vs Clomiphene | Vita Bella Health",
    description: "Compare enclomiphene and clomiphene for testosterone and fertility support. Science, pros, cons, and patient-centered care.",
    images: [
      "https://vitabellahealth.com/products/Male/enclomiphene-vs-clomiphene.webp",
    ],
  },
  alternates: {
    canonical: "https://vitabellahealth.com/enclomiphene-vs-clomiphene"
  }
};

export default function EnclomiphenePage() {
  return (
    <>
      {/* Schema.org Product structured data for SEO */}
      <Script
        id="enclomiphene-schema-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Enclomiphene Citrate",
            "image": [
              "https://vitabellahealth.com/products/Male/enclomiphene-vs-clomiphene.webp"
            ],
            "description": "Targeted SERM for male fertility and testosterone. Lower side effect risk, flexible dosing, and science-backed results.",
            "brand": {
              "@type": "Brand",
              "name": "Vita Bella Health"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "120",
              "availability": "https://schema.org/InStock",
              "url": "https://vitabellahealth.com/product/enclomiphene-citrate"
            }
          })
        }}
      />
      <EcClient />
    </>
  );
}
