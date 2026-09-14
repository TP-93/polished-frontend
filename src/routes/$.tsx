import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/404";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/$")({
  ssr: false,
  component: () => <RoutedPage />,
});
