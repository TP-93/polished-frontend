import { createFileRoute } from "@tanstack/react-router";

import RequireAuth from "@/legacy-compat/RequireAuth";
import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Design";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/my-designs/$id")({
  ssr: false,
  component: () => (
    <RequireAuth>
      <RoutedPage />
    </RequireAuth>
  ),
});
