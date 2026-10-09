import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/custom-made-kleding")({
  head: () => ({ meta: [
    { title: 'Custom made kleding — JORCUSTOM' },
    { name: 'description', content: 'Custom made kleding bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Custom made kleding — JORCUSTOM' },
    { property: 'og:description', content: 'Custom made kleding bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
