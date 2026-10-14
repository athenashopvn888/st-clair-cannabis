import { allFlowers, allItems, type FlowerProduct, type ItemProduct } from "./products";

export type GuideLane = "strain" | "native_cig" | "nic_vape" | "thc_vape";
export type GuideFaq = { question: string; answer: string };
type GuideSchema = {
  types: Array<"FAQPage" | "WebPage">;
  faq_item_count: number;
  faq_items: GuideFaq[];
  omit_offers: true;
  omit_aggregate_rating: true;
};

export type GuideEntry = {
  slug: string;
  lane: GuideLane;
  name: string;
  title: string;
  description: string;
  bodyMd: string;
  preferredCategoryPath: string;
  preferredProductSlug?: string;
  relatedSlugs: string[];
  primaryKeywords: string[];
  schema: GuideSchema;
  stockMatch: RegExp;
};

type Seed = {
  slug: string;
  lane: GuideLane;
  name: string;
  path: string;
  match: RegExp;
  product?: string;
  profile: string;
  compare: string;
};

const strain = (slug: string, name: string, path: string, match: RegExp, product: string, profile: string, compare: string): Seed => ({ slug, lane: "strain", name, path, match, product, profile, compare });
const cig = (slug: string, name: string, match: RegExp, product: string | undefined, profile: string, compare: string): Seed => ({ slug, lane: "native_cig", name, path: "/items/cigarettes", match, product, profile, compare });
const nic = (slug: string, name: string, match: RegExp, product: string, path: string, profile: string, compare: string): Seed => ({ slug, lane: "nic_vape", name, path, match, product, profile, compare });
const thc = (slug: string, name: string, match: RegExp, product: string, profile: string, compare: string): Seed => ({ slug, lane: "thc_vape", name, path: "/items/vape-disposables", match, product, profile, compare });

