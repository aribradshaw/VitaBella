import React from 'react';

const Sitemap: React.FC = () => {
  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
        <li>Categories:
          <ul>
            <li><a href="/categories/weight-loss">Weight Loss</a></li>
            <li><a href="/categories/hormone-therapy">Hormone Therapy</a></li>
            <li><a href="/categories/anti-aging">Anti-Aging</a></li>
            <li><a href="/categories/sexual-wellness">Sexual Wellness</a></li>
            <li><a href="/categories/cognitive-health">Cognitive Health</a></li>
            <li><a href="/categories/hair-loss">Hair Loss</a></li>
            <li><a href="/categories/injury-recovery">Injury & Recovery</a></li>
            <li><a href="/categories/skin-care">Skin Care</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
