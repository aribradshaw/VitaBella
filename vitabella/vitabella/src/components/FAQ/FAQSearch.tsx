"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FAQItem, getAllCategories } from '../../lib/faq';
import '../../app/faq/FAQ.css';

interface FAQSearchProps {
  initialFAQs: FAQItem[];
}

// Define category mapping with images
const categoryImageMap: Record<string, { image: string; displayName: string }> = {
  'How It Works': { image: '/modules/FAQ/HowItWorks.webp', displayName: 'How It Works' },
  'Memberships': { image: '/modules/FAQ/Memberships.webp', displayName: 'Memberships' },
  'Providers Consultations': { image: '/modules/FAQ/ProviderConsultations.webp', displayName: 'Provider Consultations' },
  'Labs': { image: '/modules/FAQ/Labs.webp', displayName: 'Lab Work' },
  'Treatments': { image: '/modules/FAQ/Treatments.webp', displayName: 'Treatments' },
  'Shipping & Returns': { image: '/modules/FAQ/ShippingReturns.webp', displayName: 'Shipping & Returns' }
};

const FAQSearch: React.FC<FAQSearchProps> = ({ initialFAQs }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = getAllCategories(initialFAQs);
    setAvailableCategories(['All', ...categories]);
  }, [initialFAQs]);

  // Handle clicking outside to deselect category
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.faq-categories-section') && selectedCategory !== 'All') {
        setSelectedCategory('All');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedCategory]);

  useEffect(() => {
    const searchAndFilterFAQs = async () => {
      if (!searchQuery.trim() && selectedCategory === 'All') {
        setFaqs(initialFAQs);
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('q', searchQuery);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        
        const response = await fetch(`/api/faq/search?${params.toString()}`);
        if (response.ok) {
          const searchResults = await response.json();
          setFaqs(searchResults);
        }
      } catch (error) {
        console.error('Search failed:', error);
        // Fallback to client-side filtering
        let filtered = initialFAQs;
        
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(faq => 
            faq.categories && faq.categories.includes(selectedCategory)
          );
        }
        
        if (searchQuery.trim()) {
          const lowercaseQuery = searchQuery.toLowerCase();
          filtered = filtered.filter(faq => 
            faq.title.toLowerCase().includes(lowercaseQuery) ||
            faq.content.toLowerCase().includes(lowercaseQuery)
          );
        }
        
        setFaqs(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAndFilterFAQs, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory, initialFAQs]);

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
          <h1 className="h1 faqheader">Frequently Asked Questions</h1>
          <p className="body-text">
            Find answers to common questions about Vita Bella's services, treatments, and membership options.
          </p>
        </div>
      </div>          {/* Category Navigation */}
      <div className="faq-categories-section">
        <div className="container">
          <h2 className="faq-categories-title">Browse by Category</h2>
          <div className="faq-categories-grid">
            {availableCategories.filter(cat => cat !== 'All').map((category) => {
              const categoryInfo = categoryImageMap[category];
              if (!categoryInfo) return null;
              
              return (
                <button
                  key={category}
                  className={`faq-category-card ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === category ? 'All' : category)}
                >
                  <div className="faq-category-image">
                    <Image
                      src={categoryInfo.image}
                      alt={categoryInfo.displayName}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="faq-category-text-overlay">
                    <h3 className="faq-category-name">{categoryInfo.displayName}</h3>
                  </div>
                </button>
              );
            })}
          </div>
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
            {!isLoading && (searchQuery || selectedCategory !== 'All') && (
              <div className="faq-results-info">
                Found {faqs.length} result{faqs.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'All' && ` in ${categoryImageMap[selectedCategory]?.displayName || selectedCategory}`}
                {(searchQuery || selectedCategory !== 'All') && (
                  <button 
                    className="faq-clear-filters"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                  >
                    Clear filters
                  </button>
                )}
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
