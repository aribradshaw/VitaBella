export const metadata = {
  title: {
    default: 'Online TRT Clinic: Testosterone Replacement Therapy | Vita Bella Health',
    template: '%s | Vita Bella Health',
  },
  description:
    'Get expert Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health. Affordable, doctor-led TRT plans shipped directly to you.',
  openGraph: {
    title: 'Online TRT Clinic: Testosterone Replacement Therapy | Vita Bella Health',
    description:
      'Get expert Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health.',
    url: 'https://vitabellahealth.com/online-trt-clinic-542503',
    type: 'article',
    images: [
      {
        url: 'https://vitabellahealth.com/brand/Brandmark.svg',
        width: 1200,
        height: 630,
        alt: 'Online TRT Clinic - Vita Bella Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online TRT Clinic: Testosterone Replacement Therapy | Vita Bella Health',
    description:
      'Get expert Testosterone Replacement Therapy (TRT) online with Vita Bella. Board-certified providers, FDA-approved medications, and convenient telehealth care for men’s health.',
    images: [
      'https://vitabellahealth.com/brand/Brandmark.svg',
    ],
  },
};

import OTCClient from './OTCClient';

export default function OnlineTRTClinicPage() {
  return <OTCClient />;
}