const seeds: Seed[] = [
  strain("grease-monkey", "Grease Monkey", "/aaa-weed", /^GREASE MONKEY$/i, "grease-monkey", "The exact name matters here: Grease Monkey and Gas Monkey are separate labels, so this hub never treats one as a substitute for the other.", "Compare its current tier, format and label with the other AAA+ names rather than assuming that a shared word means the same flower."),
  strain("pink-rozay", "Pink Rozay", "/aaa-weed", /^PINK ROZAY$/i, "pink-rozay", "Rozay is the spelling used by this guide and its linked menu record; checking that spelling is the fastest way to avoid landing on a different Pink-labelled item.", "Use the Pink Kush and Pink Rockstar guides as name-level comparisons, then let the current package and tier decide the real difference."),
  strain("peanutbutter-breathe", "Peanutbutter Breathe", "/aaa-weed", /^PEANUTBUTTER BREATHE$/i, "peanutbutter-breathe", "This hub preserves the menu spelling Peanutbutter Breathe. It is not the same route as Peanut Butter Rockstar, even though both names begin with Peanut Butter.", "Compare the two Peanut Butter names by the complete label, tier and current product page instead of shortening both to the same nickname."),
  strain("pink-icky-sticky", "Pink Icky Sticky", "/exotic-weed", /^PINK ICKY STICKY$/i, "pink-icky-sticky", "Pink Icky Sticky belongs to the Exotic name lane in this registry, with the full three-word label retained for exact navigation.", "Compare it with Pink Deathstar, Pink Permanent Marker and other Exotic Pink names by the words after Pink and by today’s category board."),
  strain("white-champagne", "White Champagne", "/aa-weed", /^WHITE CHAMPAGNE$/i, "white-champagne", "White Champagne is an AA flower-name guide, not a beverage page and not a blanket guide to every White-labelled strain.", "Use Daydream Diesel, Slurricane and Royal Gorilla as same-lane checks while keeping each full flower name separate."),
  strain("daydream-diesel", "Daydream Diesel", "/aa-weed", /^DAYDREAM DIESEL$/i, "daydream-diesel", "Daydream Diesel is filed by its complete flower name on the AA board; the word Diesel alone is not enough to identify the current listing.", "Compare exact names, published tier and package label with White Champagne or Super Lemon Haze rather than inferring a shared profile from one word."),
  strain("pink-lobster", "Pink Lobster", "/aaa-weed", /^PINK LOBSTER$/i, "pink-lobster", "Pink Lobster is treated as its own AAA+ flower name. The unusual second word is the useful identifier when several Pink names sit near one another.", "Put it beside Pink Rozay, Pink Kush and Pink Rockstar at the name level, then use the current board for actual format and batch details."),
  strain("white-walker-og", "White Walker OG", "/aaa-weed", /^WHITE WALKER OG$/i, "white-walker-og", "This guide keeps White Walker OG intact, including OG, because dropping part of the label can lead to a different route or menu result.", "Compare it with OG Kush through the exact package name and current tier; the shared OG wording does not make two listings interchangeable."),
  strain("gmo-cookies", "GMO Cookies", "/premium-weed", /^GMO COOKIES$/i, "gmo-cookies", "GMO Cookies is the full Premium flower name used here. It should not be shortened to Cookies when checking a rotating menu.", "Compare the current listing with Pink Gelato or Death Star Bubba by tier, format and label rather than by broad dessert-name associations."),
  strain("pink-tuna", "Pink Tuna", "/exotic-weed", /^PINK TUNA$/i, "pink-tuna", "Pink Tuna has its own Exotic guide route and is kept distinct from Black Tuna and Platinum Tuna, which can appear as different menu names.", "The useful comparison is the complete Tuna label plus current tier—not the Tuna word by itself."),
  strain("pink-kush", "Pink Kush", "/aaa-weed", /^PINK KUSH$/i, "pink-kush", "Pink Kush is a durable name guide tied to the AAA+ corridor when that exact listing appears, with no promise that every Pink or Kush item is the same.", "Compare it with Master Kush, Sweet Kush and other full-name Kush routes, checking the current label before treating any as an alternative."),
  strain("permanent-marker", "Permanent Marker", "/exotic-weed", /PINK PERMANENT MARKER/i, "pink-permanent-marker", "The current source can carry Pink Permanent Marker while shoppers search the shorter Permanent Marker name. This guide explains that relationship without declaring the names identical.", "Open the current product label, then compare it with Pink Icky Sticky or Pink Deathstar inside the Exotic lane."),
  strain("super-lemon-haze", "Super Lemon Haze", "/aa-weed", /^SUPER LEMON HAZE$/i, "super-lemon-haze", "All three words belong to this AA flower label. Lemon or Haze alone can describe other names, so the hub keeps the full menu phrase.", "Compare it with Pineapple Haze by complete label and published tier, not by assuming that every Haze-labelled flower is equivalent."),
  strain("pineapple-haze", "Pineapple Haze", "/premium-weed", /^PINEAPPLE HAZE$/i, "pineapple-haze", "Pineapple Haze is filed as a Premium flower-name route in this registry and remains separate from Pineapple Express or Super Lemon Haze.", "Use the complete first word, current tier and product page when comparing Haze names."),
  strain("master-kush", "Master Kush", "/aa-weed", /^MASTER KUSH$/i, "master-kush", "Master Kush is the exact AA name attached to this guide. The Kush family word is useful for browsing but not for merging separate listings.", "Compare it with Pink Kush, Sweet Kush or OG Kush by exact label, category and today’s package information."),
  strain("gelato", "Gelato", "/premium-weed", /PINK GELATO/i, "pink-gelato", "The current source may publish Pink Gelato while people search for the broader Gelato name. This hub sends the shopper to the exact current label rather than hiding that difference.", "Compare Pink Gelato with Lemon Cherry Gelato only when both exact names appear; one Gelato word is not a stock or equivalence claim."),
  strain("slurricane", "Slurricane", "/aa-weed", /^SLURRICANE$/i, "slurricane", "Slurricane is a single-name AA route, so spelling is the most useful cue when finding it on the flower board.", "Compare its current tier and package with Royal Gorilla or Daydream Diesel, without turning nearby AA listings into flavour or effect promises."),
  strain("northern-lights", "Northern Lights", "/budget-weed", /NORTHERN LIGHTS/i, "northern-lights-shreds", "The linked source can identify Northern Lights in a shreds format. The guide keeps the familiar name while telling shoppers to read the format on the live label.", "Compare it with other Budget flower entries by format and posted package details; whole flower and shreds should never be silently blended."),
  strain("royal-gorilla", "Royal Gorilla", "/aa-weed", /^ROYAL GORILLA$/i, "royal-gorilla", "Royal Gorilla is kept separate from Gorilla Glue and every other Gorilla-labelled flower. The leading word is part of the product identity.", "Use the same-lane links for navigation, but rely on the complete label and current AA board for the meaningful comparison."),
  strain("red-congolese", "Red Congolese", "/exotic-weed", /^RED CONGOLESE$/i, "red-congolese", "Red Congolese is an Exotic flower-name guide with the colour word retained; it is not a general page for all Congolese-labelled products.", "Compare it with other Exotic names through today’s tier board and package details, without inventing potency or effect differences."),
  strain("peanut-butter-rockstar", "Peanut Butter Rockstar", "/exotic-weed", /^PEANUT BUTTER ROCKSTAR$/i, "peanut-butter-rockstar", "Peanut Butter Rockstar is a current Exotic-board name and a separate route from Peanutbutter Breathe. Spacing and the final word both matter.", "Compare those two names carefully, then use the current product label to confirm which one is actually posted."),
  strain("pink-deathstar", "Pink Deathstar", "/exotic-weed", /^PINK DEATHSTAR$/i, "pink-deathstar", "Pink Deathstar is the exact Exotic-board label used by this route. It stays distinct from Death Star Bubba, including the different spacing and added name.", "Compare both Death Star names by the full label and tier before travelling; similarity is not interchangeability."),
  strain("death-star-bubba", "Death Star Bubba", "/premium-weed", /^DEATH STAR BUBBA$/i, "death-star-bubba", "Death Star Bubba is a Premium-board name with three meaningful parts. This hub does not collapse it into Pink Deathstar.", "Use the two separate guides to check spelling, tier and current product route, then choose from what today’s board actually shows."),
  strain("pink-rockstar", "Pink Rockstar", "/aaa-weed", /^PINK ROCKSTAR$/i, "pink-rockstar", "Pink Rockstar is an AAA+ flower label in the current source and is not the same route as Peanut Butter Rockstar.", "Compare Rockstar names by their complete prefix, published tier and product page instead of using Rockstar as a catch-all."),
  strain("pink-skywalker", "Pink Skywalker", "/aaa-weed", /^PINK SKYWALKER$/i, "pink-skywalker", "Pink Skywalker is a current AAA+ name route. Keeping Pink in the heading helps separate it from any other Skywalker-labelled listing.", "Compare it with Pink Violator or Pink Rockstar through exact names and today’s AAA+ board, not assumed lineage or effects."),
  strain("pink-violator", "Pink Violator", "/aaa-weed", /^PINK VIOLATOR$/i, "pink-violator", "Pink Violator is listed as its own AAA+ flower name. This guide does not treat Violator or other Pink names as automatic matches.", "Use Pink Skywalker, Pink Rockstar and Pink Kush as name-level browsing options while the live label controls the real choice."),
  strain("purple-punch", "Purple Punch", "/premium-weed", /^PURPLE PUNCH$/i, "purple-punch", "Purple Punch is a indica-leaning name, commonly reported as Larry OG crossed with Granddaddy Purple, known for grape candy, berry and vanilla notes. A cross of Larry OG and Granddaddy Purple, it leans on grape and berry notes with a hint of vanilla. Not every cut shows the purple, though.", "Look for rich colour and a sweet grape nose. If it smells flat, it probably isn't the freshest jar. Nearby names worth comparing: Granddaddy Purple, Slurricane, Black Cherry Punch. Looking for Purple Punch near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("sour-diesel", "Sour Diesel", "/aaa-weed", /^SOUR DIESEL$/i, "sour-diesel", "Sour Diesel is a sativa-leaning name, often linked to Chemdawg and Super Skunk, although its origin is debated, known for fuel, citrus and a sharp sour edge. Fuel and lemon with a sour edge. Its exact parentage gets debated, but the smell is the whole story here. It's the strain a lot of the \"gas\" names are measured against.", "If you love a strong fuel nose, start here, then try Chemdawg or Motorbreath for the same family of smells. Nearby names worth comparing: Gorilla Glue #4, Chemdawg, Motorbreath. Looking for Sour Diesel near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("og-kush", "OG Kush", "/exotic-weed", /^OG KUSH$/i, "og-kush", "OG Kush is a hybrid name, a West Coast classic whose exact parentage is debated, known for pine, earth, lemon and fuel. Pine, earth, lemon and a bit of fuel. When you see \"OG\" in another name, it's telling you which family tree the strain grew from.", "Ask the counter which OG-family cuts are in today. You'll find a few cousins sitting next to the original. Nearby names worth comparing: Pink Kush, Master Kush, MK Ultra. Looking for OG Kush near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("granddaddy-purple", "Granddaddy Purple", "/premium-weed", /^GRANDDADDY PURPLE$/i, "granddaddy-purple", "Granddaddy Purple is a indica-leaning name, commonly reported as Purple Urkle crossed with Big Bud, known for grape, berry and sweet earth. Grape, berry and a sweet earthy base. Purple tinges on the buds are common, though not every batch shows them.", "Grape on the nose is the giveaway. If you like it, try Purple Punch or Black Cherry Punch next. Nearby names worth comparing: Purple Punch, Black Cherry Punch, Northern Lights. Looking for Granddaddy Purple near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("pineapple-express", "Pineapple Express", "/exotic-weed", /^PINEAPPLE EXPRESS$/i, "pineapple-express", "Pineapple Express is a hybrid name, commonly reported as Trainwreck crossed with Hawaiian, known for tropical pineapple with earthy pine. Pineapple and citrus over a pine and earth base. It's a good one for people who like fruit-forward aromas without too much sweetness.", "Sniff for fresh pineapple rather than candy. That's the tell for a well-kept jar. Nearby names worth comparing: Pineapple Haze, Trainwreck, Super Lemon Haze. Looking for Pineapple Express near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("wedding-cake", "Wedding Cake", "/exotic-weed", /^WEDDING CAKE$/i, "wedding-cake", "Wedding Cake is a hybrid name, commonly reported as Triangle Kush crossed with Animal Mints, known for sweet vanilla, earthy and peppery notes. Sweet vanilla and earthy pepper. It's one of the Cookies-family names that helped set the template for dessert-style strains.", "Look for visible frost and a sweet, slightly peppery nose. Nearby names worth comparing: Ice Cream Cake, Biscotti, Gelato. Looking for Wedding Cake near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("blue-dream", "Blue Dream", "/exotic-weed", /^BLUE DREAM$/i, "blue-dream", "Blue Dream is a sativa-leaning hybrid name, commonly reported as Blueberry crossed with Haze, known for blueberry sweetness with herbal haze. Blueberry sweetness on top of a herbal haze note. It's grown everywhere, so there's a lot of variety between growers.", "Look for a sweet blueberry smell with a light herbal side. Nearby names worth comparing: Amnesia Haze, Super Lemon Haze, Pineapple Haze. Looking for Blue Dream near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("gorilla-glue-4", "Gorilla Glue #4", "/exotic-weed", /^GORILLA GLUE #4$/i, "gorilla-glue-4", "Gorilla Glue #4 is a hybrid name, commonly described as a Chem-family cross, although published parentage varies, known for diesel, dark cocoa and pine notes. Diesel, dark cocoa and pine. You'll see it listed as GG4 or Gorilla Glue; they usually mean the same thing, though cuts differ.", "Press the jar lid and smell for diesel and chocolate. Ask us if you want to compare it with Royal Gorilla. Nearby names worth comparing: Royal Gorilla, Sour Diesel, Chemdawg. Looking for Gorilla Glue #4 near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("white-widow", "White Widow", "/exotic-weed", /^WHITE WIDOW$/i, "white-widow", "White Widow is a hybrid name, commonly described as a 1990s Dutch hybrid, with parent details varying by source, known for earthy, woody and lightly spicy notes. Earthy, woody and a little spicy. The white refers to the coat of resin on the buds.", "Look for a heavy frosted coat and a woody, earthy smell. Nearby names worth comparing: Northern Lights, Blue Dream, Girl Scout Cookies. Looking for White Widow near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("jack-herer", "Jack Herer", "/aaa-weed", /^JACK HERER$/i, "jack-herer", "Jack Herer is a sativa name, commonly described as a multi-line Dutch cultivar, with exact parent details varying by breeder, known for pine, spice and bright citrus notes. Pine, spice and bright citrus. It's a good pick for people who like a fresh, piney smell.", "A clean pine and lemon smell is a good sign. Nearby names worth comparing: Super Lemon Haze, Sour Diesel, Amnesia Haze. Looking for Jack Herer near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("girl-scout-cookies", "Girl Scout Cookies", "/exotic-weed", /^GIRL SCOUT COOKIES$/i, "girl-scout-cookies", "Girl Scout Cookies is a hybrid name, commonly described as a Cookies-family hybrid, with cuts and parent descriptions varying, known for sweet mint, earth and spice notes. Sweet mint, earth and a touch of spice. Dozens of modern crosses trace back to it, including Gelato and Wedding Cake.", "Learn GSC and you'll understand half of today's strain names. Nearby names worth comparing: Gelato, Wedding Cake, Do-Si-Dos. Looking for Girl Scout Cookies near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("zkittlez", "Zkittlez", "/premium-weed", /^ZKITTLEZ$/i, "zkittlez", "Zkittlez is a indica name, commonly described as a fruit-forward hybrid line, while detailed parentage varies by source, known for tropical fruit, citrus and herbal notes. Tropical fruit, citrus and a bit of herbal funk. The fruity nose is the main reason people look for it.", "Smell for several fruits at once rather than one flat sweetness. Nearby names worth comparing: Runtz, Gelato, Forbidden Fruit. Looking for Zkittlez near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("runtz", "Runtz", "/exotic-weed", /^RUNTZ$/i, "runtz", "Runtz is a hybrid name, commonly described as Zkittlez crossed with Gelato, known for sweet fruit, citrus and creamy notes. Sweet fruit, citrus and cream. Many versions exist, so ask which one is in.", "If you like Gelato and Zkittlez, Runtz is the middle ground. Nearby names worth comparing: White Runtz, Zkittlez, Gelato. Looking for Runtz near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("white-runtz", "White Runtz", "/exotic-weed", /^WHITE RUNTZ$/i, "white-runtz", "White Runtz is a hybrid name, commonly described as a selected Runtz expression, with details varying by breeder, known for sweet fruit, citrus and light earthy notes. Sweet fruit and citrus with a light earthy side. It's a nice way to see how one strain can have many versions.", "Put it next to regular Runtz and compare the look and smell. Nearby names worth comparing: Runtz, Zkittlez, Gelato. Looking for White Runtz near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("mac-1", "MAC 1", "/exotic-weed", /^MAC 1$/i, "mac-1", "MAC 1 is a hybrid name, commonly expanded as Miracle Alien Cookies, while breeder descriptions should be checked per product, known for creamy citrus, floral and earthy notes. Creamy citrus with floral and earthy notes. Its Cookies-family background is why the nose is so rounded.", "Search both MAC 1 and Miracle Alien Cookies when browsing. Nearby names worth comparing: Girl Scout Cookies, Gelato, Permanent Marker. Looking for MAC 1 near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("do-si-dos", "Do-Si-Dos", "/premium-weed", /^DO-SI-DOS$/i, "do-si-dos", "Do-Si-Dos is a indica name, commonly described as Girl Scout Cookies crossed with Face Off OG, known for sweet mint, earth and a funky spice note. Sweet mint and earth with a funky spice note. It's a parent of Slurricane.", "You'll see it spelled Dosidos or Do-Si-Do. They usually mean the same thing. Nearby names worth comparing: Girl Scout Cookies, Slurricane, OG Kush. Looking for Do-Si-Dos near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("sunset-sherbet", "Sunset Sherbet", "/exotic-weed", /^SUNSET SHERBET$/i, "sunset-sherbet", "Sunset Sherbet is a hybrid name, commonly described as a Cookies-family cultivar and a parent line behind Gelato, known for berry, citrus and creamy herbal notes. Berry and citrus with a creamy herbal finish. It's sometimes spelled Sherbert on menus.", "Compare it to Gelato and notice what the child kept from the parent. Nearby names worth comparing: Gelato, Girl Scout Cookies, Wedding Cake. Looking for Sunset Sherbet near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("biscotti", "Biscotti", "/exotic-weed", /^BISCOTTI$/i, "biscotti", "Biscotti is a hybrid name, commonly described as a Cookies-family cross, with exact breeder descriptions varying, known for sweet dough, spice and earthy notes. Sweet dough, spice and earth. The bakery-style smell is the reason for the name.", "Smell for toasty sweetness rather than sharp fruit. Nearby names worth comparing: Wedding Cake, Apple Fritter, Peanut Butter Rockstar. Looking for Biscotti near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("gary-payton", "Gary Payton", "/exotic-weed", /^GARY PAYTON$/i, "gary-payton", "Gary Payton is a hybrid name, commonly described as a modern West Coast hybrid, with breeder information checked on the package, known for earth, spice and fuel notes. Earth, spice and fuel on the nose. It's a good example of how new strain names draw from pop culture.", "Ask which grower made it, since the name travels widely. Nearby names worth comparing: Girl Scout Cookies, Runtz, Permanent Marker. Looking for Gary Payton near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("pure-michigan", "Pure Michigan", "/exotic-weed", /^PURE MICHIGAN$/i, "pure-michigan", "Pure Michigan is a hybrid name, commonly described as a modern fuel-forward hybrid, known for fuel, earth and sweet notes. Fuel, earth and a touch of sweetness. The name is a branding nod, not a growing location.", "Look for a strong fuel nose and check the licensed producer. Nearby names worth comparing: Gorilla Glue #4, Royal Gorilla, Sour Diesel. Looking for Pure Michigan near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("mku", "MK Ultra", "/premium-weed", /^MK ULTRA$/i, "mku", "MK Ultra is a indica name, commonly described as OG Kush crossed with G13, known for pine, earth and fuel notes. Pine, earth and fuel. It's commonly described as a cross of OG Kush and G13.", "Search both MKU and MK Ultra when browsing. Nearby names worth comparing: OG Kush, Master Kush, Pink Kush. Looking for MK Ultra near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("lemon-cherry-gelato", "Lemon Cherry Gelato", "/exotic-weed", /^LEMON CHERRY GELATO$/i, "lemon-cherry-gelato", "Lemon Cherry Gelato is a hybrid name, commonly described as a Gelato-family cultivar, known for citrus, cherry and creamy notes. Citrus, cherry and cream. It's part of the Gelato family, so it has the same dessert style with a brighter edge.", "Put it next to regular Gelato and compare the zest. Nearby names worth comparing: Gelato, Cherry Pie, Sunset Sherbet. Looking for Lemon Cherry Gelato near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("apple-fritters", "Apple Fritter", "/exotic-weed", /^APPLE FRITTER$/i, "apple-fritters", "Apple Fritter is a hybrid name, commonly described as a modern dessert-family hybrid, known for baked apple, spice and earthy notes. Baked apple, cinnamon-like spice and earth. It's a good fit if you like dessert aromas that aren't too fruity.", "Smell for warm baked apple rather than fresh fruit. Nearby names worth comparing: Biscotti, Wedding Cake, Ice Cream Cake. Looking for Apple Fritter near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),
  strain("ice-cream-cake", "Ice Cream Cake", "/premium-weed", /^ICE CREAM CAKE$/i, "ice-cream-cake", "Ice Cream Cake is a indica name, commonly described as Wedding Cake crossed with Gelato, known for vanilla, cream and earthy notes. A cross of Wedding Cake and Gelato, with a vanilla and cream aroma and an earthy base.", "If you liked Wedding Cake or Gelato, try this one for the mix. Nearby names worth comparing: Wedding Cake, Gelato, London Pound Cake. Looking for Ice Cream Cake near Wychwood and Corso Italia? Check today's board at St Clair Cannabis, 875 St Clair Ave W."),

  cig("canadian-classics", "Canadian Classics", /CANADIAN CLASSICS/i, "canadian-classics-original", "Canadian Classics can appear with more than one pack descriptor, so the brand guide points shoppers back to the exact current pack label.", "Compare Original and Silver wording where posted; do not treat a brand-family match as proof of one pack style."),
  cig("nexus-cigarettes", "Nexus", /^NEXUS/i, "nexus-full", "Nexus is a Native Cigarettes brand guide, with Full and Lights treated as separate pack descriptors under the same brand family.", "Compare pack style and printed label with Canadian Classics or Time, never cannabis or vape specifications."),
  cig("canadian-goose", "Canadian Goose", /CANADIAN GOOSE/i, "canadian-goose-full", "Canadian Goose can appear as Full or Lights in the source. This page keeps both within the brand family while preserving the variant on the item page.", "Use the exact pack wording when comparing it with Canadian or Canadian Classics."),
  cig("putters", "Putters", /^PUTTERS$/i, "putters", "Putters is filed on the adult tobacco shelf and should not be confused with a cannabis product or nicotine-vape device.", "Compare only the current pack label and category listing with other Native Cigarettes brands."),
  cig("time-cigarettes", "Time", /^TIME FULL$/i, "time-full", "Time is the brand name; Full is the current pack descriptor connected to the item route when present.", "Use the package label to compare Time with Nexus, Canadian Goose or Rolled Gold."),
  cig("rolled-gold", "Rolled Gold", /ROLLED GOLD/i, "rolled-gold-lights", "Rolled Gold is kept as the brand-level route while Lights remains a pack-level detail on the current item page.", "Compare pack descriptors rather than assuming every brand uses the same Full, Lights or Silver naming."),
  cig("canadian-cigarettes", "Canadian", /^CANADIAN (FULL|LIGHTS|MENTHOL)$/i, "canadian-full", "Canadian is a separate brand family from Canadian Classics and Canadian Goose. The shared first word does not merge those brands.", "Check whether the current pack says Full, Lights or Menthol before comparing it with the other Canadian-labelled families."),
  cig("backwoods", "Backwoods", /BACKWOODS/i, "backwoods-assorted-flavors-20-25", "Backwoods is an adult tobacco item in this guide system. Any flavour or assortment wording belongs to the current package and item page.", "Compare format and package information, not flower tiers or THC-vape labels."),
  cig("grabba", "Grabba", /^GRABBA$/i, "grabba", "Grabba and Grabba Shaker can appear as separate listings. This guide targets the plain Grabba item when that exact route exists.", "Read the full item name before choosing; a shaker format should not be silently treated as the same listing."),
  cig("bb-cigarettes", "BB", /\bBB\b/i, undefined, "BB is represented in the store’s current cigarette promotion stack. This guide soft-lands on the category whenever no dedicated BB item page is published.", "Keep BB separate from Belmont even when the two appear in the same promotion, and confirm the exact pack at the counter."),
  cig("belmont-king-size", "Belmont King Size", /BELMONT/i, undefined, "Belmont King Size is the specific promotional name used by the store. This hub does not shorten that into a claim about every Belmont format.", "Check the current Belmont promotion and cigarette board, keeping King Size and any BB mix-and-match wording as separate offers."),

  nic("ovns-vape", "OVNS", /^OVNS/i, "ovns-2500-5-25k-puffs", "/items/vapes", "OVNS is the spelling used by STC01. It is not OVI, and model numbers or puff counts remain model-level details rather than promises of device life.", "Compare OVNS models with one another first, then compare brand, format and package label with other nicotine devices."),
  nic("nexa-pix-vape", "Nexa Pix", /^NEXA PIX/i, "nexa-pix-30k-puffs-many-flavors", "/items/vapes", "Nexa Pix is filed on the Nicotine Vape shelf. Any printed puff count identifies the model but does not guarantee how long a device will last.", "Compare the package, nicotine label and device format with OVNS, Geek Max or Vice—not with a THC disposable."),
  nic("zpods-vape", "Zpods", /^ZPODS?/i, "zpods-zpods-mango-pineapple-32-ml-pods-5-synthetic-nic", "/items/concentrates", "Zpods is a nicotine-pod name even though the current catalogue source places its item under the concentrates path. The guide makes that shelf distinction explicit.", "Use the linked item label and also check the Nicotine Vape board; never infer that a concentrates path turns Zpods into a THC product."),
  nic("geek-max-vape", "Geek Max", /^GEEK MAX/i, "geek-max-5-20k30k-puffs-many-flavors", "/items/vapes", "Geek Max is the exact current item name, kept separate from broader Geek Bar searches. Printed puff ranges identify packaging, not guaranteed duration.", "Compare its current device and nicotine labels with Nexa Pix, OVNS or Vice while keeping THC products on their own shelf."),
  nic("vice-vape", "Vice", /^VICE DISPOSABLE/i, "vice-disposable-25k", "/items/vapes", "Vice is a disposable nicotine-vape listing in the current item source. The model’s printed count is not a usage-life promise.", "Compare the exact package and nicotine statement with Geek Max, Nexa Pix or OVNS, never by appearance alone."),

  thc("gas-gang-thc-vape", "Gas Gang", /GAS GANG.*(DISPO|2G|VOL)/i, "gas-gang-dispo-vape-1g", "Gas Gang appears on the cannabis vape shelf, with more than one item name or format possible. The current label decides which listing is in front of you.", "Compare cannabis format and package details with Drizzle; do not use nicotine-device puff language to describe this lane."),
  thc("drizzle-thc-vape", "Drizzle", /DRIZZLE SWITCH/i, "drizzle-switch-3in1-2g", "Drizzle Switch is a THC-vape item in the current source. This guide keeps the THC lane explicit because device shape alone cannot identify contents.", "Compare it with Gas Gang by cannabis format, product label and current item route, not nicotine-device specifications."),
];

const laneCopy = {
  strain: { label: "Strain name", suffix: "", shelf: "flower board", category: "cannabis flower" },
  native_cig: { label: "Native Cigarettes", suffix: " Native Cigarettes", shelf: "cigarette board", category: "adult tobacco" },
  nic_vape: { label: "Nicotine Vape", suffix: " Nicotine Vape", shelf: "nicotine-vape board", category: "adult nicotine vape" },
  thc_vape: { label: "THC Vape", suffix: " THC Vape", shelf: "THC-vape board", category: "cannabis vape" },
} as const;

const ADDED_STRAIN_SLUGS = new Set<string>(["purple-punch","sour-diesel","og-kush","granddaddy-purple","pineapple-express","wedding-cake","blue-dream","gorilla-glue-4","white-widow","jack-herer","girl-scout-cookies","zkittlez","runtz","white-runtz","mac-1","do-si-dos","sunset-sherbet","biscotti","gary-payton","pure-michigan","mku","lemon-cherry-gelato","apple-fritters","ice-cream-cake"]);
const relatedFor = (seed: Seed) => {
  const isAdded = ADDED_STRAIN_SLUGS.has(seed.slug);
  const laneSeeds = seeds.filter((candidate) => candidate.lane === seed.lane && ADDED_STRAIN_SLUGS.has(candidate.slug) === isAdded);
  const index = laneSeeds.findIndex((candidate) => candidate.slug === seed.slug);
  return Array.from({ length: Math.min(seed.lane === "strain" ? 4 : 3, laneSeeds.length - 1) }, (_, offset) => laneSeeds[(index + offset + 1) % laneSeeds.length].slug);
};

const faqFor = (seed: Seed): GuideFaq[] => {
  const lane = laneCopy[seed.lane];
  return [
    { question: `Is ${seed.name} available at St Clair Cannabis today?`, answer: `This guide does not promise live stock. Open the linked item when one is published, then check today’s ${lane.shelf}; the category is the source when the name rotates out.` },
    { question: `What should I compare before choosing ${seed.name}?`, answer: `Compare the complete product name, current category, format and package label. Do not infer potency, pack style, device life or contents from the name alone.` },
    { question: `Can I reserve ${seed.name} from this guide?`, answer: `No. This is an informational name hub, not a reservation or availability system. Check the current menu immediately before travelling.` },
    { question: `Who can shop this ${lane.label} category?`, answer: `St Clair Cannabis serves adults 19+. Bring valid government-issued photo ID. This guide makes no medical or health claims.` },
  ];
};

const bodyFor = (seed: Seed, related: string[]) => {
  const lane = laneCopy[seed.lane];
  const relatedNames = related.map((slug) => seeds.find((candidate) => candidate.slug === slug)?.name).filter(Boolean).join(", ");
  const distinction = seed.lane === "strain"
    ? "This is a flower-name guide, not a cigarette, nicotine-vape or THC-device page. A strain name can remain useful when a batch rotates, but the current flower label controls tier, format and any published batch details."
    : seed.lane === "native_cig"
      ? "This is an adult tobacco guide. It is separate from cannabis flower, nicotine-vape devices and THC vapes. Brand-family pages do not erase Full, Lights, Silver, Menthol, King Size or other pack wording."
      : seed.lane === "nic_vape"
        ? "This is the nicotine shelf, not the THC-vape shelf. Nicotine is addictive and products are for adults 19+. Puff figures are package identifiers, not guaranteed duration or performance."
        : "This is the cannabis THC-vape shelf, not the nicotine shelf. Read the package because a device-shaped product cannot be classified safely by appearance alone.";
  const availability = seed.product
    ? `The registry has a preferred menu slug for **${seed.name}**, but that connection is still not a reservation or real-time shelf guarantee.`
    : `No dedicated product slug is forced for **${seed.name}**. When an exact item page is absent, the category route is the honest soft out-of-stock destination.`;
  return `# ${seed.name}${lane.suffix} at St Clair Cannabis | St Clair West

${seed.name} has a dedicated name hub for adults browsing ${lane.category} at St Clair Cannabis on St Clair West. The purpose is practical: identify the correct shelf, understand the exact wording, compare nearby names and move to today’s menu without turning an older page into a stock promise. **${seed.profile}**

## Quick read
- **Lane:** ${lane.label}; ${distinction}
- **Current source:** [today’s ${lane.shelf}](${seed.path}) controls availability, format and posted item details.
- **Local use:** check the menu before travelling to 875 St Clair Ave W; adults **19+** need valid government photo ID.
- **Claims boundary:** no medical advice, no invented potency, no fixed price and no quantity promise appear on this hub.

## What the ${seed.name} name means on this menu
Names are useful search handles, but the complete label matters more than a partial match. ${seed.profile} That is why this page keeps **${seed.name}** in the heading and sends the primary action to the most relevant live category. It does not rename an item, blend two variants or manufacture a product route that is not present.

${distinction} The same rule applies when a familiar word appears in several products: shared wording is a reason to read more carefully, not evidence that the products are interchangeable. ${availability}

## Compare ${seed.name} without guessing
${seed.compare} Related name hubs in this lane include **${relatedNames}**. Those links are navigation aids. They do not claim matching flavour, effect, strength, pack construction or hardware.

A useful counter comparison starts with four visible facts: the complete name, the shelf or category, the format printed on the package and the details posted on the current item page. For flower, also confirm the posted tier and whether the listing is whole flower or a format such as shreds. For cigarettes, keep brand and pack style separate. For nicotine or THC vapes, identify the substance first and the device model second.

## Today’s board beats an old screenshot
St Clair Cannabis uses the current menu as the operational source. A search result, saved screenshot or guide page can remain online after a named item rotates. That is intentional: the hub preserves a useful name route, while the category page gives the soft out-of-stock answer. If the exact listing is missing, browse [today’s ${lane.shelf}](${seed.path}) rather than assuming the item is behind the counter.

## St Clair West context
St Clair Cannabis is at **875 St Clair Ave W, Toronto**, along the St Clair West corridor near Wychwood and Corso Italia. The 512 St Clair streetcar and local TTC routes serve the corridor; check TTC service before travelling. Use the [visit page](/visit) for store information rather than copying directions or hours from a stale search snippet.

## Shelf check for ${seed.name}
Before choosing, read the current label from top to bottom. Confirm that **${seed.name}** is the exact name, then verify category and format. If the product page and package disagree, the physical package and current counter information are the safer sources. Never use a guide title to infer medical effects, expected experience, device life, tobacco pack details or THC content.

For nearby options, stay within the same lane first: ${relatedNames}. Moving between lanes changes the underlying product type. Native Cigarettes, Nicotine Vape and THC Vape are intentionally labelled separately throughout the site so adults do not have to infer contents from brand styling.

## Straight answers about ${seed.name}
### Is ${seed.name} available today?
This page does not guarantee it. Check [today’s ${lane.shelf}](${seed.path}) immediately before travelling.

### Can this guide reserve a product or price?
No. It is an informational route only. It does not reserve stock, lock a price or promise a package size.

### What should I compare?
Use the complete name, current category, format and printed package details. ${seed.compare}

### What is the age requirement?
Adults **19+** only, with valid government-issued photo ID. This guide makes no medical or health claims.

## Check ${seed.name} on today’s menu
Start with [today’s ${lane.shelf}](${seed.path}). If the exact name has rotated away, that category remains the current St Clair Cannabis board and the right place to compare what is posted now.
`;
};

export const GUIDE_REGISTRY: GuideEntry[] = seeds.map((seed) => {
  const relatedSlugs = relatedFor(seed);
  const lane = laneCopy[seed.lane];
  const faqs = faqFor(seed);
  return {
    slug: seed.slug,
    lane: seed.lane,
    name: seed.name,
    title: `${seed.name}${lane.suffix} at St Clair Cannabis | St Clair West`,
    description: `${seed.name} guide for adults 19+ browsing the ${lane.shelf} at St Clair Cannabis on St Clair West. Compare exact labels and check today’s board.`,
    bodyMd: bodyFor(seed, relatedSlugs),
    preferredCategoryPath: seed.path,
    preferredProductSlug: seed.product,
    relatedSlugs,
    primaryKeywords: [seed.name, `${seed.name} Toronto`, `${seed.name} St Clair West`, lane.label, "St Clair Cannabis"],
    schema: { types: ["FAQPage", "WebPage"], faq_item_count: faqs.length, faq_items: faqs, omit_offers: true, omit_aggregate_rating: true },
    stockMatch: seed.match,
  };
});

export const getGuide = (slug: string) => GUIDE_REGISTRY.find((guide) => guide.slug === slug);
const GUIDE_LANES: { lane: GuideLane; label: string }[] = [
  { lane: "strain", label: "Strains" },
  { lane: "native_cig", label: "Native Cigarettes" },
  { lane: "nic_vape", label: "Nicotine Vape" },
  { lane: "thc_vape", label: "THC Vape" },
];

export function getGuidesByLane() {
  return GUIDE_LANES.map(({ lane, label }) => ({ lane, label, guides: GUIDE_REGISTRY.filter((guide) => guide.lane === lane) })).filter((group) => group.guides.length > 0);
}

export function resolveGuideProduct(guide: GuideEntry): FlowerProduct | ItemProduct | undefined {
  const products = guide.lane === "strain" ? allFlowers : allItems;
  return products.find((product) => product.slug === guide.preferredProductSlug) ?? products.find((product) => guide.stockMatch.test(product.name));
}

export const getTierGuideLinks = (categoryPath: string, limit = 6) => GUIDE_REGISTRY.filter((guide) => guide.lane === "strain" && guide.preferredCategoryPath === categoryPath).slice(0, limit);

export function getCategoryGuideGroups(categoryPath: string) {
  if (categoryPath === "/items/cigarettes") return [{ label: "Native Cigarettes brand guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "native_cig").slice(0, 9) }];
  if (categoryPath === "/items/vapes") return [{ label: "Nicotine Vape brand guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "nic_vape").slice(0, 6) }];
  if (categoryPath === "/items/vape-disposables") return [{ label: "THC Vape guides", guides: GUIDE_REGISTRY.filter((guide) => guide.lane === "thc_vape").slice(0, 6) }];
  return [];
}
