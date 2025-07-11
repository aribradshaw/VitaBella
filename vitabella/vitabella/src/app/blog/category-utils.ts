// Utility to extract unique categories from posts, splitting on both '>' and '|'
export interface BlogPost {
  Categories?: string;
  [key: string]: unknown;
}

export function extractCategories(posts: BlogPost[]): string[] {
  const cats = posts.flatMap((p) =>
    p.Categories
      ? p.Categories.split(/[>|]/).map((c: string) => c.trim())
      : []
  );
  return Array.from(new Set(cats)).filter(Boolean);
}

// Utility to check if a post matches a selected category
export function postHasCategory(post: BlogPost, selected: string): boolean {
  if (!post.Categories) return false;
  return post.Categories.split(/[>|]/).map((c: string) => c.trim().toLowerCase()).includes(selected.toLowerCase());
}
