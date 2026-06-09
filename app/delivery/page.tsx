import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — St Clair Cannabis | Toronto",
  description: "Get notified when St Clair Cannabis launches same-day weed delivery across Toronto and surrounding areas.",
  alternates: {
    canonical: "https://stclaircannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
