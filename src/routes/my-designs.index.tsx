import { createFileRoute } from "@tanstack/react-router";

import RequireAuth from "@/legacy-compat/RequireAuth";
import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Designs";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/my-designs/")({
  head: () => ({ meta: [
    { title: 'Mijn ontwerpen — JORCUSTOM' },
    { name: 'description', content: 'Mijn ontwerpen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Mijn ontwerpen — JORCUSTOM' },
    { property: 'og:description', content: 'Mijn ontwerpen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => (
    <RequireAuth>
      <RoutedPage />
    </RequireAuth>
  ),
});
