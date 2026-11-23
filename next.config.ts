import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "proiect-mvc-demo.com",
        "proiect-api-demo.com",
        "localhost:3000",
        "facturio-mvc-demo.com",
        "facturio-api-demo.com",
      ],
    },
  },
};

export default nextConfig;
