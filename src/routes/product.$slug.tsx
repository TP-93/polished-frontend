import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Product";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product/$slug")({
  ssr: false,
  component: () => <RoutedPage />,
});
