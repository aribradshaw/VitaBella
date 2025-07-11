"use client";
import React from "react";

const AccessibilityClient: React.FC = () => {
  return (
    <div
      className="accessibility-page"
      style={{
        maxWidth: 700,
        margin: "var(--space-4x) auto",
        padding: "2.5rem 1.2rem",
        fontFamily: "Switzer, Arial, Helvetica, sans-serif",
        color: "var(--e-global-color-text, #012B27)",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px rgba(44,60,50,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1 className="h2-alt" style={{ textAlign: "center", marginBottom: 18 }}>Accessibility</h1>
      <p style={{ fontSize: "1.13em", color: "#444", textAlign: "center", marginBottom: 32 }}>
        Vita Bella is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We strive to continually improve the user experience for everyone and apply the relevant accessibility standards.
      </p>
      <section style={{ marginBottom: 36, width: '100%' }}>
        <h2 style={{ marginBottom: 12, fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 600, fontSize: 24, color: 'var(--e-global-color-dark-green)', textAlign: 'left' }}>Our Accessibility Features</h2>
        <ul style={{ fontSize: "1.08em", color: "#333", marginLeft: 0, marginBottom: 0, lineHeight: 1.7, paddingLeft: 24 }}>
          <li>Text alternatives for all non-text content (images, icons, and media)</li>
          <li>Full keyboard navigation support</li>
          <li>Screen reader compatibility and ARIA labels</li>
          <li>Adjustable text size and color contrast</li>
          <li>Consistent, logical navigation and headings</li>
          <li>Accessible forms and error messages</li>
          <li>Responsive design for all devices</li>
        </ul>
      </section>
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ marginBottom: 12, fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 600, fontSize: 24, color: 'var(--e-global-color-dark-green)' }}>Continuous Improvement</h2>
        <p style={{ marginBottom: 0 }}>
          We regularly review our site to ensure ongoing accessibility and welcome feedback from users. Our team is dedicated to making accessibility a core part of our design and development process.
        </p>
      </section>
      <section>
        <h2 style={{ marginBottom: 12, fontFamily: 'Switzer, Arial, Helvetica, sans-serif', fontWeight: 600, fontSize: 24, color: 'var(--e-global-color-dark-green)' }}>Contact Us</h2>
        <p style={{ marginBottom: 0 }}>
          If you experience any difficulty accessing any part of this website, or if you have suggestions for improvement, please contact us at
          <a href="mailto:support@vitabella.com" style={{ color: "#4263AE", marginLeft: 4 }}>support@vitabella.com</a>.
          We value your input and will respond promptly to address your concerns.
        </p>
      </section>
    </div>
  );
};

export default AccessibilityClient;
