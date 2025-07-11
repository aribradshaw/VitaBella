import HairLossClient from './HairLossClient';

export const metadata = {
    title: {
        default: 'Hair Loss Treatment',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Hair Loss treatments designed to help you regain confidence and achieve healthy hair. Our expert team provides personalized care for your hair restoration needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/hairloss.jpg',
                width: 1200,
                height: 630,
                alt: 'Hair Loss | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/hairloss.jpg'],
    },
}

export default function HairLossPage() {
    return <HairLossClient />;
}
