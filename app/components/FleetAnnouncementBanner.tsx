"use client";

import { useState } from "react";
import Link from "next/link";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";
import FlowerBogoStrip from "./FlowerBogoStrip";
import { useCigaretteState } from "./CigaretteStateProvider";
import { useFleetContent } from "./FleetContentProvider";
import { CODED_BANNERS, bannersMatchCoded } from "../lib/fleet/coded";
import type { ResolvedBanner } from "../lib/fleet/types";

const CODED_JSON_LD = "{\"@context\": \"https://schema.org\", \"@graph\": [{\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis top weed tiers\", \"contentUrl\": \"https://stclaircannabis.ca/banners/top-weed-tier-stc01.png\", \"description\": \"Exotic, Premium and AAA+ top weed tiers at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE - Buy 3g Get 3g FREE (6g)\"}, {\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis nicotine and THC vapes\", \"contentUrl\": \"https://stclaircannabis.ca/banners/st-clair-vapes-nicotine-thc.webp\", \"description\": \"Nicotine vapes and THC vapes at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"NICOTINE VAPES + THC VAPES\"}, {\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis cigarette mix and match\", \"contentUrl\": \"https://stclaircannabis.ca/banners/2pack5cig.webp\", \"description\": \"Two packs for $5 mix and match and $25 carton cigarette offer at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"2 PACKS $5 / $25 CARTON\"}, {\"@type\": \"ImageObject\", \"name\": \"St Clair Cannabis premium cigarettes\", \"contentUrl\": \"https://stclaircannabis.ca/banners/BB_Belmont_Premium_Grade.webp\", \"description\": \"BB Full Flavor and Lights two packs for $5 plus Marlboro and Belmont for $10 per pack at St Clair Cannabis Dispensary in St Clair West.\", \"caption\": \"BB Full Flavor + Lights 2 packs $5 - Marlboro & Belmont $10/pack\"}]}";

