
const NICOTINE_NAME = /\bN\s?VAPE\b|NICOTINE|E-?LIQUID/i;

/** 08:00-16:59 America/Toronto: nicotine vapes are hidden from the board (fleet daytime rule). */
export function hideNicotineNow(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Toronto", hourCycle: "h23", hour: "2-digit" }).formatToParts(date);
  let hour = Number(parts.find((p) => p.type === "hour")?.value);
  if (hour === 24) hour = 0;
  return hour >= 8 && hour < 17;
}

export function isNicotineVape(item: { name?: string }): boolean {
  return NICOTINE_NAME.test(String(item.name || ""));
}

