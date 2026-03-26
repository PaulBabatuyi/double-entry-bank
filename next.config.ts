import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    return {
      beforeFiles: [
        // Proxy swagger docs to Go backend
        {
          source: "/swagger/:path*",
          destination: `${apiBaseUrl}/swagger/:path*`,
        },
        // Proxy health endpoint
        {
          source: "/health",
          destination: `${apiBaseUrl}/health`,
        },
      ],
    };
  },
};

export default nextConfig;
