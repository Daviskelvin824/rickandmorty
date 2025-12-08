import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with Cloudflare Pages routing
};

export default nextConfig;
