import { allFlowers, allItems, type FlowerProduct, type ItemProduct } from "./products";

export type GuideLane = "strain" | "native_cig" | "nic_vape" | "thc_vape";
export type GuideEntry = {
  slug: string; lane: GuideLane; name: string; title: string;
  preferredCategoryPath: string; relatedSlugs: string[]; stockMatch: RegExp;
  preferredProductSlug?: string; menuNote: string;
};
type Seed = Omit<GuideEntry, "title" | "relatedSlugs">;

const strains: Seed[] = [
  ["grease-monkey","Grease Monkey","/aaa-weed",/^GREASE MONKEY$/i,"grease-monkey"],
  ["pink-rozay","Pink Rozay","/aaa-weed",/^PINK ROZAY$/i,"pink-rozay"],
  ["peanutbutter-breathe","Peanutbutter Breathe","/aaa-weed",/^PEANUTBUTTER BREATHE$/i,"peanutbutter-breathe"],
  ["pink-icky-sticky","Pink Icky Sticky","/exotic-weed",/^PINK ICKY STICKY$/i,"pink-icky-sticky"],
  ["white-champagne","White Champagne","/aa-weed",/^WHITE CHAMPAGNE$/i,"white-champagne"],
  ["daydream-diesel","Daydream Diesel","/aa-weed",/^DAYDREAM DIESEL$/i,"daydream-diesel"],
  ["pink-lobster","Pink Lobster","/aaa-weed",/^PINK LOBSTER$/i,"pink-lobster"],
  ["white-walker-og","White Walker OG","/aaa-weed",/^WHITE WALKER OG$/i,"white-walker-og"],
  ["gmo-cookies","GMO Cookies","/premium-weed",/^GMO COOKIES$/i,"gmo-cookies"],
  ["pink-tuna","Pink Tuna","/exotic-weed",/^PINK TUNA$/i,"pink-tuna"],
  ["pink-kush","Pink Kush","/aaa-weed",/^PINK KUSH$/i,"pink-kush"],
  ["permanent-marker","Permanent Marker","/exotic-weed",/PINK PERMANENT MARKER/i,"pink-permanent-marker"],
  ["super-lemon-haze","Super Lemon Haze","/aa-weed",/^SUPER LEMON HAZE$/i,"super-lemon-haze"],
  ["pineapple-haze","Pineapple Haze","/premium-weed",/^PINEAPPLE HAZE$/i,"pineapple-haze"],
  ["master-kush","Master Kush","/aa-weed",/^MASTER KUSH$/i,"master-kush"],
  ["gelato","Gelato","/premium-weed",/GELATO/i,"pink-gelato"],
  ["slurricane","Slurricane","/aa-weed",/^SLURRICANE$/i,"slurricane"],
  ["northern-lights","Northern Lights","/budget-weed",/NORTHERN LIGHTS/i,"northern-lights-shreds"],
  ["royal-gorilla","Royal Gorilla","/aa-weed",/^ROYAL GORILLA$/i,"royal-gorilla"],
  ["red-congolese","Red Congolese","/exotic-weed",/^RED CONGOLESE$/i,"red-congolese"],
].map(([slug,name,path,stockMatch,preferredProductSlug]) => ({ slug:String(slug), lane:"strain", name:String(name), preferredCategoryPath:String(path), stockMatch:stockMatch as RegExp, preferredProductSlug:String(preferredProductSlug), menuNote:`listed on the current ${String(path).replace("-weed","").replace("/","")} flower board` } as Seed));

const nativeCigarettes: Seed[] = [
  ["canadian-classics","Canadian Classics",/CANADIAN CLASSICS/i,"canadian-classics-original"],
  ["nexus-cigarettes","Nexus",/^NEXUS/i,"nexus-full"],
  ["canadian-goose","Canadian Goose",/CANADIAN GOOSE/i,"canadian-goose-full"],
  ["putters","Putters",/^PUTTERS$/i,"putters"],
  ["time-cigarettes","Time",/^TIME FULL$/i,"time-full"],
  ["rolled-gold","Rolled Gold",/ROLLED GOLD/i,"rolled-gold-lights"],
  ["canadian-cigarettes","Canadian",/^CANADIAN (FULL|LIGHTS|MENTHOL)$/i,"canadian-full"],
  ["backwoods","Backwoods",/BACKWOODS/i,"backwoods-assorted-flavors-20-25"],
  ["grabba","Grabba",/^GRABBA$/i,"grabba"],
].map(([slug,name,stockMatch,preferredProductSlug]) => ({ slug:String(slug), lane:"native_cig", name:String(name), preferredCategoryPath:"/items/cigarettes", stockMatch:stockMatch as RegExp, preferredProductSlug:String(preferredProductSlug), menuNote:"listed on the current cigarette board" } as Seed));

