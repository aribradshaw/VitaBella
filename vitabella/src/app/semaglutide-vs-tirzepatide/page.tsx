import SemaglutideVsTirzepatideClient from "./semaglutidevstirzepatideClient";
import Script from "next/script";

export const metadata = {
  title: "Semaglutide vs Tirzepatide for Weight Loss | Vita Bella",
  description: "Compare semaglutide and tirzepatide for weight loss. Discover the science, benefits, side effects, and which GLP-1 medication is right for your health goals. Expert guidance from Vita Bella.",
  openGraph: {
    title: "Semaglutide vs Tirzepatide for Weight Loss | Vita Bella",
    description: "Compare semaglutide and tirzepatide for weight loss. Discover the science, benefits, side effects, and which GLP-1 medication is right for your health goals. Expert guidance from Vita Bella.",
    url: "https://vitabella.com/semaglutide-vs-tirzepatide",
    type: "article",
    images: [
      {
        url: "/brand/VitaBellaMetaShare.webp",
        width: 1200,
        height: 630,
        alt: "Semaglutide vs Tirzepatide for Weight Loss | Vita Bella"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Semaglutide vs Tirzepatide for Weight Loss | Vita Bella",
    description: "Compare semaglutide and tirzepatide for weight loss. Discover the science, benefits, side effects, and which GLP-1 medication is right for your health goals. Expert guidance from Vita Bella.",
    images: ["/brand/VitaBellaMetaShare.webp"]
  }
};

export default function Page() {
  return (
    <>
      <Script
        id="ld-json-semaglutide-vs-tirzepatide"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Semaglutide vs Tirzepatide for Weight Loss: Which Is Right for You?",
            "description": "Compare semaglutide and tirzepatide for weight loss. Discover the science, benefits, side effects, and which GLP-1 medication is right for your health goals. Expert guidance from Vita Bella.",
            "image": "https://vitabella.com/brand/VitaBellaMetaShare.webp",
            "author": {
              "@type": "Organization",
              "name": "Vita Bella"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vita Bella",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vitabella.com/brand/Brandmark.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://vitabella.com/semaglutide-vs-tirzepatide"
            }
          })
        }}
      />
      <SemaglutideVsTirzepatideClient />
    </>
  );
}
