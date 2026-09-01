import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "docs", "stc-legacy-assets-manifest.json");
const scanRoots = [path.join(root, "app"), path.join(root, "public", "takeover", "index.html")];
const textExtensions = new Set([".css", ".html", ".json", ".js", ".mjs", ".ts", ".tsx"]);
const allowedPrefixes = [
  "/wp-content/uploads/",
  "/wp-content/themes/hello-elementor/assets/css/",
];
const allowedExtensions = new Set([".css", ".jpeg", ".jpg", ".mp4", ".png", ".webp"]);

async function collectFiles(target) {
  const stat = await import("node:fs/promises").then(({ stat }) => stat(target));
  if (stat.isFile()) return [target];
  const files = [];
  for (const entry of await readdir(target, { withFileTypes: true })) {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(child)));
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) files.push(child);
  }
  return files;
}

function extractUrls(text) {
  const normalized = text.replaceAll("\\/", "/").replaceAll("&amp;", "&");
  const absolute = [...normalized.matchAll(/https:\/\/stclaircannabis\.ca\/[^\s"'<>()[\]{}]+/g)]
    .map((match) => match[0].replace(/[),.;]+$/, ""));
  const rootRelativeAssets = [...normalized.matchAll(/(?:^|["'(=\s])(\/wp-content\/[^\s"'<>()[\]{}]+)/g)]
    .map((match) => `https://stclaircannabis.ca${match[1].replace(/[),.;]+$/, "")}`);
  return [...absolute, ...rootRelativeAssets];
}

function validateAsset(buffer, extension, contentType) {
  const prefix = buffer.subarray(0, 16);
  const isHtml = /^\s*<!doctype html|^\s*<html/i.test(buffer.subarray(0, 256).toString("utf8"));
  if (isHtml) throw new Error("received HTML instead of an asset");
  if (extension === ".png" && !prefix.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) {
    throw new Error("invalid PNG signature");
  }
  if ([".jpg", ".jpeg"].includes(extension) && !prefix.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"))) {
    throw new Error("invalid JPEG signature");
  }
  if (extension === ".webp" && !(prefix.subarray(0, 4).toString("ascii") === "RIFF" && prefix.subarray(8, 12).toString("ascii") === "WEBP")) {
    throw new Error("invalid WebP signature");
  }
  if (extension === ".mp4" && prefix.subarray(4, 8).toString("ascii") !== "ftyp") {
    throw new Error("invalid MP4 signature");
  }
  if (extension === ".css" && !/text\/css/i.test(contentType || "")) {
    throw new Error(`unexpected CSS content type: ${contentType || "missing"}`);
  }
}

const sourceFiles = (await Promise.all(scanRoots.map(collectFiles))).flat();
const discovered = new Map();
for (const file of sourceFiles) {
  const text = await readFile(file, "utf8");
  for (const rawUrl of extractUrls(text)) {
    const url = new URL(rawUrl);
    const sources = discovered.get(url.href) || [];
    sources.push(path.relative(root, file).replaceAll("\\", "/"));
    discovered.set(url.href, [...new Set(sources)]);
  }
}

const selectedByPath = new Map();
const excluded = [];
for (const [url, sources] of [...discovered.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const parsed = new URL(url);
  const extension = path.posix.extname(parsed.pathname).toLowerCase();
  const allowed = allowedPrefixes.some((prefix) => parsed.pathname.startsWith(prefix)) && allowedExtensions.has(extension);
  if (!allowed) {
    excluded.push({ url, reason: "dynamic, private, plugin runtime, or non-static URL", sources });
    continue;
  }
  const previous = selectedByPath.get(parsed.pathname);
  if (!previous) selectedByPath.set(parsed.pathname, { url, sources });
  else previous.sources = [...new Set([...previous.sources, ...sources])];
}

const queue = [...selectedByPath.entries()].map(([pathname, value]) => ({ pathname, ...value }));
const mirrored = [];
const failures = [];
let cursor = 0;

async function worker() {
  while (cursor < queue.length) {
    const item = queue[cursor++];
    try {
      let response;
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await fetch(item.url, { redirect: "follow" });
          if (response.ok) break;
          lastError = new Error(`HTTP ${response.status}`);
        } catch (error) {
          lastError = error;
        }
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
      if (!response?.ok) throw lastError || new Error("download failed");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      const extension = path.posix.extname(item.pathname).toLowerCase();
      const contentType = response.headers.get("content-type") || "";
      validateAsset(buffer, extension, contentType);
      const destination = path.join(root, "public", ...item.pathname.split("/").filter(Boolean));
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, buffer);
      mirrored.push({
        url: item.url,
        publicPath: item.pathname,
        repositoryPath: path.relative(root, destination).replaceAll("\\", "/"),
        bytes: buffer.length,
        sha256: createHash("sha256").update(buffer).digest("hex"),
        contentType,
        sources: item.sources,
      });
    } catch (error) {
      failures.push({ url: item.url, publicPath: item.pathname, error: error.message, sources: item.sources });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(8, queue.length) }, () => worker()));
mirrored.sort((a, b) => a.publicPath.localeCompare(b.publicPath));
failures.sort((a, b) => a.publicPath.localeCompare(b.publicPath));

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  sourceHost: "https://stclaircannabis.ca",
  strategy: "Mirror only explicitly referenced public upload media and static theme CSS at their original URL paths. Exclude WordPress admin, API, feeds, XML-RPC, plugin runtime, and emoji runtime dependencies.",
  discoveredUniqueSameOriginUrls: discovered.size,
  selectedStaticAssets: queue.length,
  mirroredAssets: mirrored.length,
  failedAssets: failures.length,
  mirroredBytes: mirrored.reduce((sum, item) => sum + item.bytes, 0),
  mirrored,
  failures,
  excluded,
};

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  discovered: manifest.discoveredUniqueSameOriginUrls,
  selected: manifest.selectedStaticAssets,
  mirrored: manifest.mirroredAssets,
  failed: manifest.failedAssets,
  bytes: manifest.mirroredBytes,
  manifest: path.relative(root, manifestPath).replaceAll("\\", "/"),
}));
if (failures.length) process.exitCode = 1;
