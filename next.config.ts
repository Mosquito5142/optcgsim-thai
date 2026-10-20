import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to ./out (host anywhere, e.g. GitHub Pages).
// For GitHub Pages under https://user.github.io/<repo>/ set NEXT_PUBLIC_BASE_PATH=/<repo> (the workflow does this).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
