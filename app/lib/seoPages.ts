/* ── Geo-targeted SEO landing pages for Toronto/Weston keywords ── */

export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "Toronto Weed Dispensary — St Clair Cannabis | Open 24 Hours | 875 St Clair Ave W & Nearby Expressway",
    metaDescription: "St Clair Cannabis is Toronto's premier weed dispensary at 875 St Clair Ave W near Weston. 200+ strains, THC up to 39%, edibles, vapes, concentrates & more. We are open 24 hours a day, 7 days a week.",
    h1: "Toronto Weed Dispensary — St Clair Cannabis",
    icon: "✨",
    heroTagline: "Premium Cannabis on 875 St Clair Ave W & Nearby Expressway · Open 24 Hours · Walk-In Welcome",
    banner: "",
    sections: [
      {
        heading: "Toronto's Premier Cannabis Destination",
        body: "St Clair Cannabis is a premium cannabis dispensary located at 875 St Clair Ave W in the heart of Toronto's vibrant 875 St Clair Ave W & Nearby Expressway area. We carry over 200 hand-picked cannabis strains across five quality tiers — from ultra-rare Exotic genetics with THC up to 39% to affordable Budget flower starting at just $3/g. Whether you're a connoisseur seeking the rarest strains or a daily smoker looking for reliable value, St Clair Cannabis has the perfect flower for you. We're proud to be one of Toronto's most trusted dispensaries, and we are Open 24 Hours.",
      },
      {
        heading: "Five Tiers of Quality Cannabis — Transparent Pricing",
        body: "Our unique tier system ensures transparent pricing and quality grading so you always know what you're getting. Exotic ($10-$12/g) features top-shelf, ultra-rare genetics with THC levels reaching 35-39% — these are the strains connoisseurs travel across Toronto to find. Premium ($7-$10/g) offers connoisseur-grade strains at THC 32-34%, balancing quality and value. AAA+ ($5-$6/g) delivers heavy hitters at THC 30-32% — our most popular tier for experienced users. AA ($4/g) provides quality daily drivers at THC 27-29%, perfect for regular consumption. Budget ($3/g) offers value ounces from $40 without sacrificing reliability. Every tier is lab-tested, properly cured, and freshly rotated.",
      },
      {
        heading: "Beyond Flower — Edibles, Vapes, Concentrates & More",
        body: "St Clair Cannabis is more than just a flower shop. We carry a comprehensive selection of cannabis edibles (gummies, chocolates, baked goods), vape pens and disposable vapes, concentrates (shatter, wax, hash, diamonds, live resin), pre-rolled joints, magic mushrooms, native cigarettes, rolling papers, and accessories. Our live digital menu at stclaircannabis.com updates in real time so you always know exactly what's in stock before you make the trip.",
      },
      {
        heading: "Open 24 Hours on 875 St Clair Ave W & Nearby Expressway",
        body: "At St Clair Cannabis, we make it convenient for you. We are Open 24 Hours, 365 days a year. Whether you're finishing a late shift, heading out for the night, or need an early morning pickup, we are ready to serve you. We're centrally located at 875 St Clair Ave W, near major transit bus routes, close to major highways and central stations. Free street parking is available near the dispensary.",
      },
      {
        heading: "Unbeatable Promotions on Every Purchase",
        body: "Every purchase at St Clair Cannabis comes with our signature promotions. Our Buy 2g Get 1g FREE deal applies to every single tier — you always get a bonus gram. Our top three tiers (Exotic, Premium, and AAA+) also qualify for Buy 3g Get 3g FREE, effectively doubling your order. Combined with our already competitive pricing, St Clair Cannabis offers some of the best cannabis value in Toronto, Toronto, and the surrounding area.",
      },
      {
        heading: "Serving Toronto, Toronto & Mississauga",
        body: "St Clair Cannabis proudly serves customers from across the Greater Toronto Area. Whether you're coming from Weston, Mount Dennis, North Toronto, Etobicoke, Mississauga, Brampton, or downtown Toronto, we welcome you. Call us at (437) 595-3295 or visit us at 875 St Clair Ave W, Toronto, ON M6C 1C4.",
      },
    ],
    faqs: [
      { q: "Where is St Clair Cannabis located?", a: "We are located at 875 St Clair Ave W, Toronto, ON M6C 1C4 — in the heart of 875 St Clair Ave W & Nearby Expressway area — one of Toronto's most accessible areas. We're near major transit bus routes and close to major highways." },
      { q: "What are the hours for St Clair Cannabis?", a: "We are open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed. Whether it's day or night, our staff is here to help." },
      { q: "What cannabis products does St Clair Cannabis carry?", a: "We carry 200+ strains of cannabis flower across 5 quality tiers (Exotic, Premium, AAA+, AA, Budget), plus edibles, vapes, concentrates, pre-rolls, magic mushrooms, native cigarettes, and accessories. Our menu updates in real time online." },
      { q: "What is the cheapest weed at St Clair Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. Our AA tier is $4/g. Every tier includes our Buy 2g Get 1g FREE promotion, making our prices even more competitive." },
      { q: "Does St Clair Cannabis have a live menu?", a: "Yes! Our online menu at stclaircannabis.com updates in real time with current stock, prices, and availability. You can see exactly what we have before you visit." },
      { q: "What makes St Clair Cannabis different from other Toronto dispensaries?", a: "Three things set us apart: (1) we are open 24 hours a day, 7 days a week, (2) our transparent 5-tier pricing system means no confusing markups, and (3) every purchase includes our Buy 2g Get 1g FREE promotion. Plus we carry one of Toronto's largest selections with over 200 strains." },
      { q: "Can I check stock before visiting?", a: "Absolutely. Visit stclaircannabis.com to see our live menu. All flower, edibles, vapes, and accessories are listed with real-time stock status, THC levels, and pricing." },
      { q: "Is there parking near St Clair Cannabis?", a: "Yes. Free street parking is available nearby and surrounding residential streets. We're also easily accessible via local transit." },
    ],
  },

  {
    slug: "cheap-weed-york",
    title: "Cheap Weed Toronto — Budget Cannabis Deals From $3/g | St Clair Cannabis",
    metaDescription: "Looking for cheap weed in Toronto? St Clair Cannabis has budget flower from $3/g, ounces from $40, and Buy 2g Get 1g FREE promos. We are Open 24 Hours at 875 St Clair Ave W.",
    h1: "Cheap Weed Toronto — Budget Cannabis Deals",
    icon: "💰",
    heroTagline: "Budget Flower From $3/g · Ounces From $40 · Open 24 Hours",
    banner: "",
    sections: [
      {
        heading: "Toronto's Best Prices on Quality Cannabis",
        body: "Looking for cheap weed in Toronto without sacrificing quality? St Clair Cannabis offers some of the most competitive cannabis prices in the city. Our Budget tier starts at just $3/g with value ounces from $40. Our AA tier ($4/g) and AAA+ tier ($5-$6/g) also deliver incredible value with THC levels from 27% to 32%. We believe great cannabis shouldn't break the bank, and our transparent tier-based pricing ensures you always get exactly what you pay for — no hidden markups, no gimmicks.",
      },
      {
        heading: "Unbeatable Promotions That Stack",
        body: "Every tier at St Clair Cannabis comes with our signature Buy 2g Get 1g FREE promotion — meaning you always get a free gram with every purchase. Our top three tiers (Exotic, Premium, AAA+) also offer Buy 3g Get 3g FREE, effectively doubling your order. When you combine our already low prices with these promos, St Clair Cannabis delivers the best cannabis value in Toronto. A $15 AAA+ 3g purchase actually gets you 3g of flower — that's just $5/g for THC 30%+ cannabis.",
      },
      {
        heading: "Budget Doesn't Mean Low Quality",
        body: "At St Clair Cannabis, cheap doesn't mean low quality. Every strain in our Budget and AA tiers delivers reliable potency (THC 24-29%) from trusted Canadian growers. We rotate our inventory frequently to ensure freshness and maintain our quality standards across all price points. Our Budget strains are perfect for rolling, sessions, or anyone who prefers value over premium aesthetics. Our AA tier is a step up — solid daily drivers with consistent effects.",
      },
      {
        heading: "Compare Our Prices",
        body: "Budget: $3/g — $40/oz. AA: $4/g — $90/oz. AAA+: $5-$6/g — $100/oz. Premium: $7-$10/g. Exotic: $10-$12/g. Every tier includes Buy 2g Get 1g FREE. Top tiers include Buy 3g Get 3g FREE. These are some of the lowest prices you'll find at any dispensary in Toronto, 875 St Clair Ave W & Nearby Expressway and surrounding areas.",
      },
    ],
    faqs: [
      { q: "What is the cheapest weed at St Clair Cannabis?", a: "Our Budget tier starts at $3/g with value ounces from $40. These are quality, properly-cured strains at Toronto's most competitive prices." },
      { q: "Do you have ounce deals?", a: "Yes! Budget ounces from $40, AA ounces from $90, AAA+ ounces from $100. All with excellent quality, freshness guaranteed, and Buy 2g Get 1g FREE promotions on top." },
      { q: "Is cheap weed still good quality?", a: "Absolutely. Our Budget flower delivers THC 24-27% from trusted Canadian growers. We never sell old, dry, or improperly stored flower. Every product meets our quality standards regardless of price point." },
      { q: "Where can I buy cheap weed in Toronto?", a: "St Clair Cannabis at 875 St Clair Ave W, Toronto. We are open 24 hours a day, 7 days a week, walk in anytime, no appointment needed. We're in the heart of 875 St Clair Ave W & Nearby Expressway area." },
      { q: "What promotions do you offer?", a: "Every tier includes Buy 2g Get 1g FREE (pay for 2g, get 3g). Our Exotic, Premium, and AAA+ tiers also offer Buy 3g Get 3g FREE (pay for 3g, get 6g). These promos apply on every visit." },
      { q: "Do you offer bulk discounts?", a: "Yes — our ounce pricing is deeply discounted compared to per-gram rates. Budget ounces are $40, AA ounces $90, and AAA+ ounces $100. The more you buy, the more you save." },
    ],
  },

  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes Toronto — Discount Tobacco | St Clair Cannabis",
    metaDescription: "Buy native cigarettes in Toronto at St Clair Cannabis. Wide selection of premium and value tobacco brands at the best prices. 875 St Clair Ave W, 875 St Clair Ave W & Nearby Expressway. We are Open 24 Hours.",
    h1: "Native Cigarettes Toronto — Discount Tobacco",
    icon: "🏷️",
    heroTagline: "Premium & Value Brands · Best Prices in Toronto · Open 24 Hours",
    banner: "",
    sections: [
      {
        heading: "Toronto's Best Selection of Native Cigarettes",
        body: "St Clair Cannabis carries one of the widest selections of native cigarettes in Toronto. Located at 875 St Clair Ave W near 875 St Clair Ave W & Nearby Expressway, we stock a comprehensive range of both premium and value native cigarette brands at competitive prices. Whether you prefer full-flavour, light, menthol, or specialty blends, our tobacco selection has something for every smoker. We're proud to be one of the few stores in Toronto that combines a full cannabis dispensary with a comprehensive tobacco counter — one stop for everything you need.",
      },
      {
        heading: "Why Toronto Smokers Choose St Clair Cannabis",
        body: "There are three reasons Toronto smokers keep coming back to St Clair Cannabis for their cigarettes. First, our prices are among the lowest in the 875 St Clair Ave W & Nearby Expressway area — we buy in volume and pass the savings to our customers. Second, our selection is comprehensive — we carry brands and varieties that many other shops simply don't stock. Third, we are open 24 hours a day, 7 days a week. Need cigarettes? Stop by during our hours: Open 24 Hours. No other tobacco shop in Toronto offers this level of convenience.",
      },
      {
        heading: "Convenient 875 St Clair Ave W & Nearby Expressway Location",
        body: "Our shop at 875 St Clair Ave W is centrally located in Toronto — easily accessible from Weston Rd, Lawrence Ave W, Highway 401, and all major Peel/Toronto routes. Whether you're walking, driving, or taking the bus, St Clair Cannabis is easy to reach. Free evening street parking is available nearby. We serve customers from across Toronto including 875 St Clair Ave W & Nearby Expressway and surrounding areas.",
      },
      {
        heading: "More Than Just Cigarettes",
        body: "While you're picking up your cigarettes, browse our full cannabis menu — over 200 strains of flower, plus edibles, vapes, concentrates, pre-rolls, and accessories. Many of our customers appreciate the convenience of getting their cigarettes and cannabis in one trip. Our knowledgeable staff can help you with both sides of our inventory.",
      },
    ],
    faqs: [
      { q: "Does St Clair Cannabis sell native cigarettes?", a: "Yes! We carry one of the widest selections of native cigarettes in Toronto, including premium brands, value brands, full-flavour, light, and menthol varieties." },
      { q: "What cigarette brands do you carry?", a: "We stock a comprehensive range of native cigarette brands in multiple varieties. Our selection rotates regularly. Visit us at 875 St Clair Ave W to see our full current inventory and pricing." },
      { q: "Where can I buy cheap cigarettes in Toronto?", a: "St Clair Cannabis at 875 St Clair Ave W offers some of the best cigarette prices in Toronto's Weston area. We are open 24 hours a day, 7 days a week so you can shop on your own schedule." },
      { q: "Are you open late for cigarette purchases?", a: "We are open 24 hours a day, 7 days a week. Whether you need cigarettes at noon or late at night, our doors are open." },
      { q: "Can I buy cigarettes and cannabis at St Clair Cannabis?", a: "Absolutely. St Clair Cannabis is both a fully-licensed cannabis dispensary and a tobacco retailer. Many customers appreciate the convenience of one stop for both products." },
      { q: "Where is St Clair Cannabis located?", a: "875 St Clair Ave W, Toronto, ON M6C 1C4 — in 875 St Clair Ave W & Nearby Expressway area. Near transit routes with free street parking available." },
    ],
  },

  {
    slug: "weed-store-near-toronto",
    title: "Weed Store Near Toronto — St Clair Cannabis",
    metaDescription: "Looking for a weed store near Toronto? St Clair Cannabis at 875 St Clair Ave W, Toronto is just minutes away via major highways. 200+ strains, we are Open 24 Hours.",
    h1: "Weed Store Near Toronto — St Clair Cannabis",
    icon: "🚗",
    heroTagline: "Just Minutes From Mississauga via major highways · Open 24 Hours",
    banner: "",
    sections: [
      {
        heading: "The Closest Quality Dispensary to Mississauga",
        body: "St Clair Cannabis is one of the closest premium cannabis dispensaries to Toronto. Located at 875 St Clair Ave W in Toronto — just minutes up Highway 410 and East on 401 — we're the easiest dispensary to reach when you're coming from the surrounding area. Whether you're driving from Toronto and surrounding areas, St Clair Cannabis is the fastest, most convenient option for top-tier cannabis.",
      },
      {
        heading: "Why Make the Drive to St Clair Cannabis?",
        body: "St Clair Cannabis offers a wider selection and more competitive pricing than most local Peel options. You'll find over 200 strains across five quality tiers — from ultra-rare Exotic genetics (THC 35-39%) to affordable Budget flower at just $3/g. Our Buy 2g Get 1g FREE promotion applies to every tier, and our top three tiers offer Buy 3g Get 3g FREE. With prices starting at $3/g and ounces from $40, St Clair Cannabis delivers value that's worth the short drive from Toronto.",
      },
      {
        heading: "Open 24 Hours — Perfect for Late Night Visits",
        body: "Unlike most dispensaries in Peel Region with limited hours, St Clair Cannabis is open 24 hours a day, 7 days a week. Whether you're heading home from a late shift, going out for the night, or just need a quick pickup, you can stop by St Clair Cannabis during our hours: Open 24 Hours. Early morning, late night, weekends, holidays — we are always here.",
      },
      {
        heading: "Directions From Toronto",
        body: "We are located centrally at 875 St Clair Ave W, Toronto, making it easy to drive or take transit from Toronto. Total drive time is just a few minutes. Free street parking is available.",
      },
      {
        heading: "Full Menu — Cannabis, Edibles, Vapes & More",
        body: "When you make the trip up to Toronto, make it count. St Clair Cannabis carries a full selection including 200+ flower strains, edibles, vape pens, disposable vapes, concentrates (shatter, wax, hash, live resin), pre-rolled joints, magic mushrooms, native cigarettes, and accessories. Check our live online menu at stclaircannabis.com before you visit to see exactly what's in stock.",
      },
    ],
    faqs: [
      { q: "How far is St Clair Cannabis from Mississauga?", a: "We're located at 875 St Clair Ave W in Toronto — just a 15-20 minute drive from central Mississauga via Highway 401 East." },
      { q: "Is it worth driving from Mississauga for cannabis?", a: "Absolutely. St Clair Cannabis offers 200+ strains, prices starting at $3/g, and promotions like Buy 2g Get 1g FREE that make the short drive incredibly worthwhile." },
      { q: "Is St Clair Cannabis open late?", a: "We are open 24 hours a day, 7 days a week. Whether you're driving up at noon or late at night, we are open and ready to serve you." },
      { q: "What's the cheapest weed near Toronto?", a: "St Clair Cannabis has Budget flower from $3/g and value ounces from $40. With our Buy 2g Get 1g FREE promo, these are some of the best prices in the Greater Toronto Area." },
      { q: "Is there parking at St Clair Cannabis?", a: "Yes. Free evening street parking is available near the store and surrounding residential streets." },
      { q: "Can I take transit from Toronto to St Clair Cannabis?", a: "Yes! Local transit connects directly subway and bus routes that will drop you off right near our location." },
      { q: "Do you carry products besides cannabis?", a: "Yes — we also carry native cigarettes, rolling papers, grinders, and other accessories. Many Mississauga customers appreciate the one-stop convenience." },
    ],
  },

  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me Toronto — St Clair Cannabis | Open 24 Hours",
    metaDescription: "Find a cannabis dispensary near you in Toronto. St Clair Cannabis at 875 St Clair Ave W has 200+ strains from $3/g. We are Open 24 Hours. Walk in anytime, no appointment needed.",
    h1: "Cannabis Dispensary Near Me — Toronto",
    icon: "🗺️",
    heroTagline: "Walk-In Welcome · Open 24 Hours · 200+ Strains In Stock",
    banner: "",
    sections: [
      {
        heading: "Find Premium Cannabis Near You in Toronto",
        body: "If you're searching for a cannabis dispensary near you in Toronto, St Clair Cannabis is conveniently located at 875 St Clair Ave W — in the heart of 875 St Clair Ave W & Nearby Expressway area. We serve customers from across Toronto, North Toronto, Etobicoke, Mississauga, and Toronto.",
      },
      {
        heading: "Why Choose St Clair Cannabis Over Other Dispensaries?",
        body: "What sets St Clair Cannabis apart from other Toronto dispensaries is our combination of selection, pricing, and convenience. We carry 200+ strains across five clear quality tiers — no confusing markups, no inconsistent pricing. Our Buy 2g Get 1g FREE promotion applies to every tier, every purchase. And unlike most dispensaries that close early, we are open 24 hours a day, 7 days a week. Whether you need flower, edibles, vapes, or concentrates, St Clair Cannabis is here.",
      },
      {
        heading: "Areas We Serve in Greater Toronto Area",
        body: "St Clair Cannabis is centrally located and easily accessible from anywhere in Toronto and West Toronto. We regularly serve customers from: 875 St Clair Ave W & Nearby Expressway and surrounding areas including Toronto, Toronto, and nearby neighbourhoods."
      },
    ],
    faqs: [
      { q: "Where is the closest dispensary in 875 St Clair Ave W & Nearby Expressway?", a: "St Clair Cannabis at 875 St Clair Ave W is conveniently located in the heart of Toronto — easily accessible from 875 St Clair Ave W & Nearby Expressway." },
      { q: "Is St Clair Cannabis walk-in friendly?", a: "Absolutely! No appointment needed. Walk in anytime during our hours — we are open 24 hours a day, 7 days a week. Our friendly staff is always ready to help." },
      { q: "What neighbourhoods does St Clair Cannabis serve?", a: "We serve all of Toronto and surrounding areas, including 875 St Clair Ave W & Nearby Expressway and surrounding areas." },
      { q: "How do I check what's in stock?", a: "Visit stclaircannabis.com for our live menu with real-time stock, pricing, and THC levels for all products." },
      { q: "Do you sell edibles and vapes?", a: "Yes! In addition to 200+ flower strains, we carry edibles (gummies, chocolates), vape pens, disposable vapes, concentrates, pre-rolls, and accessories." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
