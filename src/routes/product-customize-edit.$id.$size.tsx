import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/EditTool";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product-customize-edit/$id/$size")({
  ssr: false,
  component: () => <RoutedPage />,
});
