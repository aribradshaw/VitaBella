import WeightLossClient from './WeightLossClient';

export const metadata = {
    title: {
        default: 'Weight Loss',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Weight Loss treatments designed to help you achieve your health goals. Our expert team provides personalized care for your weight management needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/weightloss.jpg',
                width: 1200,
                height: 630,
                alt: 'Weight Loss | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/weightloss.jpg'],
    },
}

export default function WeightLossPage() {
    return <WeightLossClient />;
}
