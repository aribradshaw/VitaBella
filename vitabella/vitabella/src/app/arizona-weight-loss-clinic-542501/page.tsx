import AWLCClient from './AWLCClient';

export const metadata = {
    title: {
        default: 'Arizona Weight Loss Clinic',
        template: '%s | Vita Bella Health',
    },
    description: 'Vita Bella Health is your trusted partner in weight loss and wellness, offering personalized care and effective solutions to help you achieve your health goals.',
}

export default function AWLCPage() {
    return <AWLCClient />;
}
