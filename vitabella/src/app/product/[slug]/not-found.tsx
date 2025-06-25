import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="h1 mb-6" style={{ color: 'var(--e-global-color-dark-green)' }}>
          Product Not Found
        </h1>
        <p className="body-text mb-8">
          Sorry, we couldn't find the product you're looking for. It may have been removed or the URL might be incorrect.
        </p>
        <div className="space-y-4">
          <Link href="/product" className="vitabella-button inline-flex">
            <span>View All Products</span>
            <div className="vitabella-arrow">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle className="arrow-circle" cx="15" cy="15" r="15" fill="var(--e-global-color-dark-green)"/>
                <path className="arrow-path" d="M15 8L22 15L15 22M22 15H8" stroke="var(--e-global-color-lightgreen)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
