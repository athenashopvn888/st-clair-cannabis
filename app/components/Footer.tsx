"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { useCigaretteState } from "./CigaretteStateProvider";
import { useFleetContent } from "./FleetContentProvider";
import { CODED_NAP } from "../lib/fleet/coded";

export default function Footer() {
  const showCigarettes = useCigaretteState().web;
  const nap = useFleetContent().nap;
  const phoneHref = nap.phoneTel.startsWith("tel:") ? nap.phoneTel : `tel:${nap.phoneTel}`;
  const hoursLabel = nap.hours === CODED_NAP.hours ? "Open 24 Hours" : nap.hours;
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 — Store Description */}
          <div className={styles.col}>
            <div className={styles.brand}>
              ST CLAIR CANNABIS
            </div>
            <p className={styles.desc}>
              Your Local Cannabis Dispensary At 875 St Clair Ave W, Toronto. Visit
              St Clair Cannabis For Premium Flower, Edibles, Vapes &amp; More.
              Open: Open 24 Hours.
            </p>
            <div className={styles.buttons}>
            </div>
          </div>

          {/* Column 2 — Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>{nap.street}</span>
              <span>{nap.cityLine}</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href={phoneHref} style={{color: "inherit"}}>{nap.phoneDisplay}</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>{hoursLabel}</span>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic-weed">Exotic Weed</Link>
              <Link href="/premium-weed">Premium Weed</Link>
              <Link href="/aaa-weed">AAA+ Weed</Link>
              <Link href="/aa-weed">AA Weed</Link>
              <Link href="/budget-weed">Budget Weed</Link>
              <Link href="/resources/weed-flower-guide">Weed &amp; Flower Guide</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/visit">Plan a Visit</Link>
              <Link href="/24-hour-dispensary-st-clair-west">24-Hour Dispensary Guide</Link>
              {showCigarettes ? <Link href="/native-cigarettes-st-clair-west">Native Cigarettes</Link> : null}
              <Link href="/nicotine-vape-st-clair-west">Nicotine Vape</Link>
              <Link href="/items/edibles">Edibles</Link>
              {showCigarettes ? <Link href="/items/cigarettes">Cigarettes</Link> : null}
              <Link href="/items/vapes">Nicotine Vape</Link>
              <Link href="/items/vape-disposables">THC Vape</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/hours">Store Hours</Link>
              <Link href="/delivery">Delivery (Coming Soon)</Link>
              <Link href="/games">Games Arcade</Link>
              <Link href="/weed-dispensary-st-clair-west">St Clair West Dispensary</Link>
              <Link href="/24-hour-dispensary-st-clair-west">Open 24 Hours</Link>
              <Link href="/contact">Contact Us</Link>
              <a
                href="https://stclaircannabis.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} St Clair Cannabis. Must be 19+ to
            enter. Please consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
