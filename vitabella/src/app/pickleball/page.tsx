import PickleballClient from './PickleballClient';

export const metadata = {
    title: {
        default: 'Pickleball Players',
        template: '%s | Vita Bella Health',
    },
    description: 'Discover wellness solutions tailored for Pickleball players. Improve your performance, prevent injuries, and enhance recovery with expert health tips and resources from Vita Bella Health.',
}

export default function PickleballPage() {
    return <PickleballClient />;
}
