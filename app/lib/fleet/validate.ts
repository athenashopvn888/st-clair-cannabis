import {
  FLEET_DOMAIN,
  FLEET_MAX_BUNDLE_BYTES,
  FLEET_SCHEMA_VERSION,
  FLEET_STORE_CODE,
  type ContentBundle,
  type ContentManifest,
  type RejectReason,
} from "./types.ts";

export type AcceptResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: RejectReason };

const BUNDLE_IDENTITY = ["schemaVersion", "storeCode", "domain", "contentVersion", "publishedAt", "sourceHash", "jobId"] as const;
const MANIFEST_IDENTITY = ["storeCode", "contentVersion", "bundleUrl", "publishedAt", "jobId"] as const;

function objectRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function hasIdentity(record: Record<string, unknown>, keys: readonly string[]): boolean {
  return keys.every((key) => {
    const value = record[key];
    if (typeof value === "number") return Number.isFinite(value);
    return typeof value === "string" && value.trim().length > 0;
  });
}

function domainMatches(domain: string): boolean {
  const host = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return host === FLEET_DOMAIN || host === `www.${FLEET_DOMAIN}`;
}

/** Root-relative paths and https URLs are safe. Empty means "use the coded image". */
export function isSafeImageUrl(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !/[\s<>]/.test(trimmed)) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" && !/[\s<>]/.test(trimmed);
  } catch {
    return false;
  }
}

function slotImages(value: unknown): unknown[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((slot) => {
    const record = objectRecord(slot);
    if (!record || !("image" in record)) return [];
    return [record.image];
  });
}

function bundleImages(record: Record<string, unknown>): unknown[] {
  const all = objectRecord(record.all);
  return [...slotImages(record.slots), ...slotImages(all?.slots)];
}

function versionOrder(bundle: ContentBundle, previous: ContentBundle | null): RejectReason | null {
  if (!previous) return null;
  const publishedAt = Date.parse(bundle.publishedAt);
  const previousAt = Date.parse(previous.publishedAt);
  if (!Number.isFinite(publishedAt) || !Number.isFinite(previousAt)) return "missing-identity";
  if (publishedAt < previousAt) return "published-at-older";
  if (bundle.contentVersion === previous.contentVersion) return "duplicate-version";
  if (bundle.contentVersion < previous.contentVersion) return "decreasing-version";
  return null;
}

export function parseBundle(raw: string, previous: ContentBundle | null = null): AcceptResult<ContentBundle> {
  if (Buffer.byteLength(raw) > FLEET_MAX_BUNDLE_BYTES) return { ok: false, reason: "oversized" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
  const record = objectRecord(parsed);
  if (!record || !hasIdentity(record, BUNDLE_IDENTITY)) return { ok: false, reason: "missing-identity" };
  if (record.schemaVersion !== FLEET_SCHEMA_VERSION) return { ok: false, reason: "schema-version" };
  if (record.storeCode !== FLEET_STORE_CODE) return { ok: false, reason: "wrong-store" };
  if (!domainMatches(String(record.domain))) return { ok: false, reason: "wrong-domain" };
  if (!Number.isFinite(Date.parse(String(record.publishedAt)))) return { ok: false, reason: "missing-identity" };
  if (bundleImages(record).some((image) => !isSafeImageUrl(image))) return { ok: false, reason: "bad-image-url" };
  const bundle = record as unknown as ContentBundle;
  const order = versionOrder(bundle, previous);
  if (order) return { ok: false, reason: order };
  return { ok: true, value: bundle };
}

export function parseManifest(raw: string): AcceptResult<ContentManifest> {
  if (Buffer.byteLength(raw) > FLEET_MAX_BUNDLE_BYTES) return { ok: false, reason: "oversized" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
  const record = objectRecord(parsed);
  if (!record || !hasIdentity(record, MANIFEST_IDENTITY)) return { ok: false, reason: "missing-identity" };
  if (record.storeCode !== FLEET_STORE_CODE) return { ok: false, reason: "wrong-store" };
  if (!Number.isFinite(Date.parse(String(record.publishedAt)))) return { ok: false, reason: "missing-identity" };
  if (typeof record.contentVersion !== "number") return { ok: false, reason: "missing-identity" };
  return { ok: true, value: record as unknown as ContentManifest };
}

export function rejectHttp(status: number): AcceptResult<never> | null {
  if (status === 304) return null;
  if (status < 200 || status >= 300) return { ok: false, reason: "http" };
  return null;
}
