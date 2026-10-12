// @ts-nocheck
import React from 'react';
import { Clock, Truck, RotateCcw } from 'lucide-react';

import { useUserProvider } from '../../context/user';
import { cocoBold, cocoRegular } from '../../styles/constants';

const FEEDBACK_URL = 'https://www.feedbackcompany.com/nl-nl/reviews/jorcustom/';
const WHATSAPP_URL = 'https://wa.me/31683206218';
const WHATSAPP_ICON = '/static/media/whatsapp_icon.ed85186294bc17b04b65f2f77978cf56.svg';
const FEEDBACK_ICON = '/static/media/feedback.a947a11f57e7173ce552e0feae0f6a39.svg';

const COPY = {
  nl: {
    order: 'Bestel binnen',
    tomorrow: 'morgen in huis',
    monday: 'maandag verzonden',
    free: 'Gratis verzending, voor bestellingen boven €39,99',
    returns: 'Retourneer jouw item gemakkelijk binnen 14 dagen via ons retourportaal',
    whatsapp: 'WhatsApp klantenservice',
    reviews: '1000+ reviews, score 9,2/10',
  },
  en: {
    order: 'Order within',
    tomorrow: 'delivered tomorrow',
    monday: 'shipped Monday',
    free: 'Free shipping on orders above €39,99',
    returns: 'Easily return your item within 14 days via our returns portal',
    whatsapp: 'WhatsApp customer service',
    reviews: '1000+ reviews, score 9,2/10',
  },
};

// Amsterdam wall-clock: day (0=Sun) and seconds since midnight
function amsterdamNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const secs = Number(get('hour')) * 3600 + Number(get('minute')) * 60 + Number(get('second'));
  return { day, secs };
}

function computeCountdown() {
  const { day, secs } = amsterdamNow();
  const H15 = 15 * 3600;
  const H23 = 23 * 3600;
  const DAY = 86400;
  // Weekday before 15:00
  if (day >= 1 && day <= 5 && secs < H15) return { weekend: false, left: H15 - secs };
  // Mon-Thu after 15:00 -> next day 15:00
  if (day >= 1 && day <= 4) return { weekend: false, left: DAY - secs + H15 };
  // Sunday after 23:00 -> Monday 15:00
  if (day === 0 && secs >= H23) return { weekend: false, left: DAY - secs + H15 };
  // Fri after 15:00, Sat, Sun before 23:00 -> Sunday 23:00
  const daysUntilSun = day === 5 ? 2 : day === 6 ? 1 : 0;
  return { weekend: true, left: daysUntilSun * DAY + H23 - secs };
}

function format(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${h}u ${pad(m)}m ${pad(sec)}s`;
}

function useCountdown() {
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    const tick = () => setState(computeCountdown());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return state;
}

const iconStyle = { width: 16, height: 16, flexShrink: 0, strokeWidth: 1.6, color: '#050505' };
const imgStyle = { width: 16, height: 16, flexShrink: 0, objectFit: 'contain' };

export function FeedbackCompanyReview() {
  const { state: { currentLanguage } } = useUserProvider();
  const t = COPY[currentLanguage] || COPY.nl;

  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: '4px 0', width: '100%',
        ...cocoRegular, color: 'var(--checkout-text)', fontSize: 12,
        lineHeight: 1.4, textDecoration: 'none',
      }}
    >
      <img src={FEEDBACK_ICON} alt="Feedback Company" style={{ height: 16, width: 'auto', flexShrink: 0 }} />
      <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>{t.reviews}</span>
    </a>
  );
}

export default function TrustIndicators() {
  const { state: { currentLanguage } } = useUserProvider();
  const t = COPY[currentLanguage] || COPY.nl;
  const cd = useCountdown();

  const text = { ...cocoRegular, color: '#050505', fontSize: 12, lineHeight: 1.4 };
  const row = { display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', textDecoration: 'none' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 0', width: '100%' }}>
      <div style={row}>
        <Clock style={iconStyle} />
        <span style={text}>
          {t.order}{' '}
          <strong style={{ ...cocoBold, fontVariantNumeric: 'tabular-nums' }}>
            {cd ? format(cd.left) : '--'}
          </strong>
          , {cd?.weekend ? t.monday : t.tomorrow}
        </span>
      </div>
      <div style={row}>
        <Truck style={iconStyle} />
        <span style={text}>{t.free}</span>
      </div>
      <div style={row}>
        <RotateCcw style={iconStyle} />
        <span style={text}>{t.returns}</span>
      </div>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={row}>
        <img src={WHATSAPP_ICON} alt="" style={imgStyle} />
        <span style={text}>{t.whatsapp}</span>
      </a>
      <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" style={row}>
        <img src={FEEDBACK_ICON} alt="Feedback Company" style={{ height: 16, width: 'auto', flexShrink: 0 }} />
        <span style={{ ...text, textDecoration: 'underline', textUnderlineOffset: 2 }}>{t.reviews}</span>
      </a>
    </div>
  );
}
