import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stclaircannabis.ca" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/takeover/index.html" },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.stclaircannabis.ca" }],
        destination: "https://stclaircannabis.ca/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "stclaircannabis.com" }],
        destination: "https://stclaircannabis.ca/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.stclaircannabis.com" }],
        destination: "https://stclaircannabis.ca/:path*",
        permanent: true,
      },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
    ];
  },
};

export default nextConfig;
