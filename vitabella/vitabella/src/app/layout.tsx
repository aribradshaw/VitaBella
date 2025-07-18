
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import PageTransition from "../components/PageTransition/PageTransition";
import ClarityInit from "../components/ClarityInit";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CanonicalTag from "../components/CanonicalTag";

export const metadata: Metadata = {
  title: {
    default: 'Vita Bella Health',
    template: '%s | Vita Bella Health',
  },
  description: 'Complete Wellness Plans, 100% Online Providers.',
  openGraph: {
    images: [
      {
        url: '/brand/VitaBellaMetaShare.webp',
        width: 1200,
        height: 630,
        alt: 'Vita Bella Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/brand/VitaBellaMetaShare.webp'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <CanonicalTag />
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TDVW2M77');
          `
        }} />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YN2NTS67LL" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YN2NTS67LL');
          `
        }} />
        {/* HubSpot */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/48837321.js"></script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TDVW2M77" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        <ClarityInit />
        <SpeedInsights />
        <Header />
        <div className="container">
          {/* PageTransition temporarily disabled for development. To re-enable, uncomment the next line and comment out the one after. */}
          {/* <PageTransition>{children}</PageTransition> */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
