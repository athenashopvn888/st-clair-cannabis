import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — St Clair Cannabis | Toronto",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at St Clair Cannabis.",
  alternates: {
    canonical: "https://stclaircannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
