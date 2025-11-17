import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  outDir: ".fumadocs",
});

/** @type {import('next').NextConfig} */
const config = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: process.env.NODE_ENV === "production",
  },
};

export default withMDX(config);
