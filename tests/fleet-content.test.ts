import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { CODED_BANNERS, CODED_NAP, CODED_PAGES, fleetVersion } from "../app/lib/fleet/coded.ts";
import {
  readEmergencyCoded,
  readFleetContent,
  resetFleetContentCache,
  tvManifestDecision,
} from "../app/lib/fleet/read.ts";
import { phoneToTel, resolveBanners, resolveModeValue, resolveNap, resolvePages } from "../app/lib/fleet/resolve.ts";
import { revalidateAuthorized } from "../app/lib/fleet/secret.ts";
import { FLEET_AFFECTED_PATHS } from "../app/lib/fleet/routes.ts";
import { FLEET_MAX_BUNDLE_BYTES, type ContentBundle } from "../app/lib/fleet/types.ts";
import { parseBundle, parseManifest, rejectHttp } from "../app/lib/fleet/validate.ts";

const MANIFEST_URL = "https://fixture.test/STC01/manifest.json";
const BUNDLE_URL = "https://fixture.test/STC01/content-v1.json";
const manifest = JSON.parse(readFileSync(new URL("../fixtures/fleet/manifest.json", import.meta.url), "utf8"));
const bundle = JSON.parse(readFileSync(new URL("../fixtures/fleet/content-v1.json", import.meta.url), "utf8")) as ContentBundle;

function responseFor(body: string, status = 200, headers: Record<string, string> = {}) {
  return new Response(body, { status, headers });
}

function fetchServing(bodies: Record<string, { body: string; status?: number; headers?: Record<string, string> }>) {
  const calls: string[] = [];
  const fetchImpl = async (url: string | URL) => {
    const key = String(url);
    calls.push(key);
    const hit = bodies[key];
    if (!hit) return responseFor("missing", 404);
    return responseFor(hit.body, hit.status ?? 200, hit.headers);
  };
  return { fetchImpl: fetchImpl as typeof fetch, calls };
}

async function acceptFixture() {
  resetFleetContentCache();
  const { fetchImpl, calls } = fetchServing({
    [MANIFEST_URL]: { body: JSON.stringify(manifest), headers: { etag: '"STC01-1"' } },
    [BUNDLE_URL]: { body: JSON.stringify(bundle) },
  });
  const state = await readFleetContent({
    manifestUrl: MANIFEST_URL,
    fetchImpl,
    emergencyCoded: false,
    renderedAt: "2026-10-22T12:00:01.000Z",
  });
  return { state, calls };
}

test("a valid bundle is accepted and a missing manifest stays on coded content", async () => {
  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  assert.equal(coded.active, false);
  assert.equal(coded.version, "STC01:coded");
  assert.equal(coded.nap.street, CODED_NAP.street);
  assert.equal(coded.pages.Home.description, CODED_PAGES.Home.description);

  const { state: live, calls } = await acceptFixture();
  assert.equal(live.active, true);
  assert.equal(live.version, fleetVersion(1));
  assert.equal(live.contentVersion, 1);
  assert.equal(live.bundleUrl, BUNDLE_URL);
  assert.deepEqual(calls, [MANIFEST_URL, BUNDLE_URL]);
  assert.equal(live.banners.map((banner) => banner.id).join(","), "weed,vapes,cigarettes,premium-cigarettes");
  assert.equal(live.banners[0].textBar, "Sheet weed text bar");
  assert.equal(live.banners[0].render, "image");
  assert.equal(live.nap.hours, "Open 24 Hours Daily");
});

