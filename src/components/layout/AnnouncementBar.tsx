import { useEffect, useState } from "react";

import { useI18n } from "@/lib/i18n";

const keys = ["announce.shipping", "announce.custom"];

export function AnnouncementBar() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % keys.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="border-b border-border bg-primary text-primary-foreground">
      <p className="mx-auto max-w-[1400px] px-4 py-2 text-center text-xs tracking-wide">
        {t(keys[index] as string)}
      </p>
    </div>
  );
}
