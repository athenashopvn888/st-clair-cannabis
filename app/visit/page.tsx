import LocalIntentPage,{localMetadata} from "../components/LocalIntentPage";
export const metadata=localMetadata("/visit","visit");
export default function Page(){return <LocalIntentPage path="/visit" kind="visit"/>}
