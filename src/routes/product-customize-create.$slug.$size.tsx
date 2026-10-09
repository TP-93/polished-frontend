import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CreateTool";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product-customize-create/$slug/$size")({
  head: () => ({ meta: [
    { title: 'Personaliseer jouw product — JORCUSTOM' },
    { name: 'description', content: 'Personaliseer jouw product bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Personaliseer jouw product — JORCUSTOM' },
    { property: 'og:description', content: 'Personaliseer jouw product bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
