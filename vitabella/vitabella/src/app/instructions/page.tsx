export const metadata = {
    title: {
        default: 'Injection Instructions',
        template: '%s | Vita Bella Health',
    },
    description: 'Learn how to properly administer your injections with our detailed instructions and videos.',
};

import InstructionsClient from "./InstructionsClient";

export default function Page() {
  return <InstructionsClient />;
}
