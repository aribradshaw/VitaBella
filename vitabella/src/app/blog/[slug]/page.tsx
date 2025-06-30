


import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import employees from '@/constants/employees.json';
import React from 'react';
import VitaBellaButton from '@/components/common/VitaBellaButton';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Read posts.json
  const postsPath = path.join(process.cwd(), 'src/app/blog/posts.json');
  const postsRaw = await fs.readFile(postsPath, 'utf-8');
  const posts = JSON.parse(postsRaw);
  interface BlogPost {
    Slug: string;
    Title: string;
    Date: string;
    Content: string;
    Categories?: string;
    author?: string;
    [key: string]: unknown;
  }
  const post = (posts as BlogPost[]).find((p) => p.Slug === params.slug);

  if (!post) return notFound();

  // Categories: split string by '>' and render as tags
  const categories = post.Categories ? post.Categories.split(/[>|]/).map((cat: string) => cat.trim()).filter(Boolean) : [];


  return (
    React.createElement(
      'main',
      { className: 'container py-12' },
      React.createElement(
        'article',
        {
          className: 'bg-white rounded-lg shadow-md p-6 md:p-10 mx-auto',
          style: { maxWidth: 1340, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }
        },
        React.createElement('h1', { className: 'h2-alt mb-2 archivetitle', style: { maxWidth: 670, width: '100%' } }, post.Title),
        React.createElement('div', { className: 'text-gray-500 text-base mb-6 font-medium', style: { maxWidth: 670, width: '100%' } }, new Date(post.Date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })),
        typeof post["Image Featured"] === "string" && post["Image Featured"].length > 0 && React.createElement(
          'div',
          { className: 'blog-image-wrapper mb-8', style: { maxWidth: 670, width: '100%' } },
          React.createElement(Image, {
            src: post["Image Featured"] as string,
            alt: post.Title,
            width: 670,
            height: 340,
            className: 'img blog-image',
            style: { height: 320, objectFit: 'cover', borderRadius: '18px' }
          }),
          categories.length > 0 && React.createElement(
            'div',
            { className: 'blog-card-category-list' },
            (categories as string[]).map((cat: string) =>
              React.createElement('span', { key: cat, className: 'blog-card-category' }, cat)
            )
          )
        ),
        React.createElement('div', {
          className: 'body-text prose prose-lg max-w-none mb-8',
          style: { maxWidth: 670, width: '100%' },
          dangerouslySetInnerHTML: { __html: post.Content }
        })
      ),
      // Attribution Section
      post.author && (() => {
        const employee = employees.find(emp => emp.name === post.author);
        return React.createElement(
          'div',
          {
            style: {
              width: '100%',
              maxWidth: 670,
              margin: '2.5rem auto 0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
              borderTop: '1px solid #eee',
              paddingTop: 28
            }
          },
          employee && React.createElement(Image, {
            src: employee.image,
            alt: employee.name,
            width: 56,
            height: 56,
            style: { borderRadius: '50%', objectFit: 'cover', marginRight: 12 }
          }),
          React.createElement(
            'div',
            null,
            React.createElement('div', { style: { fontSize: '1.08rem', fontWeight: 500, marginBottom: 2 } },
              'Posted by ', React.createElement('strong', null, employee ? employee.name : post.author)
            ),
            React.createElement('div', { style: { fontSize: 15, color: '#555' } },
              'Reviewed by:', React.createElement('br'),
              React.createElement('strong', null, 'Dr Alex Mosheni'), React.createElement('br'),
              React.createElement('strong', null, 'Dr Daniel Bryan')
            )
          )
        );
      })(),
      // End Attribution Section
      React.createElement(
        'div',
        { style: { display: 'flex', justifyContent: 'center', width: '100%' } },
        React.createElement(VitaBellaButton, {
          label: 'See All Blog Posts',
          href: '/blog',
          bg: 'var(--e-global-color-lightgreen)',
          bgHover: 'var(--e-global-color-dark-green)',
          text: 'var(--e-global-color-dark-green)',
          textHover: 'var(--e-global-color-white)',
          arrowCircleColor: 'var(--e-global-color-dark-green)',
          arrowCircleColorHover: 'var(--e-global-color-lightgreen)',
          arrowPathColor: 'var(--e-global-color-lightgreen)',
          arrowPathColorHover: 'var(--e-global-color-dark-green)',
          style: { margin: '0 auto', marginTop: 24, minWidth: 220 },
        })
      ),
      React.createElement('div', { style: { marginBottom: 'var(--space-4x)' } })
    )
  );
}
