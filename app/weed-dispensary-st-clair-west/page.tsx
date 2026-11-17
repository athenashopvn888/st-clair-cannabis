import LocalIntentPage,{localMetadata} from "../components/LocalIntentPage";
const base=localMetadata("/weed-dispensary-st-clair-west","dispensary");
export const metadata={
  ...base,
  title:{absolute:"Weed Dispensary near me in St Clair West | St Clair Cannabis"},
  twitter:{
    card:"summary_large_image",
    title:"St Clair Cannabis Dispensary Weed Delivery | St Clair West",
    description:"Browse the St Clair West menu and plan a walk-in at 875 St Clair Ave W, Toronto. Open 24 Hours.",
    images:["https://stclaircannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
};
export default function Page(){return <LocalIntentPage path="/weed-dispensary-st-clair-west" kind="dispensary"/>}
