import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import PageTransition from "../components/PageTransition/PageTransition";
import ClarityInit from "../components/ClarityInit";

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
      <body>
        <ClarityInit />
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
