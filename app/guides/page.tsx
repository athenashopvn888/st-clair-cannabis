import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Navbar from "../components/Navbar";
import { getGuidesByLane } from "../lib/guideRegistry";
import styles from "./page.module.css";

const BASE = "https://stclaircannabis.com";
const CANONICAL = `${BASE}/guides`;
const TITLE = "Guides | St Clair Cannabis";
const DESCRIPTION =
  "Browse St Clair Cannabis's adult 19+ name guides for strains, Native Cigarettes, Nicotine Vape, and THC Vape, then check today's menu boards.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": CANONICAL,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${BASE}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: CANONICAL },
      ],
    },
  ],
};

export default function GuidesPage() {
  const guideGroups = getGuidesByLane();

  return (
    <main className={styles.main}>
      <JsonLd data={jsonLd} />
      <Navbar />

      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Guides</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>Adult 19+ name guide directory</p>
          <h1>{TITLE}</h1>
          <p className={styles.lede}>
            Browse name guides for St Clair Cannabis on St Clair West, grouped by
            strains, Native Cigarettes, Nicotine Vape, and THC Vape. Selection
            rotates, so use each guide to find the right lane and check today&apos;s
            menu board before visiting.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/resources">Browse Resources</Link>
            <Link className={styles.secondary} href="/visit">Plan your visit</Link>
          </div>
        </header>

        <div className={styles.groups}>
          {guideGroups.map((group) => (
            <section className={styles.group} key={group.lane} aria-labelledby={`${group.lane}-heading`}>
              <div className={styles.groupHeading}>
                <h2 id={`${group.lane}-heading`}>{group.label}</h2>
                <span>{group.guides.length} guides</span>
              </div>
              <ul className={styles.guideList}>
                {group.guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`}>{guide.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className={styles.note} aria-labelledby="check-board-heading">
          <h2 id="check-board-heading">Check today&apos;s board</h2>
          <p>
            These guides explain names and menu lanes; they do not reserve an
            item or promise current selection. Use the current category boards
            for today&apos;s menu, and bring valid government-issued photo ID showing 19+.
          </p>
          <Link href="/resources">Open the St Clair Cannabis resource hub</Link>
        </section>
      </article>

      <Footer />
    </main>
  );
}
