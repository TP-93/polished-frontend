/** Shared domain types for the storefront service layer. */

export interface Localized {
  nl: string;
  en: string;
}

export interface ProductColor {
  /** Slug used in URLs and filters. */
  id: string;
  name: Localized;
  /** Swatch colour. */
  hex: string;
  image: string;
  /** The product page for this colourway (each colourway is its own product). */
  productSlug: string;
}


export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Category slug, e.g. "sweatshirts". */
  category: string;
  /** Collection slugs this product appears in. */
  collections: string[];
  priceCents: number;
  compareAtCents?: number | undefined;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  customizable: boolean;
  /** Primary customizer design used when `customizable` is true. */
  designId?: string | undefined;
  /** All print designs of this product (front and back artwork). */
  designIds: string[];
  isNew: boolean;
  description: Localized;
  details: Localized[];
  sizing: Localized;
  createdAt: string;
}

export interface Collection {
  slug: string;
  title: string;
  subtitle: Localized;
  image: string;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: Localized;
  group: "shop" | "sale";
}

export type SortKey = "featured" | "new" | "priceAsc" | "priceDesc";

export interface ProductQuery {
  collection?: string;
  category?: string;
  sizes?: string[];
  colors?: string[];
  maxPriceCents?: number;
  customizableOnly?: boolean;
  sort?: SortKey;
  page?: number;
  perPage?: number;
}

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
}

export interface DesignLayer {
  id: string;
  /** Human readable layer name shown in the Customize Tool, e.g. "Angel". */
  name: string;
  /** Absolute URL of the layer artwork (transparent PNG). */
  image: string | null;
  /** Only layers with `editableColor` can be recoloured by the customer. */
  editableColor: boolean;
  editableText: boolean;
  /** False for the garment mock-up layer, true for printed artwork. */
  printable: boolean;
  defaultColor: string;
  /** Stacking order, lowest first. */
  position: number;
  /** Placement of the layer inside the design canvas, in canvas pixels. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Design {
  id: string;
  name: string;
  thumbnail: string | null;
  /** "front" or "back". */
  projection: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: DesignLayer[];
}


export interface ColorTheme {
  id: string;
  name: Localized;
  colors: string[];
}

export interface CartItem {
  id: string;
  productSlug: string;
  name: string;
  colorId: string;
  colorName: Localized;
  size: string;
  quantity: number;
  unitPriceCents: number;
  image: string;
  /** Present when the line was configured in the Customize Tool. */
  customDesign?: {
    designId: string;
    designName: string;
    layerColors: Record<string, string>;
  };
}

export interface FaqEntry {
  id: string;
  category: Localized;
  question: Localized;
  answer: Localized;
}

export interface OrderDraft {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  street: string;
  postal: string;
  city: string;
  country: string;
  paymentMethod: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  totalCents: number;
}
