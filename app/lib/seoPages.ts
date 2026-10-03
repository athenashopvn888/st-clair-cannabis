/* Legacy-route content, corrected to the verified St Clair West storefront. */

export interface SeoPageData {
  slug: string; title: string; metaDescription: string; h1: string; icon: string;
  heroTagline: string; banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const locationAnswer = "St Clair Cannabis is at 875 St Clair Ave W, Toronto, ON M6C 1C4, in St Clair West near Wychwood and Corso Italia.";
const hoursAnswer = "The website posts Open 24 Hours. Check the homepage for any temporary notice before travelling and bring valid government-issued photo ID showing 19+.";
const currentBoard = "Use the current category and product pages as today’s board. Listings can rotate, so an evergreen guide is not a stock reservation.";

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "St Clair West Weed Dispensary | St Clair Cannabis",
    metaDescription: "Visit St Clair Cannabis at 875 St Clair Ave W. Browse five flower collections and separate edible, vape, concentrate, pre-roll, cigarette, and accessory menus. Adults 19+.",
    h1: "St Clair West Weed Dispensary", icon: "✨",
    heroTagline: "St Clair Avenue West · Open 24 Hours · Walk-In · Adults 19+",
    sections: [
      { heading: "A St Clair West walk-in", body: "St Clair Cannabis is the walk-in dispensary at 875 St Clair Ave W. The store’s established local corridor includes Wychwood, Corso Italia, Oakwood Village, Hillcrest, and the Casa Loma area. Use the visit page for address, phone, transit context, and current posted hours." },
      { heading: "Five flower collections", body: "Flower is organized into Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed. Each tier has its own current board and product-detail links. Compare the posted menu rather than treating an older screenshot as current inventory." },
      { heading: "Keep shopping lanes clear", body: "Edibles, pre-rolls, concentrates, accessories, Native Cigarettes, Nicotine Vape, and THC Vape use separate category routes. Nicotine is addictive. The nicotine shelf is not the THC vape shelf." },
    ],
    faqs: [
      { q: "Where is St Clair Cannabis located?", a: locationAnswer }, { q: "What hours are posted?", a: hoursAnswer },
      { q: "How do I check the menu?", a: currentBoard }, { q: "Who can enter?", a: "Adults 19+ with valid government-issued photo ID." },
    ],
  },
  {
    slug: "cheap-weed-york",
    title: "Budget Weed in St Clair West | St Clair Cannabis",
    metaDescription: "Compare the current Budget Weed and AA Weed boards at St Clair Cannabis on St Clair Avenue West. Posted menu details control; adults 19+.",
    h1: "Budget Weed in St Clair West", icon: "💰",
    heroTagline: "Budget Weed · AA Weed · Current Menu Details · Adults 19+",
    sections: [
      { heading: "Start with the Budget Weed board", body: "The Budget Weed route is the stable place to compare current lower-tier flower listings at St Clair Cannabis. Product cards show the details presently published by the store. Selection, package choices, and posted amounts can change." },
      { heading: "Compare the full flower ladder", body: "Use Budget Weed and AA Weed for the lower tiers, then compare AAA+ Weed, Premium Weed, and Exotic Weed. The tier structure helps shoppers stay within a menu lane without making quality, potency, or outcome guarantees." },
      { heading: "Plan a St Clair West visit", body: "The walk-in is at 875 St Clair Ave W near Wychwood and Corso Italia. If one exact listing is the reason for the trip, open its current product page immediately before travelling or call the store." },
    ],
    faqs: [
      { q: "Where is the Budget Weed menu?", a: "Open /budget-weed for today’s published Budget Weed board." },
      { q: "Can I compare other tiers?", a: "Yes. AA Weed, AAA+ Weed, Premium Weed, and Exotic Weed each have separate menu routes." },
      { q: "Does this page guarantee stock?", a: currentBoard }, { q: "Where is the store?", a: locationAnswer },
    ],
  },
  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes in St Clair West | St Clair Cannabis",
    metaDescription: "Adult Native Cigarettes category guide for St Clair Cannabis at 875 St Clair Ave W. Check the current cigarette board for listed brands and pack styles. Adults 19+.",
    h1: "Native Cigarettes in St Clair West", icon: "🏷️",
    heroTagline: "Adult Tobacco · Current Cigarette Board · Open 24 Hours",
    sections: [
      { heading: "The adult tobacco lane", body: "St Clair Cannabis lists Native Cigarettes on a separate cigarette category page. This is adult tobacco information, not cannabis or vape advice. Brand names and pack styles can rotate, so use the current category and package label." },
      { heading: "Full, lights, silver, and menthol labels", body: "One brand name can cover different package labels. Read the current item page and physical package rather than inferring a format from a guide title. Adults 19+ only." },
      { heading: "St Clair West walk-in", body: "The cigarette category is available through the same storefront at 875 St Clair Ave W. Use the visit page for St Clair Avenue West transit and parking context, or call before travelling for one exact name." },
    ],
    faqs: [
      { q: "Does St Clair Cannabis list Native Cigarettes?", a: "Yes. Use /items/cigarettes for the current website board." },
      { q: "Are cigarette brands always available?", a: currentBoard },
      { q: "Are cigarettes and cannabis the same category?", a: "No. Adult tobacco, cannabis flower, Nicotine Vape, and THC Vape remain separate shopping lanes." },
      { q: "Where is the store?", a: locationAnswer },
    ],
  },
  {
    slug: "weed-store-near-toronto",
    title: "Weed Store in St Clair West, Toronto | St Clair Cannabis",
    metaDescription: "Local walk-in guide for St Clair Cannabis at 875 St Clair Ave W, near Wychwood, Corso Italia, Oakwood Village, and Hillcrest. Adults 19+.",
    h1: "Weed Store in St Clair West, Toronto", icon: "📍",
    heroTagline: "875 St Clair Ave W · 512 Streetcar Corridor · Adults 19+",
    sections: [
      { heading: "Local to St Clair Avenue West", body: "St Clair Cannabis is on St Clair Avenue West in Toronto. The established neighbourhood context is Wychwood, Corso Italia, Oakwood Village, Hillcrest, and Midtown West. This page does not claim a travel time or invent a second service area." },
      { heading: "Transit and walk-in planning", body: "The 512 St Clair streetcar and local TTC routes serve the corridor. Street parking is available along St Clair Avenue West, but availability at a particular moment is not guaranteed. Use /visit for the current store details." },
      { heading: "Browse before travelling", body: "Start from the five flower tiers or open the category you need. The website separates Nicotine Vape from THC Vape and connects stock-backed names to guide pages. Check today’s board when one exact item matters." },
    ],
    faqs: [
      { q: "What neighbourhood is the store in?", a: "The store is in St Clair West, with local context including Wychwood, Corso Italia, Oakwood Village, and Hillcrest." },
      { q: "Is there TTC access?", a: "The 512 St Clair streetcar and local TTC routes serve the St Clair Avenue West corridor." },
      { q: "What hours are posted?", a: hoursAnswer }, { q: "How do I check current listings?", a: currentBoard },
    ],
  },
  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary in St Clair West | St Clair Cannabis",
    metaDescription: "Find the St Clair Cannabis walk-in at 875 St Clair Ave W. Browse current menu lanes, plan a visit, and bring government-issued photo ID. Adults 19+.",
    h1: "Cannabis Dispensary in St Clair West", icon: "🗺️",
    heroTagline: "Walk-In · Open 24 Hours · St Clair West · Adults 19+",
    sections: [
      { heading: "Use the verified storefront", body: "The store name, address, phone, and posted hours are consolidated on the homepage and visit page. St Clair Cannabis has one walk-in at 875 St Clair Ave W; this route does not create another location." },
      { heading: "Choose the right menu lane", body: "Use a flower tier for cannabis flower, /items/cigarettes for Native Cigarettes, /items/vapes for Nicotine Vape, and /items/vape-disposables for THC Vape. Clear routing avoids cross-category assumptions." },
      { heading: "Check before the trip", body: "Product and category pages contain the current website listing. Guides provide evergreen context and soft out-of-stock routing, but they do not promise shelf quantity, potency, price, or reservation." },
    ],
    faqs: [
      { q: "Where is the St Clair West dispensary?", a: locationAnswer },
      { q: "Can adults walk in without an appointment?", a: "The current site describes a walk-in. Adults 19+ should bring valid government-issued photo ID." },
      { q: "What hours are posted?", a: hoursAnswer }, { q: "Does a guide guarantee availability?", a: currentBoard },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
