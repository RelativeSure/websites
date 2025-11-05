import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // For Cloudflare Workers via next-on-pages
  images: {
    unoptimized: true,
  },
}

export default nextConfig
