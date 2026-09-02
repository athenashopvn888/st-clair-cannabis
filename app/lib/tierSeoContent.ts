/* Store-specific, non-volatile copy for the five Weed flower collections. */

export interface TierSeoData {
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

function tierCopy(name: string): TierSeoData {
  return {
    seoTitle: `${name} & Cannabis Flower Toronto | St Clair Cannabis`,
    seoIntro: `Explore the ${name} flower collection presented by St Clair Cannabis. Use the current menu details shown with each selection while you browse.`,
    sections: [
      {
        heading: `Browse ${name} in Toronto`,
        body: `${name} is one of five Weed flower collections at St Clair Cannabis. Compare the selections currently presented in this collection with Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed.`,
      },
      {
        heading: "Choose from the current menu",
        body: "Each product card presents the details available for that selection. Open a product to review its current information before visiting the store.",
      },
    ],
    faqs: [
      {
        q: `What is the ${name} collection?`,
        a: `${name} is one of the five Weed flower collections used to organize the St Clair Cannabis menu. Browse the current collection for the details shown with each selection.`,
      },
      {
        q: `Where can I compare ${name} with other Weed tiers?`,
        a: "Use the St Clair Cannabis Weed & Flower Guide to move between all five flower collections.",
      },
    ],
  };
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: tierCopy("Exotic Weed"),
  PREMIUM: tierCopy("Premium Weed"),
  "AAA+": tierCopy("AAA+ Weed"),
  AA: tierCopy("AA Weed"),
  BUDGET: tierCopy("Budget Weed"),
};
