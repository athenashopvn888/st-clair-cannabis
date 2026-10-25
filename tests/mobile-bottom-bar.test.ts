import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { FULL_NAME_NAP, FULL_NAME_NAP_ADDRESS } from "../app/lib/fullNameNap.ts";
import { showsMobileBottomBar, storeDirectionsUrl } from "../app/lib/mobileBottomBar.ts";
import { STORE_OPENING_HOURS, storeHoursStatus, type OpeningHoursSpec } from "../app/lib/storeHoursStatus.ts";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const globals = fs.readFileSync("app/globals.css", "utf8");
const bar = fs.readFileSync("app/components/MobileBottomBar.tsx", "utf8");
const css = fs.readFileSync("app/components/MobileBottomBar.module.css", "utf8");
const products = fs.readFileSync("app/lib/products.ts", "utf8");
const footer = fs.readFileSync("app/components/Footer.tsx", "utf8");

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

function daily(opens: string, closes: string, days: readonly string[] = WEEK): OpeningHoursSpec[] {
  return [{ dayOfWeek: days, opens, closes }];
}

test("this store's hours read as open 24 hours in Toronto", () => {
  for (const iso of ["2026-01-15T15:00:00.000Z", "2026-07-15T04:30:00.000Z", "2026-10-26T03:59:00.000Z"]) {
    const status = storeHoursStatus(new Date(iso));
    assert.equal(status.kind, "always");
    assert.equal(status.label, "Open 24 hours");
  }
});

