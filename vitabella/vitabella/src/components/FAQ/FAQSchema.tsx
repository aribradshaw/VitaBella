import React from 'react';
import { FAQItem } from '../../lib/faq';

interface FAQSchemaProps {
  faqs: FAQItem[];
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const stripHtmlTags = (html: string) => html.replace(/<[^>]*>/g, '');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtmlTags(faq.content)
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default FAQSchema;
