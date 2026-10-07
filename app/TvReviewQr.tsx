import Image from "next/image";

import styles from "./TvReviewQr.module.css";

export default function TvReviewQr() {
  return (
    <aside className={styles.card} aria-label="Review St Clair Cannabis on Google">
      <Image
        className={styles.image}
        src="/store-review-qr.png"
        alt="QR code to review St Clair Cannabis on Google"
        width={348}
        height={348}
        sizes="8vw"
        priority
      />
      <span className={styles.note}>SCAN FOR REVIEW</span>
    </aside>
  );
}