test("bar hours match the JSON-LD, hours page, and TV store window", () => {
  assert.equal(STORE_OPENING_HOURS.length, 1);
  assert.deepEqual([...STORE_OPENING_HOURS[0].dayOfWeek], [...WEEK]);
  assert.equal(STORE_OPENING_HOURS[0].opens, "00:00");
  assert.equal(STORE_OPENING_HOURS[0].closes, "23:59");
  for (const file of ["app/layout.tsx", "app/hours/page.tsx", "app/lib/tvStore.ts"]) {
    const text = fs.readFileSync(file, "utf8");
    assert.match(text, /opens["']?\s*:\s*"00:00"/);
    assert.match(text, /closes["']?\s*:\s*"23:59"/);
  }
});

test("limited hours say open until the close, or the next open, in Toronto", () => {
  const hours = daily("09:00", "21:00");
  const sundayEvening = storeHoursStatus(new Date("2026-10-25T22:00:00.000Z"), hours);
  assert.deepEqual(sundayEvening, { kind: "open", label: "Open now · until 9 p.m." });

  const beforeOpen = storeHoursStatus(new Date("2026-10-26T12:00:00.000Z"), hours);
  assert.deepEqual(beforeOpen, { kind: "closed", label: "Closed · opens 9 a.m." });

  const afterClose = storeHoursStatus(new Date("2026-10-26T02:30:00.000Z"), hours);
  assert.equal(afterClose.kind, "closed");
  assert.equal(afterClose.label, "Closed · opens Mon 9 a.m.");

  const winterAfternoon = storeHoursStatus(new Date("2026-01-15T20:00:00.000Z"), hours);
  assert.deepEqual(winterAfternoon, { kind: "open", label: "Open now · until 9 p.m." });
});

test("overnight windows stay open past midnight and name the next open day", () => {
  const hours = daily("10:00", "02:00", ["Friday"]);
  const fridayNight = storeHoursStatus(new Date("2026-10-24T03:00:00.000Z"), hours);
  assert.deepEqual(fridayNight, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayEarly = storeHoursStatus(new Date("2026-10-24T05:00:00.000Z"), hours);
  assert.deepEqual(saturdayEarly, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayLater = storeHoursStatus(new Date("2026-10-24T07:00:00.000Z"), hours);
  assert.deepEqual(saturdayLater, { kind: "closed", label: "Closed · opens Fri 10 a.m." });
});

test("a split day uses the window that is actually open", () => {
  const hours: OpeningHoursSpec[] = [
    { dayOfWeek: ["Monday"], opens: "09:00", closes: "12:00" },
    { dayOfWeek: ["Monday"], opens: "14:00", closes: "18:00" },
  ];
  assert.equal(storeHoursStatus(new Date("2026-10-26T15:00:00.000Z"), hours).label, "Open now · until 12 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T17:00:00.000Z"), hours).label, "Closed · opens 2 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T19:30:00.000Z"), hours).label, "Open now · until 6 p.m.");
});

test("directions prefer the GBP pin and otherwise build a maps directions URL", () => {
  assert.equal(storeDirectionsUrl(), FULL_NAME_NAP.mapsUrl);
  assert.match(FULL_NAME_NAP.mapsUrl, /google\.com\/maps/);
  assert.match(FULL_NAME_NAP.mapsUrl, /place_id:ChIJ_XEXu-83K4gRPYwmtch7b_8/);
  assert.equal(storeDirectionsUrl("https://maps.app.goo.gl/stclair"), "https://maps.app.goo.gl/stclair");
  const fallback = storeDirectionsUrl("", FULL_NAME_NAP_ADDRESS);
  assert.match(fallback, /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=/);
  assert.match(decodeURIComponent(fallback), /875 St Clair Ave W, Toronto, ON M6C 1C4/);
  assert.equal(storeDirectionsUrl("not-a-map", FULL_NAME_NAP_ADDRESS), fallback);
});

test("the bar is mounted on store pages and omitted on the TV routes", () => {
  assert.match(layout, /import MobileBottomBar from "\.\/components\/MobileBottomBar"/);
  assert.match(layout, /<MobileBottomBar directionsUrl=\{directionsUrl\} \/>/);
  assert.match(layout, /storeDirectionsUrl\(\s*fleet\.nap\.mapsSearchUrl/);
  assert.match(bar, /if \(!visible\) return null/);
  assert.match(bar, /showsMobileBottomBar\(pathname\)/);
  assert.equal(showsMobileBottomBar("/"), true);
  assert.equal(showsMobileBottomBar("/hours"), true);
  assert.equal(showsMobileBottomBar("/exotic-weed"), true);
  assert.equal(showsMobileBottomBar("/delivery"), true);
  assert.equal(showsMobileBottomBar("/tv"), false);
  assert.equal(showsMobileBottomBar("/tv/"), false);
  assert.equal(showsMobileBottomBar("/tv2"), false);
  assert.equal(showsMobileBottomBar("/tv2/"), false);
  assert.equal(showsMobileBottomBar("/visit"), true);
});

test("body padding follows the bar, so TV pages without the element get none", () => {
  assert.match(globals, /--mobile-action-bar-height:\s*0px/);
  assert.match(
    globals,
    /@media \(max-width:\s*768px\)\s*\{[\s\S]*--mobile-action-bar-height:\s*calc\(68px \+ env\(safe-area-inset-bottom, 0px\)\)[\s\S]*body:has\(\[data-mobile-bottom-bar\]\)\s*\{[\s\S]*padding-bottom:\s*var\(--mobile-action-bar-height\)/,
  );
  assert.match(globals, /@media print\s*\{[\s\S]*padding-bottom:\s*0/);
});

test("directions, hours, menu, and delivery fit the bar and phone actions stay out of it", () => {
  assert.match(bar, /href=\{directionsUrl\}/);
  assert.match(bar, /href="\/hours"/);
  assert.match(bar, /href="\/exotic-weed"/);
  assert.match(bar, />\s*Menu\s*</);
  assert.match(bar, /href="\/delivery"/);
  assert.match(bar, />\s*Delivery\s*</);
  assert.match(bar, />\s*Directions\s*</);
  assert.doesNotMatch(bar, /Call|tel:/);
  assert.match(footer, /href=\{phoneHref\}/);
  assert.match(products, /slug:\s*"exotic-weed"/);
  assert.equal(fs.existsSync("app/hours/page.tsx"), true);
  assert.equal(fs.existsSync("app/delivery/page.tsx"), true);
  assert.equal(fs.existsSync("app/[tier]/page.tsx"), true);
  assert.equal(fs.existsSync("app/menu/page.tsx"), false);
  const internalHrefs = [...bar.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(internalHrefs, ["/hours", "/exotic-weed", "/delivery"]);
  assert.match(css, /\.bar\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media \(max-width:\s*768px\)\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /minmax\(0,\s*1\.25fr\)\s+minmax\(0,\s*1\.5fr\)\s+minmax\(44px,\s*0\.72fr\)\s+minmax\(44px,\s*0\.9fr\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /min-width:\s*44px/);
  assert.match(css, /max-width:\s*100%/);
  assert.match(css, /var\(--green-dark,\s*#1f2937\)/);
});
