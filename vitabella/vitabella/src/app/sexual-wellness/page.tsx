import SexualWellnessClient from './SexualWellnessClient';

export const metadata = {
    title: {
        default: 'Sexual Wellness',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Sexual Wellness treatments designed to enhance intimacy and well-being. Our expert team provides personalized care for your sexual health needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/sexualwellness.jpg',
                width: 1200,
                height: 630,
                alt: 'Sexual Wellness | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/sexualwellness.jpg'],
    },
}

export default function SexualWellnessPage() {
    return <SexualWellnessClient />;
}
