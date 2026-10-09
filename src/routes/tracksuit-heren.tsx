import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/tracksuit-heren")({
  head: () => ({ meta: [
    { title: 'Tracksuits heren — JORCUSTOM' },
    { name: 'description', content: 'Tracksuits heren bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Tracksuits heren — JORCUSTOM' },
    { property: 'og:description', content: 'Tracksuits heren bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
