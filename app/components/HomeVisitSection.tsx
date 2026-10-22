"use client";

import Link from "next/link";
import { HOME_VISIT_CARDS, HOME_VISIT_FAQS, HOME_VISIT_H2, HOME_VISIT_PARAGRAPHS } from "../lib/homeStorefront";
import styles from "./HomeVisitSection.module.css";
import { useCigaretteState } from "./CigaretteStateProvider";

export default function HomeVisitSection() {
  const showCigarettes = useCigaretteState().web;
  const cards = showCigarettes
    ? HOME_VISIT_CARDS
    : HOME_VISIT_CARDS.filter((card) => card.href !== "/native-cigarettes-st-clair-west");
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: HOME_VISIT_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return <section className={styles.section} aria-labelledby="home-visit-heading"><div className={styles.inner}><h2 id="home-visit-heading">{HOME_VISIT_H2}</h2>{HOME_VISIT_PARAGRAPHS.map((p) => <p key={p}>{p}</p>)}<div className={styles.cards}>{cards.map((c) => <Link key={c.href} href={c.href}><strong>{c.title}</strong><span>{c.text}</span></Link>)}</div><h3>St Clair West store questions</h3>{HOME_VISIT_FAQS.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></section>;
}
