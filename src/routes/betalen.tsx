import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/betalen")({
  head: () => ({ meta: [
    { title: 'Betalen — JORCUSTOM' },
    { name: 'description', content: 'Betalen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Betalen — JORCUSTOM' },
    { property: 'og:description', content: 'Betalen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
