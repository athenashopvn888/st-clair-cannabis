"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { showsMobileBottomBar } from "../lib/mobileBottomBar";
import { storeHoursStatus } from "../lib/storeHoursStatus";
import styles from "./MobileBottomBar.module.css";

/**
 * Mobile-only sticky actions. Directions uses the store Google Maps link.
 * Hours copy is computed in America/Toronto from the store opening hours.
 * The nav is omitted entirely on /tv and /tv2, including the server HTML.
 */
export default function MobileBottomBar({ directionsUrl }: { directionsUrl: string }) {
  const pathname = usePathname();
  const visible = showsMobileBottomBar(pathname);
  const [status, setStatus] = useState(() => storeHoursStatus(new Date()));

  useEffect(() => {
    if (!visible) return;
    const update = () => setStatus(storeHoursStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <nav
      className={styles.bar}
      aria-label="Store actions"
      data-mobile-bottom-bar=""
      data-hours-kind={status.kind}
      suppressHydrationWarning
    >
      <a
        className={`${styles.action} ${styles.directions}`}
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Directions
      </a>
      <Link className={`${styles.action} ${styles.hours}`} href="/hours">
        <span className={styles.srOnly}>Hours. </span>
        <span className={styles.hoursLabel} suppressHydrationWarning>
          {status.label}
        </span>
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href="/exotic-weed">
        Menu
      </Link>
      <Link className={`${styles.action} ${styles.minor}`} href="/delivery">
        Delivery
      </Link>
    </nav>
  );
}
