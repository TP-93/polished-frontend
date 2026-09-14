import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CollectionSingleCategory/index";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/collection/$collectionName/$category")({
  ssr: false,
  component: () => <RoutedPage />,
});
