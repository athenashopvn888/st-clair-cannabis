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
export default function Page(){const graph={"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":`${BASE}/resources#webpage`,url:`${BASE}/resources`,name:"Resources | St Clair Cannabis",isPartOf:{"@id":`${BASE}/#website`}},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:BASE},{"@type":"ListItem",position:2,name:"Resources",item:`${BASE}/resources`}]}]};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}}/><Navbar/><main className={styles.main}><section className={styles.hero}><p className={styles.eyebrow}>St Clair West Resource Centre · Adults 19+</p><h1>St Clair Cannabis Resources</h1><p className={styles.lede}>Use these store-scoped resources to choose the right menu lane, understand a listed name, and plan a walk-in without treating evergreen copy as a stock promise.</p></section><section><h2>Choose a resource</h2><div className={styles.actions}>{cards.map(([title,href])=><Link href={href} key={href}>{title}</Link>)}</div>{cards.map(([title,href,text])=><article className={styles.faqItem} key={href}><h3><Link href={href}>{title}</Link></h3><p>{text}</p></article>)}</section></main><Footer/></>}
