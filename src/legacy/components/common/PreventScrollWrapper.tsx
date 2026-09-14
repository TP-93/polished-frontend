// @ts-nocheck
import React from 'react';

interface Props {
  active: boolean;
  children: React.ReactNode;
}

export default function PreventScrollWrapper({ active, children }: Props) {
  const html = document.querySelector('html');
  const scrollHeight = React.useRef<any>(null);

  React.useEffect(() => {
    if (active) {
      const { scrollY } = window || {};

      scrollHeight.current = scrollY;

      if (html) html.style.overflow = 'hidden';

      document.body.style.overflow = 'hidden';
    }

    if (!active) {
      if (html) html.style.overflow = 'auto';

      document.body.style.overflow = 'auto';

      document.body.removeAttribute('style');

      if (scrollHeight.current) window.scrollTo(0, scrollHeight.current);
    }
  }, [active]);

  return <>{children}</>;
}
