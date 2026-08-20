import { realCategories, realCollections } from "./data/catalog";
import type { Localized } from "./types";

export interface NavLink {
  label: Localized;
  to: string;
  params?: Record<string, string>;
}

const SALE_PREFIX = "sale";

/** Main shop categories, most stocked first — derived from the live catalogue. */
export const shopCategoryLinks: NavLink[] = realCategories
  .filter((category) => category.group === "shop")
  .slice(0, 14)
  .map((category) => ({ label: category.name, to: `/collection/shop/${category.slug}` }));

/** Sale tiers, e.g. 30% / 50% off. */
export const saleLinks: NavLink[] = realCollections
  .filter((collection) => collection.slug.startsWith(SALE_PREFIX))
  .map((collection) => ({
    label: { nl: collection.title, en: collection.title },
    to: `/collection/${collection.slug}`,
  }));

/** Seasonal drops and capsules. */
export const collectionLinks: NavLink[] = realCollections
  .filter((collection) => !collection.slug.startsWith(SALE_PREFIX))
  .slice(0, 10)
  .map((collection) => ({
    label: { nl: collection.title, en: collection.title },
    to: `/collection/${collection.slug}`,
  }));

export const serviceLinks: NavLink[] = [
  { label: { nl: "Veelgestelde vragen", en: "FAQ" }, to: "/faq" },
  { label: { nl: "Bestellen", en: "Ordering" }, to: "/bestellen" },
  { label: { nl: "Verzenden", en: "Shipping" }, to: "/verzenden" },
  { label: { nl: "Betalen", en: "Payment" }, to: "/betalen" },
  { label: { nl: "Retourneren", en: "Returns" }, to: "/retouren" },
  { label: { nl: "Contact", en: "Contact" }, to: "/contact" },
];

export const companyLinks: NavLink[] = [
  { label: { nl: "Ons verhaal", en: "Our story" }, to: "/ons-verhaal" },
  { label: { nl: "Media & ambassadeurs", en: "Media & ambassadors" }, to: "/media-ambassadeurs" },
  { label: { nl: "Carrière", en: "Careers" }, to: "/carriere" },
  { label: { nl: "Custom made kleding", en: "Custom made clothing" }, to: "/custom-made-kleding" },
];

export const legalLinks: NavLink[] = [
  { label: { nl: "Privacybeleid", en: "Privacy policy" }, to: "/privacybeleid" },
  { label: { nl: "Cookiebeleid", en: "Cookie policy" }, to: "/cookiebeleid" },
  { label: { nl: "Algemene voorwaarden", en: "Terms & conditions" }, to: "/algemene-voorwaarden" },
  { label: { nl: "Disclaimer", en: "Disclaimer" }, to: "/disclaimer" },
];
