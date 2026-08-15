import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Vercel Next 16 middleware/lambda packaging issues
  outputFileTracingIncludes: {
    "*": ["./node_modules/@swc/helpers/**/*"],
  },
  // Keep deploys unblocked if ESLint has local resolution quirks on CI.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
