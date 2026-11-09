import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./article.module.css";

const CANONICAL = "https://stclaircannabis.com/resources/pink-gelato-strain";
const TITLE = "Pink Gelato Strain, Explained: What the Name Tells You and What It Doesn't";
const DESCRIPTION =
  "Pink Gelato is a name that keeps turning up in Toronto strain searches, and a name on a jar is a label line, not a spec sheet.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
    siteName: "St Clair Cannabis",
    locale: "en_CA",
  },
};

const ARTICLE_BODY = "# Pink Gelato Strain, Explained: What the Name Tells You and What It Doesn't\n\nLast checked: November 3, 2026\n\nTwo words, zero promises. Pink Gelato is a name that keeps turning up in Toronto strain searches, and it sounds like it was named by someone standing in front of a dessert case. But a name on a jar is a label line, not a spec sheet. St Clair Cannabis reads the board first and the label second, so here's the **Pink Gelato strain** broken down in that same order: where the name comes from, what the lineage sources actually report, the aroma words people use, and how to check what's really in the package. Adults 19+ only, legal cannabis only.\n\n## What is the Pink Gelato strain?\n\nThe Pink Gelato strain is a hybrid that Leafly's strain database lists as a cross between Pink Kush and Gelato. That's the short answer, and it's the one most strain sites repeat.\n\nThe naming logic is simple parent math. Take the first word from one parent, the second word from the other, and you've got a new name that tells you roughly where the plant came from. Pink from Pink Kush. Gelato from Gelato. Done.\n\nOne thing to keep straight: that family tree is *commonly reported*, not lab-verified. Breeders don't publish DNA results next to their names, and two growers can sell two different cuts under the same label. Treat any lineage you read online, including this one, as a starting point.\n\n## Pink Gelato lineage: the two halves\n\n| Half of the name | What the sources say | What it actually tells you |\n|---|---|---|\n| Pink | Pink Kush, which Leafly also lists as \"Pink OG\" and as an OG Kush relative | Which family the plant is said to come from |\n| Gelato | Gelato, a hybrid Leafly lists as Pink Gelato's other parent | The second branch of the tree |\n| Together | A Pink Kush \u00d7 Gelato cross (commonly reported) | A naming trail, not a guarantee about any jar |\n\nThe \"Pink\" family is enormous in Canada, with dozens of names built on that one word, but that's a whole other article. For this one, Pink means one thing: the Pink Kush parent.\n\n## What does \"Gelato\" mean in a strain name?\n\nGelato is the Italian word for ice cream, and in cannabis it has turned into something closer to a surname. Once a strain becomes well known, breeders cross it with other plants and keep the name in the new title, so you start seeing it pop up as one half of a lot of new names. When you see Gelato in a name, read it as \"this plant is said to have Gelato somewhere in its family.\" It isn't a flavour promise, and it has nothing to do with dessert.\n\n## What does Pink Gelato smell like?\n\nThis is where people get specific. Leafly's Pink Gelato page lists its top flavour tags as **berry, vanilla and lemon**, and names caryophyllene, limonene and linalool as the terpenes it reports for the strain. Terpenes are the aromatic compounds behind the smell of a lot of plants, cannabis included.\n\nTwo cautions before you take those words to the counter:\n\n- **Tags are aggregated, not guaranteed.** They come from a database, not from the jar in front of you.\n- **Batches drift.** Growing conditions, drying and curing all shape aroma, so the same name can smell different from one lot to the next.\n\nYour nose and the label beat any adjective list.\n\n## How to read a Pink Gelato label in Canada\n\nHere's the part most strain guides skip. According to Health Canada's guide to reading cannabis labels, the **strain name is optional**. A producer *can* print it, but the law doesn't require it. The required lines are the ones that matter:\n\n1. **Class of cannabis.** For flower, the label says dried cannabis.\n2. **Total THC and Total CBD.** Both appear on the front of the package. Read the numbers as printed; don't guess them from a name.\n3. **Packaging date and lot number.** The date tells you when it was packed, and the lot number lets you trace it.\n4. **Brand name.** It identifies who made the product.\n5. **Recommended storage conditions.** It's printed on the label, so follow it.\n\nSo the St Clair Cannabis reading order is simple: the board points you to a section, and the label tells you what you're actually holding. If the name says Pink Gelato but the label tells a different story, believe the label.\n\n## A name on the board isn't stock\n\nMenus move. A name you saw last week may not be there today, and a screenshot from a friend is already out of date by the time you open it. This article explains a name; it doesn't promise that any particular product is on the shelf. If you're comparing bud sizes rather than names, our guide to [shake vs smalls](/resources/shake-vs-smalls) walks through how size shows up on a menu.\n\n## Pink Gelato quick answers\n\n**Is Pink Gelato indica or sativa?** Leafly lists it as a hybrid. Those type tags come from strain databases. They aren't a required line on a Canadian label.\n\n**Is Pink Gelato the same as Gelato?** No. Gelato is listed as one parent. Pink Gelato is the cross.\n\n**Does the name tell me what's in the package?** Not by itself. The class, Total THC and Total CBD, and the packaging date on the label do.\n\n## Bring your Pink Gelato strain questions to St Clair Cannabis\n\nCurious about the Pink Gelato strain, or any name that sounds more like a dessert menu than a plant? Come by St Clair Cannabis, ask to see the label, and we'll walk you through it line by line. Plan your trip on our [visit page](/visit). Adults 19+ only. Bring government-issued photo ID.";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(value: string): string {
  let text = escapeHtml(value);
  text = text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return text;
}

function splitTableRow(line: string): string[] {
  const inner = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return inner.split("|").map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderArticle(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const parts: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      parts.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const cells = splitTableRow(lines[index]);
        if (!isSeparatorRow(cells)) rows.push(cells);
        index += 1;
      }
      const [header, ...bodyRows] = rows;
      if (!header) continue;
      const head = `<tr>${header.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr>`;
      const bodyHtml = bodyRows
        .map((cells) => `<tr>${cells.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
        .join("");
      parts.push(`<div class="tableScroll"><table><thead>${head}</thead><tbody>${bodyHtml}</tbody></table></div>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      parts.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      parts.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    parts.push(`<p>${renderInline(line)}</p>`);
    index += 1;
  }

  return parts.join("");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL,
    url: CANONICAL,
  },
  url: CANONICAL,
  datePublished: "2026-11-09",
  dateModified: "2026-11-09",
  author: { "@type": "Organization", name: "St Clair Cannabis" },
  publisher: { "@type": "Organization", name: "St Clair Cannabis" },
};

export default function PinkGelatoStrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className={styles.main}>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: renderArticle(ARTICLE_BODY) }}
        />
      </main>
      <Footer />
    </>
  );
}
