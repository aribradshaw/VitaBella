/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vitabella.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/DUPR',
        destination: '/dupr',
        permanent: true,
      },
      {
        source: '/DUPR/',
        destination: '/dupr',
        permanent: true,
      },
      // ...other redirects
    ];
  },
};

module.exports = nextConfig;
