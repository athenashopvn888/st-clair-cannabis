import { FULL_NAME_NAP, FULL_NAME_NAP_ADDRESS } from "./fullNameNap.ts";

/** Short Google Maps links and Google Business Profile place pins. */
const MAPS_PIN = /maps\.app\.goo\.gl|google\.com\/maps|maps\.google\.com|goo\.gl\/maps/i;

const TV_PATHS = new Set(["/tv", "/tv2"]);

function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

/**
 * In-store displays must not receive the bar or its body padding.
 * /tv and /tv2 are exact routes; other paths keep the bar.
 */
export function showsMobileBottomBar(pathname: string): boolean {
  return !TV_PATHS.has(normalizePath(pathname));
}

/**
 * Prefer the configured maps.app.goo.gl link or GBP pin.
 * Otherwise send people to Google Maps directions for the store address.
 */
export function storeDirectionsUrl(
  configured: string = FULL_NAME_NAP.mapsUrl,
  address: string = FULL_NAME_NAP_ADDRESS,
): string {
  const value = configured.trim();
  if (value && MAPS_PIN.test(value)) return value;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
