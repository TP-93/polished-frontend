// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { getServicePoints, ServicePoint } from '@/lib/sendcloud.functions';

interface Props {
  country: string;
  postalCode: string;
  houseNumber?: string;
  selected?: string;
  lang: string;
  onSelect: (point: ServicePoint, label: string) => void;
}

export const pointLabel = (p: ServicePoint) =>
  `${p.name}, ${p.street} ${p.houseNumber}, ${p.postalCode} ${p.city} (ID ${p.id})`;

const dist = (d: number | null) => (d == null ? '' : d < 1000 ? `${d} m` : `${(d / 1000).toFixed(1)} km`);

const pinIcon = (L, active: boolean) =>
  L.divIcon({
    className: '',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<span style="display:block;width:22px;height:22px;border-radius:50%;background:${active ? '#000' : '#fff'};border:2px solid #000;box-shadow:0 1px 4px rgba(0,0,0,.3)"></span>`,
  });

function MapModal({ points, active, setActive, onConfirm, onClose, nl, query, setQuery, onSearch, loading, error }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const LRef = useRef<any>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc); };
  }, []);

  useEffect(() => {
    let disposed = false;
    import('leaflet').then((mod) => {
      if (disposed || !mapEl.current || mapRef.current) return;
      const L = mod.default ?? mod;
      LRef.current = L;
      const map = L.map(mapEl.current, { zoomControl: true }).setView([51.69, 5.3], 12);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;
      drawMarkers();
    });
    return () => { disposed = true; mapRef.current?.remove(); mapRef.current = null; };
  }, []);

  const drawMarkers = () => {
    const L = LRef.current, map = mapRef.current;
    if (!L || !map) return;
    markersRef.current.forEach((m) => m.remove());
    const geo = points.filter((p) => p.lat && p.lng);
    markersRef.current = geo.map((p) =>
      L.marker([p.lat, p.lng], { icon: pinIcon(L, active?.id === p.id) }).addTo(map).on('click', () => setActive(p)),
    );
    if (geo.length && !active) map.fitBounds(geo.map((p) => [p.lat, p.lng]), { padding: [30, 30] });
  };

  useEffect(() => { drawMarkers(); }, [points, active]);
  useEffect(() => {
    if (active?.lat && mapRef.current) mapRef.current.panTo([active.lat, active.lng]);
  }, [active]);

  return createPortal(
    <Backdrop onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <Head>
          <h2>{nl ? 'Kies een DPD-pakketpunt' : 'Choose a DPD parcel shop'}</h2>
          <Close type="button" onClick={onClose} aria-label={nl ? 'Sluiten' : 'Close'}>×</Close>
        </Head>
        <Body>
          <Side>
            <SearchRow onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Postcode" aria-label="Postcode" />
              <button type="submit">{nl ? 'Zoeken' : 'Search'}</button>
            </SearchRow>
            <List>
              {loading && <Muted>{nl ? 'Pakketpunten laden…' : 'Loading parcel shops…'}</Muted>}
              {!loading && error && <Muted>{error}</Muted>}
              {!loading && points.map((p) => (
                <Item key={p.id} type="button" data-active={active?.id === p.id} onClick={() => setActive(p)}>
                  <Dot data-active={active?.id === p.id} />
                  <div>
                    <strong>{p.name}</strong>
                    <span>{p.street} {p.houseNumber}, {p.postalCode} {p.city}</span>
                    {p.openToday && <span>{nl ? 'Vandaag' : 'Today'}: {p.openToday}</span>}
                  </div>
                  <small>{dist(p.distance)}</small>
                </Item>
              ))}
            </List>
          </Side>
          <MapBox ref={mapEl} />
        </Body>
        <Foot>
          <span>{active ? `${active.name}, ${active.city}` : nl ? 'Nog geen punt gekozen' : 'No point selected'}</span>
          <Confirm type="button" disabled={!active} onClick={() => onConfirm(active)}>
            {nl ? 'Kies dit punt' : 'Select this point'}
          </Confirm>
        </Foot>
      </Dialog>
    </Backdrop>,
    document.body,
  );
}

export default ({ country, postalCode, houseNumber, selected, lang, onSelect }: Props) => {
  const nl = lang === 'NL';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(postalCode || '');
  const [search, setSearch] = useState(postalCode || '');
  const [points, setPoints] = useState<ServicePoint[]>([]);
  const [active, setActive] = useState<ServicePoint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open || !search || search.length < 4) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    getServicePoints({
      data: { country: country || 'NL', postalCode: search, houseNumber: search === postalCode ? houseNumber : undefined, carrier: 'dpd' },
    })
      .then((res) => {
        if (cancelled) return;
        setPoints(res.points);
        const match = res.points.find((p) => pointLabel(p) === selected);
        setActive(match || null);
        if (res.error || !res.points.length)
          setError(nl ? 'Geen DPD-pakketpunten gevonden. Probeer een andere postcode.' : 'No DPD parcel shops found. Try another postcode.');
      })
      .catch(() => !cancelled && setError(nl ? 'Pakketpunten konden niet worden geladen.' : 'Could not load parcel shops.'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [open, search, country]);

  const chosen = selected ? selected.replace(/\s*\(ID [^)]*\)$/, '') : '';

  return (
    <Summary onClick={(e) => e.stopPropagation()}>
      <div>
        {chosen ? <strong>{chosen}</strong> : <Muted>{nl ? 'Nog geen pakketpunt gekozen' : 'No parcel shop selected yet'}</Muted>}
      </div>
      <TextBtn type="button" onClick={() => setOpen(true)}>
        {chosen ? (nl ? 'Wijzig punt' : 'Change') : nl ? 'Kies pakketpunt' : 'Choose parcel shop'}
      </TextBtn>
      {open && (
        <MapModal
          nl={nl}
          points={points}
          active={active}
          setActive={setActive}
          query={query}
          setQuery={setQuery}
          onSearch={() => setSearch(query.trim())}
          loading={loading}
          error={error}
          onClose={() => setOpen(false)}
          onConfirm={(p) => { onSelect(p, pointLabel(p)); setOpen(false); }}
        />
      )}
    </Summary>
  );
};

const Summary = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 12px 16px 16px 48px; font-size: 13px; color: #000;
  strong { font-weight: 600; }
`;
const TextBtn = styled.button`
  background: none; border: 0; padding: 0; font-size: 13px; color: #000;
  text-decoration: underline; text-underline-offset: 3px; cursor: pointer; white-space: nowrap;
  &:hover { color: #707070; }
`;
const Muted = styled.div` font-size: 13px; color: #707070; `;
const Backdrop = styled.div`
  position: fixed; inset: 0; z-index: 3000; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center; padding: 16px;
`;
const Dialog = styled.div`
  background: #fff; width: 100%; max-width: 960px; height: min(640px, 100%);
  display: flex; flex-direction: column; box-shadow: 0 16px 48px rgba(0,0,0,.2);
`;
const Head = styled.div`
  display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
  h2 { margin: 0; font-size: 16px; font-weight: 600; }
`;
const Close = styled.button` background: none; border: 0; font-size: 24px; line-height: 1; cursor: pointer; `;
const Body = styled.div`
  flex: 1; min-height: 0; display: grid; grid-template-columns: 360px 1fr;
  @media (max-width: 767px) { grid-template-columns: 1fr; grid-template-rows: 220px 1fr; }
`;
const Side = styled.div`
  display: flex; flex-direction: column; min-height: 0; border-right: 1px solid #e6e6e6;
  @media (max-width: 767px) { order: 2; border-right: 0; }
`;
const SearchRow = styled.form`
  display: flex; gap: 8px; padding: 16px;
  input { flex: 1; height: 40px; padding: 0 12px; border: 1px solid #d9d9d9; border-radius: 5px; font-size: 14px; }
  button { height: 40px; padding: 0 16px; background: #000; color: #fff; border: 0; font-size: 13px; cursor: pointer; }
`;
const List = styled.div` flex: 1; overflow-y: auto; padding: 0 16px 16px; display: flex; flex-direction: column; gap: 8px; `;
const Item = styled.button`
  display: flex; align-items: flex-start; gap: 12px; width: 100%; padding: 12px; text-align: left;
  background: #fff; border: 1px solid #e6e6e6; border-radius: 5px; cursor: pointer; font-size: 13px;
  &[data-active='true'] { border-color: #000; background: #fafafa; }
  div { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  span, small { color: #707070; }
  small { white-space: nowrap; font-size: 12px; }
`;
const Dot = styled.span`
  width: 16px; min-width: 16px; height: 16px; margin-top: 1px; border-radius: 50%; border: 1px solid #bdbdbd;
  &[data-active='true'] { border: 5px solid #000; }
`;
const MapBox = styled.div` width: 100%; height: 100%; min-height: 220px; background: #f2f2f2; `;
const Foot = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 24px; border-top: 1px solid #e6e6e6;
  span { font-size: 13px; color: #707070; }
`;
const Confirm = styled.button`
  height: 44px; padding: 0 24px; background: #000; color: #fff; border: 0; font-size: 13px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .04em; cursor: pointer;
  &:disabled { opacity: .4; cursor: default; }
`;
