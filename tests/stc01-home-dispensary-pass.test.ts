import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { HOME_TITLE, HOME_VISIT_CARDS, HOME_VISIT_FAQS, HOME_VISIT_PARAGRAPHS } from "../app/lib/homeStorefront.ts";

const page = fs.readFileSync("app/page.tsx", "utf8");
const layout = fs.readFileSync("app/layout.tsx", "utf8");

test("name-only locked title", () => {
  assert.equal(HOME_TITLE, "St Clair Cannabis Dispensary in St Clair West");
  assert.match(page, /\{HOME_TITLE\}/);
  assert.match(layout, /default: HOME_TITLE/);
  assert.doesNotMatch(HOME_TITLE, /Delivery/i);
});

test("menu and visit actions", () => {
  assert.match(page, /href="\/exotic-weed"[\s\S]*>STORE MENU<\/Link>/);
  assert.match(page, /href="\/#contact"[\s\S]*>Visit \/ Hours<\/Link>/);
});

test("soft storefront body", () => {
  assert.ok(HOME_VISIT_FAQS.length >= 5 && HOME_VISIT_FAQS.length <= 8);
  assert.ok(HOME_VISIT_CARDS.length >= 3 && HOME_VISIT_CARDS.length <= 6);
  assert.doesNotMatch(HOME_VISIT_PARAGRAPHS.join(" "), /order now|live delivery|weed delivery/i);
  for (const card of HOME_VISIT_CARDS) {
    assert.match(card.href, /^\/(contact|faq|weed-dispensary-toronto|exotic-weed)$/);
  }
});
