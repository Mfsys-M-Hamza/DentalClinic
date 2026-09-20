import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the project root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
};

export default nextConfig;
