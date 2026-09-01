import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://stclaircannabis.ca"),
  title: {
    default: "St Clair Cannabis — Premium Cannabis Dispensary, Toronto",
    template: "%s | St Clair Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at St Clair Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. Toronto's uplifting dispensary at 875 St Clair Ave W. Open 24 Hours.",
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
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://stclaircannabis.ca",
    siteName: "St Clair Cannabis",
    title: "St Clair Cannabis — Premium Toronto Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. Toronto's uplifting dispensary at 875 St Clair Ave W. Open 24 Hours.",
    images: [
      {
        url: "https://stclaircannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "St Clair Cannabis — Premium Cannabis Dispensary Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St Clair Cannabis — Toronto's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open 24 Hours at 875 St Clair Ave W, Toronto.",
    images: ["https://stclaircannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg"],
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
    canonical: "https://stclaircannabis.ca",
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
  "@id": "https://stclaircannabis.ca",
  name: "St Clair Cannabis",
  description: "Cannabis dispensary at 875 St Clair Ave W in Toronto, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://stclaircannabis.ca",
  telephone: "+14375953295",
  image: "https://stclaircannabis.ca/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
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
  sameAs: [
    "https://stclaircannabis.ca/",
  ],
  hasMap: "https://stclaircannabis.ca/",
  areaServed: {
    "@type": "City",
    name: "Toronto",
  },
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