test("invalid-200 responses are rejected before they replace the last good bundle", async () => {
  const badImage = {
    ...bundle,
    contentVersion: 2,
    publishedAt: "2026-10-23T00:00:00.000Z",
    slots: [{ ...bundle.slots![0], image: "javascript:alert(1)" }],
  };
  const cases: Array<{ name: string; body: string; status?: number }> = [
    { name: "http", body: JSON.stringify(bundle), status: 500 },
    { name: "invalid-json", body: "{not json" },
    { name: "schema-version", body: JSON.stringify({ ...bundle, schemaVersion: 2, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "wrong-store", body: JSON.stringify({ ...bundle, storeCode: "OTHER01", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "wrong-domain", body: JSON.stringify({ ...bundle, domain: "example.com", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "missing-identity", body: JSON.stringify({ ...bundle, jobId: "", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "bad-image-url", body: JSON.stringify(badImage) },
    { name: "oversized", body: JSON.stringify({ ...bundle, sourceHash: "x".repeat(FLEET_MAX_BUNDLE_BYTES) }) },
    { name: "published-at-older", body: JSON.stringify({ ...bundle, contentVersion: 2, publishedAt: "2020-01-01T00:00:00.000Z" }) },
    { name: "duplicate-version", body: JSON.stringify({ ...bundle, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "decreasing-version", body: JSON.stringify({ ...bundle, contentVersion: 0, publishedAt: "2026-10-23T00:00:00.000Z" }) },
  ];

  for (const item of cases) {
    const direct = item.status && item.status !== 200
      ? rejectHttp(item.status)
      : parseBundle(item.body, bundle);
    assert.equal(direct?.ok, false, item.name);
    if (direct && !direct.ok) assert.equal(direct.reason, item.name);

    await acceptFixture();
    const { fetchImpl } = fetchServing({
      [MANIFEST_URL]: { body: JSON.stringify({ ...manifest, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
      [BUNDLE_URL]: { body: item.body, status: item.status ?? 200 },
    });
    const kept = await readFleetContent({
      manifestUrl: MANIFEST_URL,
      fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-23T00:00:01.000Z",
    });
    assert.equal(kept.contentVersion, 1, item.name);
    assert.equal(kept.banners[0].textBar, "Sheet weed text bar", item.name);
    assert.equal(kept.version, "STC01:1", item.name);
  }
});

test("a blank cell keeps coded copy and a missing image falls back to the coded image", async () => {
  const { state: live } = await acceptFixture();
  assert.equal(live.banners[1].textBar, CODED_BANNERS[1].textBar);
  assert.equal(live.banners[1].alt, CODED_BANNERS[1].alt);
  assert.equal(live.nap.street, CODED_NAP.street);
  assert.equal(live.nap.phoneDisplay, CODED_NAP.phoneDisplay);
  assert.equal(live.pages.Contact.metaDescription, CODED_PAGES.Contact.metaDescription);
  assert.equal(live.banners[3].hidden, true);

  const broken = structuredClone(bundle);
  broken.slots![0].image = "";
  const banners = resolveBanners(broken);
  assert.equal(banners[0].render, "image");
  assert.equal(banners[0].image, CODED_BANNERS[0].image);
  assert.equal(banners[0].categoryName, "Exotic Weed");
  assert.equal(banners[0].textBar, "Sheet weed text bar");

  broken.slots![0].image = "https://example.blob.vercel-storage.com/weed.webp";
  const kept = resolveBanners(broken);
  assert.equal(kept[0].render, "image");
  assert.equal(kept[0].image, "https://example.blob.vercel-storage.com/weed.webp");
  const bannerSource = readFileSync(new URL("../app/components/FleetAnnouncementBanner.tsx", import.meta.url), "utf8");
  assert.match(bannerSource, /onError=\{fail\}/);
  assert.match(bannerSource, /setCurrent\(codedSrc\)/);
  assert.match(bannerSource, /naturalWidth === 0/);
  assert.match(bannerSource, /data-fleet-text-banner/);
  assert.match(bannerSource, /categoryName/);
  assert.match(bannerSource, /setText\(true\)/);
  const textBranch = bannerSource.slice(bannerSource.indexOf("if (text)"), bannerSource.indexOf("no-img-element"));
  assert.match(textBranch, /data-fleet-text-banner/);
  assert.match(textBranch, /\{categoryName\}/);
  assert.doesNotMatch(textBranch, /<img/);
});

test("Follow ALL, Custom, Coded and Hidden each resolve on their own", () => {
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "all value"), { hidden: false, value: "all value" });
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "  "), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "custom value", "coded"), { hidden: false, value: "custom value" });
  assert.deepEqual(resolveModeValue("Custom", "", "coded"), { hidden: false, value: "coded" });
  const blocked = ["3", ".5"].join("");
  assert.deepEqual(resolveModeValue("Custom", `call ${blocked}`, "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Coded", "custom value", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Hidden", "custom value", "coded"), { hidden: true, value: "coded" });

  const follow = structuredClone(bundle);
  follow.slots![0].mode = "Follow ALL";
  assert.equal(resolveBanners(follow)[0].textBar, "ALL weed text bar");
  follow.slots![0].mode = "Coded";
  assert.equal(resolveBanners(follow)[0].textBar, CODED_BANNERS[0].textBar);
  assert.equal(resolveBanners(follow)[0].image, CODED_BANNERS[0].image);
  assert.equal(resolveNap(null).name, CODED_NAP.name);
  assert.equal(resolvePages(bundle).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  const withMeta = structuredClone(bundle);
  withMeta.slots!.push({
    page: "Home",
    spot: "Page meta",
    mode: "Custom",
    metaTitle: "Sheet home title",
    metaDescription: "Sheet home description",
    description: "Sheet home description",
  });
  withMeta.slots!.push({
    page: "Home",
    spot: "Top banner",
    mode: "Coded",
    metaTitle: "",
    metaDescription: "",
    description: "",
  });
  const pages = resolvePages(withMeta);
  assert.equal(pages.Home.metaTitle, "Sheet home title");
  assert.equal(pages.Home.metaDescription, "Sheet home description");
  withMeta.slots!.find((slot) => slot.spot === "Page meta")!.mode = "Coded";
  assert.equal(resolvePages(withMeta).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  assert.equal(phoneToTel("4377832483", CODED_NAP.phoneTel), "+14377832483");
  assert.equal(phoneToTel("(437) 783-2483", CODED_NAP.phoneTel), "+14377832483");
  assert.equal(phoneToTel("1 (437) 783-2483", CODED_NAP.phoneTel), "+14377832483");
  assert.equal(phoneToTel("+1 437-783-2483", CODED_NAP.phoneTel), "+14377832483");
  assert.equal(phoneToTel("not a phone", CODED_NAP.phoneTel), CODED_NAP.phoneTel);
});

test("the version marker, tv manifest 304, emergency coded flag, and revalidate secret stay in their lanes", async () => {
  assert.equal(fleetVersion(null), "STC01:coded");
  assert.equal(fleetVersion(4), "STC01:4");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<meta name="fleet-content-version" content=\{fleet\.version\} \/>/);
  assert.match(readFileSync(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8"), /revalidateTag\(FLEET_CONTENT_TAG, "max"\)/);
  const manifestRoute = readFileSync(new URL("../app/api/tv-manifest/route.ts", import.meta.url), "utf8");
  assert.match(manifestRoute, /s-maxage=60/);
  assert.match(manifestRoute, /stale-while-revalidate=300/);
  assert.match(manifestRoute, /if-none-match/);
  const statusRoute = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  assert.match(statusRoute, /manifest/);
  assert.match(statusRoute, /mode/);
  assert.doesNotMatch(statusRoute, /process\.env|FLEET_REVALIDATE|EDGE_CONFIG/);
  assert.ok(FLEET_AFFECTED_PATHS.includes("/items/cigarettes"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/native-cigarettes-st-clair-west"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv2"));

  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  const miss = tvManifestDecision(coded, '"other"');
  assert.equal(miss.status, 200);
  assert.equal(miss.etag, '"STC01-coded"');
  assert.equal(tvManifestDecision(coded, miss.etag).status, 304);

  const { state: live } = await acceptFixture();
  assert.equal(tvManifestDecision(live, '"STC01-1"').status, 304);
  const manifestBody = tvManifestDecision(live, null).body;
  assert.equal(manifestBody?.bundleUrl, BUNDLE_URL);
  assert.equal(manifestBody?.contentVersion, 1);
  assert.equal((await readFleetContent({ manifestUrl: MANIFEST_URL, emergencyCoded: true, renderedAt: "2026-10-22T00:00:00.000Z" })).version, "STC01:coded");

  assert.equal(revalidateAuthorized("right-secret", "right-secret"), true);
  assert.equal(revalidateAuthorized("wrong-secret", "right-secret"), false);
  assert.equal(revalidateAuthorized(null, "right-secret"), false);
  assert.equal(revalidateAuthorized("right-secret", ""), false);
  const secretSource = readFileSync(new URL("../app/lib/fleet/secret.ts", import.meta.url), "utf8");
  assert.match(secretSource, /FLEET_REVALIDATE_ENV/);
  assert.match(secretSource, /timingSafeEqual/);
  assert.doesNotMatch(secretSource, /right-secret/);

  const previous = process.env.EDGE_CONFIG;
  process.env.EDGE_CONFIG = "https://edge-config.vercel.com/ecfg-test?token=test-token";
  let requestUrl = "";
  const fetchImpl = async (url: string | URL, init?: RequestInit) => {
    requestUrl = String(url);
    const auth = new Headers(init?.headers).get("authorization") || "";
    assert.equal(auth.startsWith("Bearer "), true);
    assert.equal(auth.includes(" "), true);
    return responseFor(JSON.stringify("coded"));
  };
  try {
    assert.equal(await readEmergencyCoded(fetchImpl as typeof fetch), true);
    assert.equal(requestUrl.includes("token"), false);
  } finally {
    if (previous == null) delete process.env.EDGE_CONFIG;
    else process.env.EDGE_CONFIG = previous;
  }
});

test("manifest identity failures and a wrong-store manifest do not publish", () => {
  assert.equal(parseManifest(JSON.stringify({ ...manifest, storeCode: "OTHER01" })).ok, false);
  assert.equal(parseManifest("{").ok, false);
  const missing = parseBundle(JSON.stringify({ schemaVersion: 1 }), null);
  assert.equal(missing.ok, false);
  if (!missing.ok) assert.equal(missing.reason, "missing-identity");
});
