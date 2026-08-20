import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display text-base font-bold tracking-[0.22em] text-foreground ${className}`}
      aria-label="JORCUSTOM home"
    >
      JORCUSTOM
    </Link>
  );
}
