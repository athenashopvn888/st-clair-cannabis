import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../visit/visit.module.css";

export const STC = {
  name:"St Clair Cannabis", base:"https://stclaircannabis.com", address:"875 St Clair Ave W, Toronto, ON M6C 1C4",
  street:"875 St Clair Ave W", phone:"(437) 783-2483", tel:"tel:+14377832483", hours:"Open 24 Hours",
};
export type LocalKind = "dispensary"|"hours"|"cigarettes"|"nicotine"|"visit";
const COPY = {
  dispensary:{eyebrow:"St Clair West cannabis store · Walk-in · Adults 19+", title:"Weed Dispensary in St Clair West", description:"Local guide to St Clair Cannabis at 875 St Clair Ave W, serving adults 19+ near Wychwood, Corso Italia, Oakwood Village, and Hillcrest.", category:"/exotic-weed", categoryLabel:"flower menu", intro:"Use this page to connect the St Clair West neighbourhood to the store’s five flower collections without turning a city-wide query into a stock promise.", distinction:"Flower is organized into Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed. Each tier links to its own current board."},
  hours:{eyebrow:"Open 24 Hours · St Clair West · Adults 19+", title:"24-Hour Dispensary in St Clair West", description:"Plan a late-night or early-morning walk-in at St Clair Cannabis, 875 St Clair Ave W. Open 24 Hours; adults 19+ with government photo ID.", category:"/exotic-weed", categoryLabel:"store menu", intro:"This is the hour-specific planning page for the same St Clair West storefront. It does not create a second location or a separate overnight menu.", distinction:"The posted schedule is Open 24 Hours. Check the homepage before travelling in case a temporary notice affects access."},
  cigarettes:{eyebrow:"Native Cigarettes · St Clair West · Adults 19+", title:"Native Cigarettes in St Clair West", description:"Native Cigarettes category guide for St Clair Cannabis at 875 St Clair Ave W. Check the live cigarette board for current brands and pack styles.", category:"/items/cigarettes", categoryLabel:"Native Cigarettes board", intro:"This page owns the adult tobacco lane near St Clair West and keeps it separate from cannabis flower and vape categories.", distinction:"Brand and pack-style names can rotate. Use the current category and package label for full, lights, silver, menthol, pack, or carton details."},
  nicotine:{eyebrow:"Nicotine Vape · St Clair West · Adults 19+", title:"Nicotine Vape in St Clair West", description:"Nicotine Vape category guide for St Clair Cannabis at 875 St Clair Ave W. Nicotine is addictive; keep nicotine and THC vape menus separate.", category:"/items/vapes", categoryLabel:"Nicotine Vape board", intro:"This page routes adult nicotine-vape intent to the correct shelf instead of mixing it with the THC vape collection.", distinction:"Nicotine devices are listed at /items/vapes. THC vape products remain at /items/vape-disposables. Read the current item and package label."},
  visit:{eyebrow:"St Clair West · Walk-in · Adults 19+", title:"Visit St Clair Cannabis on St Clair Avenue West", description:"Plan a walk-in to St Clair Cannabis at 875 St Clair Ave W near Wychwood, Corso Italia, Oakwood Village, and the 512 St Clair streetcar.", category:"/exotic-weed", categoryLabel:"store menu", intro:"Use this reach page for the verified store address, phone, posted hours, and direct links to today’s category boards.", distinction:"Street parking is available along St Clair Avenue West. The 512 St Clair streetcar and local TTC routes serve the corridor."},
} as const;

export function localMetadata(path:string, kind:LocalKind):Metadata { const c=COPY[kind]; return {title:{absolute:`${c.title} | ${STC.name}`},description:c.description,alternates:{canonical:`${STC.base}${path}`},robots:{index:true,follow:true},openGraph:{title:c.title,description:c.description,url:`${STC.base}${path}`,type:"website"}}; }

