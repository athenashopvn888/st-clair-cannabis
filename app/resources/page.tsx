import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../visit/visit.module.css";

const BASE="https://stclaircannabis.com";
export const metadata:Metadata={title:{absolute:"Resources | St Clair Cannabis"},description:"St Clair Cannabis resources for St Clair West: name guides, flower tiers, walk-in planning, Native Cigarettes, and separate Nicotine Vape and THC Vape shelves.",alternates:{canonical:`${BASE}/resources`},robots:{index:true,follow:true}};
const cards=[
  ["Name Guides","/guides","Stock-gated guides for current strain, Native Cigarettes, Nicotine Vape, and THC Vape names."],
  ["Top Weed Tiers","/exotic-weed","Start with Exotic Weed, then compare Premium Weed and AAA+ Weed."],
  ["Visit St Clair West","/visit","Verified address, phone, posted hours, TTC context, and walk-in planning."],
  ["24-Hour Guide","/24-hour-dispensary-st-clair-west","The hour-specific page for the same St Clair West storefront."],
  ["Native Cigarettes","/native-cigarettes-st-clair-west","Adult tobacco category context and the current cigarette board."],
  ["Nicotine Vape","/nicotine-vape-st-clair-west","Nicotine devices kept separate from THC vape listings. Nicotine is addictive."],
];
const latestArticles=[
  ["Dab Pen vs Dab Rig: The Straight-Talk Guide to Two Very Different Tools","/resources/dab-pen-vs-dab-rig","Somebody at the counter says dab, and half the room pictures a glass torch rig while the other half pictures a pocket pen."],
  ["Pink Gelato Strain, Explained: What the Name Tells You and What It Doesn't","/resources/pink-gelato-strain","Pink Gelato is a name that keeps turning up in Toronto strain searches, and a name on a jar is a label line, not a spec sheet."],
  ["Indoor vs Outdoor Weed vs Greenhouse: How Grow Method Words Work on a Menu","/resources/indoor-vs-outdoor-vs-greenhouse-cannabis","St Clair Cannabis explains the indoor vs outdoor weed question for adults 19+: what each method means and why the label board still matters."],
  ["Shake vs Smalls: Two Flower Words, Two Very Different Things","/resources/shake-vs-smalls","Somebody asks for shake, gets shown smalls, and walks off convinced they're the same thing."],
];
export default function Page(){const graph={"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":`${BASE}/resources#webpage`,url:`${BASE}/resources`,name:"Resources | St Clair Cannabis",isPartOf:{"@id":`${BASE}/#website`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:BASE},{"@type":"ListItem",position:2,name:"Resources",item:`${BASE}/resources`}]}]};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}}/><Navbar/><main className={styles.main}><section className={styles.hero}><p className={styles.eyebrow}>St Clair West Resource Centre · Adults 19+</p><h1>St Clair Cannabis Resources</h1><p className={styles.lede}>Use these store-scoped resources to choose the right menu lane, understand a listed name, and plan a walk-in without treating evergreen copy as a stock promise.</p></section><section><h2>Choose a resource</h2><div className={styles.actions}>{cards.map(([title,href])=><Link href={href} key={href}>{title}</Link>)}</div>{cards.map(([title,href,text])=><article className={styles.faqItem} key={href}><h3><Link href={href}>{title}</Link></h3><p>{text}</p></article>)}</section><section className={styles.latestArticles} aria-labelledby="latest-articles"><h2 id="latest-articles">Latest articles</h2><p className={styles.ageNote}>Adults 19+.</p>{latestArticles.map(([title,href,text])=><article className={styles.faqItem} key={href}><h3><Link href={href}>{title}</Link></h3><p>{text}</p></article>)}</section></main><Footer/></>}
