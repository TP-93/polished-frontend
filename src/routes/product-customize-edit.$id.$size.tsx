import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/EditTool";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product-customize-edit/$id/$size")({
  head: () => ({ meta: [
    { title: 'Bewerk jouw ontwerp — JORCUSTOM' },
    { name: 'description', content: 'Bewerk jouw ontwerp bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Bewerk jouw ontwerp — JORCUSTOM' },
    { property: 'og:description', content: 'Bewerk jouw ontwerp bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
