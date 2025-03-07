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
};

export default nextConfig;
