# Vita Bella Website

**Version 1.9**

Last Major Edit: Completed Pickleball and DUPR Pages with Logic for Text Variables

Welcome to the Vita Bella website project! This is a modern, modular, and SEO-optimized web application built with Next.js 15 and TypeScript. The site provides detailed information about Vita Bella's health and wellness products and services, with a focus on dynamic product pages, beautiful design, and a seamless user experience.

---

**This software is proprietary and the exclusive property of Vita Bella Health LLC.**

For all contributions, suggestions, or business inquiries, please contact: [info@vitabella.com](mailto:info@vitabella.com)

---

## Project Overview

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** CSS Modules, global CSS variables, and utility classes
- **Image Optimization:** Next.js `<Image />` for responsive, fast-loading images
- **SEO:** Dynamic metadata for all product pages
- **Modular Components:** Hero, Benefits, Science, and more, for easy reuse and maintenance
- **Responsive Design:** Fully responsive and mobile-friendly

## Key Features

- **Dynamic Product Pages:**
  - Each product is generated from a single `products.json` source of truth
  - Pages are statically generated at build time for performance and SEO
  - Product pages include: Hero section with gallery, Benefits bar, Science module, and more
- **Reusable UI Modules:**
  - `ProductHero`, `BenefitsBar`, `ProductScience`, and more
  - Consistent design system using global CSS variables and utility classes
- **Custom Buttons:**
  - `VitaBellaButton` with dynamic color inversion and animated arrow
- **No Insurance Module:**
  - Highlights the ease of access to services without insurance
- **Section Headers:**
  - Modular, flexible headers for all major sections
- **Accessibility:**
  - Semantic HTML, accessible color contrast, and keyboard navigation
- **SEO & Metadata:**
  - Dynamic meta tags for each product and page
- **Performance:**
  - Optimized images, static generation, and minimal client-side JS

## Project Structure

```
vitabella/
├── public/                # Static assets (images, videos, SVGs)
├── src/
│   ├── app/
│   │   ├── product/[slug]/   # Dynamic product pages and modules
│   │   ├── components/       # Common UI components
│   │   ├── globals.css       # Global styles and variables
│   │   └── ...               # Other app routes and pages
│   ├── components/           # Shared components (e.g., VitaBellaButton)
│   └── ...
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd vitabella
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Contributing

This project is proprietary. For contributions or suggestions, please email [info@vitabella.com](mailto:info@vitabella.com).

## License

This software and all source code in this repository are proprietary and the exclusive property of Vita Bella Health LLC. 

Unauthorized copying, distribution, modification, or use of this code, in whole or in part, is strictly prohibited without prior written consent from Vita Bella Health LLC.

For licensing inquiries, please contact [info@vitabella.com](mailto:info@vitabella.com).

## Bugs

We want to make it so the animated text on the All Products page only activates when the text is too long for the card's current size. Currently, the animation logic works well for the smaller card sizes but it is wonky on larger cards where we have text animating that should be static.