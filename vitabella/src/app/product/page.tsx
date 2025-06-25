import Link from 'next/link';
import Image from 'next/image';
import products from './products.json';
import { Product } from './[slug]/ProductClient';

export const metadata = {
  title: 'Products | Vita Bella',
  description: 'Explore our comprehensive range of wellness and health optimization products.',
};

export default function ProductsPage() {
  const typedProducts = products as Product[];
  const activeProducts = typedProducts.filter(product => product.Status === 'Active');

  // Group products by category
  const productsByCategory = activeProducts.reduce((acc, product) => {
    const categories = product['Product categories']?.split('|') || ['Uncategorized'];
    categories.forEach(category => {
      const trimmedCategory = category.trim();
      if (!acc[trimmedCategory]) {
        acc[trimmedCategory] = [];
      }
      acc[trimmedCategory].push(product);
    });
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="h1 mb-6" style={{ color: 'var(--e-global-color-dark-green)' }}>
              Our Products
            </h1>
            <p className="h6 mb-8" style={{ color: 'var(--e-global-color-grey2)' }}>
              Discover our comprehensive range of wellness and health optimization products, 
              each designed to help you achieve your health goals with science-backed solutions.
            </p>
            <div className="text-center">
              <span className="text-2xl font-bold" style={{ color: 'var(--e-global-color-dark-green)' }}>
                {activeProducts.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products by Category */}
      <section className="py-16">
        <div className="container">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="mb-16">
              <h2 className="h2 mb-8" style={{ color: 'var(--e-global-color-dark-green)' }}>
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.Slug}
                    href={`/product/${product.Slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      {product.imageM && (
                        <Image
                          src={product.imageM.replace('/public', '')}
                          alt={product.Title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--e-global-color-green)', color: 'var(--e-global-color-dark-green)' }}>
                        ${product.Price}
                      </div>
                      {product.Sku && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {product.Sku}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="h4 mb-3 group-hover:transition-colors" style={{ color: 'var(--e-global-color-dark-green)' }}>
                        {product.Title}
                      </h3>
                      
                      <p className="body-text mb-4 line-clamp-3">
                        {product['Short Description'] || product.Content?.substring(0, 120) + '...'}
                      </p>

                      {/* Key Benefits */}
                      {(product.introp1 || product.benefit1) && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--e-global-color-grey2)' }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--e-global-color-green)' }}></span>
                            {product.introp1 || product.benefit1}
                          </div>
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex justify-between items-center text-sm mb-4" style={{ color: 'var(--e-global-color-grey2)' }}>
                        {product.application && (
                          <span>{product.application}</span>
                        )}
                        {product.frequency && (
                          <span>{product.frequency}</span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: 'var(--e-global-color-dark-green)' }}>
                          ${product.Price}
                        </span>
                        <span className="vitabella-button text-sm">
                          <span>Learn More</span>
                          <div className="vitabella-arrow">
                            <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                              <circle className="arrow-circle" cx="15" cy="15" r="15" fill="var(--e-global-color-dark-green)"/>
                              <path className="arrow-path" d="M15 8L22 15L15 22M22 15H8" stroke="var(--e-global-color-lightgreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--e-global-color-off-white)' }}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="h2 mb-6" style={{ color: 'var(--e-global-color-dark-green)' }}>
              Ready to Start Your Journey?
            </h2>
            <p className="body-text mb-8">
              Our medical team is here to help you find the right products for your health goals. 
              Start with a consultation to get personalized recommendations.
            </p>
            <button className="vitabella-button mx-auto">
              <span>Schedule Consultation</span>
              <div className="vitabella-arrow">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle className="arrow-circle" cx="15" cy="15" r="15" fill="var(--e-global-color-dark-green)"/>
                  <path className="arrow-path" d="M15 8L22 15L15 22M22 15H8" stroke="var(--e-global-color-lightgreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
