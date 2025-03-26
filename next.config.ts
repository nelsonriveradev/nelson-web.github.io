import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cifrerlklfctbkammxhi.supabase.co",
      },
    ],
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        buffer: require.resolve("buffer/"), // Ensure compatibility with `node:buffer`
      },
      fallback: {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer/"), // Add fallback for `buffer`
      },
    };

    return config;
  },
};

export default nextConfig;
