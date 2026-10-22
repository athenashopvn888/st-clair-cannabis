import { NextResponse } from "next/server";
import { allFlowers, allItems } from "../../lib/products";
import { getCigaretteSnapshot, reconcileSurfaceItems, snapshotHeaders } from "../../lib/cigaretteFeed";
import { getTvData } from "../../lib/tvStock";

export const runtime = "nodejs";

// Always run the handler. Upstream Apps Script reads are cached for ~300s
// inside getTvData; this response itself is not cached (Cache-Control: no-store).
export const revalidate = 0;

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "flowers";
  const snap = await getCigaretteSnapshot();
  const cigHeaders = snapshotHeaders(snap);

  if (type === "cig") {
    return NextResponse.json(
      {
        on: snap.tv.show,
        tvOn: snap.tv.show,
        webOn: snap.web.show,
        wording: snap.wording,
        live: snap.live,
      },
      { headers: { ...cigHeaders, "Cache-Control": "no-store" } },
    );
  }

  const { body, headers } = await getTvData({
    type,
    staticFlowers: allFlowers,
    staticItems: allItems,
  });

  let payload = body;
  // tvOn can hide cigarette rows already in the feed. It must not add a cigarette board to /tv.
  if (type === "items" && Array.isArray(body) && !snap.tv.show) {
    payload = reconcileSurfaceItems(body, [], false);
    headers["x-tv-data-item-count"] = String(payload.length);
  }

  return NextResponse.json(payload, { headers: { ...headers, ...cigHeaders } });
}
