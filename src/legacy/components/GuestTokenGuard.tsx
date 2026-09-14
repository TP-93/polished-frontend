// @ts-nocheck
import React from 'react';

import {
  AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  PREV_GUEST_TOKEN_NAME,
} from '../constants';

function gen() {
  console.log('guard generated new token');
  return (
    (crypto as any)?.randomUUID?.() ??
    `${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
}
function set(t: string) {
  try {
    localStorage.setItem(GUEST_TOKEN_NAME, t);
  } catch (err: any) {
    console.log({ err });
  }
}
function get() {
  try {
    return localStorage.getItem(GUEST_TOKEN_NAME);
  } catch {
    return null;
  }
}

// function heal() {
//   if (!get()) set(gen());
// }
function heal() {
  const authToken = localStorage.getItem(AUTH_TOKEN_NAME);
  const prevGuestToken = localStorage.getItem(PREV_GUEST_TOKEN_NAME);

  if (authToken) {
    console.log('auth_');
    return;
  }

  if (prevGuestToken) {
    console.log('prev token was set');
    set(prevGuestToken);
    return;
  }

  // fallback — always ensure guest token exists
  if (!get()) {
    console.log('no auth or prev token were found');
    set(gen());
  }
}
export default function GuestTokenGuard({ children }: any): any {
  const once = React.useRef(false);

  React.useEffect(() => {
    // If we've already wired everything (React 18 StrictMode mounts twice),
    // return a NO-OP cleanup to satisfy `consistent-return`.
    if (once.current) {
      return () => {};
    }
    once.current = true;

    const debounced = (() => {
      let id: any;
      return () => {
        clearTimeout(id);
        id = setTimeout(heal, 30);
      };
    })();

    const cbEvents = [
      'CookiebotOnConsentReady',
      'CookiebotOnLoad',
      'CookiebotOnAccept',
      'CookiebotOnDecline',
      'CookiebotOnTagsExecuted',
      'CookiebotOnDialogDisplay',
    ] as const;

    cbEvents.forEach((e) =>
      window.addEventListener(e, debounced as EventListener),
    );

    const visEvts = ['visibilitychange', 'focus', 'pageshow'] as const;
    const intEvts = ['pointerdown', 'touchend', 'keydown', 'click'] as const;

    visEvts.forEach((e) =>
      window.addEventListener(
        e,
        debounced as EventListener,
        { passive: true } as any,
      ),
    );
    intEvts.forEach((e) =>
      window.addEventListener(
        e,
        debounced as EventListener,
        { passive: true } as any,
      ),
    );

    // Watch for default Cookiebot dialog closing
    let mo: MutationObserver | null = null;
    const tryWatchDialog = () => {
      const el = document.getElementById('CybotCookiebotDialog');

      if (!el) return false;

      mo = new MutationObserver(() => {
        const closed =
          el.style.display === 'none' || !document.body.contains(el);
        if (closed) debounced();
      });

      mo.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });

      return true;
    };

    const iv = setInterval(() => {
      if (tryWatchDialog()) clearInterval(iv);
    }, 250);

    const ivTimeout = setTimeout(() => clearInterval(iv), 10000);

    document.addEventListener('click', debounced as EventListener, {
      capture: true,
      passive: true,
    });

    // Initial retries
    [0, 300, 1000].forEach((t) => setTimeout(heal, t));

    return () => {
      cbEvents.forEach((e) =>
        window.removeEventListener(e, debounced as EventListener),
      );
      visEvts.forEach((e) =>
        window.removeEventListener(e, debounced as EventListener),
      );
      intEvts.forEach((e) =>
        window.removeEventListener(e, debounced as EventListener),
      );
      document.removeEventListener('click', debounced as EventListener, true);

      if (mo) mo.disconnect();

      clearInterval(iv);
      clearTimeout(ivTimeout);
    };
  }, []);

  return <>{children}</>;
}
