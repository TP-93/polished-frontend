import type { Localized } from "./types";

export interface ContentSection {
  heading: Localized;
  body: Localized[];
}

export interface ContentPage {
  slug: string;
  title: Localized;
  intro: Localized;
  sections: ContentSection[];
}

const p = (nl: string, en: string): Localized => ({ nl, en });

export const contentPages: Record<string, ContentPage> = {
  bestellen: {
    slug: "bestellen",
    title: p("Bestellen", "Ordering"),
    intro: p(
      "Alles over het plaatsen van een bestelling, van maatkeuze tot bevestiging.",
      "Everything about placing an order, from picking a size to confirmation.",
    ),
    sections: [
      {
        heading: p("Een bestelling plaatsen", "Placing an order"),
        body: [
          p(
            "Kies op de productpagina een kleur en maat en voeg het item toe aan je winkelwagen. Je kunt daarna verder shoppen of direct afrekenen.",
            "Pick a colour and size on the product page and add the item to your cart. You can keep shopping or check out straight away.",
          ),
          p(
            "Wil je een eigen kleurstelling? Klik dan op 'Customize dit item' en stel per laag van het ontwerp een kleur in.",
            "Want your own colourway? Click 'Customize this item' and set a colour for every layer of the artwork.",
          ),
        ],
      },
      {
        heading: p("Bevestiging", "Confirmation"),
        body: [
          p(
            "Na het afrekenen ontvang je direct een bevestiging per e-mail met je bestelnummer en een overzicht van je items.",
            "After checkout you immediately receive an email confirmation with your order number and an overview of your items.",
          ),
        ],
      },
      {
        heading: p("Bestelling wijzigen", "Changing an order"),
        body: [
          p(
            "Zolang je bestelling nog niet in productie is, kun je binnen 2 uur na plaatsen een wijziging doorgeven via contact.",
            "As long as your order has not entered production you can request a change within 2 hours of placing it via contact.",
          ),
        ],
      },
    ],
  },
  verzenden: {
    slug: "verzenden",
    title: p("Verzenden", "Shipping"),
    intro: p(
      "Verzendkosten, levertijden en tracking.",
      "Shipping rates, delivery times and tracking.",
    ),
    sections: [
      {
        heading: p("Tarieven", "Rates"),
        body: [
          p(
            "Nederland en België: €4,95, gratis vanaf €100. Rest van Europa: €9,95. Buiten Europa: €19,95.",
            "Netherlands and Belgium: €4.95, free over €100. Rest of Europe: €9.95. Outside Europe: €19.95.",
          ),
        ],
      },
      {
        heading: p("Levertijden", "Delivery times"),
        body: [
          p(
            "Voorraadartikelen worden binnen 1 tot 3 werkdagen bezorgd. Zelf ontworpen items hebben 3 tot 5 werkdagen extra productietijd.",
            "In-stock items arrive within 1 to 3 working days. Self-designed items need 3 to 5 extra working days of production.",
          ),
        ],
      },
      {
        heading: p("Tracking", "Tracking"),
        body: [
          p(
            "Zodra je pakket is opgehaald ontvang je een e-mail met tracklink zodat je de bezorging kunt volgen.",
            "As soon as your parcel is collected you receive an email with a tracking link so you can follow the delivery.",
          ),
        ],
      },
    ],
  },
  betalen: {
    slug: "betalen",
    title: p("Betalen", "Payment"),
    intro: p("Beschikbare betaalmethodes en veiligheid.", "Available payment methods and security."),
    sections: [
      {
        heading: p("Betaalmethodes", "Payment methods"),
        body: [
          p(
            "Je kunt betalen met iDEAL, Bancontact, creditcard, PayPal en Klarna achteraf betalen.",
            "You can pay with iDEAL, Bancontact, credit card, PayPal and Klarna pay later.",
          ),
        ],
      },
      {
        heading: p("Veilig betalen", "Secure payment"),
        body: [
          p(
            "Alle betalingen lopen via een beveiligde verbinding. We slaan geen betaalgegevens op.",
            "All payments run over a secure connection. We never store payment details.",
          ),
        ],
      },
    ],
  },
  retouren: {
    slug: "retouren",
    title: p("Retourneren", "Returns"),
    intro: p(
      "Retourvoorwaarden, termijnen en uitzonderingen.",
      "Return conditions, windows and exceptions.",
    ),
    sections: [
      {
        heading: p("Retourtermijn", "Return window"),
        body: [
          p(
            "Je hebt 30 dagen na ontvangst om voorraadartikelen ongebruikt en met labels te retourneren.",
            "You have 30 days after delivery to return in-stock items unused and with labels attached.",
          ),
        ],
      },
      {
        heading: p("Zelf ontworpen items", "Self-designed items"),
        body: [
          p(
            "Items met een eigen kleurstelling worden speciaal voor jou geproduceerd en kunnen daarom niet worden geretourneerd, tenzij er een productiefout is.",
            "Items with your own colourway are produced specifically for you and can therefore not be returned, unless there is a production fault.",
          ),
        ],
      },
      {
        heading: p("Terugbetaling", "Refunds"),
        body: [
          p(
            "Na ontvangst en controle van je retour betalen we binnen 5 werkdagen terug via dezelfde betaalmethode.",
            "After we receive and check your return we refund within 5 working days via the original payment method.",
          ),
        ],
      },
    ],
  },
  "ons-verhaal": {
    slug: "ons-verhaal",
    title: p("Ons verhaal", "Our story"),
    intro: p(
      "JORCUSTOM begon met één idee: kleding waarvan jij de kleuren bepaalt.",
      "JORCUSTOM started with one idea: clothing whose colours you decide.",
    ),
    sections: [
      {
        heading: p("Begin", "The start"),
        body: [
          p(
            "We begonnen in een kleine studio met handbedrukte tees en een eigen ontwerptaal: zware fits, grafische lagen en veel ruimte voor kleur.",
            "We started in a small studio with hand-printed tees and a design language of our own: heavy fits, graphic layers and plenty of room for colour.",
          ),
        ],
      },
      {
        heading: p("De Customize Tool", "The Customize Tool"),
        body: [
          p(
            "Elk ontwerp is opgebouwd uit losse lagen. Met de Customize Tool kies je per laag een kleur, waardoor geen twee stuks hetzelfde hoeven te zijn.",
            "Every artwork is built from separate layers. With the Customize Tool you choose a colour per layer, so no two pieces need to look alike.",
          ),
        ],
      },
      {
        heading: p("Productie", "Production"),
        body: [
          p(
            "We produceren in kleine series in Europa en printen eigen ontwerpen op aanvraag, zodat er zo weinig mogelijk restvoorraad ontstaat.",
            "We produce in small runs in Europe and print custom designs on demand, keeping leftover stock to a minimum.",
          ),
        ],
      },
    ],
  },
  "media-ambassadeurs": {
    slug: "media-ambassadeurs",
    title: p("Media & ambassadeurs", "Media & ambassadors"),
    intro: p(
      "Samenwerken met JORCUSTOM als creator, atleet of medium.",
      "Working with JORCUSTOM as a creator, athlete or media outlet.",
    ),
    sections: [
      {
        heading: p("Ambassadeurs", "Ambassadors"),
        body: [
          p(
            "We werken met een kleine groep creators die eigen kleurstellingen ontwerpen en releases mee vormgeven.",
            "We work with a small group of creators who design their own colourways and help shape releases.",
          ),
        ],
      },
      {
        heading: p("Persaanvragen", "Press requests"),
        body: [
          p(
            "Voor beeldmateriaal, samples of interviews kun je een aanvraag doen via het contactformulier met onderwerp 'Pers'.",
            "For imagery, samples or interviews you can submit a request through the contact form with the subject 'Press'.",
          ),
        ],
      },
    ],
  },
  carriere: {
    slug: "carriere",
    title: p("Carrière", "Careers"),
    intro: p(
      "Werken bij JORCUSTOM: klein team, korte lijnen, veel eigen verantwoordelijkheid.",
      "Working at JORCUSTOM: small team, short lines, lots of ownership.",
    ),
    sections: [
      {
        heading: p("Open posities", "Open roles"),
        body: [
          p(
            "Er zijn op dit moment geen vaste vacatures open. Stages en open sollicitaties zijn altijd welkom.",
            "There are no fixed vacancies open at the moment. Internships and speculative applications are always welcome.",
          ),
        ],
      },
      {
        heading: p("Solliciteren", "Applying"),
        body: [
          p(
            "Stuur je motivatie en portfolio via het contactformulier met onderwerp 'Carrière'. We reageren binnen twee weken.",
            "Send your motivation and portfolio through the contact form with the subject 'Careers'. We reply within two weeks.",
          ),
        ],
      },
    ],
  },
  privacybeleid: {
    slug: "privacybeleid",
    title: p("Privacybeleid", "Privacy policy"),
    intro: p(
      "Hoe we persoonsgegevens verwerken en beveiligen.",
      "How we process and protect personal data.",
    ),
    sections: [
      {
        heading: p("Welke gegevens", "Which data"),
        body: [
          p(
            "We verwerken naam, adres, e-mailadres en bestelgegevens om je bestelling uit te voeren en je te informeren over de levering.",
            "We process name, address, email address and order details to fulfil your order and inform you about delivery.",
          ),
        ],
      },
      {
        heading: p("Bewaartermijn", "Retention"),
        body: [
          p(
            "Bestelgegevens bewaren we zeven jaar op grond van de wettelijke fiscale bewaarplicht. Nieuwsbriefgegevens verwijderen we direct bij afmelding.",
            "Order data is kept for seven years under statutory tax retention rules. Newsletter data is deleted immediately when you unsubscribe.",
          ),
        ],
      },
      {
        heading: p("Je rechten", "Your rights"),
        body: [
          p(
            "Je kunt inzage, correctie of verwijdering van je gegevens aanvragen via het contactformulier.",
            "You can request access to, correction of or deletion of your data through the contact form.",
          ),
        ],
      },
    ],
  },
  cookiebeleid: {
    slug: "cookiebeleid",
    title: p("Cookiebeleid", "Cookie policy"),
    intro: p("Welke cookies we plaatsen en waarom.", "Which cookies we place and why."),
    sections: [
      {
        heading: p("Functionele cookies", "Functional cookies"),
        body: [
          p(
            "Deze cookies zijn nodig om de winkelwagen, taalkeuze en het afrekenen te laten werken.",
            "These cookies are needed for the cart, language preference and checkout to work.",
          ),
        ],
      },
      {
        heading: p("Analytische cookies", "Analytics cookies"),
        body: [
          p(
            "We meten geanonimiseerd hoe de webshop gebruikt wordt om de winkelervaring te verbeteren.",
            "We measure anonymised usage of the webshop to improve the shopping experience.",
          ),
        ],
      },
    ],
  },
  "algemene-voorwaarden": {
    slug: "algemene-voorwaarden",
    title: p("Algemene voorwaarden", "Terms & conditions"),
    intro: p(
      "De voorwaarden die gelden bij een bestelling in onze webshop.",
      "The terms that apply when ordering in our webshop.",
    ),
    sections: [
      {
        heading: p("Toepasselijkheid", "Applicability"),
        body: [
          p(
            "Deze voorwaarden gelden voor alle aanbiedingen en overeenkomsten tussen JORCUSTOM en de klant.",
            "These terms apply to all offers and agreements between JORCUSTOM and the customer.",
          ),
        ],
      },
      {
        heading: p("Prijzen", "Prices"),
        body: [
          p(
            "Alle prijzen zijn in euro's en inclusief btw. Verzendkosten worden bij het afrekenen vermeld.",
            "All prices are in euros and include VAT. Shipping costs are shown at checkout.",
          ),
        ],
      },
      {
        heading: p("Maatwerk", "Made to order"),
        body: [
          p(
            "Op zelf ontworpen items geldt geen herroepingsrecht omdat deze op maat worden geproduceerd.",
            "Self-designed items are exempt from the right of withdrawal because they are produced to order.",
          ),
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: p("Disclaimer", "Disclaimer"),
    intro: p(
      "Over het gebruik van deze website en de weergegeven informatie.",
      "About using this website and the information shown.",
    ),
    sections: [
      {
        heading: p("Informatie op deze site", "Information on this site"),
        body: [
          p(
            "We stellen deze website met zorg samen, maar kunnen niet garanderen dat alle informatie altijd volledig en actueel is.",
            "We compile this website with care but cannot guarantee that all information is always complete and up to date.",
          ),
        ],
      },
      {
        heading: p("Kleurweergave", "Colour rendering"),
        body: [
          p(
            "Kleuren op je scherm kunnen licht afwijken van het geprinte resultaat. Dit geldt ook voor zelf ontworpen kleurstellingen.",
            "Colours on your screen may differ slightly from the printed result. This also applies to self-designed colourways.",
          ),
        ],
      },
    ],
  },
  "custom-made-kleding": {
    slug: "custom-made-kleding",
    title: p("Custom made kleding", "Custom made clothing"),
    intro: p(
      "Zelf de kleuren van je kleding bepalen, zonder minimale afname.",
      "Set the colours of your clothing yourself, with no minimum order.",
    ),
    sections: [
      {
        heading: p("Hoe het werkt", "How it works"),
        body: [
          p(
            "Kies een customizable item, open de Customize Tool en kleur elke laag van het ontwerp in. Je ziet direct hoe het resultaat eruitziet.",
            "Pick a customizable item, open the Customize Tool and colour every layer of the artwork. You see the result live.",
          ),
        ],
      },
      {
        heading: p("Voor teams en events", "For teams and events"),
        body: [
          p(
            "Voor grotere aantallen, teamkleding of events maken we een voorstel op maat. Neem contact op met je wensen en aantallen.",
            "For larger quantities, team wear or events we put together a tailored proposal. Get in touch with your wishes and quantities.",
          ),
        ],
      },
    ],
  },
};
