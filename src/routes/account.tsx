import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Account";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/account")({
  ssr: false,
  component: () => <RoutedPage />,
});
