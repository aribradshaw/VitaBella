import fs from 'fs';
import path from 'path';

export interface FAQItem {
  id: string;
  title: string;
  content: string;
  slug: string;
  categories: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  image: string;
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
      // Start of new FAQ
      const match = line.match(/^"([^"]+)","(.*)$/);
      if (match) {
        const [, title, content] = match;
        
        if (content.endsWith('"')) {
          // Single line FAQ
          const cleanContent = content.slice(0, -1); // Remove trailing quote
          const slug = createSlug(title);
          faqs.push({
            id: `faq-${faqs.length + 1}`,
            title,
            content: cleanContent,
            slug
          });
        } else {
          // Multi-line FAQ
          currentFAQ = {
            title,
            slug: createSlug(title)
          };
          contentBuffer = content;
          isInQuotedContent = true;
        }
      }
    } else {
      // Continue reading multi-line content
      if (line.endsWith('"')) {
        // End of multi-line content
        contentBuffer += '\n' + line.slice(0, -1); // Remove trailing quote
        currentFAQ.content = contentBuffer;
        currentFAQ.id = `faq-${faqs.length + 1}`;
        faqs.push(currentFAQ as FAQItem);
        
        // Reset for next FAQ
        currentFAQ = {};
        contentBuffer = '';
        isInQuotedContent = false;
      } else {
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

export async function getAllFAQs(): Promise<FAQItem[]> {
  const csvPath = path.join(process.cwd(), 'src', 'app', 'faq', 'VitaBellaFAQ.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  return parseCSV(csvContent);
}

export async function getFAQBySlug(slug: string): Promise<FAQItem | null> {
  const faqs = await getAllFAQs();
  return faqs.find(faq => faq.slug === slug) || null;
}

export function searchFAQs(faqs: FAQItem[], query: string): FAQItem[] {
  if (!query.trim()) return faqs;
  
  const lowercaseQuery = query.toLowerCase();
  return faqs.filter(faq => 
    faq.title.toLowerCase().includes(lowercaseQuery) ||
    faq.content.toLowerCase().includes(lowercaseQuery)
  );
}
