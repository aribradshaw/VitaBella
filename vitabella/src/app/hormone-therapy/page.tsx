import HormoneTherapyClient from './HormoneTherapyClient';

export const metadata = {
    title: {
        default: 'Hormone Therapy',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Hormone Therapy treatments designed to help you achieve your health goals. Our expert team provides personalized care for your hormone health needs.',
}

export default function HormoneTherapyPage() {
    return <HormoneTherapyClient />;
}
