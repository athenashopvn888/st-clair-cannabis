export const HOME_TITLE = "St Clair Cannabis Dispensary in St Clair West";
export const HOME_VISIT_H2 = "Visit St Clair Cannabis in St Clair West";
export const HOME_VISIT_PARAGRAPHS = [
  "St Clair Cannabis is the walk-in dispensary at 875 St Clair Ave W in St Clair West. Use this homepage for the store name, location, menu paths, and current posted hours.",
  "Choose STORE MENU to browse the existing flower tiers. Choose Visit / Hours to jump to the storefront information before making the trip.",
  "This pass does not add a weed-delivery promise or an order-now claim. Adults 19+ should bring valid government-issued photo ID for a walk-in.",
] as const;
export const HOME_VISIT_CARDS = [
  { href: "/weed-dispensary-st-clair-west", title: "St Clair West Dispensary", text: "Local walk-in context for Wychwood, Corso Italia, Oakwood Village, and Hillcrest." },
  { href: "/24-hour-dispensary-st-clair-west", title: "24-Hour Store Guide", text: "Use the hours-specific guide for late-night or early-morning visit planning." },
  { href: "/native-cigarettes-st-clair-west", title: "Native Cigarettes", text: "Open the adult tobacco guide, then check today’s cigarette board." },
  { href: "/nicotine-vape-st-clair-west", title: "Nicotine Vape", text: "Browse nicotine devices separately from the THC vape shelf." },
  { href: "/guides", title: "Name Guides", text: "Compare current strain, cigarette, nicotine-vape, and THC-vape names." },
  { href: "/exotic-weed", title: "Top Weed Tiers", text: "Start with Exotic Weed, then compare Premium Weed and AAA+ Weed." },
] as const;
export const HOME_VISIT_FAQS = [
  { q: "Where is St Clair Cannabis?", a: "St Clair Cannabis is at 875 St Clair Ave W in St Clair West, Toronto." },
  { q: "What are the posted store hours?", a: "The homepage currently posts the walk-in store as open 24 hours. Check the store information before travelling." },
  { q: "Where does STORE MENU go?", a: "STORE MENU opens the existing Exotic Weed route at /exotic-weed." },
  { q: "Do I need photo ID?", a: "Yes. The cannabis dispensary is for adults 19+ with valid government-issued photo ID." },
  { q: "Can I walk in without an appointment?", a: "The existing homepage says no appointment is needed for the walk-in." },
  { q: "Does this homepage promise weed delivery?", a: "No. This St Clair pass is limited to dispensary, visit, hours, and existing menu information." },
] as const;

// Document <title>/og/twitter: exact Google name | area. H1 keeps HOME_TITLE (previous keyword text).
export const HOME_DOC_TITLE = "St Clair Cannabis Dispensary Weed Delivery | St Clair West";
