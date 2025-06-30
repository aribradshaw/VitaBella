
import { MetadataRoute } from 'next'
import { getAllFAQs } from '../lib/faq-server'
import fs from 'fs/promises';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vitabella.com'

  // Get FAQ pages
  const faqs = await getAllFAQs()
  const faqPages = faqs.map((faq) => ({
    url: `${baseUrl}/faq/${faq.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog posts
  const postsPath = path.join(process.cwd(), 'src/app/blog/posts.json');
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const postsRaw = await fs.readFile(postsPath, 'utf-8');
    const posts = JSON.parse(postsRaw);
    blogPages = posts.filter((p: any) => p.Slug).map((post: any) => ({
      url: `${baseUrl}/blog/${post.Slug}`,
      lastModified: post.Date ? new Date(post.Date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    // ignore
  }

  // Product pages
  const productsPath = path.join(process.cwd(), 'src/app/product/products.json');
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const productsRaw = await fs.readFile(productsPath, 'utf-8');
    const products = JSON.parse(productsRaw);
    productPages = products.filter((p: any) => p.Slug).map((product: any) => ({
      url: `${baseUrl}/product/${product.Slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    // ignore
  }

  // Static pages (auto-generated from app directory)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/membership`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Additional static pages found in app directory
    {
      url: `${baseUrl}/arizona-weight-loss-clinic-542501`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dupr`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/form`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instructions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pickleball`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/postform`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Treatment category pages
  const treatmentPages = [
    {
      url: `${baseUrl}/sexual-wellness`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hair-loss`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/injury-and-recovery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anti-aging`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cognitive-health`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hormone-therapy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skin-care`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/weight-loss`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  return [
    ...staticPages,
    ...treatmentPages,
    ...faqPages,
    ...blogPages,
    ...productPages,
  ];
}
