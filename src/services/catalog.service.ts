/**
 * Catalog service.
 *
 * Primary source is the live JORCUSTOM GraphQL API, reached through server
 * functions in `@/lib/catalog.functions` (the API sits behind basic auth, so
 * those calls must stay server-side). If the API is unreachable the bundled
 * catalogue snapshot is served instead, so the storefront never goes blank.
 */
import {
  fetchLiveFacets,
  fetchLiveProduct,
  fetchLiveProducts,
  fetchLiveRelated,
} from "@/lib/catalog.functions";

import {
  realCategories as categories,
  realCollections as collections,
  realProducts as products,
} from "./data/catalog";
import { faqEntries } from "./faq-data";
import type {
  Category,
  Collection,
  FaqEntry,
  Product,
  ProductListResult,
  ProductQuery,
} from "./types";

/** Run a live API call, falling back to the bundled snapshot on any failure. */
async function live<T>(call: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await call();
  } catch (error) {
    console.warn("[catalog] live API unavailable, using snapshot", error);
    return fallback();
  }
}

export async function listCollections(): Promise<Collection[]> {
  // Collections are not readable anonymously on the API; served from the snapshot.
  return collections;
}

export async function getCollection(slug: string): Promise<Collection | null> {
  return collections.find((c) => c.slug === slug) ?? null;
}

export async function listCategories(): Promise<Category[]> {
  return categories;
}

export async function listProducts(query: ProductQuery = {}): Promise<ProductListResult> {
  return live(
    () => fetchLiveProducts({ data: query }),
    () => snapshotProducts(query),
  );
}

export async function getProduct(slug: string): Promise<Product | null> {
  return live(
    async () => (await fetchLiveProduct({ data: { slug } })) ?? snapshotProduct(slug),
    () => snapshotProduct(slug),
  );
}

export async function listRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  return live(
    async () => {
      const items = await fetchLiveRelated({ data: { slug, limit } });
      return items.length ? items : snapshotRelated(slug, limit);
    },
    () => snapshotRelated(slug, limit),
  );
}

export async function listFilterFacets(): Promise<{
  sizes: string[];
  colors: { id: string; hex: string }[];
  categories: Category[];
  maxPriceCents: number;
}> {
  const snapshot = snapshotFacets();
  return live(async () => {
    const { sizes } = await fetchLiveFacets();
    const known = new Set(snapshot.sizes);
    return { ...snapshot, sizes: sizes.filter((size) => known.has(size)) };
  }, () => snapshot);
}

export async function listFaq(): Promise<FaqEntry[]> {
  return faqEntries;
}

export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean }> {
  return { ok: email.includes("@") };
}

export async function sendContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean }> {
  return { ok: Boolean(input.email && input.message) };
}

/* ---------------------------------------------------------------------- */
/* Snapshot fallbacks                                                     */
/* ---------------------------------------------------------------------- */

function snapshotProducts(query: ProductQuery): ProductListResult {
  const {
    collection,
    category,
    sizes = [],
    colors = [],
    maxPriceCents,
    customizableOnly,
    sort = "featured",
    page = 1,
    perPage = 24,
  } = query;

  let items = products.filter((product) => {
    if (collection && !product.collections.includes(collection)) return false;
    if (category && product.category !== category) return false;
    if (customizableOnly && !product.customizable) return false;
    if (maxPriceCents !== undefined && product.priceCents > maxPriceCents) return false;
    if (sizes.length && !product.sizes.some((s) => sizes.includes(s.label) && s.inStock))
      return false;
    if (colors.length && !product.colors.some((c) => colors.includes(c.id))) return false;
    return true;
  });

  items = [...items].sort((a, b) => {
    switch (sort) {
      case "new":
        return b.createdAt.localeCompare(a.createdAt);
      case "priceAsc":
        return a.priceCents - b.priceCents;
      case "priceDesc":
        return b.priceCents - a.priceCents;
      default:
        return Number(b.isNew) - Number(a.isNew) || a.name.localeCompare(b.name);
    }
  });

  const total = items.length;
  const start = (page - 1) * perPage;
  return { items: items.slice(start, start + perPage), total, page, perPage };
}

function snapshotProduct(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

function snapshotRelated(slug: string, limit: number): Product[] {
  const product = products.find((p) => p.slug === slug);
  if (!product) return [];
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        (p.collections.some((c) => product.collections.includes(c)) ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

function snapshotFacets() {
  const sizeCounts = new Map<string, number>();
  products.forEach((p) =>
    p.sizes.forEach((s) => sizeCounts.set(s.label, (sizeCounts.get(s.label) ?? 0) + 1)),
  );
  const sizes = [...sizeCounts]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label]) => label);

  // The catalogue holds hundreds of colourways; only offer the most common ones.
  const colorCounts = new Map<string, { hex: string; count: number }>();
  products.forEach((p) =>
    p.colors.slice(0, 1).forEach((c) => {
      const existing = colorCounts.get(c.id);
      if (existing) existing.count += 1;
      else colorCounts.set(c.id, { hex: c.hex, count: 1 });
    }),
  );
  const colorMap = new Map<string, string>(
    [...colorCounts]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 24)
      .map(([id, meta]) => [id, meta.hex]),
  );
  const maxPriceCents = Math.max(...products.map((p) => p.priceCents));

  return {
    sizes,
    colors: [...colorMap].map(([id, hex]) => ({ id, hex })),
    categories,
    maxPriceCents,
  };
}
