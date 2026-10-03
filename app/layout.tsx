import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { HOME_TITLE } from "./lib/homeStorefront";

export const metadata: Metadata = {
  metadataBase: new URL("https://stclaircannabis.com"),
  title: {
    default: HOME_TITLE,
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
    title: HOME_TITLE,
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
    title: HOME_TITLE,
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

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://stclaircannabis.com/#store",
  name: "St Clair Cannabis",
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
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://stclaircannabis.com/#website",
  url: "https://stclaircannabis.com",
  name: "St Clair Cannabis",
  publisher: { "@id": "https://stclaircannabis.com/#store" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
