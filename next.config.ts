import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/auth-proxy/:path*',
        destination: 'https://accounts.google.com/:path*'
      }
    ]
  }
};

export default nextConfig;
