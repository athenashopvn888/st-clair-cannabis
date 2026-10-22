import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CODED_NAP } from "../lib/fleet/coded";
import { getFleetContent } from "../lib/fleetContent";
import styles from "./contact.module.css";

export const dynamic = "force-dynamic";

const CONTACT_METADATA: Metadata = {
  title: "Contact Us — St Clair Cannabis | 875 St Clair Ave W, Toronto",
  description:
    "Visit St Clair Cannabis at 875 St Clair Ave W, Toronto, ON M6C 1C4. We are open 24 hours a day, 7 days a week. Walk-ins welcome.",
  alternates: {
    canonical: "https://stclaircannabis.com/contact",
  },
  openGraph: {
    title: "Contact St Clair Cannabis — Toronto Dispensary",
    description:
      "875 St Clair Ave W, Toronto. We are open 24 hours a day, 7 days a week. Premium cannabis, always fire.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return CONTACT_METADATA;
  const page = fleet.pages.Contact;
  const description = page?.metaDescription || "";
  const title = page?.metaTitle || "";
  if ((!description || description === CONTACT_METADATA.description) && !title) return CONTACT_METADATA;
  return {
    ...CONTACT_METADATA,
    ...(description && description !== CONTACT_METADATA.description ? { description } : {}),
    ...(title ? { title: { absolute: title } } : {}),
  };
}

export default async function ContactPage() {
  const fleet = await getFleetContent();
  const hoursCustom = fleet.active && fleet.nap.hours !== CODED_NAP.hours;
  return (
    <main className={styles.main}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <img src="/banners/08_Contact_Us.webp" alt="Contact Us" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
          <h1 className={styles.heroTitle} data-fullname-contact-h1="" style={{ marginTop: "16px", textAlign: "center", fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2, overflowWrap: "anywhere" }}>Contact {fleet.nap.name}</h1>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                {fleet.nap.street}
                <br />
                {fleet.nap.cityLine}
                <br />
                <span className={styles.infoMuted}>{fleet.nap.areaLine}</span>
              </p>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}><span>Monday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Tuesday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Wednesday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Thursday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Friday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Saturday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Sunday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
              </div>
              <div className={styles.openBadge}>
                <div className={styles.openDot} />
                {hoursCustom ? fleet.nap.hours : "Open 24 Hours"}
              </div>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you find the perfect strain.
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Browse the current flower board
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Lab-tested &amp; safe
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
