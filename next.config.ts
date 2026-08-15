import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Vercel Next 16 middleware/lambda packaging issues
  outputFileTracingIncludes: {
    "*": ["./node_modules/@swc/helpers/**/*"],
  },
};

export default nextConfig;
