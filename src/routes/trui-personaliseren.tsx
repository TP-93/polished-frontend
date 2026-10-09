import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/trui-personaliseren")({
  head: () => ({ meta: [
    { title: 'Trui personaliseren — JORCUSTOM' },
    { name: 'description', content: 'Trui personaliseren bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Trui personaliseren — JORCUSTOM' },
    { property: 'og:description', content: 'Trui personaliseren bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
