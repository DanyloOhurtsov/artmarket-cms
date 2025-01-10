import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.google.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
