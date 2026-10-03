"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import HomeVisitSection from "./components/HomeVisitSection";
import Footer from "./components/Footer";
import FlowerCard from "./components/FlowerCard";
import { allFlowers } from "./lib/products";
import { HOME_TITLE } from "./lib/homeStorefront";
import FleetAnnouncementBanner from "./components/FleetAnnouncementBanner";

/* ── Bento Mosaic Config ── */
const BENTO_TIERS = [
  {
    name: "EXOTIC WEED",
    slug: "exotic-weed",
    price: "$10-$12/g",
    banner: "/banners/exotics_banner.webp",
    className: styles.bentoExotic,
  },
  {
    name: "PREMIUM WEED",
    slug: "premium-weed",
    price: "$7-$10/g",
    banner: "/banners/premium_banner.webp",
    className: styles.bentoPremium,
  },
  {
    name: "AAA+ WEED",
    slug: "aaa-weed",
    price: "$5-$6/g",
    banner: "/banners/aaa_plus_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "AA WEED",
    slug: "aa-weed",
    price: "$4/g",
    banner: "/banners/aa_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "BUDGET WEED",
    slug: "budget-weed",
    price: "$3/g",
    banner: "/banners/budget_banner.webp",
    className: styles.bentoTile,
  },
  {
    name: "EDIBLES • PREROLLS • MORE",
    slug: "items/edibles",
    price: "Shop Tiers",
    banner: "/banners/edibles_prerolls_more_banner.webp",
    className: styles.bentoEdibles,
  },
];

/* ── Explore Categories Config (New Banners) ── */
const EXPLORE_CATEGORIES = [
  { name: "Nicotine Vape", slug: "items/vapes", banner: "/banners/01_Vape_Pens.webp", icon: "💨" },
  { name: "THC Vape", slug: "items/vape-disposables", banner: "/banners/02_Vape_Disposable.webp", icon: "💨" },
  { name: "Concentrates", slug: "items/concentrates", banner: "/banners/03_Concentrates.webp", icon: "💎" },
  { name: "Pre-Rolls", slug: "items/prerolls", banner: "/banners/04_Pre_Rolls.webp", icon: "🚬" },
  { name: "Accessories", slug: "items/add-ons", banner: "/banners/05_Accessories.webp", icon: "➕" },
  { name: "Cigarettes", slug: "items/cigarettes", banner: "/banners/06_Cigarettes.webp", icon: "🏷️" },
  { name: "Magic Stuff", slug: "items/magic", banner: "/banners/09_Magic_Stuff.webp", icon: "🍄" },
  { name: "Games Arcade", slug: "games", banner: "/banners/10_Games.webp", icon: "🎮" },
];

/* ── Local FAQs for Jane St ── */
const LOCAL_FAQS = [
  {
    q: "What are the hours for St Clair Cannabis?",
    a: "St Clair Cannabis at 875 St Clair Ave W, Toronto is open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "What cannabis products do you carry?",
    a: "We carry five Weed flower collections: Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed, plus edibles, prerolls, vapes and concentrates. Check the current menu details shown while you browse.",
  },
  {
    q: "Where is St Clair Cannabis located?",
    a: "We are located at 875 St Clair Ave W, Toronto, ON M6C 1C4. Visit us in person or call us at (437) 783-2483. Free evening street parking is available.",
  },
  {
    q: "What is the cheapest weed at St Clair Cannabis?",
    a: "Browse the Budget Weed collection and use the current menu information shown with each selection.",
  },
];

interface Review {
  name: string;
  comment: string;
  date: string;
}

interface ReviewStats {
  total: number;
  avg: number;
}

