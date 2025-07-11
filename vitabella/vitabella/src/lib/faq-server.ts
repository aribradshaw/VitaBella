import fs from 'fs';
import path from 'path';
import { FAQItem, parseCSV } from './faq';

export async function getAllFAQs(): Promise<FAQItem[]> {
  const csvPath = path.join(process.cwd(), 'src', 'app', 'faq', 'VitaBellaFAQ.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  return parseCSV(csvContent);
}

export async function getFAQBySlug(slug: string): Promise<FAQItem | null> {
  const faqs = await getAllFAQs();
  return faqs.find(faq => faq.slug === slug) || null;
}
