import {
  buildCollectionPageItemListJsonLd,
  flowerCanonicalUrl,
} from "./collectionPageSchema";
import type { FlowerProduct } from "./products";

export function buildTierCollectionJsonLd({
  canonicalPath,
  name,
  description,
  flowers,
}: {
  canonicalPath: string;
  name: string;
  description: string;
  flowers: Array<Pick<FlowerProduct, "name" | "slug">>;
}) {
  return buildCollectionPageItemListJsonLd({
    canonicalPath,
    name,
    description,
    items: flowers,
    itemUrl: (flower) => flowerCanonicalUrl(flower.slug),
  });
}
