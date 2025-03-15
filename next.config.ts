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
  async redirects() {  
    return [  
        {  
            source: '/',  
            destination: '/portfolio',  
            permanent: true, // Set to false for temporary redirects  
        },  
    ];  
},  
};

export default nextConfig;
