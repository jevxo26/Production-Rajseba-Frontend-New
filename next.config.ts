import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compress: true,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Package import optimization for faster bundle load & automatic tree-shaking
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "date-fns",
      "@mui/material",
      "@mui/x-date-pickers",
      "radix-ui",
      "@tiptap/react",
      "leaflet",
      "dayjs",
      "sonner",
    ],
  },

  // Image optimization & CDN caching
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // Cache images for 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // High-performance response caching headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  turbopack: {
    resolveAlias: {
      html2canvas: "./src/utils/html2canvas-wrapper.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      html2canvas: path.resolve("./src/utils/html2canvas-wrapper.js"),
    };
    return config;
  },
};

export default nextConfig;