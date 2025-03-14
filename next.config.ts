import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*', // Adjust this path based on your project structure
      },
    ];
  },
};

export default nextConfig;
