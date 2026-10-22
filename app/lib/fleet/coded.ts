export { CODED_BANNERS, CODED_NAP, CODED_PAGES, FLEET_STORE_CODE } from "./config.ts";
import { CODED_BANNERS, FLEET_STORE_CODE } from "./config.ts";
import type { ResolvedBanner } from "./types.ts";

export function bannersMatchCoded(banners: ResolvedBanner[]): boolean {
  if (banners.length !== CODED_BANNERS.length) return false;
  return CODED_BANNERS.every((coded, index) => {
    const banner = banners[index];
    return Boolean(banner)
      && banner.id === coded.id
      && !banner.hidden
      && banner.image === coded.image
      && banner.alt === coded.alt
      && banner.title === coded.title
      && banner.textBar === coded.textBar
      && banner.href === coded.href;
  });
}

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}
