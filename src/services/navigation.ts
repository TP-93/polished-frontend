import type { Localized } from "./types";

export interface NavLink {
  label: Localized;
  to: string;
  params?: Record<string, string>;
}

export const shopCategoryLinks: NavLink[] = [
  { label: { nl: "T-shirts", en: "T-shirts" }, to: "/collection/shop/t-shirts" },
  { label: { nl: "Sweatshirts", en: "Sweatshirts" }, to: "/collection/shop/sweatshirts" },
  { label: { nl: "Hoodies", en: "Hoodies" }, to: "/collection/shop/hoodies" },
  { label: { nl: "Jassen", en: "Jackets" }, to: "/collection/shop/jackets" },
  { label: { nl: "Denim", en: "Denim" }, to: "/collection/shop/denim" },
  { label: { nl: "Broeken", en: "Pants" }, to: "/collection/shop/pants" },
  { label: { nl: "Shorts", en: "Shorts" }, to: "/collection/shop/shorts" },
  { label: { nl: "Summer set", en: "Summer set" }, to: "/collection/shop/summer-set" },
  { label: { nl: "Headwear", en: "Headwear" }, to: "/collection/shop/headwear" },
  { label: { nl: "Accessoires", en: "Accessoires" }, to: "/collection/shop/accessoires" },
  { label: { nl: "Cadeaus", en: "Gifts" }, to: "/collection/shop/gifts" },
  { label: { nl: "Giftcards", en: "Giftcards" }, to: "/collection/shop/giftcards" },
];

export const saleLinks: NavLink[] = [
  { label: { nl: "30% korting", en: "30% off" }, to: "/collection/sale/sale-30" },
  { label: { nl: "40% korting", en: "40% off" }, to: "/collection/sale/sale-40" },
  { label: { nl: "50% korting", en: "50% off" }, to: "/collection/sale/sale-50" },
  { label: { nl: "70% korting", en: "70% off" }, to: "/collection/sale/sale-70" },
];

export const collectionLinks: NavLink[] = [
  { label: { nl: "FallWinter'25 Drop Two", en: "FallWinter'25 Drop Two" }, to: "/collection/fallwinter25-drop-two" },
  { label: { nl: "PreFall'25", en: "PreFall'25" }, to: "/collection/prefall25" },
  { label: { nl: "Denim Capsule", en: "Denim Capsule" }, to: "/collection/denim-capsule" },
  { label: { nl: "Accessoires", en: "Accessoires" }, to: "/collection/accessoires" },
  { label: { nl: "Kingsday'26", en: "Kingsday'26" }, to: "/collection/kingsday26" },
];

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
