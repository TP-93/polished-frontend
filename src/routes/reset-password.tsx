import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CreateNewPassword";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: () => <RoutedPage />,
});
