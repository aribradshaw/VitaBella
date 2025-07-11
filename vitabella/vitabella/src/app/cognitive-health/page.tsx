import CognitiveHealthClient from './CognitiveHealthClient';

export const metadata = {
    title: {
        default: 'Cognitive Health',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Cognitive Health treatments designed to enhance mental clarity and well-being. Our expert team provides personalized care for your cognitive health needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/cognitivehealth.jpg',
                width: 1200,
                height: 630,
                alt: 'Cognitive Health | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/cognitivehealth.jpg'],
    },
}

export default function CognitiveHealthPage() {
    return <CognitiveHealthClient />;
}
