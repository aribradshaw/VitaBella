
import Glp1Client from "./glp1Client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLP-1 Medications for Weight Loss | Semaglutide & Tirzepatide | Vita Bella",
  description:
    "Discover how GLP-1 medications like semaglutide and tirzepatide can help you achieve lasting weight loss, improved metabolic health, and a better quality of life. Learn the science, benefits, and what to expect from these breakthrough therapies at Vita Bella.",
  openGraph: {
    title: "GLP-1 Medications for Weight Loss | Semaglutide & Tirzepatide | Vita Bella",
    description:
      "GLP-1 medications for weight loss, including semaglutide and tirzepatide, are transforming obesity care. Learn about their science, benefits, and how Vita Bella can help you achieve your health goals.",
    url: "https://vitabella.health/glp1",
    type: "article",
    images: [
      {
        url: "/products/BG/GLP1.jpg",
        width: 1200,
        height: 630,
        alt: "GLP-1 Medications for Weight Loss | Vita Bella",
      },
    ],
  },
};

export default function Page() {
  return <Glp1Client />;
}
