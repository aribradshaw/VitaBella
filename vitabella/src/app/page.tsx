import Hero from '../components/Hero/Hero';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import HowItWorks from '../components/HowItWorks/HowItWorks';

export const metadata = {
    title: {
        default: 'Vita Bella Health | Complete Wellness Plans, 100% Online Providers',
    },
    description: 'Unlock your body’s full potential with Vita Bella Health. Our comprehensive wellness plans are designed to elevate your fitness, reclaim your confidence, and support your journey to optimal health.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="home">
        <SectionHeader
          left={{
            h2Alt: 'One Program.',
            h2: 'A lifetime of benefits.',
          }}
          right={
            <>Whether you’re looking to unlock your body’s full potential, elevate your fitness, or reclaim your confidence, we’re here to guide and support you every step of the way.</>
          }
        />
        <HowItWorks />
        <SectionHeader
          left={{
            h2Alt: "Men's Treatments",
            h2: 'Reignite, Strengthen, Dominate',
          }}
          right={
            <>Targeted treatments to fuel your power, enhance your endurance, and maintain your competitive edge.</>
          }
        />
        <SectionHeader
          left={{
            h2Alt: "Women’s Treatments",
            h2: 'Revive & Radiate',
          }}
          right={
            <>Find your balance, feel energized, and radiate with treatments tailored to you—because self-care is a daily essential.</>
          }
        />
        {}
      </div>
    </>
  );
}