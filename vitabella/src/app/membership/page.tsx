import MembershipClient from './MembershipClient';

export const metadata = {
    title: {
        default: 'Membership',
        template: '%s | Vita Bella Health',
    },
    description: 'Join Vita Bella Health for exclusive access to comprehensive health services, personalized care, and unbeatable savings.',
}

export default function MembershipPage() {
    return <MembershipClient />;
}
