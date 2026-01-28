import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages (Reverted due to Windows build issues)
  // output: 'export',

  // Disable image optimization for static export (use regular img tags)
  images: {
    unoptimized: true,
  },

  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,

  // Skip type checking during build (faster builds)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
