import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { TIER_CONFIG } from "../../lib/products";
import styles from "./guide.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Weed & Cannabis Flower Guide Toronto | St Clair Cannabis",
  },
  description: "Compare the five Weed flower collections presented by St Clair Cannabis in Toronto.",
  alternates: {
    canonical: "https://stclaircannabis.com/resources/weed-flower-guide",
  },
};

export default function WeedFlowerGuidePage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Flower collections</p>
          <h1>St Clair Cannabis Weed &amp; Flower Guide</h1>
          <p className={styles.intro}>
            St Clair Cannabis brings together five Weed flower collections for shoppers comparing Exotic Weed,
            Premium Weed, AAA+ Weed, AA Weed and Budget Weed. Explore the collections that interest you and use
            the current menu information presented while you browse.
          </p>
        </div>
      </section>

      <section className={styles.container} aria-label="Weed flower collections">
        <div className={styles.grid}>
          {Object.values(TIER_CONFIG).map((tier) => (
            <Link key={tier.slug} href={`/${tier.slug}`} className={styles.card}>
              <span aria-hidden="true">{tier.icon}</span>
              <strong>Explore {tier.name}</strong>
              <span>{tier.tagline}</span>
            </Link>
          ))}
        </div>

        <div className={styles.ownerCard}>
          <h2>St Clair Cannabis in Toronto</h2>
          <p>Find store information and the broader Weed selection from the existing Toronto store guide.</p>
          <Link href="/weed-dispensary-toronto">Explore St Clair Cannabis Weed in Toronto</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
