// Static export for GitHub Pages. When deployed by the GitHub Actions
// workflow, GITHUB_PAGES=true turns on the repo basePath so assets and
// routes resolve under /rankforge-website/. Local `next dev`/`next build`
// (without the flag) serve from the root with no prefix.
const isPages = process.env.GITHUB_PAGES === "true"
const repo = "rankforge-website"
const basePath = isPages ? `/${repo}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
