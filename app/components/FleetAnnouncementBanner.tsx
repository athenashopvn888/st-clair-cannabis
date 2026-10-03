import Link from "next/link";
import FlowerBogoStrip from "./FlowerBogoStrip";

export default function FleetAnnouncementBanner() {
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store announcements">
      <FlowerBogoStrip hero />
      <Link href="/exotic-weed" data-exotic-tier-banner="" aria-label="Shop the Top Weed Tiers: Exotic Weed, Premium Weed, and AAA+ Weed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/top-weed-tier-stc01.png" alt="TOP WEED TIER at St Clair Cannabis" />
      </Link>
      <p data-top-tier-lanes="">TOP WEED TIERS · EXOTIC WEED · PREMIUM WEED · AAA+ WEED</p>
      <p data-cigarette-deal="">CIGARETTE DEAL ! 2 PACK $5 MIX AND MATCH</p>
      <p data-bb-light-deal="">EXCLUSIVE SPECIAL PREMIUM GRADE BB FULL, BB LIGHT &amp; BELMONT KING SIZE!</p>
      <Link href="/items/cigarettes" data-cig-mix-banner="" aria-label="Shop cigarette mix-and-match deals">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/2pack5cig.webp" alt="Cigarette mix-and-match offer at St Clair Cannabis. Adults 19+." />
      </Link>
      <Link href="/items/cigarettes" data-bb-premium-banner="" aria-label="Shop BB and Belmont Premium Grade cigarettes">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/BB_Belmont_Premium_Grade.webp" alt="BB Full, BB Lights, and Belmont King Size cigarette banner at St Clair Cannabis. Adults 19+." />
      </Link>
      <Link href="/items/cigarettes" data-belmont-mix-match-banner="" aria-label="BELMONT KING SIZE $10 - 2PACK BB $5 MIX & MATCH">
        <span data-belmont-offer-lead="">BELMONT KING SIZE $10 -</span>
        <span data-belmont-offer-tail=""> 2PACK BB $5 MIX &amp; MATCH</span>
      </Link>
    </aside>
  );
}
