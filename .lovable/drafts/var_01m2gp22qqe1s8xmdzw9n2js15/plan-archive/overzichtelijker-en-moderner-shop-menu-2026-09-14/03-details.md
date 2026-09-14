## Sale: twee ingangen

1. **In het menu** — de sale-tab toont de kortingsniveaus die de winkel al als eigen sale-groepen heeft (20/30/40/50/70%), plus de sale-categorieën eronder. Klikken opent direct de juiste sale-pagina.
2. **Op de pagina** — een filter "Korting" naast Maat en Kleur. Producten dragen hun kortingspercentage al mee, dus het filter kan de zichtbare producten meteen verfijnen; je kunt meerdere percentages tegelijk aanzetten en combineren met maat en kleur.

Op de sale-pagina wordt bovendien bovenaan zichtbaar welke korting actief is, met één klik om te wissen.

## Technische aanpak

- Herbouw van `src/legacy/components/TheHeader/Shop/Drawer` naar een tab-gestuurd paneel: `Tabs`, `CategoriesPanel`, `CollectionsPanel`, `SalePanel`, met `MenuImage` behouden. Menu-items worden gesplitst op basis van de bestaande velden uit `getShopMenu` (`enableSubmenu`, `collection.productCategoryList` met `parentName`/`parentPosition`, en collectie-namen voor sale-detectie).
- Kortingsniveaus worden afgeleid uit de bestaande menu-items (namen als "SALE - 30% OFF"), niet hardcoded; wat de backend levert, staat in het menu.
- Mobiel: `TheHeader/MobileMenu/Drawer` krijgt dezelfde drie secties met inklapbare groepen.
- Kortingsfilter: nieuwe `Filters/Discount.tsx` plus filterstate in `components/Category/index.tsx`; filtering gebeurt op het al aanwezige veld `salePercentValue` van de producten, gecombineerd met de bestaande maat/kleur-filters. Geen wijziging aan queries of backend.
- Styling met de bestaande MUI/styled-components opzet van de winkel, maar rustiger: meer witruimte, subtiele scheidingslijnen, zachte hoeken, één accentkleur voor de actieve tab en sale-labels.
- Controle met Playwright op desktop en mobiel: tabs wisselen, links openen de juiste pagina's, kortingsfilter vermindert het aantal producten.
