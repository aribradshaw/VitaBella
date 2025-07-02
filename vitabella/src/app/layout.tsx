import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import PageTransition from "../components/PageTransition/PageTransition";
import ClarityInit from "../components/ClarityInit";
import { SpeedInsights } from "@vercel/speed-insights/next"; // <-- Added import

export const metadata: Metadata = {
  title: {
    default: 'Vita Bella Health',
    template: '%s | Vita Bella Health',
  },
  description: 'Complete Wellness Plans, 100% Online Providers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TDVW2M77');
        `}} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YN2NTS67LL"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YN2NTS67LL');
        `}} />
      </head>
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/48837321.js"></script>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TDVW2M77" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        <ClarityInit />
        <SpeedInsights /> {/* <-- Add this line to enable Vercel Speed Insights */}
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
