
export const metadata = {
  title: {
    default: 'Semaglutide Arizona: Weight Loss, Cost, and Online Clinic | Vita Bella Health',
    template: '%s | Vita Bella Health',
  },
  description:
    'Discover Semaglutide for weight loss in Arizona. Learn about costs, how to get approved, and how Vita Bella Health offers affordable, expert-guided online semaglutide treatment. Board-certified providers, FDA-approved medications, and convenient telehealth care.',
  openGraph: {
    title: 'Semaglutide Arizona: Weight Loss, Cost, and Online Clinic | Vita Bella Health',
    description:
      'Discover Semaglutide for weight loss in Arizona. Learn about costs, how to get approved, and how Vita Bella Health offers affordable, expert-guided online semaglutide treatment.',
    url: 'https://vitabellahealth.com/semaglutide-arizona-542502',
    type: 'article',
    images: [
      {
        url: 'https://vitabellahealth.com/brand/Brandmark.svg',
        width: 1200,
        height: 630,
        alt: 'Semaglutide Arizona - Vita Bella Health',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semaglutide Arizona: Weight Loss, Cost, and Online Clinic | Vita Bella Health',
    description:
      'Discover Semaglutide for weight loss in Arizona. Learn about costs, how to get approved, and how Vita Bella Health offers affordable, expert-guided online semaglutide treatment.',
    images: [
      'https://vitabellahealth.com/brand/Brandmark.svg',
    ],
  },
};

import SemaglutideArizonaClient from './SemaglutideArizonaClient';

export default function SemaglutideArizonaPage() {
  return <SemaglutideArizonaClient />;
}
