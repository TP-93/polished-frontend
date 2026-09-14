// Compatibility layer: maps the legacy react-router(-dom) v5 API used by the
// original JORCUSTOM frontend onto TanStack Router, so the recovered legacy
// components can stay untouched. Aliased as `react-router` / `react-router-dom`
// in vite.config.ts.
import {
  useLocation as useTanstackLocation,
  useParams as useTanstackParams,
  useRouter,
} from "@tanstack/react-router";
import {
  forwardRef,
  useEffect,
  useMemo,
  type AnchorHTMLAttributes,
  type ComponentType,
  type ReactNode,
} from "react";

export type To = string | { pathname?: string; search?: string; hash?: string; state?: unknown };

export interface LegacyLocation {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
  key?: string | undefined;
}

export interface match<Params = Record<string, string>> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export type Match<Params = Record<string, string>> = match<Params>;

function toHref(to: To): string {
  if (typeof to === "string") return to;
  return `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
}

function getState(to: To): unknown {
  return typeof to === "string" ? undefined : to.state;
}

export function useLocation(): LegacyLocation {
  const location = useTanstackLocation();
  return useMemo(
    () => ({
      pathname: location.pathname,
      search: location.searchStr ?? "",
      hash: location.hash ? `#${location.hash.replace(/^#/, "")}` : "",
      state: location.state,
      key: (location as { key?: string }).key ?? "",
    }),
    [location.pathname, location.searchStr, location.hash, location.state],
  );
}

export function useParams<Params = Record<string, string>>(): Params {
  return (useTanstackParams as unknown as (o: unknown) => unknown)({ strict: false }) as Params;
}

export interface LegacyHistory {
  location: LegacyLocation;
  length: number;
  action: string;
  push: (to: To, state?: unknown) => void;
  replace: (to: To, state?: unknown) => void;
  go: (delta: number) => void;
  goBack: () => void;
  goForward: () => void;
  block: () => () => void;
  listen: () => () => void;
  createHref: (to: To) => string;
}

export function useHistory(): LegacyHistory {
  const router = useRouter();
  const location = useLocation();

  return useMemo<LegacyHistory>(
    () => ({
      location,
      length: 1,
      action: "POP",
      push: (to, state) => {
        void router.navigate({ href: toHref(to), state: (state ?? getState(to)) as never });
      },
      replace: (to, state) => {
        void router.navigate({
          href: toHref(to),
          replace: true,
          state: (state ?? getState(to)) as never,
        });
      },
      go: (delta) => {
        if (typeof window !== "undefined") window.history.go(delta);
      },
      goBack: () => router.history.back(),
      goForward: () => router.history.forward(),
      block: () => () => undefined,
      listen: () => () => undefined,
      createHref: (to) => toHref(to),
    }),
    [router, location],
  );
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: To;
  replace?: boolean;
  innerRef?: unknown;
  activeClassName?: string;
  activeStyle?: Record<string, unknown>;
  exact?: boolean;
  isActive?: unknown;
  strict?: boolean;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, onClick, children, activeClassName, activeStyle, exact, isActive, strict, innerRef, ...rest },
  ref,
) {
  const router = useRouter();
  const href = toHref(to);

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          (rest.target && rest.target !== "_self")
        ) {
          return;
        }
        event.preventDefault();
        void router.navigate({ href, replace: replace ?? false, state: getState(to) as never });
      }}
    >
      {children}
    </a>
  );
});

export const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(function NavLink(
  { className, activeClassName, activeStyle, style, to, exact, ...rest },
  ref,
) {
  const location = useLocation();
  const href = toHref(to);
  const active = exact ? location.pathname === href : location.pathname.startsWith(href);

  return (
    <Link
      {...rest}
      to={to}
      ref={ref}
      className={[className, active ? activeClassName : undefined].filter(Boolean).join(" ")}
      style={active && activeStyle ? { ...(style ?? {}), ...activeStyle } : style}
    />
  );
});

export function Redirect({ to, push = false }: { to: To; push?: boolean }) {
  const router = useRouter();
  const href = toHref(to);

  useEffect(() => {
    void router.navigate({ href, replace: !push, state: getState(to) as never });
  }, [href, push, router]);

  return null;
}

export function withRouter<P extends object>(Component: ComponentType<P>) {
  return function WithRouter(props: Omit<P, "history" | "location" | "match">) {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const routerMatch: match = {
      params: params as Record<string, string>,
      isExact: true,
      path: location.pathname,
      url: location.pathname,
    };

    return <Component {...(props as P)} history={history} location={location} match={routerMatch} />;
  };
}

export function useRouteMatch<Params = Record<string, string>>(): match<Params> {
  const location = useLocation();
  const params = useParams<Params>();
  return { params, isExact: true, path: location.pathname, url: location.pathname };
}

// Routing itself is handled by TanStack file routes; these exist only so that
// legacy modules importing them keep compiling.
export function BrowserRouter({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
export function Switch({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
export function Route({
  component: Component,
  render,
  children,
}: {
  component?: ComponentType<Record<string, unknown>>;
  render?: (props: unknown) => ReactNode;
  children?: ReactNode;
  path?: string;
  exact?: boolean;
}) {
  if (Component) return <Component />;
  if (render) return <>{render({})}</>;
  return <>{children}</>;
}

export default { Link, NavLink, Redirect, BrowserRouter, Switch, Route };
