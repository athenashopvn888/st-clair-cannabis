import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ — St Clair Cannabis | Toronto Dispensary Questions",
  description:
    "Frequently asked questions about St Clair Cannabis in Toronto. Hours, location, products, pricing, bundle offers, and everything you need to know before visiting.",
  alternates: {
    canonical: "https://stclaircannabis.com/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "📍 Location & Hours",
    faqs: [
      { q: "Where is St Clair Cannabis located?", a: "We are located at 875 St Clair Ave W, Toronto, ON M6C 1C4, in the St Clair West corridor." },
      { q: "What are your hours?", a: "We are open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed." },
      { q: "Is there parking nearby?", a: "Street-parking rules and availability can change. Check posted signs and current conditions when you arrive." },
      { q: "What local transit serves St Clair West?", a: "The 512 St Clair streetcar and local TTC routes serve the St Clair Avenue West corridor. Check TTC service before travelling." },
      { q: "How should I plan my visit?", a: "Use the visit page for the verified address and phone, then check current TTC service, maps and posted parking signs before travelling." },
    ],
  },
  {
    title: "🌿 Products & Menu",
    faqs: [
      { q: "What menu categories are shown?", a: "The website separates five flower tiers, edibles, pre-rolls, concentrates, accessories, Native Cigarettes, Nicotine Vape and THC Vape. Check each current category board for posted listings." },
      { q: "Does the website guarantee shelf stock?", a: "No. Product and category pages are the current website snapshot, but the counter can rotate. Check immediately before travelling or ask the store when one exact item matters." },
      { q: "What are the flower tiers?", a: "Flower is organized as Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed. Tier pages show their current product cards without making medical or outcome claims." },
      { q: "Do you list edibles and concentrates?", a: "Yes. Edibles and concentrates have separate category routes. Read each current item and package label for format and contents." },
      { q: "Are nicotine and THC vapes separated?", a: "Yes. Nicotine Vape and THC Vape use separate labels and menu paths. Nicotine is addictive; adults 19+ only." },
      { q: "Where are Native Cigarettes listed?", a: "Use /items/cigarettes for the current Native Cigarettes board. Brands and pack styles can rotate." },
    ],
  },
  {
    title: "💰 Pricing & Bundle Offers",
    faqs: [
      { q: "Where do I check current prices?", a: "Use the current product card and item page. This FAQ does not lock a price or package size." },
      { q: "What is the Top Weed Tier special?", a: "The current sitewide strip states: Buy 2g Get 1g FREE; Buy 3g Get 3g FREE. Open Exotic, Premium or AAA+ and confirm the displayed tier details before purchase." },
      { q: "Does AA Weed use the same 3g and 6g offer cards?", a: "No. The Dual-Frame 3g and 6g presentation is for Exotic, Premium and AAA+; AA is outside that stack." },
      { q: "Are cigarette promotions permanent?", a: "No permanence is implied. Check the current homepage promotion and cigarette board for the posted offer and eligible names." },
    ],
  },
  {
    title: "🛒 Shopping & Experience",
    faqs: [
      { q: "Do I need an appointment?", a: "No! St Clair Cannabis is walk-in only. Just show up anytime — we are open 24 hours a day, 7 days a week." },
      { q: "Can I order online?", a: "The website currently supports browsing rather than online ordering. Use the product and category pages as the current website board before visiting." },
      { q: "Do you offer delivery?", a: "Delivery is coming soon! Visit our delivery page to sign up for email notifications when we launch our delivery service." },
      { q: "Can staff help me read the menu?", a: "Ask the counter about the current product name, category, format and package label. Staff guidance is not medical advice." },
      { q: "What should I bring?", a: "Adults 19+ should bring valid government-issued photo ID." },
    ],
  },
];

export default function FAQPage() {
  // JSON-LD for FAQ page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />

        {/* FAQ Banner */}
        <section style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}>
          <img
            src="/banners/07_FAQ.webp"
            alt="St Clair Cannabis FAQ — Your Questions Answered"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
        </section>

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Current store, menu and visit information for St Clair Cannabis at 875 St Clair Ave W in Toronto.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Call us at <strong>(437) 783-2483</strong> or visit us at 875 St Clair Ave W, Toronto.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
