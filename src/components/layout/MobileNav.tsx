import { Menu } from "lucide-react";
import { useState } from "react";

import { AppLink } from "@/components/layout/AppLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useI18n, useLocalized } from "@/lib/i18n";
import {
  collectionLinks,
  companyLinks,
  saleLinks,
  serviceLinks,
  shopCategoryLinks,
} from "@/services/navigation";

export function MobileNav() {
  const { t } = useI18n();
  const l = useLocalized();
  const [open, setOpen] = useState(false);

  const groups = [
    { title: t("nav.collections"), links: collectionLinks },
    { title: t("nav.shop"), links: shopCategoryLinks },
    { title: t("nav.sale"), links: saleLinks },
    { title: t("nav.service"), links: serviceLinks },
    { title: t("footer.company"), links: companyLinks },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("nav.menu")}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-4 py-4">
          <SheetTitle className="label-caps">{t("nav.menu")}</SheetTitle>
        </SheetHeader>
        <nav className="px-4 py-6">
          {groups.map((group) => (
            <div key={group.title} className="mb-8">
              <p className="label-caps mb-3 text-muted-foreground">{group.title}</p>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <AppLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm text-foreground hover:text-brand"
                    >
                      {l(link.label)}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <LanguageSwitcher />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
