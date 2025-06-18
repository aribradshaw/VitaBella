import React from 'react';
import '../styles/global.css';
import Hero from '../components/Hero/Hero';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
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
  );
};

export default Home;