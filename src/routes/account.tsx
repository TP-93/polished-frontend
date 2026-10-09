import { createFileRoute } from "@tanstack/react-router";

import RequireAuth from "@/legacy-compat/RequireAuth";
import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Account";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: 'Mijn account — JORCUSTOM' },
    { name: 'description', content: 'Mijn account bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Mijn account — JORCUSTOM' },
    { property: 'og:description', content: 'Mijn account bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
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
