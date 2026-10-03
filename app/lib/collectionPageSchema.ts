/**
 * Tier-page schema contract (STC01 implementation).
 *
 * SITE_ORIGIN must stay identical to STORE.baseUrl / homepage WebSite+Store @ids.
 * Keep this file free of storeIdentity runtime imports so Node contract tests can load it.
 *
 * Copy this pattern to other eligible store architectures:
 * 1. One `@graph` with CollectionPage + ItemList (FAQPage may append).
 * 2. CollectionPage.isPartOf → stable WebSite `@id` (`{origin}/#website`).
 * 3. CollectionPage.about → stable Store `@id` (`{origin}/#store`).
 * 4. ItemList.itemListElement[].url → canonical product PDP, not the category URL.
 * 5. Category/tier graphs must not emit Offer, price, or availability fields.
 *    Product Offers belong on `/flower/{slug}` (or `/item/{slug}`) PDPs only.
 *
 * Flower tier routes on this store: /exotic-weed /premium-weed /aaa-weed /aa-weed /budget-weed
 * Legacy /exotic /premium /aaa /aa /budget permanently redirect to the *-weed URL.
 */
export const SITE_ORIGIN = "https://stclaircannabis.com";
export const SCHEMA_WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SCHEMA_STORE_ID = `${SITE_ORIGIN}/#store`;

export const TIER_COLLECTION_SCHEMA_CONTRACT = {
  context: "https://schema.org",
  requiredTypes: ["CollectionPage", "ItemList"] as const,
  websiteId: SCHEMA_WEBSITE_ID,
  storeId: SCHEMA_STORE_ID,
  collectionFragment: "webpage",
  itemListFragment: "itemlist",
  flowerProductPathPrefix: "/flower/",
  itemProductPathPrefix: "/item/",
  forbiddenTypes: [
    "Offer",
    "AggregateOffer",
    "UnitPriceSpecification",
    "PriceSpecification",
  ] as const,
  forbiddenKeys: [
    "price",
    "priceCurrency",
    "priceSpecification",
    "availability",
    "lowPrice",
    "highPrice",
    "offerCount",
    "priceValidUntil",
  ] as const,
} as const;

export const FLOWER_TIER_COLLECTION_PATHS = [
  "/exotic-weed",
  "/premium-weed",
  "/aaa-weed",
  "/aa-weed",
  "/budget-weed",
] as const;

export type CollectionListItem = {
  name: string;
  slug: string;
};

export type CollectionPageItemListJsonLd = {
  "@context": "https://schema.org";
  "@graph": [
    {
      "@type": "CollectionPage";
      "@id": string;
      url: string;
      name: string;
      description: string;
      isPartOf: { "@id": string };
      about: { "@id": string };
      mainEntity: { "@id": string };
    },
    {
      "@type": "ItemList";
      "@id": string;
      numberOfItems: number;
      itemListElement: Array<{
        "@type": "ListItem";
        position: number;
        name: string;
        url: string;
      }>;
    },
  ];
};

export function absoluteUrl(canonicalPath: string) {
  return `${SITE_ORIGIN}${canonicalPath}`;
}
export function flowerCanonicalUrl(slug: string) {
  return `${SITE_ORIGIN}${TIER_COLLECTION_SCHEMA_CONTRACT.flowerProductPathPrefix}${slug}`;
}

export function itemCanonicalUrl(slug: string) {
  return `${SITE_ORIGIN}${TIER_COLLECTION_SCHEMA_CONTRACT.itemProductPathPrefix}${slug}`;
}

export function buildCollectionPageItemListJsonLd({
  canonicalPath,
  name,
  description,
  items,
  itemUrl,
}: {
  canonicalPath: string;
  name: string;
  description: string;
  items: CollectionListItem[];
  itemUrl: (item: CollectionListItem) => string;
}): CollectionPageItemListJsonLd {
  const url = absoluteUrl(canonicalPath);
  const collectionId = `${url}#${TIER_COLLECTION_SCHEMA_CONTRACT.collectionFragment}`;
  const itemListId = `${url}#${TIER_COLLECTION_SCHEMA_CONTRACT.itemListFragment}`;

  return {
    "@context": TIER_COLLECTION_SCHEMA_CONTRACT.context,
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": collectionId,
        url,
        name,
        description,
        isPartOf: { "@id": SCHEMA_WEBSITE_ID },
        about: { "@id": SCHEMA_STORE_ID },
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: itemUrl(item),
        })),
      },
    ],
  };
}

export function collectSchemaKeysAndTypes(node: unknown) {
  const keys = new Set<string>();
  const types = new Set<string>();

  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const entry of value) visit(entry);
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      keys.add(key);
      if (key === "@type") {
        const listed = Array.isArray(child) ? child : [child];
        for (const typeName of listed) {
          if (typeof typeName === "string") types.add(typeName);
        }
      }
      visit(child);
    }
  };

  visit(node);
  return { keys, types };
}

export function assertCollectionPageItemListContract(
  jsonLd: CollectionPageItemListJsonLd,
  {
    canonicalPath,
    expectedItemUrls,
  }: {
    canonicalPath: string;
    expectedItemUrls: string[];
  },
) {
  const contract = TIER_COLLECTION_SCHEMA_CONTRACT;
  const url = absoluteUrl(canonicalPath);
  const [collection, list] = jsonLd["@graph"];
  const { keys, types } = collectSchemaKeysAndTypes(jsonLd);

  if (jsonLd["@context"] !== contract.context) {
    throw new Error("Collection graph must use https://schema.org");
  }
  if (collection["@type"] !== "CollectionPage") {
    throw new Error("First @graph node must be CollectionPage");
  }
  if (list["@type"] !== "ItemList") {
    throw new Error("Second @graph node must be ItemList");
  }
  if (collection.url !== url || collection["@id"] !== `${url}#webpage`) {
    throw new Error(`CollectionPage URL/@id must use canonical ${url}`);
  }
  if (collection.isPartOf["@id"] !== contract.websiteId) {
    throw new Error(`CollectionPage.isPartOf must be ${contract.websiteId}`);
  }
  if (collection.about["@id"] !== contract.storeId) {
    throw new Error(`CollectionPage.about must be ${contract.storeId}`);
  }
  if (collection.mainEntity["@id"] !== `${url}#itemlist` || list["@id"] !== `${url}#itemlist`) {
    throw new Error("ItemList @id must match CollectionPage.mainEntity");
  }
  if (list.numberOfItems !== expectedItemUrls.length) {
    throw new Error("ItemList.numberOfItems must match visible product count");
  }
  const actualUrls = list.itemListElement.map((entry) => entry.url);
  if (JSON.stringify(actualUrls) !== JSON.stringify(expectedItemUrls)) {
    throw new Error("ItemList URLs must be canonical product PDPs in visible order");
  }
  for (const forbidden of contract.forbiddenTypes) {
    if (types.has(forbidden)) {
      throw new Error(`Category schema must not emit ${forbidden}`);
    }
  }
  for (const forbidden of contract.forbiddenKeys) {
    if (keys.has(forbidden)) {
      throw new Error(`Category schema must not emit ${forbidden}`);
    }
  }
}
