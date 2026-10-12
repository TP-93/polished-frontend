import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/SearchResults";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/zoeken")({
  head: () => ({ meta: [
    { title: 'Zoekresultaten — JORCUSTOM' },
    { name: 'description', content: 'Zoek in alle streetwear en custom kleding van JORCUSTOM.' },
    { property: 'og:title', content: 'Zoekresultaten — JORCUSTOM' },
    { property: 'og:description', content: 'Zoek in alle streetwear en custom kleding van JORCUSTOM.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
