import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove output: 'export' to enable API routes
  // output: 'export', // Commented out to enable API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/bizgrow' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bizgrow/' : '',
};

export default nextConfig;
