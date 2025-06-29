"use client";
import Link from 'next/link';
import Image from 'next/image';
import VitaBellaButton from '@/components/common/VitaBellaButton';
import { useState } from 'react';

import './blog.css';
import './blog-grid.css';
import { postHasCategory } from './category-utils';

interface BlogPost {
  Slug: string;
  Title: string;
  Date: string;
  Excerpt: string;
  Categories?: string;
  [key: string]: any;
}

export default function BlogArchiveClient({ posts, allCategories }: { posts: BlogPost[], allCategories: string[] }) {
  const [selected, setSelected] = useState<string>('All');
  const filtered = selected === 'All'
    ? posts
    : posts.filter((p: BlogPost) => postHasCategory(p, selected));

  return (
    <main className="container py-12">
      <h1 className="h2-alt mb-8" style={{ textAlign: 'center' }}>Blog Archive</h1>
      <div className="blog-category-list" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
        <button
          type="button"
          className={`blog-category-btn${selected === 'All' ? ' active' : ''}`}
          onClick={() => setSelected('All')}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`blog-category-btn${selected === cat ? ' active' : ''}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="blog-grid" style={{ marginBottom: 'var(--space-4x)' }}>
        {filtered.map((post: BlogPost) => {
          const categories = post.Categories ? post.Categories.split(/[>|]/).map((cat: string) => cat.trim()).filter(Boolean) : [];
          return (
            <div key={post.Slug} className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow flex flex-col">
              <div className="blog-image-wrapper mb-4">
                {post["Image Featured"] && (
                  <Link href={`/blog/${post.Slug}`} tabIndex={-1} style={{ display: 'block', position: 'relative' }} aria-label={post.Title}>
                    <Image
                      src={post["Image Featured"]}
                      alt={post.Title}
                      width={600}
                      height={340}
                      className="img blog-image"
                      style={{ height: 320, objectFit: 'cover', borderRadius: '18px' }}
                    />
                    {categories.length > 0 && (
                      <div className="blog-card-category-list">
                        {categories.map((cat: string) => (
                          <span key={cat} className="blog-card-category">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="h4 group-hover:underline mb-2">{post.Title}</h2>
                <div className="text-gray-500 text-sm mb-3 font-medium">{new Date(post.Date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <p className="body-text line-clamp-3 mb-4">{post.Excerpt}</p>
                <div className="mt-auto pt-2 flex justify-end">
                  <VitaBellaButton
                    label="Read More"
                    href={`/blog/${post.Slug}`}
                    bg="var(--e-global-color-lightgreen)"
                    bgHover="var(--e-global-color-dark-green)"
                    text="var(--e-global-color-dark-green)"
                    textHover="var(--e-global-color-white)"
                    arrowCircleColor="var(--e-global-color-dark-green)"
                    arrowCircleColorHover="var(--e-global-color-lightgreen)"
                    arrowPathColor="var(--e-global-color-lightgreen)"
                    arrowPathColorHover="var(--e-global-color-dark-green)"
                    style={{ minWidth: 160, maxWidth: 300, paddingRight: '0.4erem', paddingLeft: 24, fontSize: '1rem' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
