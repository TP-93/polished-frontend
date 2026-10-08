// @ts-nocheck
// The original JORCUSTOM App shell, minus Sentry, Google Tag Manager and
// BrowserRouter (routing is handled by TanStack file routes).
import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ApolloProvider } from "react-apollo";
import { BaseCSS, GridThemeProvider } from "styled-bootstrap-grid";

import client from "@/legacy/apollo/client";
import LoginChecker from "@/legacy/components/Auth/LoginChecker";
import GuestTokenGuard from "@/legacy/components/GuestTokenGuard";
import TheHeader from "@/legacy/components/TheHeader";
import { UserProvider } from "@/legacy/context/user";
import GlobalStyle from "@/legacy/styles/GlobalStyle";
import useCurrentUser from "@/legacy/utils/useCurrentUser";
import refreshClientCache from "@/legacy/utils/refreshClientCache";

if (typeof window !== "undefined") {
  (window as unknown as { dataLayer?: unknown[] }).dataLayer =
    (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
}

const globalGrid = {
  breakpoints: {
    lg: 1025,
    xl: 1367,
  },
  container: {
    maxWidth: {
      xl: 1440,
    },
  },
};

function CurrentUser({ children }: { children: ReactNode }) {
  useCurrentUser();
  return <>{children}</>;
}

export default function LegacyShell({ children }: { children: ReactNode }) {
  const isCheckout = useRouterState({ select: (state) => state.location.pathname === '/checkout' });
  useEffect(() => {
    // Google Tag Manager is intentionally omitted; keep the dataLayer stub so
    // the original analytics helpers keep working without errors.
    (window as unknown as { dataLayer?: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    refreshClientCache();
    localStorage.removeItem("transaction-order-id");
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />

      <BaseCSS />

      <GridThemeProvider gridTheme={globalGrid}>
        <GuestTokenGuard>
          <UserProvider>
            {!isCheckout && <TheHeader />}

            <LoginChecker>
              <CurrentUser>{children}</CurrentUser>
            </LoginChecker>
          </UserProvider>
        </GuestTokenGuard>
      </GridThemeProvider>
    </ApolloProvider>
  );
}
