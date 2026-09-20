import type { NextConfig } from "next";
import path from "node:path";

/**
 * GitHub Pages build: `GITHUB_PAGES=true npm run build` produces a static site in ./out,
 * served from https://<user>.github.io/<repo>/. Normal `npm run dev` / Vercel builds are unaffected.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_PAGES_REPO ?? "DentalClinic";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Pin the project root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPages
    ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } }
    : { images: { formats: ["image/avif", "image/webp"] } }),
};

export default nextConfig;
