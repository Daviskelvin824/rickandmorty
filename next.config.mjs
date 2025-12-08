/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
};

export default nextConfig;
