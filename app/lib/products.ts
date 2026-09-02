/* -- Product & Item Types -- */
export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: "indica" | "sativa" | "hybrid";
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
}

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
}

/* ── Data imports (static fallback) ── */
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";

export const allFlowers: FlowerProduct[] = flowersJson as FlowerProduct[];
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

/* ── Live stock fetch from Apps Script ── */
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";

interface LiveStockResponse {
  flowers: FlowerProduct[];
  items: ItemProduct[];
  storeCode?: string;
  stockDate?: string;
}

/**
 * Fetch live stock-filtered products from Apps Script endpoint.
 * Used at build time (getStaticProps / generateStaticParams).
 * Falls back to static JSON if endpoint not configured.
 */
export async function fetchLiveProducts(): Promise<{
  flowers: FlowerProduct[];
  items: ItemProduct[];
  isLive: boolean;
  stockDate: string | null;
}> {
  if (!APPS_SCRIPT_URL) {
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?store=STC01`, {
      next: { revalidate: 300 }, // Cache for 5 min during build
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: LiveStockResponse = await res.json();
    return {
      flowers: data.flowers || allFlowers,
      items: data.items || allItems,
      isLive: true,
      stockDate: data.stockDate || null,
    };
  } catch (err) {
    console.warn("[products] Live fetch failed, using static data:", err);
    return { flowers: allFlowers, items: allItems, isLive: false, stockDate: null };
  }
}

export const TIER_CONFIG: Record<
  string,
  {
    name: string; slug: string; color: string; icon: string; tagline: string; banner: string;
    unitPrice: number; /* $/g */
    deal3g: { label: string; total: string; price: number } | null; /* 3g bundle pricing */
    deal6g: { label: string; total: string; price: number } | null; /* 6g bundle pricing (top 3 only) */
  }
> = {
  EXOTIC: {
    name: "Exotic Weed",
    slug: "exotic-weed",
    color: "#f59e0b",
    icon: "\uD83D\uDD25",
    tagline: "Explore the current Exotic Weed flower collection",
    banner: "/banners/exotics_banner.webp",
    unitPrice: 20,
    deal3g: { label: "3g bundle", total: "3G", price: 40 },
    deal6g: { label: "6g bundle", total: "6G", price: 60 },
  },
  PREMIUM: {
    name: "Premium Weed",
    slug: "premium-weed",
    color: "#a78bfa",
    icon: "\uD83D\uDC8E",
    tagline: "Explore the current Premium Weed flower collection",
    banner: "/banners/premium_banner.webp",
    unitPrice: 15,
    deal3g: { label: "3g bundle", total: "3G", price: 30 },
    deal6g: { label: "6g bundle", total: "6G", price: 45 },
  },
  "AAA+": {
    name: "AAA+ Weed",
    slug: "aaa-weed",
    color: "#22d3ee",
    icon: "\u26A1",
    tagline: "Explore the current AAA+ Weed flower collection",
    banner: "/banners/aaa_plus_banner.webp",
    unitPrice: 10,
    deal3g: { label: "3g bundle", total: "3G", price: 20 },
    deal6g: { label: "6g bundle", total: "6G", price: 30 },
  },
  AA: {
    name: "AA Weed",
    slug: "aa-weed",
    color: "#34d399",
    icon: "\u2726",
    tagline: "Explore the current AA Weed flower collection",
    banner: "/banners/aa_banner.webp",
    unitPrice: 4,
    deal3g: null,
    deal6g: null,
  },
  BUDGET: {
    name: "Budget Weed",
    slug: "budget-weed",
    color: "#94a3b8",
    icon: "\uD83D\uDCB0",
    tagline: "Explore the current Budget Weed flower collection",
    banner: "/banners/budget_banner.webp",
    unitPrice: 3,
    deal3g: { label: "$10 / 3g Special", total: "3G", price: 10 },
    deal6g: null,
  },
};

/* ── Item category config ── */
export interface CategoryInfo {
  name: string; slug: string; color: string; icon: string; banner?: string;
  seoTitle: string; seoIntro: string; seoDescription: string;
  faqs: { q: string; a: string }[];
}

export const CATEGORY_CONFIG: Record<string, CategoryInfo> = {
  EDIBLES: {
    banner: "/banners/edibles_prerolls_more_banner.webp",
    name: "Edibles", slug: "edibles", color: "#f97316", icon: "🍬",
    seoTitle: "Cannabis Edibles Toronto — Gummies, Chocolates & Drinks",
    seoIntro: "Browse the full cannabis edibles menu at St Clair Cannabis on Toronto St, Toronto. We carry THC gummies, chocolates, drinks, and more from top Canadian brands.",
    seoDescription: "Looking for cannabis edibles in Toronto? St Clair Cannabis stocks a wide range of THC-infused gummies, chocolates, beverages, and baked goods. Our edibles range from micro-dose options for beginners to high-potency products for experienced consumers. All products are lab-tested and sourced from licensed Canadian producers. Visit us at 875 St Clair Ave W — we are Open 24 Hours.",
    faqs: [
      { q: "What cannabis edibles do you carry?", a: "We stock THC gummies, chocolates, beverages, capsules, and baked goods from top Canadian brands. Potencies range from 10mg to 1000mg+ THC." },
      { q: "How long do edibles take to kick in?", a: "Cannabis edibles typically take 30-90 minutes to take effect. Start with a low dose (5-10mg) and wait at least 2 hours before consuming more." },
      { q: "Can I buy edibles at St Clair Cannabis?", a: "Yes! Visit us at 875 St Clair Ave W, Toronto. We're open 24 hours a day, 7 days a week with a full edibles selection in store." },
    ],
  },
  "VAPE PENS": {
    banner: "/banners/01_Vape_Pens.webp",
    name: "Nicotine Vape", slug: "vapes", color: "#8b5cf6", icon: "💨",
    seoTitle: "Nicotine Vapes Toronto | St Clair Cannabis",
    seoIntro: "Browse the nicotine vape category shown by St Clair Cannabis.",
    seoDescription: "Explore the nicotine vape products presented in this category. Check the current product details shown while you browse.",
    faqs: [
      { q: "What is shown in this category?", a: "This category is for nicotine vape products. Check the current product details shown while you browse." },
    ],
  },
  "VAPE DISPOSABLE": {
    banner: "/banners/02_Vape_Disposable.webp",
    name: "THC Vape", slug: "vape-disposables", color: "#a78bfa", icon: "💨",
    seoTitle: "THC Vapes Toronto | St Clair Cannabis",
    seoIntro: "Browse the THC vape category shown by St Clair Cannabis.",
    seoDescription: "Explore the THC vape products presented in this category. Check the current product details shown while you browse.",
    faqs: [
      { q: "What is shown in this category?", a: "This category is for THC vape products. Check the current product details shown while you browse." },
    ],
  },
  CONCENTRATES: {
    banner: "/banners/03_Concentrates.webp",
    name: "Concentrates", slug: "concentrates", color: "#f59e0b", icon: "💎",
    seoTitle: "Cannabis Concentrates Toronto — Shatter, Wax, Hash & Live Resin",
    seoIntro: "Premium cannabis concentrates at St Clair Cannabis, Toronto. Shatter, wax, hash, live resin, and diamonds — all in stock.",
    seoDescription: "St Clair Cannabis offers a premium selection of cannabis concentrates in Toronto. From traditional hash and kief to modern extracts like shatter, wax, live resin, and THC diamonds, we carry products for every preference and potency level. Our concentrates are sourced from trusted extractors and tested for purity. Visit us at 875 St Clair Ave W.",
    faqs: [
      { q: "What types of concentrates do you carry?", a: "We stock shatter, wax, budder, live resin, rosin, hash, kief, and THC diamonds from top Canadian extractors." },
      { q: "How do I consume concentrates?", a: "Concentrates can be dabbed with a rig, vaped with a concentrate pen, or added to flower in a joint or bowl for extra potency." },
    ],
  },
  PREROLLS: {
    banner: "/banners/04_Pre_Rolls.webp", name: "Pre-Rolls", slug: "prerolls", color: "#22c55e", icon: "🚬",
    seoTitle: "Pre-Rolls Toronto — Ready-to-Smoke Cannabis Joints",
    seoIntro: "Pre-rolled cannabis joints at St Clair Cannabis, Toronto. Singles, multi-packs, and infused pre-rolls — ready to light up.",
    seoDescription: "Skip the rolling and grab a pre-roll from St Clair Cannabis in Toronto. We carry singles, multi-packs, and infused pre-rolls from premium flower. Whether you want a quick smoke or a party pack, our pre-roll selection has something for everyone. Visit us at 875 St Clair Ave W — we are Open 24 Hours.",
    faqs: [
      { q: "What pre-rolls do you carry?", a: "We stock singles, 3-packs, and multi-packs in various strains and potencies, including infused pre-rolls with concentrates." },
      { q: "Are your pre-rolls made with quality flower?", a: "Yes! Our pre-rolls are filled with ground flower from our regular menu tiers — not shake or trim." },
    ],
  },
  "ADD ONS": {
    banner: "/banners/05_Accessories.webp",
    name: "Accessories", slug: "add-ons", color: "#34d399", icon: "➕",
    seoTitle: "Cannabis Accessories Toronto — Grinders, Papers, Lighters & More",
    seoIntro: "Essential cannabis accessories at St Clair Cannabis, Toronto. Grinders, rolling papers, lighters, trays, and more.",
    seoDescription: "St Clair Cannabis carries all the accessories you need for the perfect smoke session. From premium grinders and rolling papers to lighters, trays, and storage containers, we have everything in stock. Visit us at 875 St Clair Ave W, Toronto.",
    faqs: [
      { q: "What accessories do you sell?", a: "We carry grinders, rolling papers, filter tips, lighters, rolling trays, storage jars, and more." },
    ],
  },
  "MAGIC & OTHERS": {
    name: "Magic Stuff", slug: "magic", color: "#64748b", icon: "*",
    seoTitle: "Magic Stuff - Specialty Items",
    seoIntro: "Browse current menu for available specialty products. Availability may vary by store.",
    seoDescription: "Current specialty items are listed when they are carried on the menu. Product availability may vary by store and by day. Check the live menu for current selection.",
    faqs: [
      { q: "What specialty items are available?", a: "Selection varies by store and by day. Check the current menu for available specialty products." },
      { q: "Does availability vary by location?", a: "Yes. Specialty item availability may vary by store, so please check the current menu for this location." },
    ],
  },
  CIGARETTES: {
    banner: "/banners/06_Cigarettes.webp",
    name: "Cigarettes", slug: "cigarettes", color: "#78716c", icon: "🏷️",
    seoTitle: "Native Cigarettes Toronto — Discount Tobacco at St Clair Cannabis",
    seoIntro: "Discount native cigarettes at St Clair Cannabis, Toronto. Premium and value brands at the best prices on Toronto St.",
    seoDescription: "St Clair Cannabis is your go-to source for affordable native cigarettes in Toronto. We carry a wide selection of premium and value tobacco brands at competitive prices. Located at 875 St Clair Ave W in the heart of 875 St Clair Ave W & Nearby Expressway, we're Open 24 Hours.",
    faqs: [
      { q: "Do you sell cigarettes at St Clair Cannabis?", a: "Yes! We carry a wide selection of native cigarette brands at competitive prices." },
      { q: "What cigarette brands do you carry?", a: "We stock a variety of premium and value native cigarette brands. Visit us to see our full in-store selection." },
      { q: "Are your cigarette prices competitive?", a: "Absolutely. We offer some of the best cigarette prices in the 875 St Clair Ave W & Nearby Expressway area of Toronto." },
    ],
  },
};

/* ── Helper functions ── */
export function getFlowersByTier(tier: string): FlowerProduct[] {
  return allFlowers.filter(
    (f) => f.tier.toUpperCase() === tier.toUpperCase()
  );
}

export function getFlowerBySlug(slug: string): FlowerProduct | undefined {
  return allFlowers.find((f) => f.slug === slug);
}

export function getItemsByCategory(category: string): ItemProduct[] {
  return allItems.filter(
    (i) => i.category.toUpperCase() === category.toUpperCase()
  );
}

export function getTierFromSlug(
  slug: string
): { key: string; config: (typeof TIER_CONFIG)[string] } | undefined {
  const entry = Object.entries(TIER_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getCategoryFromSlug(
  slug: string
): { key: string; config: (typeof CATEGORY_CONFIG)[string] } | undefined {
  const entry = Object.entries(CATEGORY_CONFIG).find(
    ([, v]) => v.slug === slug
  );
  if (!entry) return undefined;
  return { key: entry[0], config: entry[1] };
}

export function getLowestPrice(flower: FlowerProduct): number | null {
  const prices = [flower.price3g, flower.price5g, flower.price14g, flower.price28g]
    .filter((p): p is PricePoint => p !== null)
    .map((p) => p.sale ?? p.regular);
  return prices.length ? Math.min(...prices) : null;
}

export function formatPrice(p: PricePoint | null): string {
  if (!p) return "—";
  if (p.sale !== null) return `$${p.sale}`;
  return `$${p.regular}`;
}
