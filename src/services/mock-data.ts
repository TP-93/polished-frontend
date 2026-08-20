import cargoOlive from "@/assets/product-cargo-olive.jpg";
import denimJacket from "@/assets/product-denim-jacket.jpg";
import hoodieBlack from "@/assets/product-hoodie-black.jpg";
import teeOffwhite from "@/assets/product-tee-offwhite.jpg";

import type {
  Category,
  Collection,
  ColorTheme,
  Design,
  FaqEntry,
  Product,
  ProductColor,
} from "./types";

export const productImages = { hoodieBlack, teeOffwhite, denimJacket, cargoOlive };

export const collections: Collection[] = [
  {
    slug: "fallwinter25-drop-two",
    title: "FallWinter'25 Drop Two",
    subtitle: {
      nl: "Zware fleece, oversized fits en het nieuwe Angel-ontwerp.",
      en: "Heavyweight fleece, oversized fits and the new Angel artwork.",
    },
    image: hoodieBlack,
    featured: true,
  },
  {
    slug: "prefall25",
    title: "PreFall'25",
    subtitle: {
      nl: "Tussenseizoen lagen in gedempte tinten.",
      en: "Mid-season layers in muted tones.",
    },
    image: teeOffwhite,
    featured: true,
  },
  {
    slug: "denim-capsule",
    title: "Denim Capsule",
    subtitle: {
      nl: "Washed denim, gebouwd om te personaliseren.",
      en: "Washed denim, built to personalise.",
    },
    image: denimJacket,
    featured: true,
  },
  {
    slug: "accessoires",
    title: "Accessoires",
    subtitle: { nl: "Caps, beanies en tassen.", en: "Caps, beanies and bags." },
    image: cargoOlive,
    featured: false,
  },
  {
    slug: "kingsday26",
    title: "Kingsday'26",
    subtitle: { nl: "Oranje capsule, beperkte oplage.", en: "Orange capsule, limited run." },
    image: teeOffwhite,
    featured: false,
  },
  {
    slug: "sale",
    title: "Sale",
    subtitle: { nl: "Tot 70% korting op archiefstukken.", en: "Up to 70% off archive pieces." },
    image: cargoOlive,
    featured: true,
  },
];

export const categories: Category[] = [
  { slug: "t-shirts", name: { nl: "T-shirts", en: "T-shirts" }, group: "shop" },
  { slug: "sweatshirts", name: { nl: "Sweatshirts", en: "Sweatshirts" }, group: "shop" },
  { slug: "hoodies", name: { nl: "Hoodies", en: "Hoodies" }, group: "shop" },
  { slug: "jackets", name: { nl: "Jassen", en: "Jackets" }, group: "shop" },
  { slug: "denim", name: { nl: "Denim", en: "Denim" }, group: "shop" },
  { slug: "pants", name: { nl: "Broeken", en: "Pants" }, group: "shop" },
  { slug: "shorts", name: { nl: "Shorts", en: "Shorts" }, group: "shop" },
  { slug: "summer-set", name: { nl: "Summer set", en: "Summer set" }, group: "shop" },
  { slug: "headwear", name: { nl: "Headwear", en: "Headwear" }, group: "shop" },
  { slug: "accessoires", name: { nl: "Accessoires", en: "Accessoires" }, group: "shop" },
  { slug: "gifts", name: { nl: "Cadeaus", en: "Gifts" }, group: "shop" },
  { slug: "giftcards", name: { nl: "Giftcards", en: "Giftcards" }, group: "shop" },
  { slug: "sale-30", name: { nl: "30% korting", en: "30% off" }, group: "sale" },
  { slug: "sale-40", name: { nl: "40% korting", en: "40% off" }, group: "sale" },
  { slug: "sale-50", name: { nl: "50% korting", en: "50% off" }, group: "sale" },
  { slug: "sale-70", name: { nl: "70% korting", en: "70% off" }, group: "sale" },
];

const colorBlack: ProductColor = {
  id: "black",
  name: { nl: "Zwart", en: "Black" },
  hex: "#141414",
  image: hoodieBlack,
};
const colorOffwhite: ProductColor = {
  id: "offwhite",
  name: { nl: "Gebroken wit", en: "Off white" },
  hex: "#EFEADA",
  image: teeOffwhite,
};
const colorOlive: ProductColor = {
  id: "olive",
  name: { nl: "Olijfgroen", en: "Olive" },
  hex: "#4A4F33",
  image: cargoOlive,
};
const colorDenim: ProductColor = {
  id: "mid-blue",
  name: { nl: "Mid blue", en: "Mid blue" },
  hex: "#6C87A6",
  image: denimJacket,
};

