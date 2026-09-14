import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/ThankYou";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/thank-you")({
  ssr: false,
  component: () => <RoutedPage />,
});
