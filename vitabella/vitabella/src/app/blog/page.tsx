



import fs from 'fs/promises';
import path from 'path';
import BlogArchiveClient from './BlogClient';
import { extractCategories } from './category-utils';

export default async function BlogArchivePage() {
  // SSR: fetch posts and categories
  const postsPath = path.join(process.cwd(), 'src/app/blog/posts.json');
  const postsRaw = await fs.readFile(postsPath, 'utf-8');
  const posts = JSON.parse(postsRaw);
  const allCategories: string[] = extractCategories(posts);

  // Hydrate posts and categories for client filtering
  return (
    <BlogArchiveClient posts={posts} allCategories={allCategories} />
  );
}

// (Client component moved to BlogClient.tsx)
// (No code should be here. Removed stray bracket and comment.)
