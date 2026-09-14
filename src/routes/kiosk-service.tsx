import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/KioskService/index";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/kiosk-service")({
  ssr: false,
  component: () => <RoutedPage />,
});