const allSizes = (soldOut: string[] = []) =>
  ["XS", "S", "M", "L", "XL", "XXL"].map((label) => ({
    label,
    inStock: !soldOut.includes(label),
  }));

const waistSizes = (soldOut: string[] = []) =>
  ["28", "29", "30", "31", "32", "33", "34", "36"].map((label) => ({
    label,
    inStock: !soldOut.includes(label),
  }));

const oneSize = [{ label: "One size", inStock: true }];

const baseDetails: Localized_[] = [];
type Localized_ = { nl: string; en: string };

const details = (extra: Localized_[] = []): Localized_[] => [
  { nl: "Oversized fit, valt ruim", en: "Oversized fit, generous cut" },
  { nl: "100% biologisch katoen", en: "100% organic cotton" },
  { nl: "Geweven label op de zoom", en: "Woven label at the hem" },
  { nl: "Ontworpen in Nederland", en: "Designed in the Netherlands" },
  ...extra,
  ...baseDetails,
];

const sizingCopy: Localized_ = {
  nl: "Onze fits vallen ruim. Twijfel je tussen twee maten? Kies dan de kleinere maat voor een normale pasvorm.",
  en: "Our fits run generous. Between two sizes? Pick the smaller one for a regular fit.",
};

interface Seed {
  slug: string;
  name: string;
  category: string;
  collections: string[];
  priceCents: number;
  compareAtCents?: number;
  colors: ProductColor[];
  sizes?: Product["sizes"];
  customizable?: boolean;
  designId?: string;
  isNew?: boolean;
  description: Localized_;
}

