"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FAQItem } from '../../lib/faq';
import '../../app/faq/FAQ.css';

interface FAQSearchProps {
  initialFAQs: FAQItem[];
}

const FAQSearch: React.FC<FAQSearchProps> = ({ initialFAQs }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchFAQs = async () => {
      if (!searchQuery.trim()) {
        setFaqs(initialFAQs);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/faq/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const searchResults = await response.json();
          setFaqs(searchResults);
        }
      } catch (error) {
        console.error('Search failed:', error);
        // Fallback to client-side search
        const lowercaseQuery = searchQuery.toLowerCase();
        const filtered = initialFAQs.filter(faq => 
          faq.title.toLowerCase().includes(lowercaseQuery) ||
          faq.content.toLowerCase().includes(lowercaseQuery)
        );
        setFaqs(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchFAQs, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, initialFAQs]);

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div>
      <div className="faq-hero">
        <div className="container">
          <h1 className="h1">Frequently Asked Questions</h1>
          <p className="body-text">
            Find answers to common questions about Vita Bella's services, treatments, and membership options.
          </p>
        </div>
      </div>

      <div className="faq-search-section">
        <div className="container">
          <div className="faq-search-container">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {isLoading && (
              <div className="faq-results-info">Searching...</div>
            )}
            {!isLoading && searchQuery && (
              <div className="faq-results-info">
                Found {faqs.length} result{faqs.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="faq-list-section">
        <div className="container">
          {faqs.length === 0 ? (
            <div className="faq-no-results">
              <h3>No FAQs found</h3>
              <p>Try adjusting your search terms or browse all FAQs below.</p>
            </div>
          ) : (
            <div className="faq-accordion">
              {faqs.map((faq) => (
                <div key={faq.id} className="faq-accordion-item">
                  <div 
                    className="faq-accordion-header"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <Link 
                      href={`/faq/${faq.slug}`} 
                      className="faq-title-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="faq-accordion-title">{faq.title}</h3>
                    </Link>
                    <button 
                      className={`faq-accordion-toggle ${expandedFAQs.has(faq.id) ? 'expanded' : ''}`}
                      aria-label={expandedFAQs.has(faq.id) ? 'Collapse answer' : 'Expand answer'}
                    >
                      {expandedFAQs.has(faq.id) ? '−' : '+'}
                    </button>
                  </div>
                  
                  {expandedFAQs.has(faq.id) && (
                    <div className="faq-accordion-content">
                      <div 
                        className="faq-accordion-answer body-text"
                        dangerouslySetInnerHTML={createMarkup(faq.content)}
                      />
                      <div className="faq-accordion-footer">
                        <Link 
                          href={`/faq/${faq.slug}`}
                          className="faq-permalink-button"
                        >
                          View dedicated page →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSearch;
