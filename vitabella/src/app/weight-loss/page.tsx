import WeightLossClient from './WeightLossClient';

export const metadata = {
    title: {
        default: 'Weight Loss',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Weight Loss treatments designed to help you achieve your health goals. Our expert team provides personalized care for your weight management needs.',
}

export default function WeightLossPage() {
    return <WeightLossClient />;
}
