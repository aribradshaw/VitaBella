
import "../globals.css";
import B12Client from "./b12Client";
import Script from "next/script";

export const metadata = {
  title: "Vitamin B12 Injection Benefits: Science-Backed Energy, Wellness & Cognitive Support | Vita Bella Health",
  description: "Discover the real benefits of vitamin B12 injections: enhanced energy, cognitive clarity, metabolism, and nerve health. Learn who benefits most, the science, and how Vita Bella Health can help you thrive.",
  openGraph: {
    title: "Vitamin B12 Injection Benefits: Science-Backed Energy, Wellness & Cognitive Support | Vita Bella Health",
    description: "Discover the real benefits of vitamin B12 injections: enhanced energy, cognitive clarity, metabolism, and nerve health. Learn who benefits most, the science, and how Vita Bella Health can help you thrive.",
    url: "https://vitabellahealth.com/b12",
    type: "article",
    images: [
      {
        url: "https://vitabellahealth.com/products/Female/methylcobalamin-b-12.webp",
        width: 1200,
        height: 630,
        alt: "Vitamin B12 Injection - Vita Bella Health",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitamin B12 Injection Benefits | Vita Bella Health",
    description: "Discover the science-backed benefits of vitamin B12 injections for energy, wellness, and cognitive support.",
    images: [
      "https://vitabellahealth.com/products/Female/methylcobalamin-b-12.webp",
    ],
  },
  alternates: {
    canonical: "https://vitabellahealth.com/b12"
  }
};

export default function B12Page() {
  return (
    <>
      {/* Schema.org Product structured data for SEO */}
      <Script
        id="b12-schema-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Vitamin B12 Injection",
            "image": [
              "https://vitabellahealth.com/products/Female/methylcobalamin-b-12.webp"
            ],
            "description": "Vitamin B12 injection for energy, wellness, and cognitive support. Science-backed, fast absorption, and ideal for those with absorption issues or dietary restrictions.",
            "brand": {
              "@type": "Brand",
              "name": "Vita Bella Health"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "60",
              "availability": "https://schema.org/InStock",
              "url": "https://vitabellahealth.com/product/methylcobalamin-b-12"
            }
          })
        }}
      />
      <B12Client />
    </>
  );
}
