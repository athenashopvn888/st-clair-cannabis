import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./article.module.css";

const CANONICAL = "https://stclaircannabis.com/resources/shake-vs-smalls";
const TITLE = "Shake vs Smalls: Two Flower Words, Two Very Different Things";
const DESCRIPTION =
  "Somebody asks for shake, gets shown smalls, and walks off convinced they're the same thing.";

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

const ARTICLE_BODY = `# Shake vs Smalls: Two Flower Words, Two Very Different Things

Last checked: October 21, 2026

Stand at any counter long enough and you'll hear it: somebody asks for "shake," gets shown smalls, and walks off convinced they're the same thing. They're not. **Shake vs smalls** is one of those flower-word mix-ups that makes a menu harder to read than it needs to be, so let's put each word in its own lane. This guide is for adults 19 and over. No hype, no rankings. Just what the words mean, what the package actually tells you, and how to store whichever one ends up in your bag.

## What is shake weed?

Start with the loose stuff. **What is shake weed?** It's the crumbs. Shake is the small, broken fragments of dried flower that come loose when buds are moved around: poured, weighed, jarred, jostled. Pick up a big jar that has travelled a bit, tip it, and the bits collecting at the bottom are shake.

Three things define it:

- **It's broken, not whole.** No intact bud structure, just pieces.
- **Nobody set out to make it.** Shake is a by-product of handling, not a format someone designed.
- **It's loose and uneven.** Fragment sizes vary, from little flakes to near-powder.

Don't confuse shake with flower that's been run through a grinder or mill on purpose. That's a separate format with its own names. Shake is what happens to flower in transit; milled flower is a processing choice.

## What are smalls?

Now the other half of the pair. Smalls are whole buds that simply grew up little. Every piece is an intact bud: same structure, same shape, same look as a larger one, just scaled down.

Three things define them:

- **They're whole.** You can still see the structure of each piece.
- **They're sorted on purpose.** Someone picked out the smaller buds and packed them together.
- **They still need prep.** Like any whole flower, smalls get broken up by you before rolling.

If shake is crumbs off the loaf, smalls are dinner rolls. Same bakery, different item.

## Shake vs smalls, side by side

| | Shake | Smalls |
|---|---|---|
| What's in the bag | Loose fragments | Intact little buds |
| How it got that way | Came off during handling | Picked out and packed by size |
| What you can inspect | Colour and texture | Each bud's shape and structure |
| Prep before rolling | Already in pieces | Break up yourself |
| How it behaves in a jar | Settles and packs down | Stays as separate pieces |
| How the law classes it | Dried cannabis | Dried cannabis |

That last row is the one most people never think about, so let's open it up.

## What the label says (and doesn't)

Legally, shake and smalls land in the same bucket. The Cannabis Act defines dried cannabis as any part of a cannabis plant that has been subjected to a drying process, other than seeds. Broken or whole, it's still dried flower, and Health Canada's consumer label guide lists "dried flower or pre-rolls" under the **dried cannabis** class.

So the words "shake" and "smalls" are menu and package-description words, not legal categories. Here's what a legal package must show, according to Health Canada's label guide and section 123 of the Cannabis Regulations:

1. **Class of cannabis.** For either one, it should read "dried cannabis". If the class line says something else, you're not holding plain flower.
2. **Total THC and Total CBD** on the front of the label.
3. **Net weight.**
4. **Lot number and packaging date.**
5. **Recommended storage conditions.**

Notice what's missing: nothing on the label says "shake" or "smalls" as an official term. Those words tell you about **form**. The label numbers are the only part that speak to what's in it. Read them for the exact package in your hand, every time.

## Storage notes for loose flower

Different shapes, same basic rules. Health Canada's safe-storage page says to keep cannabis "locked away and out of sight and reach of children and pets," and to keep legal products in their original packaging, which it says keeps them more secure. That goes double for something as loose and spill-prone as shake.

A few practical notes that follow from the shape of each one:

- **Shake: close it tight, don't crush it.** It's already in pieces, so pressure turns fragments into dust. Keep the container upright and avoid jamming it into a full pocket or bag.
- **Smalls: give them room.** Whole buds hold up better when they aren't packed under weight.
- **Both: follow the printed storage line.** The label's recommended storage conditions were written for that product. Use them.
- **Both: date check.** The packaging date is on the label. Note it when you open the pack.

Keep it simple. The jar does the job when the lid's on and it's stored where it should be.

## Quick answers

**Shake vs smalls: are they the same product?**
No. Shake is broken fragments; smalls are whole little buds. Both are dried cannabis under federal rules.

**What is shake weed, in one line?**
The loose bits of dried flower that break off buds during handling.

**Is shake the same as ground flower?**
Not quite. Shake comes loose on its own; ground or milled flower was broken up on purpose before packing. Check the package description to know which you have.

**Does the word on the menu tell me what's in the pack?**
It tells you the shape. The label's Total THC, Total CBD and net weight tell you the rest.

## St Clair Cannabis: read the board, then the label

At St Clair Cannabis we'd rather you walk in knowing the difference than nod along at the counter. Now you've got **shake vs smalls** straight: crumbs on one side, whole little buds on the other, same dried cannabis class on both labels. Bring valid government photo ID (19+), ask to see the package, and read it before you pick. For walk-in details, use our [visit page](/visit), and for the wider flower lineup, start with the [weed and flower guide](/resources/weed-flower-guide).`;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(value: string): string {
  let text = escapeHtml(value);
  text = text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
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
  datePublished: "2026-10-26",
  dateModified: "2026-10-26",
  author: { "@type": "Organization", name: "St Clair Cannabis" },
  publisher: { "@type": "Organization", name: "St Clair Cannabis" },
};

export default function ShakeVsSmallsPage() {
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
