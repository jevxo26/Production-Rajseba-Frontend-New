import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      // Unsplash (HTTPS)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },

      // HTTP version (same domain support)
      {
        protocol: "http",
        hostname: "images.unsplash.com",
      },

      // Optional: generic CDN support (Cloudinary)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      // Optional: Firebase Storage
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },

      // Optional: any S3 bucket style CDN
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;