const seeds: Seed[] = [
  {
    slug: "abovealllimits-fleece-oversized-hoodie-black",
    name: "AboveAllLimits Fleece Oversized Hoodie Black",
    category: "hoodies",
    collections: ["fallwinter25-drop-two"],
    priceCents: 9999,
    colors: [colorBlack, colorOffwhite],
    sizes: allSizes(["XS"]),
    customizable: true,
    designId: "abovealllimits",
    isNew: true,
    description: {
      nl: "Zware fleece hoodie met het AboveAllLimits-ontwerp op de rug. Elk onderdeel van het ontwerp is los in te kleuren met de Customize Tool.",
      en: "Heavyweight fleece hoodie carrying the AboveAllLimits artwork on the back. Every part of the artwork can be coloured separately in the Customize Tool.",
    },
  },
  {
    slug: "angel-heavy-oversized-hoodie-black",
    name: "Angel Heavy Oversized Hoodie Black",
    category: "hoodies",
    collections: ["fallwinter25-drop-two"],
    priceCents: 8999,
    colors: [colorBlack, colorOlive],
    sizes: allSizes(),
    customizable: true,
    designId: "angel",
    isNew: true,
    description: {
      nl: "Oversized hoodie met het Angel-ontwerp, uitgevoerd in een dichte print met vier losse lagen.",
      en: "Oversized hoodie with the Angel artwork, printed as four separately colourable layers.",
    },
  },
  {
    slug: "angel-heavy-sweatshirt-offwhite",
    name: "Angel Heavy Sweatshirt Off White",
    category: "sweatshirts",
    collections: ["prefall25"],
    priceCents: 7999,
    colors: [colorOffwhite, colorBlack],
    sizes: allSizes(["XXL"]),
    customizable: true,
    designId: "angel",
    description: {
      nl: "Crewneck van zwaar geruwd katoen met een verstevigde ronde hals.",
      en: "Crewneck in heavy brushed cotton with a reinforced ribbed collar.",
    },
  },
  {
    slug: "icon-oversized-tee-offwhite",
    name: "Icon Oversized Tee Off White",
    category: "t-shirts",
    collections: ["prefall25"],
    priceCents: 4499,
    colors: [colorOffwhite, colorBlack, colorOlive],
    sizes: allSizes(),
    customizable: true,
    designId: "icon",
    isNew: true,
    description: {
      nl: "Boxy tee van 240 gram katoen met het Icon-ontwerp centraal op de rug.",
      en: "Boxy tee in 240gsm cotton with the Icon artwork centred on the back.",
    },
  },
  {
    slug: "icon-oversized-tee-black",
    name: "Icon Oversized Tee Black",
    category: "t-shirts",
    collections: ["fallwinter25-drop-two"],
    priceCents: 4499,
    compareAtCents: 5999,
    colors: [colorBlack, colorOffwhite],
    sizes: allSizes(["S"]),
    customizable: true,
    designId: "icon",
    description: {
      nl: "Zwarte variant van de Icon tee, met dezelfde boxy pasvorm.",
      en: "Black version of the Icon tee, same boxy fit.",
    },
  },
  {
    slug: "jorcustom-script-tee-black",
    name: "JORCUSTOM Script Tee Black",
    category: "t-shirts",
    collections: ["prefall25", "sale"],
    priceCents: 3499,
    compareAtCents: 4999,
    colors: [colorBlack],
    sizes: allSizes(["XS", "S"]),
    description: {
      nl: "Basic tee met het JORCUSTOM-script op de voorkant.",
      en: "Basic tee with the JORCUSTOM script on the chest.",
    },
  },
  {
    slug: "washed-denim-trucker-jacket-mid-blue",
    name: "Washed Denim Trucker Jacket Mid Blue",
    category: "denim",
    collections: ["denim-capsule"],
    priceCents: 14999,
    colors: [colorDenim],
    sizes: allSizes(["XS", "XXL"]),
    customizable: true,
    designId: "jorcustom",
    isNew: true,
    description: {
      nl: "Oversized trucker jacket van washed denim, geschikt voor een eigen kleurstelling op de rug.",
      en: "Oversized trucker jacket in washed denim, ready for a custom colourway on the back.",
    },
  },
  {
    slug: "washed-denim-wide-jeans-mid-blue",
    name: "Washed Denim Wide Jeans Mid Blue",
    category: "denim",
    collections: ["denim-capsule"],
    priceCents: 10999,
    colors: [colorDenim],
    sizes: waistSizes(["28", "36"]),
    description: {
      nl: "Wide leg jeans met een halfhoge taille en losse val vanaf de knie.",
      en: "Wide leg jeans with a mid rise and a loose fall from the knee.",
    },
  },
  {
    slug: "loose-cargo-pants-olive",
    name: "Loose Cargo Pants Olive",
    category: "pants",
    collections: ["fallwinter25-drop-two"],
    priceCents: 9499,
    colors: [colorOlive, colorBlack],
    sizes: waistSizes(),
    isNew: true,
    description: {
      nl: "Loose cargo van stevig twill met opgestikte zakken op de zijkant.",
      en: "Loose cargo in sturdy twill with patch pockets on the side.",
    },
  },
  {
    slug: "heavy-fleece-sweatpants-black",
    name: "Heavy Fleece Sweatpants Black",
    category: "pants",
    collections: ["fallwinter25-drop-two"],
    priceCents: 7999,
    colors: [colorBlack, colorOlive],
    sizes: allSizes(),
    description: {
      nl: "Sweatpants van dezelfde fleece als de hoodie, met elastische taille.",
      en: "Sweatpants in the same fleece as the hoodie, with an elasticated waist.",
    },
  },
  {
    slug: "twill-overshirt-olive",
    name: "Twill Overshirt Olive",
    category: "jackets",
    collections: ["prefall25"],
    priceCents: 11999,
    compareAtCents: 15999,
    colors: [colorOlive, colorBlack],
    sizes: allSizes(["XS"]),
    description: {
      nl: "Overshirt met dubbele borstzakken, te dragen als lichte jas.",
      en: "Overshirt with double chest pockets, wearable as a light jacket.",
    },
  },
  {
    slug: "bomber-jacket-black",
    name: "Bomber Jacket Black",
    category: "jackets",
    collections: ["fallwinter25-drop-two"],
    priceCents: 17999,
    colors: [colorBlack],
    sizes: allSizes(["XXL"]),
    customizable: true,
    designId: "jorcustom",
    description: {
      nl: "Bomber met geribde boorden en een gladde technische buitenlaag.",
      en: "Bomber with ribbed trims and a smooth technical shell.",
    },
  },
  {
    slug: "mesh-summer-set-offwhite",
    name: "Mesh Summer Set Off White",
    category: "summer-set",
    collections: ["prefall25", "sale"],
    priceCents: 8999,
    compareAtCents: 12999,
    colors: [colorOffwhite],
    sizes: allSizes(),
    description: {
      nl: "Set van shirt en short in luchtige mesh, samen geprijsd.",
      en: "Shirt and shorts set in airy mesh, priced together.",
    },
  },
  {
    slug: "sweat-shorts-olive",
    name: "Sweat Shorts Olive",
    category: "shorts",
    collections: ["sale"],
    priceCents: 4499,
    compareAtCents: 6499,
    colors: [colorOlive, colorBlack],
    sizes: allSizes(["XS"]),
    description: {
      nl: "Korte broek van geruwd sweatkatoen met steekzakken.",
      en: "Shorts in brushed sweat cotton with side pockets.",
    },
  },
  {
    slug: "icon-cap-black",
    name: "Icon Cap Black",
    category: "headwear",
    collections: ["accessoires"],
    priceCents: 3499,
    colors: [colorBlack, colorOffwhite],
    sizes: oneSize,
    description: {
      nl: "Six panel cap met geborduurd Icon-logo en verstelbare sluiting.",
      en: "Six panel cap with an embroidered Icon logo and adjustable strap.",
    },
  },
  {
    slug: "ribbed-beanie-black",
    name: "Ribbed Beanie Black",
    category: "headwear",
    collections: ["accessoires", "fallwinter25-drop-two"],
    priceCents: 2999,
    colors: [colorBlack, colorOlive],
    sizes: oneSize,
    isNew: true,
    description: {
      nl: "Geribde beanie met omgeslagen boord en geweven label.",
      en: "Ribbed beanie with a folded cuff and woven label.",
    },
  },
  {
    slug: "canvas-tote-offwhite",
    name: "Canvas Tote Off White",
    category: "accessoires",
    collections: ["accessoires"],
    priceCents: 2499,
    colors: [colorOffwhite],
    sizes: oneSize,
    description: {
      nl: "Zware canvas tote met lange hengsels en binnenvak.",
      en: "Heavy canvas tote with long handles and an inner pocket.",
    },
  },
  {
    slug: "gift-box-essentials",
    name: "Gift Box Essentials",
    category: "gifts",
    collections: ["accessoires"],
    priceCents: 7999,
    colors: [colorBlack],
    sizes: oneSize,
    description: {
      nl: "Cadeaubox met tee, beanie en sokken in JORCUSTOM-verpakking.",
      en: "Gift box with a tee, beanie and socks in JORCUSTOM packaging.",
    },
  },
  {
    slug: "digital-giftcard",
    name: "Digital Giftcard",
    category: "giftcards",
    collections: ["accessoires"],
    priceCents: 5000,
    colors: [colorOffwhite],
    sizes: oneSize,
    description: {
      nl: "Digitale giftcard, direct per e-mail geleverd en 2 jaar geldig.",
      en: "Digital giftcard, delivered by email instantly and valid for 2 years.",
    },
  },
  {
    slug: "kingsday-orange-tee",
    name: "Kingsday Orange Tee",
    category: "t-shirts",
    collections: ["kingsday26"],
    priceCents: 3999,
    colors: [colorOffwhite],
    sizes: allSizes(),
    customizable: true,
    designId: "icon",
    description: {
      nl: "Limited tee voor Koningsdag met vrij in te kleuren Icon-print.",
      en: "Limited Kingsday tee with a freely colourable Icon print.",
    },
  },
  {
    slug: "archive-hoodie-olive",
    name: "Archive Hoodie Olive",
    category: "hoodies",
    collections: ["sale"],
    priceCents: 5999,
    compareAtCents: 9999,
    colors: [colorOlive, colorBlack],
    sizes: allSizes(["L", "XL"]),
    description: {
      nl: "Archiefstuk uit een eerdere drop, in beperkte maten beschikbaar.",
      en: "Archive piece from an earlier drop, available in limited sizes.",
    },
  },
  {
    slug: "archive-denim-jacket-mid-blue",
    name: "Archive Denim Jacket Mid Blue",
    category: "denim",
    collections: ["sale", "denim-capsule"],
    priceCents: 8999,
    compareAtCents: 17999,
    colors: [colorDenim],
    sizes: allSizes(["S", "M"]),
    description: {
      nl: "Denim jack uit het archief met lichtere wassing.",
      en: "Archive denim jacket in a lighter wash.",
    },
  },
];

