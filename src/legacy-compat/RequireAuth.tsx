// Mirrors the original WithAuthRoutes behaviour: pages that need a signed-in
// customer redirect to the home page (where the login drawer lives) when no
// auth token is present.
import { type ReactNode } from "react";

import { Redirect } from "@/legacy-compat/router";
import { AUTH_TOKEN_NAME } from "@/legacy/constants";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const token =
    typeof window === "undefined" ? null : localStorage.getItem(AUTH_TOKEN_NAME);

  if (!token) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
