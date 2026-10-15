import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isTobaccoWindow } from "../app/lib/tobaccoWindow.mjs";

// Policy (Tri, 2026-10-15): STC01 TV boards may show tobacco only 17:00-07:59 America/Toronto;
// 08:00-16:59 they stay tobacco-free. All tobacco content lives in TvNightBoard, gated by isTobaccoWindow.
const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
const night = readFileSync(new URL("../app/components/TvNightBoard.tsx", import.meta.url), "utf8");

for (const [route, source] of [["/tv", tv], ["/tv2", tv2]]) {
  assert.doesNotMatch(source, /category\s*===\s*["']CIGARETTES["']/i, `${route} must never select cigarette rows`);
  assert.doesNotMatch(source, /(?:cigarette|tobacco).*(?:promo|banner|ticker|image)/i, `${route} must not contain tobacco promotions or imagery outside the gated night board`);
  assert.doesNotMatch(source, /(?:promo|banner|ticker|image).*(?:cigarette|tobacco)/i, `${route} must not contain tobacco promotions or imagery outside the gated night board`);
}
assert.match(night, /night && isTobaccoWindow\(\)/, "night price card must be gated by isTobaccoWindow");
assert.match(night, /!night \|\| !isTobaccoWindow\(\)\) return null/, "night ticker must be gated by isTobaccoWindow");

// Window: blocked 08:00-16:59, allowed 17:00-07:59 (Toronto, EDT = UTC-4 on 2026-10-15).
const at = (h, m = 0) => new Date(Date.UTC(2026, 9, 15, h + 4, m));
for (let h = 0; h < 24; h++) {
  assert.equal(isTobaccoWindow(at(h)), h >= 17 || h < 8, `hour ${h}`);
}
assert.equal(isTobaccoWindow(at(7, 59)), true);
assert.equal(isTobaccoWindow(at(8, 0)), false);
assert.equal(isTobaccoWindow(at(16, 59)), false);
assert.equal(isTobaccoWindow(at(17, 0)), true);

assert.match(tv, /TvReviewQr/, "/tv must render the review QR");
assert.doesNotMatch(tv2, /TvReviewQr|store-review-qr/, "/tv2 must not render the review QR");
console.log("STC01 TV boards: tobacco only 17:00-07:59 Toronto, blocked 08:00-16:59; QR is /tv-only.");
