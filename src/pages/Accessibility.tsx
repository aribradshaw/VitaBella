import React from 'react';

const Accessibility: React.FC = () => {
    return (
        <div style={{ padding: '15px' }}>
            <h1>Accessibility</h1>
            <p>
                At Vita Bella, we are committed to ensuring that our website is accessible to everyone, including individuals with disabilities. 
                We strive to provide a user-friendly experience for all visitors.
            </p>
            <h2>Accessibility Features</h2>
            <ul>
                <li>Text alternatives for non-text content</li>
                <li>Keyboard navigability</li>
                <li>Screen reader compatibility</li>
                <li>Adjustable text size and contrast settings</li>
                <li>Clear and consistent navigation</li>
            </ul>
            <h2>Contact Us</h2>
            <p>
                If you have any questions or feedback regarding the accessibility of our website, please contact us at 
                <a href="mailto:support@vitabella.com"> support@vitabella.com</a>.
            </p>
        </div>
    );
};

export default Accessibility;