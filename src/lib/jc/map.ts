/**
 * Pure mappers from the raw JORCUSTOM GraphQL shapes to the storefront domain
 * types. No I/O here, so this module is safe on the client and on the server.
 */
import type { Design, Product, ProductColor } from "@/services/types";

export interface RawImage {
  url: string;
}

export interface RawProductNode {
  id: string;
  slug: string;
  name: string;
  new?: boolean | null;
  tag?: string | null;
  price?: { amount: number } | null;
  discountPrice?: { amount: number } | null;
  color?: { name: string; value: string } | null;
  category?: { slug: string; name: string } | null;
  collections?: { slug: string; name: string }[] | null;
  thumbnail?: RawImage | null;
  imageGroups?: { images?: RawImage[] | null }[] | null;
  stockItems?: { size?: string | null; quantity?: number | null }[] | null;
  description?: string | null;
  descriptionEn?: string | null;
  sizeReference?: string | null;
  sizeReferenceEn?: string | null;
  colorSelectionProducts?: RawProductNode[] | null;
  designs?: RawDesignNode[] | null;
}

export interface RawLayerNode {
  id: string;
  name?: string | null;
  displayName?: string | null;
  image?: string | null;
  isEditableColor?: boolean | null;
  isEditableText?: boolean | null;
  isPrintable?: boolean | null;
  defaultColor?: string | null;
  position?: number | null;
  width?: number | null;
  height?: number | null;
  offset?: string | null;
}

export interface RawDesignNode {
  id: string;
  name?: string | null;
  thumbnail?: string | null;
  projection?: string | null;
  layers?: RawLayerNode[] | null;
}

const SIZE_ORDER = [
  "2XS",
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "ONE SIZE",
];

export function sizeRank(label: string) {
  const index = SIZE_ORDER.indexOf(label.toUpperCase());
  if (index >= 0) return index;
  const numeric = Number(label);
  return Number.isFinite(numeric) ? 100 + numeric : 999;
}

/** Global relay id -> plain database id. */
export function decodeId(gid: string) {
  try {
    return atob(gid).split(":")[1] ?? gid;
  } catch {
    return gid;
  }
}

export function stripHtml(html: string | null | undefined) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function bulletDetails(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, ""));
}

function images(node: RawProductNode) {
  const list: string[] = [];
  for (const group of node.imageGroups ?? []) {
    for (const image of group.images ?? []) {
      if (image.url.includes("placeholder") || list.includes(image.url)) continue;
      list.push(image.url);
    }
  }
  const thumb = node.thumbnail?.url;
  if (thumb && !thumb.includes("placeholder") && !list.includes(thumb)) list.unshift(thumb);
  return list.slice(0, 6);
}

function prettyColorName(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Colourway slug, e.g. "…-slim-fit-t-shirt-acid-pink" -> "acid-pink". */
function colorSlug(node: RawProductNode) {
  const category = node.category?.slug ?? "";
  if (category && node.slug.includes(category)) {
    const tail = node.slug.split(category)[1]?.replace(/^-+/, "");
    if (tail) return tail;
  }
  return (node.color?.name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-") || node.slug;
}

function colorOptions(node: RawProductNode): ProductColor[] {
  const siblings = node.colorSelectionProducts ?? [];
  const ordered = [node, ...siblings.filter((s) => s.slug !== node.slug)];
  const seen = new Set<string>();
  const options: ProductColor[] = [];
  for (const item of ordered) {
    const id = colorSlug(item);
    if (seen.has(id)) continue;
    seen.add(id);
    const label = prettyColorName(id);
    options.push({
      id,
      name: { nl: label, en: label },
      hex: item.color?.value || "#141414",
      image: images(item)[0] ?? "",
      productSlug: item.slug,
    });
  }
  return options;
}

export function mapProduct(node: RawProductNode): Product {
  const priceCents = Math.round((node.price?.amount ?? 0) * 100);
  const discountCents = node.discountPrice ? Math.round(node.discountPrice.amount * 100) : null;
  const collections = (node.collections ?? []).map((c) => c.slug);
  const descriptionNl = stripHtml(node.description);
  const descriptionEn = stripHtml(node.descriptionEn) || descriptionNl;
  const detailsNl = bulletDetails(descriptionNl);
  const detailsEn = bulletDetails(descriptionEn);
  const designIds = (node.designs ?? []).map((design) => decodeId(design.id));

  return {
    id: node.slug,
    slug: node.slug,
    name: node.name,
    category: node.category?.slug ?? "",
    collections,
    priceCents: discountCents ?? priceCents,
    compareAtCents: discountCents ? priceCents : undefined,
    colors: colorOptions(node),
    sizes: (node.stockItems ?? [])
      .filter((item) => item.size)
      .map((item) => ({
        label: (item.size ?? "").toUpperCase(),
        inStock: (item.quantity ?? 0) !== 0,
      }))
      .sort((a, b) => sizeRank(a.label) - sizeRank(b.label)),
    images: images(node),
    customizable: designIds.length > 0,
    designId: designIds[0],
    designIds,
    isNew: Boolean(node.new) || collections.includes("new"),
    description: { nl: descriptionNl, en: descriptionEn },
    details: detailsNl.map((nl, i) => ({ nl, en: detailsEn[i] ?? nl })),
    sizing: {
      nl: stripHtml(node.sizeReference),
      en: stripHtml(node.sizeReferenceEn) || stripHtml(node.sizeReference),
    },
    createdAt: new Date().toISOString(),
  };
}

/** Artwork filenames are production names like `Men_SS25_Angel2.0_SlimFitT-Shirt_Black_Front.psd`. */
export function designDisplayName(name: string) {
  const parts = name.replace(/\.psd$/i, "").split("_").filter(Boolean);
  const artwork = parts[2] ?? parts[parts.length - 1] ?? name;
  return artwork
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .trim();
}

export function mapDesign(node: RawDesignNode, media: string): Design | null {
  const layers = [...(node.layers ?? [])]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((layer) => {
      let offset: { x?: number; y?: number } = {};
      try {
        offset = layer.offset ? (JSON.parse(layer.offset) as { x?: number; y?: number }) : {};
      } catch {
        offset = {};
      }
      return {
        id: decodeId(layer.id),
        name: layer.displayName || layer.name || "",
        image: layer.image ? media + layer.image : null,
        editableColor: Boolean(layer.isEditableColor),
        editableText: Boolean(layer.isEditableText),
        printable: Boolean(layer.isPrintable),
        defaultColor: layer.defaultColor ?? "#ffffff",
        position: layer.position ?? 0,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        width: layer.width ?? 0,
        height: layer.height ?? 0,
      };
    });

  if (!layers.length) return null;
  const base = layers[0]!;

  return {
    id: decodeId(node.id),
    name: designDisplayName(node.name ?? ""),
    thumbnail: node.thumbnail ?? null,
    projection: node.projection ?? "front",
    canvasWidth: base.width || 1667,
    canvasHeight: base.height || 2000,
    layers,
  };
}
