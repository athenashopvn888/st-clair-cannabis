import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import MobileBottomBar from "./components/MobileBottomBar";
import PinnedNavClearance from "./components/PinnedNavClearance";
import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./lib/cigaretteFeed";
import { CODED_BANNERS, CODED_NAP } from "./lib/fleet/coded";
import { getFleetContent } from "./lib/fleetContent";
import type { Nap } from "./lib/fleet/types";
import { HOME_DOC_TITLE } from "./lib/homeStorefront";
import { storeDirectionsUrl } from "./lib/mobileBottomBar";

// Cigarette on/off is read in this layout. Refresh it about every minute
// so nav, footer, and store copy follow the feed without a rebuild.
export const revalidate = 60;

const ROOT_METADATA: Metadata = {
  metadataBase: new URL("https://stclaircannabis.com"),
  title: {
    default: HOME_DOC_TITLE,
    template: "%s | St Clair Cannabis",
  },
  description:
    "Explore Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed flower collections at St Clair Cannabis in Toronto. Open 24 Hours.",
  keywords: [
    "cannabis dispensary Toronto",
    "weed store Toronto",
    "exotic flower Toronto",
    "premium cannabis",
    "St Clair Cannabis",
    "cheap weed Toronto",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles Toronto",
    "vapes",
    "pre-rolls",
    "native cigarettes Toronto",
    "weed store St Clair West",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://stclaircannabis.com",
    siteName: "St Clair Cannabis",
    title: HOME_DOC_TITLE,
    description:
      "Explore five Weed flower collections at St Clair Cannabis in Toronto. Open 24 Hours.",
    images: [
      {
        url: "https://stclaircannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "St Clair Cannabis — Premium Cannabis Dispensary Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_DOC_TITLE,
    description: "Browse the St Clair West menu and plan a walk-in at 875 St Clair Ave W, Toronto. Open 24 Hours.",
    images: ["https://stclaircannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://stclaircannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return ROOT_METADATA;
  const description = fleet.pages.Home?.metaDescription || "";
  if (!description || description === ROOT_METADATA.description) return ROOT_METADATA;
  return {
    ...ROOT_METADATA,
    description,
    openGraph: { ...ROOT_METADATA.openGraph, description },
    twitter: { ...ROOT_METADATA.twitter, description },
  };
}

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://stclaircannabis.com/#store",
  name: "St Clair Cannabis Dispensary Weed Delivery",
  alternateName: "St Clair Cannabis",
  hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJ_XEXu-83K4gRPYwmtch7b_8",
  sameAs: ["https://www.google.com/maps/place/?q=place_id:ChIJ_XEXu-83K4gRPYwmtch7b_8"],
  description: "Cannabis dispensary at 875 St Clair Ave W in Toronto, ON. Explore Exotic Weed, Premium Weed, AAA+ Weed, AA Weed and Budget Weed flower collections. Open 24 Hours.",
  url: "https://stclaircannabis.com",
  telephone: "+14377832483",
  image: "https://stclaircannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "875 St Clair Ave W",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M6C 1C4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6797607,
    longitude: -79.433162,
  },
  openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
],
  areaServed: {
    "@type": "City",
    name: "Toronto",
  },
};
function schemaUnchanged(nap: Nap) {
  const address = jsonLd.address;
  const geo = jsonLd.geo;
  return nap.schemaName === jsonLd.name
    && nap.name === CODED_NAP.name
    && nap.phoneTel.replace(/^tel:/, "") === jsonLd.telephone
    && nap.street === address.streetAddress
    && nap.city === address.addressLocality
    && nap.province === address.addressRegion
    && nap.postalCode === address.postalCode
    && nap.lat === String(geo.latitude)
    && nap.lng === String(geo.longitude)
    && nap.website === jsonLd.url
    && nap.mapsSearchUrl === jsonLd.hasMap;
}

function storeJsonLdFor(nap: Nap) {
  if (schemaUnchanged(nap)) return jsonLd;
  const phone = nap.phoneTel.replace(/^tel:/, "");
  return {
    ...jsonLd,
    name: nap.schemaName,
    alternateName: nap.name,
    telephone: phone,
    url: nap.website,
    hasMap: nap.mapsSearchUrl,
    address: {
      ...jsonLd.address,
      streetAddress: nap.street,
      addressLocality: nap.city,
      addressRegion: nap.province,
      postalCode: nap.postalCode,
    },
    geo: {
      ...jsonLd.geo,
      latitude: Number(nap.lat),
      longitude: Number(nap.lng),
    },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://stclaircannabis.com/#website",
  url: "https://stclaircannabis.com",
  name: "St Clair Cannabis",
  publisher: { "@id": "https://stclaircannabis.com/#store" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cigaretteSnapshot, fleet] = await Promise.all([getCigaretteSnapshot(), getFleetContent()]);
  const cigarettes = toPublicCigaretteState(cigaretteSnapshot);
  const storeJsonLd = fleet.active ? storeJsonLdFor(fleet.nap) : jsonLd;
  const banners = fleet.banners.length ? fleet.banners : CODED_BANNERS;
  const directionsUrl = storeDirectionsUrl(
    fleet.nap.mapsSearchUrl,
    `${fleet.nap.street}, ${fleet.nap.city}, ${fleet.nap.province} ${fleet.nap.postalCode}`,
  );
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <meta name="geo.position" content="43.6797607;-79.433162" />
        <meta name="ICBM" content="43.6797607, -79.433162" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TNWC4CGQ1M"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TNWC4CGQ1M');
            `
          }}
        />
      </head>
      <body>
        <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap, banners }}>
          <CigaretteStateProvider value={cigarettes}>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
            <MobileBottomBar directionsUrl={directionsUrl} />
            <AgeGate />
          </CigaretteStateProvider>
        </FleetContentProvider>
      </body>
    </html>
  );
}
