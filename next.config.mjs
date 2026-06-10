// Dual-target build:
//  - Vercel (primary, rank-rankforge.vercel.app): full Next.js SSR — no
//    static export, pages are server-rendered on demand.
//  - GitHub Pages (mirror): GITHUB_PAGES=true switches on static export and
//    the repo basePath so assets resolve under /rankforge-website/.
const isPages = process.env.GITHUB_PAGES === "true"
const repo = "rankforge-website"
const basePath = isPages ? `/${repo}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isPages ? { output: "export" } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
