import "server-only";

import { cache } from "react";
import {
  allFlowers,
  allItems,
  type FlowerProduct,
  type ItemProduct,
} from "./products";
import { getTvData } from "./tvStock";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolvedFlower(product: FlowerProduct, index: number): FlowerProduct {
  const sku = String(product.sku || `flower-${index + 1}`);
  const name = String(product.name || "").trim();
  return {
    ...product,
    sku,
    name,
    slug: String(product.slug || `${slugify(name)}-${slugify(sku)}`),
  };
}

function resolvedItem(product: ItemProduct, index: number): ItemProduct {
  const sku = String(product.sku || `item-${index + 1}`);
  const name = String(product.name || "").trim();
  return {
    ...product,
    sku,
    name,
    slug: String(product.slug || `${slugify(name)}-${slugify(sku)}`),
  };
}

export const getResolvedProducts = cache(async () => {
  const [flowerResult, itemResult] = await Promise.all([
    getTvData({ type: "flowers", staticFlowers: allFlowers, staticItems: allItems }),
    getTvData({ type: "items", staticFlowers: allFlowers, staticItems: allItems }),
  ]);

  return {
    flowers: (flowerResult.body as FlowerProduct[]).map(resolvedFlower),
    items: (itemResult.body as ItemProduct[]).map(resolvedItem),
  };
});
