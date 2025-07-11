import AboutClient from './AboutClient';

export const metadata = {
    title: {
        default: 'About',
        template: '%s | Vita Bella Health',
    },
    description: 'Discover how Vita Bella is revolutionizing healthcare with a community-focused approach to health and well-being.',
}

export default function AboutPage() {
    return <AboutClient />;
}
