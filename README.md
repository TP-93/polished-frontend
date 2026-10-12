# JORCUSTOM frontend

Nieuwe frontend voor de JORCUSTOM-shop: TanStack Start (React 19 + TypeScript), Tailwind CSS v4, met de herstelde originele shopcode onder `src/legacy/`. De frontend praat met de bestaande JORCUSTOM GraphQL-backend via een server-side proxy (`/api/graphql`), zodat de backend en alle bestaande operaties (producten, winkelwagen, checkout, betalingen, accounts) ongewijzigd blijven.

## Lokaal runnen

Node.js 20+ en npm (of bun).

```sh
git clone <repository-url>
cd <repository-name>
npm install
npm run dev
```

Het lokale adres verschijnt in de terminal. Voor een productiebuild:

```sh
npm run build     # nitro-build (Cloudflare-target, zie vite.config.ts)
npm run preview   # build lokaal voorvertonen
```

## Omgevingsvariabelen

Deze waarden staan **niet** in de repository en moeten in de testomgeving worden gezet. In Lovable zijn ze opgeslagen als server-only secrets.

| Variabele | Doel |
| --- | --- |
| `JC_GRAPHQL_URL` | URL van de JORCUSTOM GraphQL-backend (gebruikt door `src/routes/api/graphql.ts`) |
| `JC_BASIC_AUTH` | Basic-auth van de backend, base64 van `gebruiker:wachtwoord` |
| `SENDCLOUD_PUBLIC_KEY` | Sendcloud Service Points (publieke sleutel) |
| `SENDCLOUD_SECRET_KEY` | Sendcloud Service Points (geheime sleutel, server-only) |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` | Lovable Cloud, browserzijde (staat in `.env`) |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` | Lovable Cloud, serverzijde (staat in `.env`) |

Zonder `JC_GRAPHQL_URL` geeft `/api/graphql` een foutmelding terug en valt de catalogus terug op de meegeleverde snapshot in `src/legacy/data/` (784 producten, inclusief designs en artworklagen voor de customizer).

## Structuur

- `src/routes/` — TanStack file-routes; elke pad die in de app wordt gelinkt heeft een eigen routebestand
- `src/legacy/` — herstelde originele frontendcode (Apollo-operaties, componenten, pagina's, customizer)
- `src/routes/api/graphql.ts` — server-side proxy naar de backend; de browser spreekt alleen `/api/graphql` aan
- `src/lib/sendcloud.functions.ts` — serverfunctie voor DPD-pakketpunten
- `src/legacy/components/CustomizeTool/` — customizer met laagselectie en kleurrecoloring
- `src/legacy/pages/Checkout.tsx` — one-page checkout (Shopify-stijl), hergebruikt bestaande adres-, verzend-, nieuwsbrief- en betaalflows
- `supabase/`, `drizzle/` — backendconfiguratie van Lovable Cloud

## Aandachtspunten voor de testomgeving

- `.env` wordt meegenomen in de repository en bevat alleen publieke Supabase-waarden. Achter `JC_BASIC_AUTH` en `SENDCLOUD_SECRET_KEY` zit de echte toegang: die staan los in de secret-store en moeten daar worden opgehaald, niet in de code gezet.
- Stagingmedia heeft geen CORS-headers. Voor laagrecoloring in de customizer is in productie een mediaproxy of CORS-configuratie nodig.
- Anonieme collectiequeries op de backend geven een fout (`visible_to_user`); collectielijsten komen daarom uit navigatiedata of de snapshot.
- Databasegegevens van Lovable Cloud worden niet via Git meegeëxporteerd; die exporteer je apart uit de backend.