export default function LocalIntentPage({path,kind}:{path:string;kind:LocalKind}) {
  const c=COPY[kind]; const canonical=`${STC.base}${path}`;
  const faqs=[
    {q:`Where is ${STC.name}?`,a:`${STC.name} is at ${STC.address}.`},
    {q:"What hours are posted?",a:`The site posts ${STC.hours}. Check the homepage for a current temporary notice before travelling.`},
    {q:`Where do I check the current ${c.categoryLabel}?`,a:`Use ${c.category}. Category and item pages are the current website board; this local guide does not reserve stock.`},
    {q:"Who can enter?",a:"Adults 19+ with valid government-issued photo ID."},
  ];
  const graph={"@context":"https://schema.org","@graph":[
    {"@type":"WebPage","@id":`${canonical}#webpage`,url:canonical,name:c.title,description:c.description,isPartOf:{"@id":`${STC.base}/#website`},about:{"@id":`${STC.base}/#store`},spatialCoverage:{"@type":"Place",name:"St Clair West, Toronto"}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:STC.base},{"@type":"ListItem",position:2,name:c.title,item:canonical}]},
    {"@type":"FAQPage",mainEntity:faqs.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))},
  ]};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}}/><Navbar/><main className={styles.main}>
    <section className={styles.hero}><p className={styles.eyebrow}>{c.eyebrow}</p><h1>{c.title}</h1><p className={styles.lede}>{c.intro}</p></section>
    <section className={styles.nap}><h2>Store details</h2><p><strong>{STC.name}</strong><br/>{STC.address}<br/><a href={STC.tel}>{STC.phone}</a><br/>{STC.hours}</p><div className={styles.actions}><Link href={c.category}>Open the {c.categoryLabel}</Link><Link href="/guides">Browse name guides</Link><Link href="/visit">Plan a visit</Link></div></section>
    <section><h2>{c.title}: the correct St Clair West lane</h2><p>{c.distinction} This route is written for the St Clair Avenue West corridor and the nearby Wychwood, Corso Italia, Oakwood Village, and Hillcrest areas already documented by the store. It does not invent a second address, delivery zone, product, or availability claim.</p><p>The homepage remains the main store hub. Use this page for local context, then use the linked category for what the website currently publishes. If one exact item is the reason for the trip, open its item page immediately before travelling or call {STC.phone}.</p></section>
    <section><h2>How to use today&apos;s board</h2><ol className={styles.steps}><li><strong>Start with the correct lane.</strong> Open <Link href={c.category}>{c.categoryLabel}</Link>.</li><li><strong>Compare current listings.</strong> Product names and formats can rotate; do not rely on an older screenshot.</li><li><strong>Plan the walk-in.</strong> Confirm the address and posted schedule on <Link href="/visit">the visit page</Link>.</li><li><strong>Bring ID.</strong> The store is for adults 19+ with valid government-issued photo ID.</li></ol></section>
    <section><h2>Nearby St Clair West context</h2><p>The store is on St Clair Avenue West. The local context used across this site is Wychwood, Corso Italia, Oakwood Village, Hillcrest, and Midtown West. Transit context is the 512 St Clair streetcar and local TTC routes. These references describe the established corridor; they are not claims about travel time, parking availability at a specific moment, or service outside the walk-in store.</p><div className={styles.actions}><Link href="/weed-dispensary-st-clair-west">St Clair West dispensary</Link><Link href="/24-hour-dispensary-st-clair-west">24-hour guide</Link><Link href="/native-cigarettes-st-clair-west">Native Cigarettes</Link><Link href="/nicotine-vape-st-clair-west">Nicotine Vape</Link></div></section>
    <section><h2>Frequently asked questions</h2><div className={styles.faqList}>{faqs.map(f=><article key={f.q} className={styles.faqItem}><h3>{f.q}</h3><p>{f.a}</p></article>)}</div></section>
  </main><Footer/></>;
}
