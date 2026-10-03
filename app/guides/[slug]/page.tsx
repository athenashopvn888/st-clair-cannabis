import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/Navbar";
import { GUIDE_REGISTRY, getGuide, resolveGuideProduct, type GuideEntry } from "../../lib/guideRegistry";
import GuideBody, { stripMarkdown } from "./GuideBody";
import styles from "./guide.module.css";

const BASE = "https://stclaircannabis.com";
type GuidePageProps = { params: Promise<{ slug: string }> };
const laneCopy = {
  strain: { label: "Strain name", category: "Cannabis flower" },
  native_cig: { label: "Native Cigarettes", category: "Native Cigarettes" },
  nic_vape: { label: "Nicotine Vape", category: "Nicotine Vape" },
  thc_vape: { label: "THC Vape", category: "THC Vape" },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return GUIDE_REGISTRY.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return {
    title: { absolute: guide.title },
    description: guide.description,
    keywords: guide.primaryKeywords,
    alternates: { canonical: `${BASE}/guides/${guide.slug}` },
    robots: { index: true, follow: true },
    openGraph: { title: guide.title, description: guide.description, url: `${BASE}/guides/${guide.slug}`, type: "website" },
  };
}

const relatedEntries = (guide: GuideEntry) => guide.relatedSlugs.map(getGuide).filter((entry): entry is GuideEntry => Boolean(entry));

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const product = resolveGuideProduct(guide);
  const productHref = product ? `${guide.lane === "strain" ? "/flower" : "/item"}/${product.slug}` : undefined;
  const canonical = `${BASE}/guides/${guide.slug}`;
  const lane = laneCopy[guide.lane];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: guide.title, description: guide.description, isPartOf: { "@id": `${BASE}/#website` } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
          { "@type": "ListItem", position: 3, name: guide.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.schema.faq_items.map((faq) => ({
          "@type": "Question",
          name: stripMarkdown(faq.question),
          acceptedAnswer: { "@type": "Answer", text: stripMarkdown(faq.answer) },
        })),
      },
    ],
  };

  return (
    <main className={styles.main}>
      <JsonLd data={jsonLd} />
      <Navbar />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{guide.name}</span></nav>
        <header className={styles.hero}>
          <span className={styles.lane}>{lane.label}</span>
          <h1>{guide.title}</h1>
          <p className={styles.lede}>{guide.description}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={productHref ?? guide.preferredCategoryPath}>{productHref ? `Open the ${guide.name} menu listing` : "Check today’s board"}</Link>
            <Link className={styles.secondary} href={guide.preferredCategoryPath}>Browse {lane.category}</Link>
          </div>
        </header>
        <section className={styles.section} aria-label={`${guide.name} guide`}><GuideBody markdown={guide.bodyMd} /></section>
        <section className={styles.section} aria-labelledby="related-guides-heading">
          <h2 id="related-guides-heading">Related {lane.label} guides</h2>
          <div className={styles.related}>{relatedEntries(guide).map((entry) => <Link key={entry.slug} href={`/guides/${entry.slug}`}>{entry.name}<span>{laneCopy[entry.lane].label}</span></Link>)}</div>
        </section>
        <aside className={styles.finalCta}>
          <h2>Check today&apos;s board</h2>
          <p>Use the current menu path for the latest posted listing and format details.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={productHref ?? guide.preferredCategoryPath}>Open today&apos;s menu path</Link>
            <Link className={styles.secondary} href="/visit">Visit St Clair Cannabis</Link>
          </div>
        </aside>
      </article>
      <Footer />
    </main>
  );
}
