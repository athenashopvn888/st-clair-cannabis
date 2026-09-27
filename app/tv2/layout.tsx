import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "St Clair Cannabis In-Store Accessories Display",
  description: "Operational in-store accessories menu display for St Clair Cannabis.",
  robots: { index: false, follow: false },
};

export default function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
