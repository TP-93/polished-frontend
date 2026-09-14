/**
 * Live catalogue access: server functions that talk to the JORCUSTOM GraphQL
 * backend. The storefront services call these and fall back to the bundled
 * catalogue snapshot when the API is unreachable.
 */
import { createServerFn } from "@tanstack/react-start";

import { jcGraphql, mediaBase } from "@/lib/jc/gql.server";
import {
  mapDesign,
  mapProduct,
  type RawDesignNode,
  type RawProductNode,
} from "@/lib/jc/map";
import type { ColorTheme, Design, Product, ProductListResult, ProductQuery } from "@/services/types";

const PRODUCT_CORE = `
  id slug name new tag
  price { amount }
  discountPrice { amount }
  color { name value }
  category { slug name }
  collections { slug name }
  thumbnail { url }
  imageGroups { images { url } }
  stockItems { size quantity }
`;

const COLOR_SIBLINGS = `
  colorSelectionProducts {
    id slug name
    color { name value }
    category { slug }
    thumbnail { url }
    imageGroups { images { url } }
  }
`;

const LIST_FRAGMENT = `${PRODUCT_CORE} ${COLOR_SIBLINGS} designs { id projection }`;

const DETAIL_FRAGMENT = `
  ${PRODUCT_CORE}
  ${COLOR_SIBLINGS}
  description descriptionEn sizeReference sizeReferenceEn
  designs { id projection }
`;

const SORT: Record<string, string> = {
  featured: "{ field: NAME, direction: ASC }",
  new: "{ field: DATE, direction: DESC }",
  priceAsc: "{ field: PRICE, direction: ASC }",
  priceDesc: "{ field: PRICE, direction: DESC }",
};

/** Colourway slug of a product, used for the colour filter. */
function colorSlugOf(product: Product) {
  return product.colors[0]?.id ?? "";
}

async function idForSlug(kind: "category" | "collection", slug: string) {
  const data = await jcGraphql<{ node: { id: string } | null }>(
    `query($slug: String!) { node: ${kind}(slug: $slug) { id } }`,
    { slug },
  );
  return data.node?.id ?? null;
}

export const fetchLiveProducts = createServerFn({ method: "GET" })
  .inputValidator((input: ProductQuery) => input)
  .handler(async ({ data }): Promise<ProductListResult> => {
    const { page = 1, perPage = 24, sort = "featured" } = data;

    const filters: string[] = [];
    const variables: Record<string, unknown> = {};

    if (data.category) {
      const id = await idForSlug("category", data.category);
      if (!id) return { items: [], total: 0, page, perPage };
      filters.push("categories: $categories");
      variables["categories"] = [id];
    }
    if (data.collection) {
      const id = await idForSlug("collection", data.collection);
      if (!id) return { items: [], total: 0, page, perPage };
      filters.push("collections: $collections");
      variables["collections"] = [id];
    }
    if (data.sizes?.length) {
      filters.push("sizes: $sizes");
      variables["sizes"] = data.sizes;
    }
    if (data.maxPriceCents !== undefined) {
      filters.push("priceLte: $priceLte");
      variables["priceLte"] = data.maxPriceCents / 100;
    }

    // Colour and customizable filters have no server-side equivalent, so those
    // pages are narrowed after fetching.
    const postFilter = Boolean(data.colors?.length || data.customizableOnly);
    const want = page * perPage;
    const first = Math.min(postFilter ? Math.max(want * 4, 120) : want, 250);

    const query = `query(${[
      "$first: Int!",
      data.category ? "$categories: [ID]" : "",
      data.collection ? "$collections: [ID]" : "",
      data.sizes?.length ? "$sizes: [String]" : "",
      data.maxPriceCents !== undefined ? "$priceLte: Float" : "",
    ]
      .filter(Boolean)
      .join(", ")}) {
      products(first: $first, sortBy: ${SORT[sort] ?? SORT["featured"]}${
        filters.length ? ", " + filters.join(", ") : ""
      }) {
        totalCount
        edges { node { ${LIST_FRAGMENT} } }
      }
    }`;

    const result = await jcGraphql<{
      products: { totalCount: number; edges: { node: RawProductNode }[] };
    }>(query, { ...variables, first });

    let items = result.products.edges.map((edge) => mapProduct(edge.node));
    let total = result.products.totalCount;

    if (data.customizableOnly) items = items.filter((product) => product.customizable);
    if (data.colors?.length) {
      const wanted = new Set(data.colors);
      items = items.filter((product) => wanted.has(colorSlugOf(product)));
    }
    if (postFilter) total = items.length;

    const start = (page - 1) * perPage;
    return { items: items.slice(start, start + perPage), total, page, perPage };
  });

export const fetchLiveProduct = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<Product | null> => {
    const result = await jcGraphql<{ product: RawProductNode | null }>(
      `query($slug: String!) { product(slug: $slug) { ${DETAIL_FRAGMENT} } }`,
      { slug: data.slug },
    );
    return result.product ? mapProduct(result.product) : null;
  });

export const fetchLiveRelated = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string; limit?: number }) => input)
  .handler(async ({ data }): Promise<Product[]> => {
    const limit = data.limit ?? 4;
    const base = await jcGraphql<{ product: { category: { id: string } | null } | null }>(
      `query($slug: String!) { product(slug: $slug) { category { id } } }`,
      { slug: data.slug },
    );
    const categoryId = base.product?.category?.id;
    if (!categoryId) return [];

    const result = await jcGraphql<{ products: { edges: { node: RawProductNode }[] } }>(
      `query($categories: [ID], $first: Int!) {
        products(first: $first, categories: $categories) {
          edges { node { ${LIST_FRAGMENT} } }
        }
      }`,
      { categories: [categoryId], first: limit + 8 },
    );

    return result.products.edges
      .map((edge) => mapProduct(edge.node))
      .filter((product) => product.slug !== data.slug)
      .slice(0, limit);
  });

export const fetchLiveDesigns = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<Design[]> => {
    const result = await jcGraphql<{ product: { designs: RawDesignNode[] | null } | null }>(
      `query($slug: String!) {
        product(slug: $slug) {
          designs {
            id name thumbnail projection
            layers {
              id name displayName image isEditableColor isEditableText isPrintable
              defaultColor position height width offset
            }
          }
        }
      }`,
      { slug: data.slug },
    );

    const media = mediaBase();
    return (result.product?.designs ?? [])
      .map((design) => mapDesign(design, media))
      .filter((design): design is Design => Boolean(design))
      .sort((a, b) => Number(a.projection === "back") - Number(b.projection === "back"));
  });

export const fetchLiveColorThemes = createServerFn({ method: "GET" }).handler(
  async (): Promise<ColorTheme[]> => {
    const result = await jcGraphql<{ colorThemes: { id: string; name: string; colors: string[] }[] }>(
      `{ colorThemes { id name colors } }`,
    );
    return result.colorThemes.map((theme) => ({
      id: theme.id,
      name: { nl: theme.name, en: theme.name },
      colors: theme.colors,
    }));
  },
);

export const fetchLiveFacets = createServerFn({ method: "GET" }).handler(async () => {
  const result = await jcGraphql<{ stockItemSizes: string[] }>(`{ stockItemSizes }`);
  return { sizes: result.stockItemSizes.map((size) => size.toUpperCase()) };
});