const saleTier = (product: Seed): string[] => {
  if (!product.compareAtCents) return [];
  const off = 1 - product.priceCents / product.compareAtCents;
  if (off >= 0.65) return ["sale-70"];
  if (off >= 0.45) return ["sale-50"];
  if (off >= 0.35) return ["sale-40"];
  return ["sale-30"];
};

export const products: Product[] = seeds.map((seed, index) => ({
  id: `p-${index + 1}`,
  slug: seed.slug,
  name: seed.name,
  category: seed.category,
  collections: [...seed.collections, ...saleTier(seed)],
  priceCents: seed.priceCents,
  compareAtCents: seed.compareAtCents,
  colors: seed.colors,
  sizes: seed.sizes ?? allSizes(),
  images: seed.colors.map((c) => c.image),
  customizable: Boolean(seed.customizable),
  designId: seed.designId,
  isNew: Boolean(seed.isNew),
  description: seed.description,
  details: details(),
  sizing: sizingCopy,
  createdAt: new Date(Date.UTC(2026, 7, 20 - index)).toISOString(),
}));

export const designs: Design[] = [
  {
    id: "abovealllimits",
    name: "AboveAllLimits",
    layers: [
      { id: "angel", name: "Angel", defaultColor: "#4A4F33", weight: 3 },
      { id: "icon-1", name: "Icon", defaultColor: "#8C9068", weight: 1 },
      { id: "icon-2", name: "Icon", defaultColor: "#2E3120", weight: 1 },
      { id: "above-all-limits", name: "Above All Limits", defaultColor: "#D8D5C6", weight: 2 },
      { id: "jorcustom", name: "JORCUSTOM", defaultColor: "#141414", weight: 1 },
    ],
  },
  {
    id: "angel",
    name: "Angel",
    layers: [
      { id: "wings", name: "Angel", defaultColor: "#4A4F33", weight: 3 },
      { id: "body", name: "Angel body", defaultColor: "#8C9068", weight: 2 },
      { id: "halo", name: "Halo", defaultColor: "#D8D5C6", weight: 1 },
      { id: "jorcustom", name: "JORCUSTOM", defaultColor: "#141414", weight: 1 },
    ],
  },
  {
    id: "icon",
    name: "Icon",
    layers: [
      { id: "icon-outer", name: "Icon", defaultColor: "#141414", weight: 2 },
      { id: "icon-inner", name: "Icon inner", defaultColor: "#EFEADA", weight: 1 },
      { id: "jorcustom", name: "JORCUSTOM", defaultColor: "#4A4F33", weight: 1 },
    ],
  },
  {
    id: "jorcustom",
    name: "JORCUSTOM",
    layers: [
      { id: "wordmark", name: "JORCUSTOM", defaultColor: "#141414", weight: 3 },
      { id: "outline", name: "Outline", defaultColor: "#EFEADA", weight: 1 },
    ],
  },
];

