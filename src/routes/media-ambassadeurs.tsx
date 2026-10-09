import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/media-ambassadeurs")({
  head: () => ({ meta: [
    { title: 'Media en ambassadeurs — JORCUSTOM' },
    { name: 'description', content: 'Media en ambassadeurs bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Media en ambassadeurs — JORCUSTOM' },
    { property: 'og:description', content: 'Media en ambassadeurs bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
