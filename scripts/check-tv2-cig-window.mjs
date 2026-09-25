import { isCigListWindow, showPromo } from "../app/tv2/cigWindow.ts";

/** UTC instant whose America/Toronto wall clock is the given date and time. */
function torontoWallTime(year, month, day, hour, minute) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  let utc = Date.UTC(year, month - 1, day, hour, minute);
  for (let i = 0; i < 4; i++) {
    const parts = Object.fromEntries(
      fmt.formatToParts(new Date(utc))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, part.value]),
    );
    const got = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
    );
    const want = Date.UTC(year, month - 1, day, hour, minute);
    if (got === want) return new Date(utc);
    utc += want - got;
  }
  throw new Error(`Could not resolve Toronto ${year}-${month}-${day} ${hour}:${minute}`);
}

const cases = [
  { label: "08:00", hour: 8, minute: 0, list: false, promo: true },
  { label: "21:29", hour: 21, minute: 29, list: false, promo: true },
  { label: "21:30", hour: 21, minute: 30, list: true, promo: false },
  { label: "07:59", hour: 7, minute: 59, list: true, promo: false },
  { label: "00:00 midnight", hour: 0, minute: 0, list: true, promo: false },
];

// September is EDT (UTC-4); January is EST (UTC-5). Both must follow wall time.
const dates = [
  { label: "2026-09-26 EDT", year: 2026, month: 9, day: 26 },
  { label: "2026-01-15 EST", year: 2026, month: 1, day: 15 },
];

let failed = 0;
for (const date of dates) {
  console.log(`\n${date.label}`);
  for (const spec of cases) {
    const when = torontoWallTime(date.year, date.month, date.day, spec.hour, spec.minute);
    const list = isCigListWindow(when);
    const promo = showPromo(when);
    const ok = list === spec.list && promo === spec.promo;
    if (!ok) failed += 1;
    const mode = list ? "list" : "promo";
    console.log(
      `${ok ? "ok" : "FAIL"}  ${spec.label.padEnd(16)} -> ${mode.padEnd(5)}  utc=${when.toISOString()}  localHour=${when.getHours()}`,
    );
  }
}

if (failed) {
  console.error(`\n${failed} boundary check(s) failed`);
  process.exit(1);
}
console.log("\nAll cigarette window boundaries passed.");
