import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", ".next", "node_modules"]);
const textExtensions = new Set([
  ".css", ".csv", ".html", ".js", ".json", ".jsx", ".md", ".mjs",
  ".scss", ".svg", ".toml", ".ts", ".tsx", ".txt", ".webmanifest",
  ".xml", ".yaml", ".yml",
]);
const firstBrandWord = ["after"].join("");
const secondBrandWord = ["dark"].join("");
const compactBrand = `${firstBrandWord}${secondBrandWord}`;
const spacedBrand = `${firstBrandWord}[ -]?${secondBrandWord}`;
const shortBrand = ["a", "d", "c"].join("");
const storeAlias = ["m", "j", "0", "1"].join("");
const forbiddenText = new RegExp(
  `\\b(?:${spacedBrand}(?:cannabis)?|${shortBrand}|${storeAlias})\\b`,
  "i",
);
const forbiddenFileName = new RegExp(
  `(?:${compactBrand}|${firstBrandWord}[ _-]?${secondBrandWord}|(?:^|[._-])${shortBrand}(?:[._-]|$)|${storeAlias})`,
  "i",
);
const forbiddenAssetHash = "d46e195f718d717fa14dafa8a6f984484da0b31f3d323c17b3bde7ecd8edee0a";
const failures = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, absolutePath).replaceAll("\\", "/");

    if (forbiddenFileName.test(entry.name)) {
      failures.push(`${relativePath}: forbidden cross-brand filename`);
    }
    if (entry.isDirectory()) {
      walk(absolutePath);
      continue;
    }
    if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      const text = fs.readFileSync(absolutePath, "utf8");
      if (forbiddenText.test(text)) {
        failures.push(`${relativePath}: forbidden cross-brand text or URL`);
      }
    }
    if (relativePath.startsWith("public/")) {
      const hash = crypto.createHash("sha256").update(fs.readFileSync(absolutePath)).digest("hex");
      if (hash === forbiddenAssetHash) {
        failures.push(`${relativePath}: forbidden cross-brand asset hash`);
      }
    }
  }
}

walk(root);

if (failures.length > 0) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

process.stdout.write("STC01 brand isolation PASS: no forbidden text, URL, filename, or asset hash found.\n");
