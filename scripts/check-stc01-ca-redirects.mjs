/**
 * Asserts every STC01 .ca map row is covered by a host-conditioned rule,
 * and that each .com target is on the live sitemap or returns 200.
 *
 * Usage:
 *   node scripts/check-stc01-ca-redirects.mjs
 *   node scripts/check-stc01-ca-redirects.mjs --skip-live
 *   node scripts/check-stc01-ca-redirects.mjs --base http://127.0.0.1:3456
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { parse, tokensToRegexp } = require("next/dist/compiled/path-to-regexp");
import {
  HOMEPAGE,
  RULES_PATH,
  buildCaRedirects,
  loadMap,
  slashless,
} from "./stc01-ca-redirects.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_CONFIG = path.join(ROOT, "next.config.ts");
const args = new Set(process.argv.slice(2));
const skipLive = args.has("--skip-live");
const baseArg = process.argv.find((arg, index) => process.argv[index - 1] === "--base");

const EXISTING_REDIRECTS = [
  ["/blog", "/"],
  ["/blog/:path*", "/"],
  ["/exotic", "/exotic-weed"],
  ["/premium", "/premium-weed"],
  ["/aaa", "/aaa-weed"],
  ["/aa", "/aa-weed"],
  ["/budget", "/budget-weed"],
  ["/edibles", "/items/edibles"],
  ["/vapes", "/items/vapes"],
  ["/vape-disposables", "/items/vape-disposables"],
  ["/concentrates", "/items/concentrates"],
  ["/prerolls", "/items/prerolls"],
  ["/add-ons", "/items/add-ons"],
  ["/cigarettes", "/items/cigarettes"],
  ["/magic", "/items/magic"],
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function compile(source) {
  return tokensToRegexp(parse(source));
}

function hostMatches(rule, host) {
  const hostname = host.split(":")[0].toLowerCase();
  return (rule.has ?? []).every((item) => {
    if (item.type !== "host") return false;
    return new RegExp(`^${item.value}$`).test(hostname);
  });
}

function firstMatch(compiled, host, pathname) {
  for (const rule of compiled) {
    if (!hostMatches(rule, host)) continue;
    if (rule.re.test(pathname)) return rule;
  }
  return null;
}

function assertMapCoverage(rules) {
  const compiled = rules.map((rule) => ({ ...rule, re: compile(rule.source) }));
  const rows = loadMap();
  const hosts = ["stclaircannabis.ca", "www.stclaircannabis.ca", "stclaircannabis.ca:443"];
  let checked = 0;

  for (const row of rows) {
    const paths = [row.ca_path, slashless(row.ca_path)];
    if (row.ca_path.includes("%")) {
      try {
        const decoded = decodeURIComponent(row.ca_path);
        paths.push(decoded, slashless(decoded));
      } catch {
        fail(`undecodable path ${row.ca_path}`);
      }
    }
    for (const host of hosts) {
      for (const pathname of paths) {
        const match = firstMatch(compiled, host, pathname);
        checked++;
        if (!match) {
          fail(`no rule for ${host} ${pathname}`);
          continue;
        }
        if (match.destination !== row.com_target) {
          fail(`${host} ${pathname} -> ${match.destination}, map says ${row.com_target}`);
        }
        if (match.statusCode !== 301) fail(`${pathname} is not a 301`);
      }
    }
  }

  const unmapped = [
    "/this-page-is-not-in-the-map",
    "/this-page-is-not-in-the-map/",
    "/wp-content/uploads/x.webp",
    "/wp-content/uploads/x.webp/",
    "/product/page/99",
    "/product/page/99/",
    "/exotic",
    "/exotic/",
    "/blog",
    "/blog/",
  ];
  for (const pathname of unmapped) {
    const match = firstMatch(compiled, "www.stclaircannabis.ca", pathname);
    if (!match || match.destination !== HOMEPAGE) {
      fail(`unmapped ${pathname} -> ${match?.destination ?? "none"}`);
    }
  }

  for (const pathname of ["/", "/about/", "/product/og-kush/", "/items/vapes"]) {
    const match = firstMatch(compiled, "stclaircannabis.com", pathname);
    if (match) fail(`.com ${pathname} matched a .ca rule ${match.source}`);
    const www = firstMatch(compiled, "www.stclaircannabis.com", pathname);
    if (www) fail(`www.com ${pathname} matched a .ca rule ${www.source}`);
  }

  const tail = rules.slice(-4).map((rule) => rule.source);
  const expectedTail = ["/", "/product/page/:n", "/wp-content/:path*", "/:path*"];
  if (tail.join("|") !== expectedTail.join("|")) {
    fail(`generic rule order is ${tail.join(", ")}`);
  }

  console.log(
    `map coverage OK: ${rows.length} rows, ${checked} host/path checks, ${rules.length} rules`,
  );
}

function assertRulesFile(rules) {
  const onDisk = JSON.parse(fs.readFileSync(RULES_PATH, "utf8"));
  if (JSON.stringify(onDisk) !== JSON.stringify(rules)) {
    fail(`${path.relative(ROOT, RULES_PATH)} is out of date. Regenerate it from the CSV.`);
  } else {
    console.log(`rules file OK: ${path.relative(ROOT, RULES_PATH)}`);
  }
}

function assertNextConfig() {
  const source = fs.readFileSync(NEXT_CONFIG, "utf8");
  if (!source.includes("skipTrailingSlashRedirect: true")) {
    fail("next.config.ts is missing skipTrailingSlashRedirect");
  }
  const spreadAt = source.indexOf("...caHostRedirects");
  const slashAt = source.indexOf('source: "/:path+/"');
  const blogAt = source.indexOf('source: "/blog"');
  if (spreadAt < 0 || slashAt < 0 || blogAt < 0 || !(spreadAt < slashAt && slashAt < blogAt)) {
    fail(".ca rules must come before the trailing-slash rule, which must come before /blog");
  }
  if (!source.includes('destination: "/:path+"') || !source.includes("permanent: true")) {
    fail("trailing-slash rule is not the permanent /:path+/ -> /:path+ redirect");
  }
  let cursor = slashAt;
  for (const [from, to] of EXISTING_REDIRECTS) {
    const fromAt = source.indexOf(`source: "${from}"`, cursor);
    const toAt = source.indexOf(`destination: "${to}"`, fromAt);
    if (fromAt < 0 || toAt < 0) {
      fail(`existing redirect ${from} -> ${to} is missing or out of order`);
      return;
    }
    cursor = toAt;
  }
  console.log("next.config.ts OK: .ca rules, then trailing-slash 308, then existing redirects");
}

async function assertTargets(rules) {
  const targets = [...new Set(rules.map((rule) => rule.destination))];
  const sitemapRes = await fetch("https://stclaircannabis.com/sitemap.xml");
  if (!sitemapRes.ok) {
    fail(`sitemap fetch returned ${sitemapRes.status}`);
    return;
  }
  const xml = await sitemapRes.text();
  const sitemap = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

  let onSitemap = 0;
  let http200 = 0;
  const queue = [...targets];
  const problems = [];

  async function worker() {
    while (queue.length > 0) {
      const target = queue.shift();
      if (sitemap.has(target)) onSitemap++;
      try {
        const response = await fetch(target, { method: "HEAD", redirect: "manual" });
        if (response.status === 200) {
          http200++;
        } else if (!sitemap.has(target)) {
          problems.push(`${target} status ${response.status} and not on sitemap`);
        }
      } catch (error) {
        if (!sitemap.has(target)) problems.push(`${target} ${error.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: 8 }, () => worker()));
  for (const problem of problems) fail(problem);
  console.log(
    `targets OK: ${targets.length} distinct, ${onSitemap} listed in sitemap.xml, ${http200} returned 200`,
  );
}

// Next's redirect formatter writes a bare origin as https://host/. That URL is
// still path `/` and answers 200, so it is the same homepage the CSV names
// without a slash. No second hop.
function emittedTarget(url) {
  return url === HOMEPAGE ? `${HOMEPAGE}/` : url;
}

function curl(base, host, pathname) {
  const result = spawnSync(
    "curl",
    ["-sS", "-D", "-", "-o", "/dev/null", "--max-redirs", "0", "-H", `Host: ${host}`, `${base}${pathname}`],
    { encoding: "utf8" },
  );
  const text = result.stdout || "";
  const status = Number((text.match(/^HTTP\/\S+\s+(\d+)/m) || [])[1] || 0);
  const location = (text.match(/^location:\s*(.*)$/im) || [])[1] || "";
  return { status, location };
}

function assertHttp(base) {
  const rows = loadMap();
  const samples = rows; // every map row, not a subset
  let ok = 0;
  const problems = [];
  const hosts = ["stclaircannabis.ca", "www.stclaircannabis.ca"];

  for (const row of rows) {
    const paths = new Set([row.ca_path, slashless(row.ca_path)]);
    if (row.ca_path.includes("%")) {
      try {
        paths.add(decodeURIComponent(row.ca_path));
        paths.add(slashless(decodeURIComponent(row.ca_path)));
      } catch {
        problems.push(`bad encoding ${row.ca_path}`);
      }
    }
    for (const host of hosts) {
      for (const pathname of paths) {
        const hit = curl(base, host, pathname);
        ok++;
        const expected = emittedTarget(row.com_target);
        if (hit.status !== 301 || hit.location !== expected) {
          problems.push(`${host} ${pathname} => ${hit.status} ${hit.location} expected 301 ${expected}`);
        }
      }
    }
  }

  const query = curl(base, "stclaircannabis.ca", "/product/goober-vape-pen-1g/?utm=gbp");
  ok++;
  if (query.status !== 301 || query.location !== "https://stclaircannabis.com/items/vapes?utm=gbp") {
    problems.push(`query preservation => ${query.status} ${query.location}`);
  }

  const comCases = [
    ["stclaircannabis.com", "/weed-dispensary-toronto/", 308, "/weed-dispensary-toronto"],
    ["stclaircannabis.com", "/weed-dispensary-toronto/?ref=1", 308, "/weed-dispensary-toronto?ref=1"],
    ["www.stclaircannabis.com", "/contact/", 308, "/contact"],
    ["stclaircannabis.com", "/blog/", 308, "/blog"],
    ["stclaircannabis.com", "/blog", 308, "/"],
    ["stclaircannabis.com", "/exotic", 308, "/exotic-weed"],
    ["stclaircannabis.com", "/exotic/", 308, "/exotic"],
    ["stclaircannabis.com", "/vapes", 308, "/items/vapes"],
    ["stclaircannabis.com", "/", 200, ""],
    ["www.stclaircannabis.com", "/items/vapes", 200, ""],
    ["stclaircannabis.com", "/sitemap.xml", 200, ""],
    ["stclaircannabis.com", "/robots.txt", 200, ""],
    ["stclaircannabis.com", "/foo//bar", 308, "/foo/bar"],
    ["stclaircannabis.ca", "/exotic/", 301, `${HOMEPAGE}/`],
    ["stclaircannabis.ca", "/not-a-mapped-path/", 301, `${HOMEPAGE}/`],
    ["stclaircannabis.ca", "/wp-content/uploads/x.webp", 301, `${HOMEPAGE}/`],
  ];
  for (const [host, pathname, status, location] of comCases) {
    const hit = curl(base, host, pathname);
    ok++;
    if (hit.status !== status || hit.location !== location) {
      problems.push(`${host} ${pathname} => ${hit.status} ${hit.location} expected ${status} ${location}`);
    }
  }

  if (problems.length > 0) {
    for (const problem of problems.slice(0, 30)) fail(problem);
    if (problems.length > 30) fail(`... ${problems.length - 30} more HTTP mismatches`);
  } else {
    console.log(`HTTP OK: ${ok} requests against ${base} (${samples.length} map rows)`);
  }
}

const rules = buildCaRedirects();
assertRulesFile(rules);
assertMapCoverage(rules);
assertNextConfig();

if (baseArg) assertHttp(baseArg);

if (!skipLive) {
  await assertTargets(rules);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
console.log("STC01 .ca redirect checks passed");
