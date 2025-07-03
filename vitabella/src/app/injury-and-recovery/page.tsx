import InjuryRecoveryClient from './InjuryRecoveryClient';

export const metadata = {
    title: {
        default: 'Injury and Recovery',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Injury and Recovery treatments designed to help you heal and regain strength. Our expert team provides personalized care for your recovery needs.',
    openGraph: {
        images: [
            {
                url: '/brand/meta/injuryrecovery.jpg',
                width: 1200,
                height: 630,
                alt: 'Injury and Recovery | Vita Bella Health',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/brand/meta/injuryrecovery.jpg'],
    },
}

export default function InjuryRecoveryPage() {
    return <InjuryRecoveryClient />;
}
