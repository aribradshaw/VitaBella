import InjuryRecoveryClient from './InjuryRecoveryClient';

export const metadata = {
    title: {
        default: 'Injury and Recovery',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Injury and Recovery treatments designed to help you heal and regain strength. Our expert team provides personalized care for your recovery needs.',
}

export default function InjuryRecoveryPage() {
    return <InjuryRecoveryClient />;
}