const nicotineVapes: Seed[] = [
  ["ovns-vape","OVNS",/^OVNS/i,"ovns-2500-5-25k-puffs","/items/vapes"],
  ["nexa-pix-vape","Nexa Pix",/^NEXA PIX/i,"nexa-pix-30k-puffs-many-flavors","/items/vapes"],
  ["zpods-vape","Zpods",/^ZPODS?/i,"zpods-zpods-mango-pineapple-32-ml-pods-5-synthetic-nic","/items/concentrates"],
].map(([slug,name,stockMatch,preferredProductSlug,path]) => ({ slug:String(slug), lane:"nic_vape", name:String(name), preferredCategoryPath:String(path), stockMatch:stockMatch as RegExp, preferredProductSlug:String(preferredProductSlug), menuNote:"listed in the current item source; OVNS is not OVI" } as Seed));

const thcVapes: Seed[] = [
  ["gas-gang-thc-vape","Gas Gang",/GAS GANG.*(DISPO|2G|VOL)/i,"gas-gang-dispo-vape-1g"],
  ["drizzle-thc-vape","Drizzle",/DRIZZLE SWITCH/i,"drizzle-switch-3in1-2g"],
].map(([slug,name,stockMatch,preferredProductSlug]) => ({ slug:String(slug), lane:"thc_vape", name:String(name), preferredCategoryPath:"/items/vape-disposables", stockMatch:stockMatch as RegExp, preferredProductSlug:String(preferredProductSlug), menuNote:"listed on the current THC vape board" } as Seed));

const seeds = [...strains, ...nativeCigarettes, ...nicotineVapes, ...thcVapes];
const laneLabel = (lane: GuideLane) => ({ strain:"", native_cig:" Native Cigarettes", nic_vape:" Nicotine Vape", thc_vape:" THC Vape" })[lane];
const relatedFor = (seed: Seed) => seeds.filter((x) => x.lane === seed.lane && x.slug !== seed.slug).slice(0, seed.lane === "strain" ? 4 : 3).map((x) => x.slug);

export const GUIDE_REGISTRY: GuideEntry[] = seeds.map((seed) => ({
  ...seed,
  title: `${seed.name}${laneLabel(seed.lane)} at St Clair Cannabis | St Clair West`,
  relatedSlugs: relatedFor(seed),
}));

const LANES: Array<{lane:GuideLane; label:string}> = [
  {lane:"strain",label:"Strains"},{lane:"native_cig",label:"Native Cigarettes"},
  {lane:"nic_vape",label:"Nicotine Vape"},{lane:"thc_vape",label:"THC Vape"},
];
export const getGuide = (slug:string) => GUIDE_REGISTRY.find((g) => g.slug === slug);
export const getGuidesByLane = () => LANES.map((group) => ({...group,guides:GUIDE_REGISTRY.filter((g)=>g.lane===group.lane)})).filter((g)=>g.guides.length);
export function resolveGuideProduct(guide:GuideEntry): FlowerProduct | ItemProduct | undefined {
  const products = guide.lane === "strain" ? allFlowers : allItems;
  return products.find((p) => p.slug === guide.preferredProductSlug) ?? products.find((p) => guide.stockMatch.test(p.name));
}
export const getTierGuideLinks = (path:string, limit=6) => GUIDE_REGISTRY.filter((g)=>g.lane==="strain" && g.preferredCategoryPath===path).slice(0,limit);
export function getCategoryGuideGroups(path:string) {
  if(path==="/items/cigarettes") return [{label:"Native Cigarettes brand guides",guides:GUIDE_REGISTRY.filter((g)=>g.lane==="native_cig").slice(0,9)}];
  if(path==="/items/vapes") return [{label:"Nicotine Vape guides",guides:GUIDE_REGISTRY.filter((g)=>g.lane==="nic_vape").slice(0,6)}];
  if(path==="/items/vape-disposables") return [{label:"THC Vape guides",guides:GUIDE_REGISTRY.filter((g)=>g.lane==="thc_vape").slice(0,6)}];
  return [];
}
