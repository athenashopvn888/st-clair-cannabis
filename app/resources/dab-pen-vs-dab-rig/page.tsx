import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./article.module.css";

const CANONICAL = "https://stclaircannabis.com/resources/dab-pen-vs-dab-rig";
const TITLE = "Dab Pen vs Dab Rig: The Straight-Talk Guide to Two Very Different Tools";
const DESCRIPTION =
  "Somebody at the counter says dab, and half the room pictures a glass torch rig while the other half pictures a pocket pen.";

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

const ARTICLE_BODY = `# Dab Pen vs Dab Rig: The Straight-Talk Guide to Two Very Different Tools

Last checked: November 10, 2026

Somebody at the counter says "dab," and suddenly half the room is picturing a glass contraption with a torch and the other half is picturing something that fits in a jacket pocket. Both are right. That's the problem. **Dab pen vs dab rig** is one of those questions that sounds simple until you notice everybody online is using the words a little differently. So St Clair Cannabis is doing what we always do: read the board first, then the label. Here's the plain-language breakdown, hardware words only. Adults 19+ only.

## What is a dab rig?

A dab rig is a water pipe built for concentrates instead of flower. Instead of a bowl you pack with bud, a rig has a **nail** (often a bucket-shaped quartz piece people call a **banger**) where a small amount of concentrate goes onto a hot surface and turns to vapour, which then travels through the water chamber to the mouthpiece. Leafly's glossary describes the same setup: a water-cooled piece with a nail as the heated surface.

Three things define a rig:

1. **The nail or banger.** The hot spot. Quartz, ceramic or titanium, depending on the build.
2. **The carb cap.** A small cover that sits over the nail to control airflow and hold in heat, per Leafly's glossary.
3. **The heat source.** Either a handheld butane torch, or an **e-nail / e-rig**, where the nail is heated electrically and you set the temperature on a controller instead of eyeballing it with a flame.

Add a **dab tool**, a small pick or scoop for moving concentrate, and you have the whole kit.

Everything else, the glass shape, the percolators, the fancy recyclers, is variation on that skeleton.

## What is a dab pen?

A dab pen is a battery-powered, self-contained device for concentrates, usually shaped like a thick vape pen. Leafly calls it a device that "sits between a vape pen and a dab rig." You unscrew the mouthpiece, load a small amount of concentrate into a little **oven** or bowl (often ceramic), screw it back on, press the button and draw. No torch, no nail, no water.

Here's where the internet gets sloppy. People say "dab pen" when they mean a **cartridge vape**, and they're not the same thing. A cartridge comes pre-filled with oil and you just click it onto a battery. With a true dab pen, Leafly notes, there's no cartridge: you put the concentrate in yourself. One line to remember: **cart = pre-filled, dab pen = you load it.** (Disposable vape pens are their own lane; we're not covering those here.)

## Rig and pen, side by side

| | Dab rig | Dab pen |
|---|---|---|
| Heat source | Butane torch or electric e-nail | Built-in battery |
| Where concentrate goes | Hot nail or banger | Small oven or bowl inside the pen |
| Water | Yes, a water chamber | No |
| Setup | Several parts, needs a stable surface | One device, screw-on mouthpiece |
| Size | Tabletop glass | Pocket-sized |
| Cleaning | Nail, glass and water | Oven and mouthpiece |
| Learning curve | Steeper | Gentler |

Read the table like a board, not a ranking. A rig and a pen aren't competing for a trophy. They're built for different situations, and the right one depends on how you want to set up, not on which one is "better."

## Dab pen vs dab rig: which one fits you?

The short answer: pick the rig if you want a fixed home setup and don't mind parts, pick the pen if you want one device with no torch and no water. Some practical questions to sort it:

- **Do you want a torch in the picture at all?** If not, look at a pen or an e-rig.
- **Will it live on one shelf, or move around?** Rigs like a stable home base.
- **How much cleaning will you actually do?** Be honest. A rig has more pieces to keep clean.
- **Do you want to load it yourself?** If you'd rather not handle sticky concentrate, a cartridge vape is a different product entirely, and that's fine.

**Torch line, kept practical:** if a torch is part of your setup, follow the maker's instructions, keep it away from anything flammable, let the nail cool fully before you touch it, and store the torch and fuel where the instructions say.

## How do you clean a dab pen and a dab rig?

You clean a dab pen by wiping the oven with a cotton swab and isopropyl alcohol and checking the maker's manual before soaking any part, which matches Leafly's guide. Leafly also flags that dead batteries and clogged mouthpieces are the usual reasons a pen stops working.

For a rig, the basics: swap the water every session, swab the nail or banger once it has cooled, and give the glass a proper alcohol-and-rinse clean when it starts looking cloudy. Sticky residue is the enemy of both.

## What does the concentrate label tell you?

The label tells you more than the slang ever will. Health Canada's consumer label guide lists **cannabis extracts** as their own class, including wax, shatter, resin and rosin, so whatever goes on a nail or into a pen oven is an extract on the package. The guide says extract labels must show:

- the **class** (cannabis extract),
- **Total THC and Total CBD** on the front,
- a **list of ingredients**, plus any food allergens,
- the **packaging date and lot number**,
- **recommended storage conditions**.

Quick texture words you'll see, one line each: **shatter** is the glassy, snappable one; **wax** is soft and crumbly-to-creamy; **diamonds** are the crystal-looking ones. That's the dictionary version. The label tells you which class you're holding.

## Searching "dab pen Toronto"?

If you typed "dab pen Toronto" into a search bar, you probably want to see the hardware and the concentrate labels up close before you choose. Fair. That's the right instinct. Ask at the counter, look at the actual packages, and compare what's on today's board, not an old screenshot. If you like how-it's-grown homework too, our breakdown of [indoor vs outdoor vs greenhouse cannabis](/resources/indoor-vs-outdoor-vs-greenhouse-cannabis) is the same read-the-label habit applied to flower.

## Quick answers

**Is a dab pen the same as a vape pen?** Not exactly. A cartridge vape is pre-filled; a dab pen is loaded by you.

**Do I need a torch for a dab rig?** Not always. An e-nail or e-rig heats electrically.

**Does the device change what's in the concentrate?** No. The label tells you what's in it.

## Come compare dab pen vs dab rig at St Clair Cannabis

Still weighing it up? Come by St Clair Cannabis, read the board, ask to see the labels, and we'll walk you through it lane by lane. Find us through our [visit page](/visit). Adults 19+ only. Bring government-issued photo ID.`;

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
  datePublished: "2026-11-16",
  dateModified: "2026-11-16",
  author: { "@type": "Organization", name: "St Clair Cannabis" },
  publisher: { "@type": "Organization", name: "St Clair Cannabis" },
};

export default function DabPenVsDabRigPage() {
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
