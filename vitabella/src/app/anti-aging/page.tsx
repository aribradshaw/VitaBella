import AntiAgingClient from './AntiAgingClient';

export const metadata = {
    title: {
        default: 'Anti-Aging',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Anti-Aging treatments designed to rejuvenate and enhance your overall well-being. Our expert team provides personalized care for your anti-aging needs.',
}

export default function AntiAgingPage() {
    return <AntiAgingClient />;
}
