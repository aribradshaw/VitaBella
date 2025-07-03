
import BOHCClient from './BOHCClient';

export const metadata = {
    title: {
        default: 'Best Online HRT Clinic',
        template: '%s | Vita Bella Health',
    },
    description: 'Discover the best online HRT clinic for personalized hormone therapy. Board-certified providers, FDA-approved medications, and convenient telehealth care from Vita Bella.',
};

export default function BestOnlineHRTClinicPage() {
    return <BOHCClient />;
}
