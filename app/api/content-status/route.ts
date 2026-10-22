import { NextResponse } from "next/server";
import { getCigaretteSnapshot } from "../../lib/cigaretteFeed";
import { contentStatusPayload } from "../../lib/fleet/status";
import { fleetManifestHealth, getFleetContent } from "../../lib/fleetContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. No secrets and no environment values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const status = contentStatusPayload(fleet, { web: cig.web.show, tv: cig.tv.show, guides: cig.guides.show });
  return NextResponse.json({
    storeCode: status.storeCode,
    contentVersion: status.contentVersion,
    version: status.version,
    manifest: fleetManifestHealth(),
    mode: fleet.active ? "sheet" : "coded",
    renderedAt: status.renderedAt,
    cig: status.cig,
  }, { headers: { "Cache-Control": "no-store" } });
}
