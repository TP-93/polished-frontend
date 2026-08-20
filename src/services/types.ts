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
  /** Customizer design used when `customizable` is true. */
  designId?: string | undefined;
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
  name: string;
  defaultColor: string;
  /** Relative area of the artwork, used by the mock preview. */
  weight: number;
}

export interface Design {
  id: string;
  name: string;
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
