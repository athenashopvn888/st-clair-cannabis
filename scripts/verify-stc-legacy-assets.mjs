import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const origin = process.env.STC_VERIFY_ORIGIN || "http://127.0.0.1:3134";
const manifest = JSON.parse(await readFile(new URL("../docs/stc-legacy-assets-manifest.json", import.meta.url), "utf8"));
const failures = [];
let cursor = 0;

async function worker() {
  while (cursor < manifest.mirrored.length) {
    const asset = manifest.mirrored[cursor++];
    try {
      const response = await fetch(`${origin}${asset.publicPath}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      const sha256 = createHash("sha256").update(buffer).digest("hex");
      if (buffer.length !== asset.bytes) throw new Error(`size ${buffer.length} != ${asset.bytes}`);
      if (sha256 !== asset.sha256) throw new Error(`sha256 ${sha256} != ${asset.sha256}`);
    } catch (error) {
      failures.push({ publicPath: asset.publicPath, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 12 }, () => worker()));
const homepageResponse = await fetch(`${origin}/`);
const homepage = await homepageResponse.text();
const activeLegacyRuntime = [
  ...homepage.matchAll(/<(?:script|link)\b[^>]+(?:src|href)=["']([^"']*(?:wp-admin|wp-json|xmlrpc|cookieadmin|wp-emoji)[^"']*)["'][^>]*>/gi),
].map((match) => match[0]);
const staticReferences = [...homepage.replaceAll("\\/", "/").matchAll(/https:\/\/stclaircannabis\.ca(\/wp-content\/[^\s"'<>()[\]{}]+)/g)]
  .map((match) => match[1].replace(/[),.;]+$/, ""));
const manifestPaths = new Set(manifest.mirrored.map((asset) => asset.publicPath));
const unmirroredReferences = [...new Set(staticReferences.filter((pathname) => !manifestPaths.has(new URL(pathname, "https://stclaircannabis.ca").pathname)))];

const result = {
  origin,
  homepageStatus: homepageResponse.status,
  verifiedAssets: manifest.mirrored.length - failures.length,
  failedAssets: failures.length,
  verifiedBytes: manifest.mirroredBytes,
  activeLegacyRuntimeRequests: activeLegacyRuntime.length,
  unmirroredStaticReferences: unmirroredReferences.length,
  failures,
  activeLegacyRuntime,
  unmirroredReferences,
};
console.log(JSON.stringify(result));
if (failures.length || activeLegacyRuntime.length || unmirroredReferences.length || !homepageResponse.ok) process.exitCode = 1;