export const colorThemes: ColorTheme[] = [
  {
    id: "field",
    name: { nl: "Veld", en: "Field" },
    colors: ["#4A4F33", "#8C9068", "#D8D5C6", "#2E3120", "#141414"],
  },
  {
    id: "concrete",
    name: { nl: "Beton", en: "Concrete" },
    colors: ["#8E8E8E", "#C9C9C4", "#5A5A5A", "#EFEFEA", "#232323"],
  },
  {
    id: "sunset",
    name: { nl: "Zonsondergang", en: "Sunset" },
    colors: ["#D96A3C", "#F0B268", "#7A3B2E", "#F5E4CE", "#2A1A16"],
  },
  {
    id: "cobalt",
    name: { nl: "Kobalt", en: "Cobalt" },
    colors: ["#2F4DA8", "#7A93D8", "#16224A", "#E3E8F7", "#0C1024"],
  },
  {
    id: "mono",
    name: { nl: "Mono", en: "Mono" },
    colors: ["#141414", "#3D3D3D", "#7A7A7A", "#BDBDBD", "#F4F4F0"],
  },
  {
    id: "orchid",
    name: { nl: "Orchidee", en: "Orchid" },
    colors: ["#6C4A8C", "#A987C4", "#2E1E3D", "#EFE6F5", "#141414"],
  },
];

