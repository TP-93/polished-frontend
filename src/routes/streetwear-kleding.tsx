import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/streetwear-kleding")({
  head: () => ({ meta: [
    { title: 'Streetwear kleding — JORCUSTOM' },
    { name: 'description', content: 'Streetwear kleding bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Streetwear kleding — JORCUSTOM' },
    { property: 'og:description', content: 'Streetwear kleding bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
