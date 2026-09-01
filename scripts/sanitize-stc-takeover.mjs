import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../public/takeover/index.html", import.meta.url);
let html = await readFile(file, "utf8");
const patterns = [
  /<script id="cookieadmin_pro_js-js-extra"[\s\S]*?<\/script>\s*/g,
  /<script id="cookieadmin_js-js-extra"[\s\S]*?<\/script>\s*/g,
  /<link\b[^>]+href="https:\/\/stclaircannabis\.ca\/(?:feed\/|comments\/feed\/|wp-json\/[^\"]*|xmlrpc\.php\?rsd)"[^>]*>\s*/g,
  /<link rel="https:\/\/api\.w\.org\/" href="https:\/\/stclaircannabis\.ca\/wp-json\/">\s*/g,
];

for (const pattern of patterns) html = html.replace(pattern, "");
html = html
  .replaceAll("https://stclaircannabis.ca/wp-content/", "/wp-content/")
  .replaceAll("https:\\/\\/stclaircannabis.ca\\/wp-content\\/", "\\/wp-content\\/");
await writeFile(file, html, "utf8");
