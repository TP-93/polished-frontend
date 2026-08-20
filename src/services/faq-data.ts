/** FAQ content for the storefront help centre. */
import type { FaqEntry } from "./types";

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
