import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/micro', // 替换为你自己的子路径，例如：/my-app
  images: {
    domains: ['beautylook.top'], // 允许加载的图片域名
  },
};

export default nextConfig;
