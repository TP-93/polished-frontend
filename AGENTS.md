<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep checkout presentation scoped to the checkout page; shared commerce components retain their existing appearance elsewhere, and existing Apollo order/payment operations remain unchanged.
- Load checkout recommendations from the existing collection/product Apollo queries in a checkout-only module; this keeps suggestion content backend-managed without changing checkout or payment operations.
- Add checkout deals using the existing checkoutLinesAdd mutation and returned checkout cache; require an in-stock size when multiple sizes exist to avoid arbitrary variants and keep totals synchronized.
- One-page checkout reuses existing Apollo address and shipping mutations, saving validated fields before enabling the existing payment redirect; reuse the shop account login and newsletter subscription rather than introducing another account system.
