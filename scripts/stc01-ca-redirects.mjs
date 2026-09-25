/**
 * Host-conditioned stclaircannabis.ca → stclaircannabis.com redirect rules.
 *
 * Sources are slashless. Next's path matcher already treats one trailing
 * slash as optional, so each rule matches the WordPress form (/path/) and
 * the slashless form in one hop, as long as these rules are registered
 * before the trailing-slash strip.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CSV_PATH = path.join(HERE, "data", "STC01_CA_TO_COM_301_map.csv");
export const RULES_PATH = path.join(HERE, "..", "redirects", "stc01-ca-host-redirects.json");

export const CA_HOST_VALUE = "(www\\.)?stclaircannabis\\.ca";
export const HOMEPAGE = "https://stclaircannabis.com";

const HOST_HAS = [{ type: "host", value: CA_HOST_VALUE }];

export function slashless(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }
  const [header, ...body] = rows;
  return body.map((cells) => {
    const record = {};
    header.forEach((key, index) => {
      record[key] = cells[index] ?? "";
    });
    return record;
  });
}

export function loadMap(csvPath = CSV_PATH) {
  return parseCsv(fs.readFileSync(csvPath, "utf8"));
}

function redirect(source, destination) {
  return {
    source,
    has: HOST_HAS.map((item) => ({ ...item })),
    destination,
    statusCode: 301,
  };
}

function isProductPage(source) {
  return /^\/product\/page\/[^/]+$/.test(source);
}

/**
 * Specific CSV paths first, then the four generic rules from the proposal:
 * `/`, `/product/page/:n`, `/wp-content/:path*`, and `/:path*`.
 * Decoded ✨ forms are added beside the percent-encoded sources so both the
 * raw UTF-8 path and the %E2%9C%A8 / %e2%9c%a8 spellings resolve.
 */
export function buildCaRedirects(rows = loadMap()) {
  const rules = [];
  const seen = new Set();

  function add(source, destination) {
    if (seen.has(source)) return;
    seen.add(source);
    rules.push(redirect(source, destination));
  }

  for (const row of rows) {
    const source = slashless(row.ca_path);
    if (source === "/" || isProductPage(source)) continue;
    add(source, row.com_target);
    if (source.includes("%")) {
      try {
        add(decodeURIComponent(source), row.com_target);
      } catch {
        // Leave a malformed escape as the encoded source only.
      }
    }
  }

  rules.push(redirect("/", HOMEPAGE));
  rules.push(redirect("/product/page/:n", HOMEPAGE));
  rules.push(redirect("/wp-content/:path*", HOMEPAGE));
  rules.push(redirect("/:path*", HOMEPAGE));
  return rules;
}

export function writeRules(rules = buildCaRedirects()) {
  fs.mkdirSync(path.dirname(RULES_PATH), { recursive: true });
  fs.writeFileSync(RULES_PATH, `${JSON.stringify(rules, null, 2)}\n`);
  return RULES_PATH;
}

if (process.argv.includes("--write")) {
  const written = writeRules();
  console.log(`wrote ${written}`);
}
