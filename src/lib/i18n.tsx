import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "nl" | "en";

type Dict = Record<string, { nl: string; en: string }>;

const dict: Dict = {
  "nav.shop": { nl: "Shop", en: "Shop" },
  "nav.customize": { nl: "Customize", en: "Customize" },
  "nav.sale": { nl: "Sale", en: "Sale" },
  "nav.story": { nl: "Ons verhaal", en: "Our story" },
  "nav.service": { nl: "Klantenservice", en: "Customer service" },
  "nav.collections": { nl: "Collecties", en: "Collections" },
  "nav.categories": { nl: "Categorieën", en: "Categories" },
  "nav.menu": { nl: "Menu", en: "Menu" },
  "nav.close": { nl: "Sluiten", en: "Close" },
  "nav.cart": { nl: "Winkelwagen", en: "Cart" },

  "announce.shipping": {
    nl: "Gratis verzending vanaf €100 — bezorging in 1-3 werkdagen",
    en: "Free shipping over €100 — delivered in 1-3 working days",
  },
  "announce.custom": {
    nl: "Ontwerp je eigen kleurstelling met de Customize Tool",
    en: "Design your own colourway with the Customize Tool",
  },

  "home.hero.eyebrow": { nl: "FallWinter'25 — Drop Two", en: "FallWinter'25 — Drop Two" },
  "home.hero.title": { nl: "Gemaakt om aangepast te worden", en: "Built to be customised" },
  "home.hero.body": {
    nl: "Zware basics en statement pieces. Kies een stuk, open de Customize Tool en bepaal zelf elke kleur van het ontwerp.",
    en: "Heavyweight basics and statement pieces. Pick an item, open the Customize Tool and set every colour of the artwork yourself.",
  },
  "home.hero.cta": { nl: "Shop de drop", en: "Shop the drop" },
  "home.hero.cta2": { nl: "Hoe customizen werkt", en: "How customising works" },
  "home.collections": { nl: "Collecties", en: "Collections" },
  "home.newIn": { nl: "Nieuw binnen", en: "New in" },
  "home.customizable": { nl: "Customizable pieces", en: "Customizable pieces" },
  "home.sale": { nl: "Sale", en: "Sale" },
  "home.viewAll": { nl: "Bekijk alles", en: "View all" },

  "usp.shipping": { nl: "Gratis verzending vanaf €100", en: "Free shipping over €100" },
  "usp.returns": { nl: "30 dagen retourrecht", en: "30 day returns" },
  "usp.custom": { nl: "Zelf ontworpen kleuren", en: "Self-designed colourways" },
  "usp.made": { nl: "Ontworpen in Nederland", en: "Designed in the Netherlands" },

  "plp.results": { nl: "artikelen", en: "items" },
  "plp.refine": { nl: "Filteren", en: "Refine" },
  "plp.clear": { nl: "Wissen", en: "Clear" },
  "plp.apply": { nl: "Toepassen", en: "Apply" },
  "plp.sort": { nl: "Sorteren", en: "Sort" },
  "plp.sort.featured": { nl: "Aanbevolen", en: "Featured" },
  "plp.sort.new": { nl: "Nieuwste", en: "Newest" },
  "plp.sort.priceAsc": { nl: "Prijs laag - hoog", en: "Price low - high" },
  "plp.sort.priceDesc": { nl: "Prijs hoog - laag", en: "Price high - low" },
  "plp.filter.size": { nl: "Maat", en: "Size" },
  "plp.filter.color": { nl: "Kleur", en: "Colour" },
  "plp.filter.price": { nl: "Prijs", en: "Price" },
  "plp.filter.category": { nl: "Categorie", en: "Category" },
  "plp.filter.customizable": { nl: "Alleen customizable", en: "Customizable only" },
  "plp.empty": { nl: "Geen artikelen gevonden.", en: "No items found." },
  "plp.emptyBody": {
    nl: "Pas je filters aan of bekijk de volledige collectie.",
    en: "Adjust your filters or browse the full collection.",
  },

  "pdp.selectSize": { nl: "Kies je maat", en: "Select your size" },
  "pdp.sizeGuide": { nl: "Maattabel", en: "Size guide" },
  "pdp.color": { nl: "Kleur", en: "Colour" },
  "pdp.addToCart": { nl: "In winkelwagen", en: "Add to cart" },
  "pdp.customize": { nl: "Customize dit item", en: "Customize this item" },
  "pdp.sizeRequired": { nl: "Kies eerst een maat", en: "Please select a size first" },
  "pdp.soldOut": { nl: "Uitverkocht", en: "Sold out" },
  "pdp.details": { nl: "Productdetails", en: "Product details" },
  "pdp.sizing": { nl: "Maatadvies", en: "Size reference & proposal" },
  "pdp.shipping": { nl: "Verzenden & retourneren", en: "Shipping & returns" },
  "pdp.related": { nl: "Combineer met", en: "Style it with" },
  "pdp.added": { nl: "Toegevoegd aan je winkelwagen", en: "Added to your cart" },

  "cz.back": { nl: "Terug", en: "Back" },
  "cz.title": { nl: "Customize Tool", en: "Customize Tool" },
  "cz.selectLayer": { nl: "Kies een laag", en: "Select layer" },
  "cz.selectSource": { nl: "Kies een kleurbron", en: "Select colour source" },
  "cz.generator": { nl: "Kleurgenerator", en: "Colour generator" },
  "cz.themes": { nl: "Kleurthema's", en: "Colour themes" },
  "cz.wheel": { nl: "Kleurenwiel", en: "Colour wheel" },
  "cz.picker": { nl: "Kleurkiezer", en: "Colour picker" },
  "cz.generate": { nl: "Genereer kleur", en: "Generate colour" },
  "cz.finish": { nl: "Laag afronden", en: "Finish layer" },
  "cz.reset": { nl: "Ontwerp resetten", en: "Reset design" },
  "cz.how": { nl: "Hoe werkt het", en: "How it works" },
  "cz.summary": { nl: "Samenvatting", en: "Summary" },
  "cz.product": { nl: "Product", en: "Product" },
  "cz.productColor": { nl: "Productkleur", en: "Product colour" },
  "cz.design": { nl: "Ontwerp", en: "Design" },
  "cz.size": { nl: "Maat", en: "Size" },
  "cz.price": { nl: "Prijs", en: "Price" },
  "cz.addToCart": { nl: "In winkelwagen", en: "Add to cart" },
  "cz.layers": { nl: "lagen", en: "layers" },
  "cz.hex": { nl: "Hexcode", en: "Hex code" },

  "cart.title": { nl: "Winkelwagen", en: "Cart" },
  "cart.empty": { nl: "Je winkelwagen is leeg", en: "Your cart is empty" },
  "cart.emptyBody": {
    nl: "Nog niets toegevoegd. Begin bij de nieuwste drop.",
    en: "Nothing added yet. Start with the latest drop.",
  },
  "cart.continue": { nl: "Verder shoppen", en: "Continue shopping" },
  "cart.remove": { nl: "Verwijderen", en: "Remove" },
  "cart.quantity": { nl: "Aantal", en: "Quantity" },
  "cart.subtotal": { nl: "Subtotaal", en: "Subtotal" },
  "cart.shipping": { nl: "Verzendkosten", en: "Shipping" },
  "cart.free": { nl: "Gratis", en: "Free" },
  "cart.total": { nl: "Totaal", en: "Total" },
  "cart.checkout": { nl: "Afrekenen", en: "Checkout" },
  "cart.custom": { nl: "Eigen ontwerp", en: "Custom design" },
  "cart.summary": { nl: "Overzicht", en: "Order summary" },

  "checkout.title": { nl: "Afrekenen", en: "Checkout" },
  "checkout.contact": { nl: "Contactgegevens", en: "Contact details" },
  "checkout.delivery": { nl: "Bezorgadres", en: "Delivery address" },
  "checkout.payment": { nl: "Betaalmethode", en: "Payment method" },
  "checkout.review": { nl: "Controleren", en: "Review" },
  "checkout.email": { nl: "E-mailadres", en: "Email address" },
  "checkout.phone": { nl: "Telefoonnummer", en: "Phone number" },
  "checkout.firstName": { nl: "Voornaam", en: "First name" },
  "checkout.lastName": { nl: "Achternaam", en: "Last name" },
  "checkout.street": { nl: "Straat en huisnummer", en: "Street and number" },
  "checkout.postal": { nl: "Postcode", en: "Postcode" },
  "checkout.city": { nl: "Plaats", en: "City" },
  "checkout.country": { nl: "Land", en: "Country" },
  "checkout.next": { nl: "Doorgaan", en: "Continue" },
  "checkout.back": { nl: "Terug", en: "Back" },
  "checkout.pay": { nl: "Bestelling plaatsen", en: "Place order" },
  "checkout.required": { nl: "Dit veld is verplicht", en: "This field is required" },
  "checkout.invalidEmail": { nl: "Ongeldig e-mailadres", en: "Invalid email address" },

  "thanks.title": { nl: "Bedankt voor je bestelling", en: "Thank you for your order" },
  "thanks.body": {
    nl: "We hebben je bestelling ontvangen en sturen een bevestiging per e-mail.",
    en: "We received your order and sent a confirmation by email.",
  },
  "thanks.order": { nl: "Bestelnummer", en: "Order number" },

  "footer.newsletter": { nl: "Blijf op de hoogte", en: "Stay in the loop" },
  "footer.newsletterBody": {
    nl: "Drops, restocks en customize releases als eerste in je inbox.",
    en: "Drops, restocks and customize releases in your inbox first.",
  },
  "footer.emailPlaceholder": { nl: "E-mailadres", en: "Email address" },
  "footer.subscribe": { nl: "Aanmelden", en: "Subscribe" },
  "footer.subscribed": { nl: "Je bent aangemeld.", en: "You're subscribed." },
  "footer.service": { nl: "Klantenservice", en: "Customer service" },
  "footer.company": { nl: "JORCUSTOM", en: "JORCUSTOM" },
  "footer.general": { nl: "Algemeen", en: "General" },
  "footer.rights": { nl: "Alle rechten voorbehouden.", en: "All rights reserved." },

  "contact.title": { nl: "Contact", en: "Contact" },
  "contact.body": {
    nl: "Vragen over een bestelling, maat of je eigen ontwerp? We reageren binnen één werkdag.",
    en: "Questions about an order, sizing or your own design? We reply within one working day.",
  },
  "contact.subject": { nl: "Onderwerp", en: "Subject" },
  "contact.message": { nl: "Bericht", en: "Message" },
  "contact.send": { nl: "Versturen", en: "Send" },
  "contact.sent": { nl: "Bedankt, je bericht is verstuurd.", en: "Thanks, your message was sent." },

  "faq.title": { nl: "Veelgestelde vragen", en: "Frequently asked questions" },
  "faq.search": { nl: "Zoek in vragen", en: "Search questions" },
  "faq.noResults": { nl: "Geen vragen gevonden.", en: "No questions found." },

  "common.from": { nl: "vanaf", en: "from" },
  "common.new": { nl: "Nieuw", en: "New" },
  "common.customizable": { nl: "Customizable", en: "Customizable" },
  "common.loading": { nl: "Laden…", en: "Loading…" },
};

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof dict | string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "jc.locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("nl");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "nl" || stored === "en") setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      return entry ? entry[locale] : key;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

/** Pick the right side of a bilingual string pair. */
export function useLocalized() {
  const { locale } = useI18n();
  return (value: { nl: string; en: string }) => value[locale];
}

export function formatPrice(cents: number, locale: Locale = "nl") {
  return new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
