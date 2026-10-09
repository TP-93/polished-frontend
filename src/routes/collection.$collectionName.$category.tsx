import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CollectionSingleCategory/index";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/collection/$collectionName/$category")({
  head: () => ({ meta: [
    { title: 'Collectiecategorie — JORCUSTOM' },
    { name: 'description', content: 'Collectiecategorie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Collectiecategorie — JORCUSTOM' },
    { property: 'og:description', content: 'Collectiecategorie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
