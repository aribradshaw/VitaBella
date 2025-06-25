import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllFAQs, getFAQBySlug } from '../../../lib/faq-server';
import { Metadata } from 'next';
import VitaBellaButton from '../../../components/common/VitaBellaButton';
import '../FAQ.css';

interface FAQPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const faq = await getFAQBySlug(params.slug);
  
  if (!faq) {
    return {
      title: 'FAQ Not Found | Vita Bella Health'
    };
  }

  const stripHtmlTags = (html: string) => html.replace(/<[^>]*>/g, '');
  const description = stripHtmlTags(faq.content).substring(0, 160) + '...';

  return {
    title: `${faq.title} | Vita Bella Health FAQ`,
    description,
    keywords: `${faq.title}, FAQ, Vita Bella, telemedicine, wellness`,
    openGraph: {
      title: `${faq.title} | Vita Bella Health FAQ`,
      description,
      type: 'article',
    },
    alternates: {
      canonical: `/faq/${faq.slug}`
    }
  };
}

export async function generateStaticParams() {
  const faqs = await getAllFAQs();
  return faqs.map((faq) => ({
    slug: faq.slug,
  }));
}

const FAQPage: React.FC<FAQPageProps> = async ({ params }) => {
  const faq = await getFAQBySlug(params.slug);
  
  if (!faq) {
    notFound();
  }

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  const stripHtmlTags = (html: string) => html.replace(/<[^>]*>/g, '');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": faq.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtmlTags(faq.content)
      }
    }
  };

  const allFAQs = await getAllFAQs();
  const currentIndex = allFAQs.findIndex(f => f.slug === params.slug);
  
  // Get 3 random related FAQs (excluding current one)
  const otherFAQs = allFAQs.filter(f => f.slug !== params.slug);
  const relatedFAQs = otherFAQs
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="faq-page">
        <div className="faq-page-header">
          <div className="container">
            <nav className="faq-breadcrumb">
              <Link href="/faq" className="faq-breadcrumb-link">
                ← Back to All FAQs
              </Link>
            </nav>
          </div>
        </div>

        <div className="container">
          <article className="faq-content">
            <header className="faq-article-header">
              <h1 className="h2">{faq.title}</h1>
            </header>
            
            <div className="faq-article-content">
              <div 
                className="body-text"
                dangerouslySetInnerHTML={createMarkup(faq.content)}
              />
            </div>

            <footer className="faq-article-footer">
              <div className="faq-navigation">
                <div className="faq-related-section">
                  <h4 className="h5" style={{ textAlign: 'center', marginBottom: 'var(--space-2x)' }}>
                    Related FAQs
                  </h4>
                  <div className="faq-related-grid">
                    {relatedFAQs.map((relatedFAQ) => (
                      <Link 
                        key={relatedFAQ.id}
                        href={`/faq/${relatedFAQ.slug}`} 
                        className="faq-related-link"
                      >
                        <span className="faq-related-title">{relatedFAQ.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="faq-cta">
                <h3 className="h5">Ready to Transform Your Health?</h3>
                <p className="body-text">
                  Join thousands who have already started their wellness journey with Vita Bella. Take the first step toward optimal health today.
                </p>
                <VitaBellaButton href="/membership">
                  Get Started
                </VitaBellaButton>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
