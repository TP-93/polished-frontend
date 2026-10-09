import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Contact";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: 'Contact — JORCUSTOM' },
    { name: 'description', content: 'Contact bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Contact — JORCUSTOM' },
    { property: 'og:description', content: 'Contact bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
