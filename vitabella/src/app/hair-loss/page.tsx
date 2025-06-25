import HairLossClient from './HairLossClient';

export const metadata = {
    title: {
        default: 'Hair Loss Treatment',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Hair Loss treatments designed to help you regain confidence and achieve healthy hair. Our expert team provides personalized care for your hair restoration needs.',
}

export default function HairLossPage() {
    return <HairLossClient />;
}
