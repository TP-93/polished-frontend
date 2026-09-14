import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CreateTool";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product-customize-create/$slug/$size")({
  ssr: false,
  component: () => <RoutedPage />,
});
