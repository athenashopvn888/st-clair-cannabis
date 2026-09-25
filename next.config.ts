import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Host-conditioned .ca → .com rules. Sources are slashless; Next's matcher
// already accepts one trailing slash, so these fire in one hop.
// skipTrailingSlashRedirect stops Next from 308-stripping /path/ before they
// run. The /:path+/ rule below is the same permanent redirect Next inserts
// when that flag is off, placed after the .ca rules so .com slash behaviour
// stays the same and .ca URLs are not stripped first.
const caHostRedirects = JSON.parse(
  readFileSync(path.join(process.cwd(), "redirects/stc01-ca-host-redirects.json"), "utf8"),
);

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
    ],
  },
  async redirects() {
    return [
      ...caHostRedirects,
      // www → apex in one hop, including a trailing slash. Next treats the
      // slash as optional and leaves it out of :path*, so /contact/ goes
      // straight to the slashless apex URL. Query strings are preserved.
      // Legacy paths (/blog, /exotic, …) continue through the rules below.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.stclaircannabis\\.com" }],
        destination: "https://stclaircannabis.com/:path*",
        permanent: true,
      },
      { source: "/:path+/", destination: "/:path+", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
      { source: "/exotic", destination: "/exotic-weed", permanent: true },
      { source: "/premium", destination: "/premium-weed", permanent: true },
      { source: "/aaa", destination: "/aaa-weed", permanent: true },
      { source: "/aa", destination: "/aa-weed", permanent: true },
      { source: "/budget", destination: "/budget-weed", permanent: true },
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
