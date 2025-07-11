import DUPRClient from './DUPRClient';

export const metadata = {
    title: {
        default: 'DUPR',
        template: '%s | Vita Bella Health',
    },
    description: 'As the Official Wellness Partner of DUPR, Vita Bella offers physician-led programs designed to help athletes 25+ play harder, recover faster, and stay in the game.',
}

export default function DUPRPage() {
    return <DUPRClient />;
}
