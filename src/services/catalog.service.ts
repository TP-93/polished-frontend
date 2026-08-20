/**
 * Catalog service.
 *
 * The storefront only talks to this module — never to the mock data directly.
 * Every function is async and shaped as a single backend call, so each one can
 * be swapped for a GraphQL query against the real API without touching the UI.
 */
import { categories, collections, faqEntries, products } from "./mock-data";
import type {
  Category,
  Collection,
  FaqEntry,
  Product,
  ProductListResult,
  ProductQuery,
} from "./types";

const latency = 120;

function delay<T>(value: T): Promise<T> {
  if (typeof window === "undefined") return Promise.resolve(value);
  return new Promise((resolve) => setTimeout(() => resolve(value), latency));
}

export async function listCollections(): Promise<Collection[]> {
  return delay(collections);
}

export async function getCollection(slug: string): Promise<Collection | null> {
  return delay(collections.find((c) => c.slug === slug) ?? null);
}

export async function listCategories(): Promise<Category[]> {
  return delay(categories);
}

export async function listProducts(query: ProductQuery = {}): Promise<ProductListResult> {
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

  return delay({ items: items.slice(start, start + perPage), total, page, perPage });
}

export async function getProduct(slug: string): Promise<Product | null> {
  return delay(products.find((p) => p.slug === slug) ?? null);
}

export async function listRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const product = products.find((p) => p.slug === slug);
  if (!product) return delay([]);
  const related = products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        (p.collections.some((c) => product.collections.includes(c)) ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
  return delay(related);
}

export async function listFilterFacets(): Promise<{
  sizes: string[];
  colors: { id: string; hex: string }[];
  categories: Category[];
  maxPriceCents: number;
}> {
  const sizes = [...new Set(products.flatMap((p) => p.sizes.map((s) => s.label)))];
  const colorMap = new Map<string, string>();
  products.forEach((p) => p.colors.forEach((c) => colorMap.set(c.id, c.hex)));
  const maxPriceCents = Math.max(...products.map((p) => p.priceCents));
  return delay({
    sizes,
    colors: [...colorMap].map(([id, hex]) => ({ id, hex })),
    categories,
    maxPriceCents,
  });
}

export async function listFaq(): Promise<FaqEntry[]> {
  return delay(faqEntries);
}

export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean }> {
  return delay({ ok: email.includes("@") });
}

export async function sendContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean }> {
  return delay({ ok: Boolean(input.email && input.message) });
}
