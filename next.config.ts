import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  // Add standalone output for Docker
  output: "standalone",
};

export default nextConfig;
