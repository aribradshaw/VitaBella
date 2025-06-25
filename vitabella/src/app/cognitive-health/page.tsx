import CognitiveHealthClient from './CognitiveHealthClient';

export const metadata = {
    title: {
        default: 'Cognitive Health',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Cognitive Health treatments designed to enhance mental clarity and well-being. Our expert team provides personalized care for your cognitive health needs.',
}

export default function CognitiveHealthPage() {
    return <CognitiveHealthClient />;
}
