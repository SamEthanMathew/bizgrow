import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove output: 'export' to enable API routes for Vercel
  // output: 'export', // Commented out to enable API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove GitHub Pages specific config for Vercel deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/bizgrow' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/bizgrow/' : '',
};

export default nextConfig;