export default function HomePage() {
  const [featuredStrains, setFeaturedStrains] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewStats | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* ── 1. Fetch Client-Side Google Reviews ── */
  useEffect(() => {
    const STORE_KEY = "STC01";
    const SHEET_ID = "1-KeuyKFKprbU-Vl_qVQiZkEKMX_i5CmdScTToNTdkUY";
    const SHEET_NAME = "WEBSITE_REVIEWS";
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    fetch(url)
      .then((r) => r.text())
      .then((raw) => {
        const jsonStart = raw.indexOf("{");
        const jsonEnd = raw.lastIndexOf("}");
        const jsonString = raw.substring(jsonStart, jsonEnd + 1);
        const json = JSON.parse(jsonString);
        const rows = json.table.rows;
        const cols = json.table.cols;

        const colMap: Record<string, number> = {};
        cols.forEach((col: any, idx: number) => {
          if (col.label) colMap[col.label.trim()] = idx;
        });

        const skIdx = colMap["StoreKey"] !== undefined ? colMap["StoreKey"] : 0;
        const rnIdx = colMap["ReviewerName"] !== undefined ? colMap["ReviewerName"] : 1;
        const cmIdx = colMap["Comment"] !== undefined ? colMap["Comment"] : 2;
        const dtIdx = colMap["CreateTime"] !== undefined ? colMap["CreateTime"] : 3;

        const reviewsPool: Review[] = [];
        let totalVal: number | null = null;
        let avgVal: number | null = null;
        let hasStats = false;

        rows.forEach((row: any) => {
          if (!row.c) return;
          const sk = row.c[skIdx] ? row.c[skIdx].v || "" : "";
          if (sk !== STORE_KEY) return;

          const rn = row.c[rnIdx] ? row.c[rnIdx].v || "" : "";
          if (rn === "__STATS__") {
            const parsedTotal = parseInt(row.c[cmIdx] ? row.c[cmIdx].v : "", 10);
            const parsedAvg = parseFloat(row.c[dtIdx] ? row.c[dtIdx].v : "");
            if (Number.isFinite(parsedTotal) && Number.isFinite(parsedAvg)) {
              totalVal = parsedTotal;
              avgVal = parsedAvg;
              hasStats = true;
            }
            return;
          }

          const comment = row.c[cmIdx] ? row.c[cmIdx].v || "" : "";
          if (!comment || comment.length < 10) return;
          const name = rn || "Customer";
          const dateStr = row.c[dtIdx] ? row.c[dtIdx].v || "" : "";
          reviewsPool.push({ name, comment, date: dateStr });
        });

        setReviews(reviewsPool.slice(0, 6));
        if (hasStats && totalVal !== null && avgVal !== null) {
          setReviewsStats({ total: totalVal, avg: avgVal });
        }
        setReviewsLoading(false);
      })
      .catch((err) => {
        console.warn("Reviews fetch failed:", err);
        setReviewsLoading(false);
      });
  }, []);

  /* ── 2. Build Featured Strains ── */
  useEffect(() => {
    const pool = [...allFlowers].filter((f) => f.image);
    // Shuffle pool securely
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const picked: typeof pool = [];
    const tierCounts: Record<string, number> = {};

    for (const f of pool) {
      if (picked.length >= 8) break;
      const tc = tierCounts[f.tier] || 0;
      if (tc >= 2) continue; // max 2 per tier
      if (picked.some((p) => p.name === f.name)) continue; // avoid exact duplicates
      picked.push(f);
      tierCounts[f.tier] = tc + 1;
    }

    setFeaturedStrains(picked);
  }, []);

  return (
    <main className={styles.main}>
      {/* ── NAVBAR ── */}
      <Navbar />
      <FleetAnnouncementBanner />

      {/* ── BENTO MOSAIC HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroStars} />

        <div className={styles.heroContent}>
          {/* Brand branding */}
          <div className={styles.brandBlock}>
            <img src="/storeFavicon.webp" alt="St Clair Cannabis Icon" style={{ height: "60px", width: "60px", objectFit: "contain", borderRadius: "8px", marginBottom: "8px" }} />
            <h1 className={styles.brandTitle}>{HOME_TITLE}</h1>
            <p className={styles.brandSub}>Premium Cannabis Dispensary</p>
            <div className={styles.brandBadge}>Open 24 Hours</div>
            <div className={styles.homeMenuActions}>
              <Link href="/exotic-weed" className={`${styles.homeMenuCta} ${styles.homeMenuPrimary}`}>STORE MENU</Link>
              <Link href="/#contact" className={`${styles.homeMenuCta} ${styles.homeVisitSecondary}`}>Visit / Hours</Link>
            </div>
          </div>

          {/* Bento Grid */}
          <div className={styles.bentoGrid}>
            {BENTO_TIERS.map((tier) => (
              <Link
                key={tier.slug}
                href={`/${tier.slug}`}
                className={`${styles.bentoTile} ${tier.className}`}
              >
                <div
                  className={styles.bentoTileBg}
                  style={{ backgroundImage: `url('${tier.banner}')` }}
                />
                <div className={styles.bentoTileOverlay} />
                <div className={styles.bentoTileContent}>
                  <span className={styles.bentoLabel}>{tier.name}</span>
                  <span className={styles.bentoPrice}>{tier.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeVisitSection />

      {/* ── EXPLORE CATEGORIES ── */}
      <section className={styles.categoriesSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>
              From custom disposable vapes and concentrates to accessories and cigarettes.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div
                  className={styles.categoryCardBg}
                  style={{ backgroundImage: `url('${cat.banner}')` }}
                />
                <div className={styles.categoryCardOverlay} />
                <div className={styles.categoryCardContent}>
                  <h3 className={styles.categoryCardName}>
                    {cat.icon} {cat.name} <span className={styles.categoryCardArrow}>→</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Strains</h2>
            <p className={styles.sectionSubtitle}>
              A rotating look at current menu-file entries. Open each product page and check today&apos;s board before travelling.
            </p>
          </div>

          <div className={styles.featuredScroll}>
            {featuredStrains.map((strain, i) => (
              <div key={`${strain.sku}-${i}`} className={styles.scrollItem}>
                <FlowerCard flower={strain} tierKey={strain.tier} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO PANEL WRITE-UP ── */}
      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>St Clair West Cannabis Dispensary at 875 St Clair Ave W — Open 24 Hours</h2>
            <p className={styles.seoPanelText}>
              <strong>St Clair Cannabis</strong> is the walk-in cannabis dispensary at 875 St Clair Ave W, near Wychwood, Corso Italia, Oakwood Village, and Hillcrest. Browse five flower collections from Exotic Weed through Budget Weed, then use the current product page for published details.
            </p>
            <p className={styles.seoPanelText}>
              The site posts Open 24 Hours. Use the dedicated 24-hour guide to plan a late-night or early-morning walk-in, and check the homepage for any temporary notice before travelling. Adults 19+ should bring valid government-issued photo ID.
            </p>
            <p className={styles.seoPanelText}>
              The menu keeps flower, Native Cigarettes, Nicotine Vape, and THC Vape in clearly labelled lanes. Use the Resource Centre and name guides for background, then move to today&apos;s category board for the current listing. Nicotine is addictive; nicotine products are kept separate from THC vape products.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLIENT-SIDE GOOGLE REVIEWS SHOWCASE ── */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
            {reviewsStats && (
              <div className={styles.reviewsStarsSummary}>
                <span className={styles.reviewsStars}>★★★★★</span>
                <span className={styles.reviewsAvg}>
                  {reviewsStats.avg.toFixed(1)}
                </span>
                <span className={styles.reviewsCount}>
                  ({reviewsStats.total} Google reviews)
                </span>
              </div>
            )}
          </div>

          <div className={styles.reviewsGrid}>
            {reviewsLoading ? (
              <div className={styles.reviewsLoading}>Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className={styles.reviewsLoading}>
                Reviews are not available right now.
              </div>
            ) : (
              reviews.map((rv, idx) => (
                <div key={idx} className={styles.rvCard}>
                  <div className={styles.rvTop}>
                    <div className={styles.rvAvatar}>
                      {rv.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.rvMeta}>
                      <span className={styles.rvName}>{rv.name}</span>
                      {rv.date && (
                        <span className={styles.rvDate}>
                          {new Date(rv.date).toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <span className={styles.rvStars}>★★★★★</span>
                  </div>
                  <p className={styles.rvText}>
                    {rv.comment.length > 180 ? `${rv.comment.substring(0, 177)}...` : rv.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className={styles.reviewCtaRow}>
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION ── */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "32px" }}>
            Frequently Asked Questions
          </h2>
          {LOCAL_FAQS.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── STORE LOCATION GRID ── */}
      <section className={styles.storeSection} id="contact">
        <div className={styles.container}>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>📍</span>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>
                875 St Clair Ave W
                <br />
                Toronto, ON M6C 1C4
                <br />
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🕒</span>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>
                Open 7 Days a Week
                <br />
                <span className={styles.storeHighlight}>Open 24 Hours</span>
              </p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>🔥</span>
              <h3 className={styles.storeCardTitle}>Walk In</h3>
              <p className={styles.storeCardText}>
                No appointment needed
                <br />
                <span className={styles.storeHighlight}>St Clair West, Toronto</span>
              </p>
            </div>
          </div>

          {/* Map wrapper */}
          <div className={styles.mapWrap}>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
