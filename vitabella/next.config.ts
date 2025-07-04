import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vitabella.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
