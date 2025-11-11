import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Prevent build manifest errors
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};

export default nextConfig;
