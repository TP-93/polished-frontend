import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Design";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/my-designs/$id")({
  ssr: false,
  component: () => <RoutedPage />,
});
