import AntiAgingClient from './AntiAgingClient';

export const metadata = {
    title: {
        default: 'Anti-Aging',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Anti-Aging treatments designed to rejuvenate and enhance your overall well-being. Our expert team provides personalized care for your anti-aging needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/antiaging.jpg',
                width: 1200,
                height: 630,
                alt: 'Anti-Aging | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/antiaging.jpg'],
    },
}

export default function AntiAgingPage() {
    return <AntiAgingClient />;
}
