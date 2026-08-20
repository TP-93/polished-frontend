import { formatPrice, useI18n } from "@/lib/i18n";

export function Price({
  cents,
  compareAtCents,
  className = "",
}: {
  cents: number;
  compareAtCents?: number | undefined;
  className?: string;
}) {
  const { locale } = useI18n();
  const onSale = compareAtCents !== undefined && compareAtCents > cents;

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className={onSale ? "text-sale" : ""}>{formatPrice(cents, locale)}</span>
      {onSale ? (
        <span className="text-xs text-muted-foreground line-through">
          {formatPrice(compareAtCents, locale)}
        </span>
      ) : null}
    </span>
  );
}
