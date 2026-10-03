export interface ItemEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
  consume: string;
}

const labelFirst = (name: string, lane: string): ItemEffects => ({
  effects: [
    { emoji: "🏷️", label: lane },
    { emoji: "🔎", label: "Read Package" },
    { emoji: "🪪", label: "Adults 19+" },
  ],
  description: `${name} is listed in the ${lane.toLowerCase()} category at St Clair Cannabis. Product details can rotate; use the current item page and physical package as the source for format, contents and directions.`,
  metaDescription: `Browse ${name} at St Clair Cannabis in St Clair West. Check the current item page and package details before travelling. Adults 19+ only.`,
  consume: "Follow the current package directions and warnings. Ask the counter when the format or contents are unclear.",
});

export function getItemData(category: string, name: string): ItemEffects {
  const cat = category.toUpperCase();
  if (cat === "EDIBLES") return labelFirst(name, "Cannabis Edible");
  if (cat === "VAPE PENS") return labelFirst(name, "Nicotine Vape");
  if (cat === "VAPE DISPOSABLE") return labelFirst(name, "THC Vape");
  if (cat === "CONCENTRATES") return labelFirst(name, "Cannabis Concentrate");
  if (cat === "PREROLLS") return labelFirst(name, "Cannabis Pre-Roll");
  if (cat === "MAGIC & OTHERS") return labelFirst(name, "Specialty Item");
  if (cat === "CIGARETTES") return labelFirst(name, "Native Cigarettes");
  return labelFirst(name, "Current Menu Item");
}