function SheetBannerImage({
  src,
  codedSrc,
  alt,
  title,
  categoryName,
}: {
  src: string;
  codedSrc: string;
  alt: string;
  title: string;
  categoryName: string;
}) {
  const [current, setCurrent] = useState(src);
  const [text, setText] = useState(false);
  function fail() {
    // Coded file first. The same graphic, or no coded file, becomes the category name.
    if (codedSrc && current !== codedSrc) setCurrent(codedSrc);
    else setText(true);
  }
  if (text) {
    return (
      <div data-fleet-text-banner="" role="img" aria-label={alt} title={title}>
        {categoryName}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      title={title}
      ref={(node) => {
        // A sheet image can 404 before hydration attaches onError.
        if (node?.complete && node.naturalWidth === 0) queueMicrotask(fail);
      }}
      onError={fail}
    />
  );
}

function bannerById(banners: ResolvedBanner[], id: ResolvedBanner["id"]): ResolvedBanner {
  return banners.find((banner) => banner.id === id) ?? CODED_BANNERS.find((banner) => banner.id === id)!;
}

/** Sheet overrides. A broken image falls back to the coded file, then the category name. */
function SheetHomepageBanners({ banners, showCigs }: { banners: ResolvedBanner[]; showCigs: boolean }) {
  const weed = bannerById(banners, "weed");
  const vapes = bannerById(banners, "vapes");
  const cigarettes = bannerById(banners, "cigarettes");
  const premium = bannerById(banners, "premium-cigarettes");
  const showMix = showCigs && !cigarettes.hidden;
  const showPremium = showCigs && !premium.hidden;
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store announcements">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CODED_JSON_LD }} />
      <FlowerBogoStrip hero />
      {weed.hidden ? null : (
        <>
          <Link href={weed.href} data-exotic-tier-banner="" aria-label="Shop the Top Weed Tiers: Exotic Weed, Premium Weed, and AAA+ Weed">
            <SheetBannerImage src={weed.image} codedSrc={CODED_BANNERS[0].image} alt={weed.alt} title={weed.title} categoryName={weed.categoryName} />
          </Link>
          <p data-top-tier-lanes="" data-free-gram-line="">{weed.textBar}</p>
          <p data-top-tier-lanes="">TOP WEED TIERS · EXOTIC WEED · PREMIUM WEED · AAA+ WEED</p>
        </>
      )}
      {vapes.hidden ? null : (
        <>
          <Link href={vapes.href} data-vape-banner="" aria-label="Shop nicotine vapes and THC vapes at St Clair Cannabis">
            <SheetBannerImage src={vapes.image} codedSrc={CODED_BANNERS[1].image} alt={vapes.alt} title={vapes.title} categoryName={vapes.categoryName} />
          </Link>
          <p data-top-tier-lanes="" data-vape-banner-bar="">{vapes.textBar}</p>
        </>
      )}
      {showCigs ? <CigaretteSeasonalNotice /> : null}
      {showMix ? <p data-cigarette-deal="">CIGARETTE DEAL ! 2 PACK $5 MIX AND MATCH</p> : null}
      {showPremium ? <p data-bb-light-deal="">EXCLUSIVE SPECIAL PREMIUM GRADE BB FULL, BB LIGHT &amp; BELMONT KING SIZE!</p> : null}
      {showMix ? (
        <>
          <Link href={cigarettes.href} data-cig-mix-banner="" aria-label="Shop cigarette mix-and-match deals">
            <SheetBannerImage src={cigarettes.image} codedSrc={CODED_BANNERS[2].image} alt={cigarettes.alt} title={cigarettes.title} categoryName={cigarettes.categoryName} />
          </Link>
          <p data-cigarette-deal="" data-cig-banner-bar="">{cigarettes.textBar}</p>
        </>
      ) : null}
      {showPremium ? (
        <>
          <Link href={premium.href} data-bb-premium-banner="" aria-label="Shop BB and Belmont Premium Grade cigarettes">
            <SheetBannerImage src={premium.image} codedSrc={CODED_BANNERS[3].image} alt={premium.alt} title={premium.title} categoryName={premium.categoryName} />
          </Link>
          <p data-top-tier-lanes="" data-bb-banner-bar="">{premium.textBar}</p>
          <Link href={premium.href} data-belmont-mix-match-banner="" aria-label="BELMONT KING SIZE $10 - 2PACK BB $5 MIX & MATCH">
            <span data-belmont-offer-lead="">BELMONT KING SIZE $10 -</span>
            <span data-belmont-offer-tail=""> 2PACK BB $5 MIX &amp; MATCH</span>
          </Link>
        </>
      ) : null}
    </aside>
  );
}

function CodedHomepageBanners() {
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store announcements">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CODED_JSON_LD }} />
      <FlowerBogoStrip hero />
      <Link href="/exotic-weed" data-exotic-tier-banner="" aria-label="Shop the Top Weed Tiers: Exotic Weed, Premium Weed, and AAA+ Weed">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/top-weed-tier-stc01.png" alt="TOP WEED TIER at St Clair Cannabis" title="St Clair Cannabis top weed tiers - Exotic, Premium and AAA+" />
      </Link>
      <p data-top-tier-lanes="" data-free-gram-line="">TOP 3 TIERS ONLY (EXOTIC, PREMIUM, AAA+): BUY 2G GET 1G FREE · BUY 3G GET 3G FREE (6G)</p>
      <p data-top-tier-lanes="">TOP WEED TIERS · EXOTIC WEED · PREMIUM WEED · AAA+ WEED</p>
      <Link href="/items/vapes" data-vape-banner="" aria-label="Shop nicotine vapes and THC vapes at St Clair Cannabis">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/banners/st-clair-vapes-nicotine-thc.webp" alt="Nicotine vapes and THC vapes at St Clair Cannabis Dispensary in St Clair West. Adults 19+." title="St Clair Cannabis nicotine vapes and THC vapes" />
      </Link>
      <p data-top-tier-lanes="" data-vape-banner-bar="">NICOTINE VAPES + THC VAPES</p>
      <CigaretteSeasonalNotice />
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

export default function FleetAnnouncementBanner() {
  const fleet = useFleetContent();
  const showCigs = useCigaretteState().web;
  const banners = fleet.banners.length ? fleet.banners : CODED_BANNERS;
  if (bannersMatchCoded(banners) && showCigs) return <CodedHomepageBanners />;
  return <SheetHomepageBanners banners={banners} showCigs={showCigs} />;
}
