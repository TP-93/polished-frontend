import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/algemene-voorwaarden")({
  head: () => ({ meta: [
    { title: 'Algemene voorwaarden — JORCUSTOM' },
    { name: 'description', content: 'Algemene voorwaarden bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Algemene voorwaarden — JORCUSTOM' },
    { property: 'og:description', content: 'Algemene voorwaarden bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
