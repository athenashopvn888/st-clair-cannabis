import Link from "next/link";
import FlowerBogoStrip from "./FlowerBogoStrip";

export default function FleetAnnouncementBanner() {
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store announcements">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@graph\": [{\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis top weed tiers\", \"contentUrl\": \"https://stclaircannabis.ca/banners/top-weed-tier-stc01.png\", \"description\": \"Exotic, Premium and AAA+ top weed tiers at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE - Buy 3g Get 3g FREE (6g)\"}, {\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis cigarette mix and match\", \"contentUrl\": \"https://stclaircannabis.ca/banners/2pack5cig.webp\", \"description\": \"Two packs for $5 mix and match and $25 carton cigarette offer at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"2 PACKS $5 / $25 CARTON\"}, {\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis premium cigarettes\", \"contentUrl\": \"https://stclaircannabis.ca/banners/BB_Belmont_Premium_Grade.webp\", \"description\": \"BB Full Flavor and Lights two packs for $5 plus Marlboro and Belmont for $10 per pack at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"BB Full Flavor + Lights 2 packs $5 - Marlboro & Belmont $10/pack\"}]}" }} />
      <FlowerBogoStrip hero />
      <Link href="/exotic-weed" data-exotic-tier-banner="" aria-label="Shop the Top Weed Tiers: Exotic Weed, Premium Weed, and AAA+ Weed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/top-weed-tier-stc01.png" alt="TOP WEED TIER at St Clair Cannabis" title="St Clair Cannabis top weed tiers - Exotic, Premium and AAA+" />
      </Link>
      <p data-top-tier-lanes="" data-free-gram-line="">TOP 3 TIERS ONLY (EXOTIC, PREMIUM, AAA+): BUY 2G GET 1G FREE · BUY 3G GET 3G FREE (6G)</p>
      <p data-top-tier-lanes="">TOP WEED TIERS · EXOTIC WEED · PREMIUM WEED · AAA+ WEED</p>
      <p data-cigarette-deal="">CIGARETTE DEAL ! 2 PACK $5 MIX AND MATCH</p>
      <p data-bb-light-deal="">EXCLUSIVE SPECIAL PREMIUM GRADE BB FULL, BB LIGHT &amp; BELMONT KING SIZE!</p>
      <Link href="/items/cigarettes" data-cig-mix-banner="" aria-label="Shop cigarette mix-and-match deals">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/2pack5cig.webp" alt="Cigarette mix-and-match offer at St Clair Cannabis. Adults 19+." title="St Clair Cannabis cigarette offer - 2 packs $5 mix and match, $25 carton" />
      </Link>
      <p data-cigarette-deal="" data-cig-banner-bar="">2 PACKS $5 / $25 CARTON</p>
      <Link href="/items/cigarettes" data-bb-premium-banner="" aria-label="Shop BB and Belmont Premium Grade cigarettes">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/BB_Belmont_Premium_Grade.webp" alt="BB Full, BB Lights, and Belmont King Size cigarette banner at St Clair Cannabis. Adults 19+." title="St Clair Cannabis premium cigarettes - BB Full, BB Lights, Marlboro and Belmont" />
      </Link>
      <p data-top-tier-lanes="" data-bb-banner-bar="">BB FULL FLAVOR + LIGHTS 2 PACKS $5 · MARLBORO &amp; BELMONT $10/PACK</p>
      <Link href="/items/cigarettes" data-belmont-mix-match-banner="" aria-label="BELMONT KING SIZE $10 - 2PACK BB $5 MIX & MATCH">
        <span data-belmont-offer-lead="">BELMONT KING SIZE $10 -</span>
        <span data-belmont-offer-tail=""> 2PACK BB $5 MIX &amp; MATCH</span>
      </Link>
    </aside>
  );
}
