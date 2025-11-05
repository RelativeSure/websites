import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Export as static HTML for Cloudflare Workers
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
