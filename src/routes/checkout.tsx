import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Checkout";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/checkout")({
  ssr: false,
  component: () => <RoutedPage />,
});
