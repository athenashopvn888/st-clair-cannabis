import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/Navbar";
import {
  GUIDE_REGISTRY,
  getGuide,
  resolveGuideProduct,
  type GuideEntry,
} from "../../lib/guideRegistry";
import styles from "./guide.module.css";

const BASE = "https://stclaircannabis.com";

type GuidePageProps = { params: Promise<{ slug: string }> };

const laneCopy = {
  strain: {
    label: "Strain name",
    noun: "cannabis flower name",
    menuLabel: "flower board",
    distinction: "This page is about a flower name. It is separate from cigarettes, nicotine vapes and THC vape hardware.",
  },
  native_cig: {
    label: "Native Cigarettes",
    noun: "adult tobacco brand name",
    menuLabel: "cigarette category",
    distinction: "This page is about adult tobacco. It is not a cannabis or vape page. Tobacco and nicotine products are for adults 19+.",
  },
  nic_vape: {
    label: "Nicotine Vape",
    noun: "adult nicotine-vape brand name",
    menuLabel: "nicotine-vape category",
    distinction: "This is the nicotine shelf, not the THC vape shelf. Nicotine is addictive, and nicotine products are for adults 19+.",
  },
  thc_vape: {
    label: "THC Vape",
    noun: "cannabis-menu name",
    menuLabel: "THC category",
    distinction: "This is cannabis-menu information, not a nicotine-device recommendation. Read the current item label because formats differ.",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_REGISTRY.map((guide) => ({ slug: guide.slug }));
}
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const lane = laneCopy[guide.lane];
  const description = `Adult 19+ guide to ${guide.name}, a ${lane.noun} connected to St Clair Cannabis's current ${lane.menuLabel} on St Clair West. Selection rotates; check today's board.`;
  return {
    title: { absolute: guide.title },
    description,
    alternates: { canonical: `${BASE}/guides/${guide.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description,
      url: `${BASE}/guides/${guide.slug}`,
      type: "website",
    },
  };
}

function buildFaqs(guide: GuideEntry, hasProductPage: boolean) {
  const lane = laneCopy[guide.lane];
  const availabilityAnswer = hasProductPage
    ? `A matching ${guide.name} listing appears on the current St Clair Cannabis menu snapshot, but the shelf can change. Open the linked product page and today's ${lane.menuLabel} before travelling.`
    : `${guide.name} does not have a matching product-detail page in the current site snapshot. Keep this guide bookmarked and use today's ${lane.menuLabel}; the category is the current source when the named item rotates out.`;
  const formatAnswer = guide.lane === "native_cig"
    ? "Brand names can cover more than one pack style. Use the cigarette category and package label to distinguish full, lights, silver, menthol, pack or carton details."
    : guide.lane === "nic_vape"
      ? "No. Device names, formats and package details can differ. Read the product and package label. This guide does not estimate duration from a puff count."
      : guide.lane === "thc_vape"
        ? "No. A name can appear as a disposable, pen or, for Drizzle, a pre-roll listing. The current item page and package label control the format."
        : "The guide explains how the name connects to the menu; it does not guarantee one flower format, batch, potency or package size.";
  return [
    { question: `Is ${guide.name} on the St Clair Cannabis menu today?`, answer: availabilityAnswer },
    { question: `Does every ${guide.name} listing use the same format?`, answer: formatAnswer },
    { question: `Where should I check before visiting for ${guide.name}?`, answer: `Open the linked product page when one is available, then check today's ${lane.menuLabel}. For directions to 875 St Clair Ave W, use the visit page.` },
    { question: `Who can shop this ${lane.label} category?`, answer: "St Clair Cannabis serves adults 19+. Bring valid government-issued photo ID. This guide is informational and does not reserve an item." },
  ];
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const lane = laneCopy[guide.lane];
  const product = resolveGuideProduct(guide);
  const productHref = product
    ? `${guide.lane === "strain" ? "/flower" : "/item"}/${product.slug}`
    : undefined;
  const related = guide.relatedSlugs.map(getGuide).filter((entry): entry is GuideEntry => Boolean(entry));
  const faqs = buildFaqs(guide, Boolean(productHref));
  const canonical = `${BASE}/guides/${guide.slug}`;
  const categoryLabel = guide.preferredCategoryPath
    .replace("/items/", "")
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: guide.title,
        description: `St Clair Cannabis guide to ${guide.name} and today's ${lane.menuLabel}.`,
        isPartOf: { "@type": "WebSite", "@id": `${BASE}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: categoryLabel, item: `${BASE}${guide.preferredCategoryPath}` },
          { "@type": "ListItem", position: 3, name: guide.name, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className={styles.main}>
      <JsonLd data={jsonLd} />
      <Navbar />

      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href={guide.preferredCategoryPath}>{categoryLabel}</Link><span>/</span>
          <span>{guide.name}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.lane}>{lane.label}</span>
          <h1>{guide.title}</h1>
          <p className={styles.lede}>
            A practical adult 19+ name guide for St Clair Cannabis on St Clair West, near the Wychwood and Corso Italia corridor. Use it to identify the right menu lane, compare nearby names and move to today&apos;s board without treating an older listing as a stock promise.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={productHref ?? guide.preferredCategoryPath}>
              {productHref ? `Open the ${guide.name} menu listing` : "Check today’s category board"}
            </Link>
            <Link className={styles.secondary} href={guide.preferredCategoryPath}>Browse {categoryLabel}</Link>
          </div>
        </header>

        <section className={styles.tldr} aria-labelledby="tldr-heading">
          <h2 id="tldr-heading">The short version</h2>
          <ul>
            <li><strong>{guide.name}</strong> is treated here as a {lane.noun}, with the public lane labelled {lane.label}.</li>
            <li>{lane.distinction}</li>
            <li>Selection rotates. Use the current product or category page as today&apos;s board and bring valid government photo ID showing 19+.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>What we show today for {guide.name}</h2>
          <p>
            The registry connects this guide to a supported STC01 source and records it as {guide.menuNote}. That wording is deliberately narrower than an availability guarantee. Menu files are useful for connecting a name to the right shelf, but the counter can rotate after a page is built. Prices, package options and exact variants belong on the current menu listing, not in this evergreen guide.
          </p>
          {productHref ? (
            <p>
              A matching menu entry is available in the current site snapshot: <Link href={productHref}>{product?.name}</Link>. Open that item for its currently published details, then return to the parent <Link href={guide.preferredCategoryPath}>{categoryLabel} board</Link> if you want to compare the surrounding category. A live link is a navigation aid, not a reservation.
            </p>
          ) : (
            <p>
              There is no matching product-detail page in the current site snapshot. That is why this guide points to the <Link href={guide.preferredCategoryPath}>{categoryLabel} board</Link> instead of inventing a product URL. Ask the counter or check today&apos;s board when this exact name matters. The guide stays useful when the named item rotates out.
            </p>
          )}
        </section>

        <section className={styles.section}>
          <h2>How {guide.name} appears on our menu</h2>
          <p>
            St Clair Cannabis organizes the menu by shopping lane. For this guide, the parent path is <Link href={guide.preferredCategoryPath}>{categoryLabel}</Link>. That category link is the stable route to use when a specific item page is absent or when the item name changes slightly. The guide does not rewrite the existing menu, rename a product or imply that similarly named products are identical.
          </p>
          {guide.slug === "zpods-vape" && (
            <p>
              Zpods is filed under the concentrates path in the current source, but it is described here as a nicotine-pod name. Keep it separate from Gas Gang and other THC products, and also check the dedicated <Link href="/items/vapes">Nicotine Vape board</Link> before visiting.
            </p>
          )}
          <p>
            Read the label before choosing. Flower names can be attached to a particular tier or a shreds format. Cigarette brands can have full, lights, silver or menthol variants. Nicotine devices can use model names and puff counts that distinguish listings but do not guarantee duration. THC menu names can refer to different cannabis formats. The current product label is more specific than the hub name.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Compare {guide.name} with names from the same lane</h2>
          <p>
            Use these comparisons to stay within the same menu lane. They are not claims that the products taste alike, perform alike or are interchangeable. They simply offer nearby names to check when you are browsing the {lane.label} section. St Clair Cannabis keeps nicotine and THC shelves separate so an adult shopper does not have to infer the substance from a device-shaped product.
          </p>
          <div className={styles.related}>
            {related.map((entry) => <Link key={entry.slug} href={`/guides/${entry.slug}`}>{entry.name} <span>{laneCopy[entry.lane].label}</span></Link>)}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Plan a St Clair West visit</h2>
          <p>
            St Clair Cannabis is at 875 St Clair Ave W in Toronto. Use the <Link href="/visit">visit page</Link> for current directions and store information rather than copying location details from a search snippet. Adults must be 19 or older and should bring government-issued photo ID. If the trip depends on one exact {guide.name} listing, check the linked menu immediately before travelling or ask the counter what is on today&apos;s board.
          </p>
          <p>
            This page does not make medical, wellness or performance claims. It also does not promise a price, potency, pack size, flavour, device life or shelf quantity. Its job is to give the name a durable, self-contained route and connect that route to the most relevant live menu area. If stock changes, the category remains the soft out-of-stock destination.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Frequently asked questions</h2>
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className={styles.finalCta}>
          <h2>Check today&apos;s {lane.menuLabel}</h2>
          <p>Start with the exact listing when it exists, or use the stable parent category when {guide.name} has rotated off the board.</p>
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
