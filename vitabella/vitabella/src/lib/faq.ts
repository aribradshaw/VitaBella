export interface FAQItem {
  id: string;
  title: string;
  content: string;
  slug: string;
  categories: string[];
}

export function parseCSV(csvContent: string): FAQItem[] {
  const lines = csvContent.split('\n');
  const faqs: FAQItem[] = [];
  
  let currentFAQ: Partial<FAQItem> = {};
  let isInQuotedContent = false;
  let contentBuffer = '';
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;
    
    if (!isInQuotedContent) {
      // Handle start of new FAQ
      // Look for pattern: "Title","Content...","Categories"
      const titleMatch = line.match(/^"([^"]+)","(.*)$/);
      if (titleMatch) {
        const [, title, remainder] = titleMatch;
        
        // Check if this is a single-line FAQ or multi-line
        // Look for the pattern where content ends with ","Categories"
        const categoryMatch = remainder.match(/^(.*)",\s*"?([^"]*)"?\s*$/);
        
        if (categoryMatch) {
          // Single line FAQ with categories
          const [, content, categoriesStr] = categoryMatch;
          let cleanContent = content;
          
          // Remove trailing quote from content if present
          if (cleanContent.endsWith('"')) {
            cleanContent = cleanContent.slice(0, -1);
          }
          
          const categories = categoriesStr
            .split(',')
            .map(cat => cat.trim())
            .filter(cat => cat.length > 0)
            .map(cat => cat.replace(/&amp;/g, '&')); // Decode HTML entities
          
          const slug = createSlug(title);
          faqs.push({
            id: `faq-${faqs.length + 1}`,
            title,
            content: cleanContent,
            slug,
            categories
          });
        } else {
          // Multi-line FAQ - start collecting content
          currentFAQ = {
            title,
            slug: createSlug(title),
            categories: [] // Will be set when we find the end
          };
          contentBuffer = remainder;
          isInQuotedContent = true;
        }
      }
    } else {
      // Continue reading multi-line content
      // Look for end pattern with categories
      const endMatch = line.match(/^(.*)",\s*"?([^"]*)"?\s*$/);
      if (endMatch) {
        // End of multi-line content with categories
        const [, contentEnd, categoriesStr] = endMatch;
        let finalContentLine = contentEnd;
        
        if (finalContentLine.endsWith('"')) {
          finalContentLine = finalContentLine.slice(0, -1);
        }
        
        contentBuffer += '\n' + finalContentLine;
        currentFAQ.content = contentBuffer;
        currentFAQ.id = `faq-${faqs.length + 1}`;
        
        const categories = categoriesStr
          .split(',')
          .map(cat => cat.trim())
          .filter(cat => cat.length > 0)
          .map(cat => cat.replace(/&amp;/g, '&')); // Decode HTML entities
        currentFAQ.categories = categories;
        
        faqs.push(currentFAQ as FAQItem);
        
        // Reset for next FAQ
        currentFAQ = {};
        contentBuffer = '';
        isInQuotedContent = false;
      } else {
        // Continue collecting content
        contentBuffer += '\n' + line;
      }
    }
  }
  
  return faqs;
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function searchFAQs(faqs: FAQItem[], query: string): FAQItem[] {
  if (!query.trim()) return faqs;
  
  const lowercaseQuery = query.toLowerCase();
  return faqs.filter(faq => 
    faq.title.toLowerCase().includes(lowercaseQuery) ||
    faq.content.toLowerCase().includes(lowercaseQuery)
  );
}

export function filterFAQsByCategory(faqs: FAQItem[], category: string): FAQItem[] {
  if (!category || category === 'All') return faqs;
  
  return faqs.filter(faq => 
    faq.categories && faq.categories.includes(category)
  );
}

export function getAllCategories(faqs: FAQItem[]): string[] {
  const categories = new Set<string>();
  faqs.forEach(faq => {
    if (faq.categories) {
      faq.categories.forEach(category => categories.add(category));
    }
  });
  return Array.from(categories).sort();
}

export function searchAndFilterFAQs(faqs: FAQItem[], query: string, category: string): FAQItem[] {
  let filtered = faqs;
  
  // First filter by category if specified
  if (category && category !== 'All') {
    filtered = filterFAQsByCategory(filtered, category);
  }
  
  // Then apply search if specified
  if (query && query.trim()) {
    filtered = searchFAQs(filtered, query);
  }
  
  return filtered;
}
