/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.arena.ai', '*'],
    },
  },
};

export default nextConfig;
