export const metadata = {
  title: {
    default: 'Online TRT: Testosterone Replacement Therapy | Vita Bella Health',
    template: '%s | Vita Bella Health',
  },
  description:
    'Get expert Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health. Affordable, doctor-led TRT plans shipped directly to you.',
  openGraph: {
    title: 'Online TRT: Testosterone Replacement Therapy | Vita Bella Health',
    description:
      'Get expert Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health.',
    url: 'https://vitabellahealth.com/online-trt-clinic-542503',
    type: 'article',
    images: [
      {
        url: 'https://vitabellahealth.com/brand/Brandmark.svg',
        width: 1200,
        height: 630,
        alt: 'Online TRT - Vita Bella Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online TRT: Testosterone Replacement Therapy | Vita Bella Health',
    description:
      'Get expert online Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health.',
    images: [
      'https://vitabellahealth.com/brand/Brandmark.svg',
    ],
  },
};


import OnlineTRTClient from './OnlineTRTClient';

export default function OnlineTRTPage() {
  return <OnlineTRTClient />;
}
