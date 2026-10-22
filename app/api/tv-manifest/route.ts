import { NextResponse } from "next/server";
import { getFleetContent, tvManifestDecision } from "../../lib/fleetContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lets the CDN absorb TV polling. Browsers still revalidate; the edge keeps a short copy. */
export const TV_MANIFEST_CACHE_CONTROL = "public, max-age=0, s-maxage=60, stale-while-revalidate=300";

export async function GET(request: Request) {
  const fleet = await getFleetContent();
  const decision = tvManifestDecision(fleet, request.headers.get("if-none-match"));
  const headers = {
    ETag: decision.etag,
    "Cache-Control": TV_MANIFEST_CACHE_CONTROL,
    "Vercel-CDN-Cache-Control": TV_MANIFEST_CACHE_CONTROL,
  };
  if (decision.status === 304) return new NextResponse(null, { status: 304, headers });
  return NextResponse.json(decision.body, { headers });
}
