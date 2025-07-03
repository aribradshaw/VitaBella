import HormoneTherapyClient from './HormoneTherapyClient';

export const metadata = {
    title: {
        default: 'Hormone Therapy',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Hormone Therapy treatments designed to help you achieve your health goals. Our expert team provides personalized care for your hormone health needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/hormonetherapy.jpg',
                width: 1200,
                height: 630,
                alt: 'Hormone Therapy | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/hormonetherapy.jpg'],
    },
}

export default function HormoneTherapyPage() {
    return <HormoneTherapyClient />;
}
