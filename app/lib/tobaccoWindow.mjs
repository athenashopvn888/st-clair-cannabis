/** Toronto hour 0-23. */
export function torontoHour(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Toronto", hourCycle: "h23", hour: "2-digit" }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return hour === 24 ? 0 : hour;
}

/** STC01 TV tobacco window: allowed 17:00-07:59 America/Toronto, blocked 08:00-16:59. */
export function isTobaccoWindow(date = new Date()) {
  const h = torontoHour(date);
  return h >= 17 || h < 8;
}

export const NIGHT_FLASH_MESSAGE = "CIGARETTES 2 PACK $5 MIX MATCH !";

export const NIGHT_PRICE_LIST = [
  { name: "Mix & Match", price: "2 PACKS $5 · $25 CARTON" },
  { name: "BB Full / BB Lights", price: "2 PACKS $5" },
  { name: "Belmont King Size", price: "$10" },
  { name: "Backwoods", price: "$20 - $25" },
];
