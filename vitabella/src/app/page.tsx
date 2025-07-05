import Head from 'next/head';
import Hero from '../components/Hero/Hero';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import CalendlyScheduler from '../components/common/CalendlyScheduler';
import CustomerReviews from '@/components/common/CustomerReviews';
import SimpleCustomerSlider from '@/components/SimpleCustomerSlider/SimpleCustomerSlider';
import AboutStats from '../app/about/AboutStats';
import HealthyHome from '../components/common/HealthyHome';
import ProductMechanismBottomRow from '../components/common/ProductMechanismBottomRow';
import Newsletter from '../components/common/Newsletter';
import BundleSlider from '../components/common/BundleSlider';

export const metadata = {
    title: {
        default: 'Vita Bella | Complete Wellness Plans, 100% Online Providers',
    },
    description: 'Unlock your full potential with Vita Bella. Wellness plans designed to elevate your fitness, reclaim your confidence, and support your journey to better health.',
}

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Vita Bella Health",
              "url": "https://vitabellahealth.com",
              "logo": "https://vitabellahealth.com/brand/Brandmark.svg",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.facebook.com/vitabellahealth",
                "https://www.instagram.com/vitabellahealth"
              ]
            })
          }}
        />
      </Head>
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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <BundleSlider gender="Male" />
        </div>
        <SectionHeader
          left={{
            h2Alt: "Women’s Treatments",
            h2: 'Revive & Radiate',
          }}
          right={
            <>Find your balance, feel energized, and radiate with treatments tailored to you—because self-care is a daily essential.</>
          }
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <BundleSlider gender="Female" />
        </div>
        <HealthyHome />
        <CustomerReviews page="about" />
        <SectionHeader
          left={{
            h2Alt: 'Join 10,000+',
            h2: 'patients and counting.',
          }}
          right={
            <>Stop settling for less; seize control of your health, and unleash your radiance with our results-driven medical program.</>
          }
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SimpleCustomerSlider />
        </div>
        <AboutStats />
        {/* Product Mechanism Bottom Row */}
        <div style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: 'var(--e-global-color-dark-green)', padding: 'var(--space-4x) 0', borderRadius: 32, marginTop: 'var(--space-3x)' }}>
          <div className="container">
        <ProductMechanismBottomRow product={{ Title: 'NAD+' }} />
          </div>
        </div>
        {/*
        <SectionHeader
          left={{
        h2Alt: "Schedule a Consultation",
        h2: 'with Vita Bella',
          }}
          right={
        <>Use our interactive calendars to schedule a consultation at your earliest convenience.</>
          }
        />
        */}
        {/*
        <CalendlyScheduler />
        */}
        <Newsletter />
      </div>
    </>
  );
}