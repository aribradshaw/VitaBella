import React from 'react';
import { getAllFAQs } from '../../lib/faq-server';
import FAQSearch from '../../components/FAQ/FAQSearch';
import FAQSchema from '../../components/FAQ/FAQSchema';
import { Metadata } from 'next';
import './FAQ.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Vita Bella Health',
  description: 'Find answers to common questions about Vita Bella\'s telemedicine services, treatments, membership options, and more. Get the information you need to start your wellness journey.',
  keywords: 'FAQ, questions, Vita Bella, telemedicine, treatments, membership, wellness',
  openGraph: {
    title: 'Frequently Asked Questions | Vita Bella Health',
    description: 'Find answers to common questions about Vita Bella\'s telemedicine services, treatments, membership options, and more.',
    type: 'website',
  }
};

const FAQ: React.FC = async () => {
  const faqs = await getAllFAQs();

  return (
    <>
      <FAQSchema faqs={faqs} />
      <FAQSearch initialFAQs={faqs} />
    </>
  );
};

export default FAQ;
