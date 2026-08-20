import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Link wrapper for paths that come from data (navigation config, CMS-like
 * content) instead of being written literally in a component.
 */
export function AppLink({
  to,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <Link
      to={to as never}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      preload="intent"
    >
      {children}
    </Link>
  );
}
