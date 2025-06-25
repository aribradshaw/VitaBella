import SexualWellnessClient from './SexualWellnessClient';

export const metadata = {
    title: {
        default: 'Sexual Wellness',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Sexual Wellness treatments designed to enhance intimacy and well-being. Our expert team provides personalized care for your sexual health needs.',
}

export default function SexualWellnessPage() {
    return <SexualWellnessClient />;
}
