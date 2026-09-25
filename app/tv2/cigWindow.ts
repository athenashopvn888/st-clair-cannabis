const TORONTO_TZ = "America/Toronto";

/** Minutes since midnight in America/Toronto (hourCycle h23). */
function torontoMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TORONTO_TZ,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);

  let hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  // Some engines report midnight as hour 24 under hourCycle h23.
  if (hour === 24) hour = 0;

  return hour * 60 + minute;
}

/**
 * Cigarettes item list is on from 21:30 inclusive through 07:59
 * America/Toronto. At 08:00 the list turns off.
 */
export function isCigListWindow(date: Date = new Date()): boolean {
  const mins = torontoMinutes(date);
  return mins >= 21 * 60 + 30 || mins < 8 * 60;
}

/** Promo poster covers 08:00 through 21:29 America/Toronto. */
export function showPromo(date: Date = new Date()): boolean {
  return !isCigListWindow(date);
}
