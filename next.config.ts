import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    return {
      beforeFiles: [
        // Proxy all API calls to Go backend
        {
          source: "/register",
          destination: `${apiBaseUrl}/register`,
        },
        {
          source: "/login",
          destination: `${apiBaseUrl}/login`,
        },
        {
          source: "/accounts/:path*",
          destination: `${apiBaseUrl}/accounts/:path*`,
        },
        {
          source: "/transfers",
          destination: `${apiBaseUrl}/transfers`,
        },
        {
          source: "/transactions/:path*",
          destination: `${apiBaseUrl}/transactions/:path*`,
        },
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
