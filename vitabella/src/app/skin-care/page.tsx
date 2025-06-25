import SkinCareClient from './SkinCareClient';

export const metadata = {
    title: {
        default: 'Skin Care',
        template: '%s | Vita Bella Health',
    },
    description: 'Explore our Skin Care treatments designed to rejuvenate and enhance your skin health. Our expert team provides personalized care for your skin needs.',
}

export default function SkinCarePage() {
    return <SkinCareClient />;
}
