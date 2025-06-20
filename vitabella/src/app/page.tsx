import Hero from '../components/Hero/Hero';
import SectionHeader from '../components/SectionHeader/SectionHeader';

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
        {/* 
        <h1>Welcome to Vita Bella</h1>
        <p>Your journey to wellness starts here. Explore our services and find the right solutions for you.</p>
        <div className="categories">
          <h2>Our Categories</h2>
          <ul>
            <li><a href="/weight-loss">Weight Loss</a></li>
            <li><a href="/hormone-therapy">Hormone Therapy</a></li>
            <li><a href="/anti-aging">Anti-Aging</a></li>
            <li><a href="/sexual-wellness">Sexual Wellness</a></li>
            <li><a href="/cognitive-health">Cognitive Health</a></li>
            <li><a href="/hair-loss">Hair Loss</a></li>
            <li><a href="/injury-recovery">Injury & Recovery</a></li>
            <li><a href="/skin-care">Skin Care</a></li>
          </ul>
        </div>
        */}
      </div>
    </>
  );
}