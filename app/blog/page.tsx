import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — St Clair Cannabis | Toronto",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from St Clair Cannabis in Toronto.",
  alternates: {
    canonical: "https://stclaircannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
