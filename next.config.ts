import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gracewoodlands.com',
      },
      {
        protocol: 'https',
        hostname: '*.dropbox.com',
      },
    ],
  },
};

export default nextConfig;
