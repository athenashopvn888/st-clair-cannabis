"use client";
import { useEffect, useState } from "react";
import { isTobaccoWindow, NIGHT_FLASH_MESSAGE, NIGHT_PRICE_LIST } from "../lib/tobaccoWindow.mjs";
import styles from "../tv2/tv2.module.css";

/** True only 17:00-07:59 America/Toronto. Starts false so daytime never flashes tobacco content. */
export function useNightWindow(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(isTobaccoWindow());
    sync();
    const t = window.setInterval(sync, 30_000);
    return () => window.clearInterval(t);
  }, []);
  return on;
}

/** Night: fleet cigarette price card. Day: a non-cigarette St Clair banner (no THC-only art exists). */
export function NightBoardCard({ night }: { night: boolean }) {
  if (night && isTobaccoWindow()) {
    return (
      <div className={styles.card} data-promo-card="CIGARETTES" style={{ "--accent": "#4d1769" } as React.CSSProperties}>
        <div className={styles.cardHeader}>🚬 CIGARETTES</div>
        <div className={styles.nightList}>
          {NIGHT_PRICE_LIST.map((c) => (
            <div key={c.name} className={styles.nightRow}><span>{c.name}</span><b>{c.price}</b></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.card} data-promo-card="DAYTIME_PROMO" style={{ "--accent": "#16a34a" } as React.CSSProperties}>
      <div className={styles.cardHeader}>PROMO</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.dayPromoImg} src="/banners/edibles_prerolls_more_banner.webp" alt="Edibles, pre-rolls and more at St Clair Cannabis" />
    </div>
  );
}

export function NightBoardTicker({ night }: { night: boolean }) {
  if (!night || !isTobaccoWindow()) return null;
  return (
    <div data-cigarette-ticker="" role="marquee" aria-label={NIGHT_FLASH_MESSAGE}
      style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50, overflow: "hidden", whiteSpace: "nowrap", background: "#b91c1c", color: "#fff", fontWeight: 900, fontSize: "clamp(18px, 2.2vw, 34px)", letterSpacing: "0.04em", padding: "8px 0", display: "flex", gap: 64 }}>
      <style>{"@keyframes stcNightTicker{from{transform:translateX(0)}to{transform:translateX(-100%)}}"}</style>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} aria-hidden={i > 0 ? "true" : undefined} style={{ flex: "none", animation: "stcNightTicker 18s linear infinite" }}>{NIGHT_FLASH_MESSAGE}</span>
      ))}
    </div>
  );
}
