import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Force Webpack for stability in environments with limited native support
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
