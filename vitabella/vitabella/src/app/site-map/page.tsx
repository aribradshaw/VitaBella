import React from 'react';

const Sitemap: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Sitemap</h1>
      <p>
        <strong>XML Sitemap:</strong> <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">sitemap.xml</a>
      </p>
      
      <h2>Main Pages</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>

      <h2>Treatment Categories</h2>
      <ul>
        <li><a href="/sexual-wellness">Sexual Wellness</a></li>
        <li><a href="/hair-loss">Hair Loss</a></li>
        <li><a href="/injury-and-recovery">Injury & Recovery</a></li>
        <li><a href="/anti-aging">Anti-Aging</a></li>
        <li><a href="/cognitive-health">Cognitive Health</a></li>
        <li><a href="/hormone-therapy">Hormone Therapy</a></li>
        <li><a href="/skin-care">Skin Care</a></li>
        <li><a href="/weight-loss">Weight Loss</a></li>
      </ul>

      <h2>Legal & Support</h2>
      <ul>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
      </ul>
    </div>
  );
};

export default Sitemap;
