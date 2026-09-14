import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Designs";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/my-designs/")({
  ssr: false,
  component: () => <RoutedPage />,
});
