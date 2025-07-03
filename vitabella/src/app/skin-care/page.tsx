import SkinCareClient from './SkinCareClient';

export const metadata = {
    title: {
        default: 'Skin Care',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Skin Care treatments designed to rejuvenate and enhance your skin health. Our expert team provides personalized care for your skin needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/skincare.jpg',
                width: 1200,
                height: 630,
                alt: 'Skin Care | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/skincare.jpg'],
    },
}

export default function SkinCarePage() {
    return <SkinCareClient />;
}
