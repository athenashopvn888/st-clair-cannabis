import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");

for (const [route, source] of [["/tv", tv], ["/tv2", tv2]]) {
  assert.doesNotMatch(source, /category\s*===\s*["']CIGARETTES["']/i, `${route} must never select cigarette rows`);
  assert.doesNotMatch(source, /(?:cigarette|tobacco).*(?:promo|banner|ticker|image)/i, `${route} must not contain tobacco promotions or imagery`);
  assert.doesNotMatch(source, /(?:promo|banner|ticker|image).*(?:cigarette|tobacco)/i, `${route} must not contain tobacco promotions or imagery`);
}

assert.match(tv, /TvReviewQr/, "/tv must render the review QR");
assert.doesNotMatch(tv2, /TvReviewQr|store-review-qr/, "/tv2 must not render the review QR");
console.log("STC01 TV boards are tobacco-free at all hours; QR is /tv-only.");
