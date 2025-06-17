/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this part for images
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