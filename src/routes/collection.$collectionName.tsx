import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/$collectionName")({
  ssr: false,
  component: () => <Outlet />,
});
