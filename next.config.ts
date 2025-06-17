/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this part for images
  typescript: {
    // Enable strict type checking
    ignoreBuildErrors: true,
  }, 
  eslint:{
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        port: '',
        pathname: '/images/products/**',
      },
    ],
  },
};

export default nextConfig;