export const faqEntries: FaqEntry[] = [
  {
    id: "faq-order",
    category: { nl: "Bestellen", en: "Ordering" },
    question: {
      nl: "Hoe plaats ik een bestelling?",
      en: "How do I place an order?",
    },
    answer: {
      nl: "Kies een product en maat, voeg het toe aan je winkelwagen en reken af. Wil je een eigen kleurstelling? Open dan eerst de Customize Tool op de productpagina.",
      en: "Pick a product and size, add it to your cart and check out. Want your own colourway? Open the Customize Tool on the product page first.",
    },
  },
  {
    id: "faq-custom",
    category: { nl: "Customize", en: "Customize" },
    question: {
      nl: "Hoe werkt de Customize Tool?",
      en: "How does the Customize Tool work?",
    },
    answer: {
      nl: "Je selecteert een laag van het ontwerp en kiest daar een kleur voor via de generator, een kleurthema, het kleurenwiel of een hexcode. Elke laag kun je los aanpassen en je ziet het resultaat direct.",
      en: "Select a layer of the artwork and give it a colour using the generator, a colour theme, the colour wheel or a hex code. Every layer is adjustable on its own and updates live.",
    },
  },
  {
    id: "faq-custom-time",
    category: { nl: "Customize", en: "Customize" },
    question: {
      nl: "Hoe lang duurt het maken van een eigen ontwerp?",
      en: "How long does a custom design take to make?",
    },
    answer: {
      nl: "Eigen ontwerpen worden op aanvraag geprint. Reken op 3 tot 5 werkdagen productietijd bovenop de normale levertijd.",
      en: "Custom designs are printed on demand. Allow 3 to 5 working days of production on top of the normal delivery time.",
    },
  },
  {
    id: "faq-shipping",
    category: { nl: "Verzenden", en: "Shipping" },
    question: { nl: "Wat zijn de verzendkosten?", en: "What does shipping cost?" },
    answer: {
      nl: "Verzending binnen Nederland en België kost €4,95 en is gratis vanaf €100. Rest van Europa €9,95.",
      en: "Shipping within the Netherlands and Belgium is €4.95 and free over €100. Rest of Europe €9.95.",
    },
  },
  {
    id: "faq-delivery",
    category: { nl: "Verzenden", en: "Shipping" },
    question: { nl: "Wanneer wordt mijn bestelling bezorgd?", en: "When is my order delivered?" },
    answer: {
      nl: "Voorraadartikelen worden binnen 1 tot 3 werkdagen bezorgd. Je ontvangt een tracklink zodra het pakket is opgehaald.",
      en: "In-stock items arrive within 1 to 3 working days. You receive a tracking link as soon as the parcel is collected.",
    },
  },
  {
    id: "faq-payment",
    category: { nl: "Betalen", en: "Payment" },
    question: { nl: "Welke betaalmethodes kan ik gebruiken?", en: "Which payment methods can I use?" },
    answer: {
      nl: "iDEAL, Bancontact, creditcard, PayPal en Klarna achteraf betalen.",
      en: "iDEAL, Bancontact, credit card, PayPal and Klarna pay later.",
    },
  },
  {
    id: "faq-returns",
    category: { nl: "Retourneren", en: "Returns" },
    question: { nl: "Kan ik mijn bestelling retourneren?", en: "Can I return my order?" },
    answer: {
      nl: "Voorraadartikelen kun je binnen 30 dagen ongebruikt retourneren. Zelf ontworpen items zijn op maat gemaakt en daarom uitgesloten van retour.",
      en: "In-stock items can be returned unused within 30 days. Self-designed items are made to order and therefore excluded from returns.",
    },
  },
  {
    id: "faq-size",
    category: { nl: "Maten", en: "Sizing" },
    question: { nl: "Welke maat moet ik kiezen?", en: "Which size should I pick?" },
    answer: {
      nl: "Onze fits vallen ruim. Twijfel je tussen twee maten, kies dan de kleinere maat voor een normale pasvorm.",
      en: "Our fits run generous. Between two sizes, pick the smaller one for a regular fit.",
    },
  },
];
