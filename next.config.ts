import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // Vercel supports optimized images
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
