import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/bizgrow' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bizgrow/' : '',
};

export default nextConfig;
