import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { gbpLocation } from "../gbp-location.ts";
import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "STC01";
export const FLEET_STORE_NAME = "St Clair Cannabis";
export const FLEET_AREA = FULL_NAME_NAP.neighbourhood;
export const FLEET_DOMAIN = "stclaircannabis.com";
export const FLEET_DOMAINS = ["stclaircannabis.com", "www.stclaircannabis.com"] as const;
export const FLEET_ORIGIN = "https://stclaircannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
} as const;

/** Digits or formatted numbers. An article containing any of these is dropped. */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Coded resource URLs. A fleet article with the same slug is omitted. */
export const CODED_RESOURCE_LINKS = [
  {
    slug: "weed-flower-guide",
    title: "Weed & Cannabis Flower Guide",
    href: "/resources/weed-flower-guide",
  },
] as const;

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fort York Cannabis takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

export const CODED_NAP: Nap = {
  name: FULL_NAME_NAP.fullName,
  street: FULL_NAME_NAP.street,
  city: FULL_NAME_NAP.city,
  province: FULL_NAME_NAP.region,
  postalCode: FULL_NAME_NAP.postal,
  cityLine: `${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`,
  area: FLEET_AREA,
  intersection: FULL_NAME_NAP.intersection,
  areaLine: "St Clair West, Toronto",
  phoneDisplay: FULL_NAME_NAP.phoneDisplay,
  phoneTel: "+14377832483",
  hours: FULL_NAME_NAP.hours,
  mapsSearchUrl: FULL_NAME_NAP.mapsUrl,
  mapsEmbedUrl: gbpLocation.mapEmbedUrl,
  lat: gbpLocation.latitude,
  lng: gbpLocation.longitude,
  schemaName: FULL_NAME_NAP.fullName,
  website: "https://stclaircannabis.com",
};

export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic-weed",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/top-weed-tier-stc01.png",
    codedImage: "/banners/top-weed-tier-stc01.png",
    alt: "TOP WEED TIER at St Clair Cannabis",
    title: "St Clair Cannabis top weed tiers - Exotic, Premium and AAA+",
    textBar: "TOP 3 TIERS ONLY (EXOTIC, PREMIUM, AAA+): BUY 2G GET 1G FREE · BUY 3G GET 3G FREE (6G)",
    caption: "TOP 3 TIERS ONLY (EXOTIC, PREMIUM, AAA+): BUY 2G GET 1G FREE · BUY 3G GET 3G FREE (6G)",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/st-clair-vapes-nicotine-thc.webp",
    codedImage: "/banners/st-clair-vapes-nicotine-thc.webp",
    alt: "Nicotine vapes and THC vapes at St Clair Cannabis Dispensary in St Clair West. Adults 19+.",
    title: "St Clair Cannabis nicotine vapes and THC vapes",
    textBar: "NICOTINE VAPES + THC VAPES",
    caption: "NICOTINE VAPES + THC VAPES",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/2pack5cig.webp",
    codedImage: "/banners/2pack5cig.webp",
    alt: "Cigarette mix-and-match offer at St Clair Cannabis. Adults 19+.",
    title: "St Clair Cannabis cigarette offer - 2 packs $5 mix and match, $25 carton",
    textBar: "2 PACKS $5 / $25 CARTON",
    caption: "2 PACKS $5 / $25 CARTON",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/BB_Belmont_Premium_Grade.webp",
    codedImage: "/banners/BB_Belmont_Premium_Grade.webp",
    alt: "BB Full, BB Lights, and Belmont King Size cigarette banner at St Clair Cannabis. Adults 19+.",
    title: "St Clair Cannabis premium cigarettes - BB Full, BB Lights, Marlboro and Belmont",
    textBar: "BB FULL FLAVOR + LIGHTS 2 PACKS $5 · MARLBORO & BELMONT $10/PACK",
    caption: "BB FULL FLAVOR + LIGHTS 2 PACKS $5 · MARLBORO & BELMONT $10/PACK",
  },
];

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: "Explore Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed flower collections at St Clair Cannabis in Toronto. Open 24 Hours.",
    metaTitle: "",
    metaDescription: "Explore Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed flower collections at St Clair Cannabis in Toronto. Open 24 Hours.",
  },
  Contact: {
    description: "Visit St Clair Cannabis at 875 St Clair Ave W, Toronto, ON M6C 1C4. We are open 24 hours a day, 7 days a week. Walk-ins welcome.",
    metaTitle: "Contact Us — St Clair Cannabis | 875 St Clair Ave W, Toronto",
    metaDescription: "Visit St Clair Cannabis at 875 St Clair Ave W, Toronto, ON M6C 1C4. We are open 24 hours a day, 7 days a week. Walk-ins welcome.",
  },
};
