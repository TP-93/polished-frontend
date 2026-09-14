import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/SpecialEvent";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/special-event")({
  ssr: false,
  component: () => <RoutedPage />,
});
