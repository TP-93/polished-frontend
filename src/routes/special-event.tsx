import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/SpecialEvent";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/special-event")({
  head: () => ({ meta: [
    { title: 'Special event — JORCUSTOM' },
    { name: 'description', content: 'Special event bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Special event — JORCUSTOM' },
    { property: 'og:description', content: 'Special event bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
