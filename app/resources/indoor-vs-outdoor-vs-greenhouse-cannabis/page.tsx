import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "./article.module.css";

const CANONICAL = "https://stclaircannabis.com/resources/indoor-vs-outdoor-vs-greenhouse-cannabis";
const TITLE = "Indoor vs Outdoor Weed vs Greenhouse: How Grow Method Words Work on a Menu";
const DESCRIPTION =
  "St Clair Cannabis explains the indoor vs outdoor weed question for adults 19+: what each method means and why the label board still matters.";

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

const ARTICLE_BODY = `# Indoor vs Outdoor Weed vs Greenhouse: How Grow Method Words Work on a Menu

Last checked: October 25, 2026

Start with the correct lane. A lot of menu cards add a grow-method tag: indoor, outdoor, greenhouse, sometimes "sun-grown" or "living soil". St Clair Cannabis explains the **indoor vs outdoor weed** question for adults 19+, in an orderly way: what each method means, how the words are used, and why the label board still matters more than the tag.

## Indoor vs outdoor weed: the definitions

**Indoor**: grown inside a building under artificial lights, with temperature, humidity and airflow controlled by the grower.

**Outdoor**: grown outside in natural sunlight and weather, usually through one growing season.

**Greenhouse**: grown inside a structure that lets in natural sunlight, often with extra lighting and climate controls added.

Three lanes. Each is a description of where and how the plant grew.

## How the methods compare, on paper

| | Indoor | Greenhouse | Outdoor |
|---|---|---|---|
| Light source | Artificial | Sun, often supplemented | Sun |
| Climate control | High | Medium | Low |
| Harvests per year | Can be several | Can be several | Usually one |
| Weather exposure | None | Some | Full |

These are general descriptions of the methods. They don't rank the results.

## Other grow words you'll see

**Sun-grown**: another way to say outdoor or greenhouse grown with natural light.

**Light deprivation ("light dep")**: covering greenhouse plants for part of the day to control their light cycle.

**Hydroponic**: plants grown in a nutrient solution or inert medium rather than soil.

**Soil-grown**: plants grown in soil.

**Living soil**: a soil-based method that aims to maintain an active soil ecosystem.

All of these are method descriptions. None is regulated label language.

## What the grow tag doesn't tell you

Use today's board, not the tag:
- Not Total THC or Total CBD.
- Not a grade.
- Not an effect.
- Not freshness. That's the packaging date.

Two products with the same grow tag can look, smell and measure differently.

## Where to find the facts that are regulated

Required label lines include the class, net weight, Total THC and Total CBD, lot number, packaging date, storage conditions and the health warning in a yellow box. Grow method usually isn't required. When it appears, it's extra information from the producer.

## How to use grow-method words when comparing

1. Treat the tag as a description of method.
2. Compare products using the label lines.
3. Check the packaging date.
4. Ask staff what a specific tag means on that product.
5. Decide on your own preference.

## Myths, set straight

**"Indoor is always better."** It's more controlled, which some people prefer. It isn't a ranking.

**"Outdoor means wild or unregulated."** Legal outdoor cannabis follows the same product and labelling rules.

**"Greenhouse is a compromise."** It's its own method, mixing natural light with controls.

**"Living soil means organic certified."** Not necessarily. Certification is a separate claim.

## Storage, whatever the lane

Keep products in their original child-resistant packaging, sealed, cool, dark and dry, and out of reach of kids and pets.

## A grow-method glossary, laid out in lanes

| Word | Lane |
|---|---|
| Indoor | Inside, artificial light |
| Outdoor | Outside, natural light |
| Greenhouse | Covered, natural light, often supplemented |
| Sun-grown | Natural light (outdoor or greenhouse) |
| Light dep | Greenhouse light control |
| Hydroponic | Nutrient solution or inert medium |
| Soil-grown | Grown in soil |
| Living soil | Soil method focused on soil ecosystem |

## How to use today's board with grow tags

Step by step:
1. Note the grow tag as context.
2. Read the class line.
3. Read net weight.
4. Read Total THC and Total CBD.
5. Read the packaging date.
6. Compare two products on steps 2 to 5 only.

The tag tells you a story about method. The label lines are what you compare.

## Why growers choose different lanes

In general terms, growers weigh control, scale, season and resources. Indoor gives the most control. Outdoor relies on the season. Greenhouse sits between the two. Those are operational choices, and they don't translate into a ranking on the shelf.

## What to ask staff

- Is this indoor, outdoor or greenhouse?
- What does this tag mean for this producer?
- What's the packaging date?

Orderly questions get orderly answers.

## Next step

See store details on our [St Clair West weed dispensary](/weed-dispensary-st-clair-west) page, and check the [visit page](/visit) before coming in.

Indoor vs outdoor weed vs greenhouse: three grow methods, one label format. St Clair Cannabis is for adults 19 and over. Staff ask for ID from anyone who looks under 25.`;

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
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  author: { "@type": "Organization", name: "St Clair Cannabis" },
  publisher: { "@type": "Organization", name: "St Clair Cannabis" },
};

export default function IndoorVsOutdoorVsGreenhousePage() {
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
