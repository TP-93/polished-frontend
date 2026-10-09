// @ts-nocheck
import { useEffect, useState } from 'react';
import styled from 'styled-components';
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

export default ({ country, postalCode, houseNumber, selected, lang, onSelect }: Props) => {
  const nl = lang === 'NL';
  const [query, setQuery] = useState(postalCode || '');
  const [search, setSearch] = useState(postalCode || '');
  const [points, setPoints] = useState<ServicePoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!search || search.length < 4) return;
    let cancelled = false;
    setLoading(true);
    setError('');
    getServicePoints({
      data: { country: country || 'NL', postalCode: search, houseNumber: search === postalCode ? houseNumber : undefined, carrier: 'dpd' },
    })
      .then((res) => {
        if (cancelled) return;
        setPoints(res.points);
        if (res.error || !res.points.length)
          setError(nl ? 'Geen DPD-pakketpunten gevonden. Probeer een andere postcode.' : 'No DPD parcel shops found. Try another postcode.');
      })
      .catch(() => !cancelled && setError(nl ? 'Pakketpunten konden niet worden geladen.' : 'Could not load parcel shops.'))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [search, country]);

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <SearchRow onSubmit={(e) => { e.preventDefault(); setSearch(query.trim()); }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={nl ? 'Postcode' : 'Postcode'} aria-label="Postcode" />
        <button type="submit">{nl ? 'Zoeken' : 'Search'}</button>
      </SearchRow>
      {loading && <Muted>{nl ? 'Pakketpunten laden…' : 'Loading parcel shops…'}</Muted>}
      {!loading && error && <Muted>{error}</Muted>}
      {!loading && points.map((p) => {
        const label = pointLabel(p);
        const active = selected === label;
        return (
          <Point key={p.id} type="button" data-active={active} onClick={() => onSelect(p, label)}>
            <Dot data-active={active} />
            <div>
              <strong>{p.name}</strong>
              <span>{p.street} {p.houseNumber}, {p.postalCode} {p.city}</span>
              {p.openToday && <span>{nl ? 'Vandaag' : 'Today'}: {p.openToday}</span>}
            </div>
            {p.distance != null && <Dist>{p.distance < 1000 ? `${p.distance} m` : `${(p.distance / 1000).toFixed(1)} km`}</Dist>}
          </Point>
        );
      })}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  margin: -8px 0 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SearchRow = styled.form`
  display: flex;
  gap: 8px;
  input { flex: 1; height: 40px; padding: 0 12px; border: 1px solid #d9d9d9; font-size: 14px; }
  button { height: 40px; padding: 0 16px; background: #000; color: #fff; border: 0; font-size: 13px; text-transform: uppercase; cursor: pointer; }
`;
const Muted = styled.div`
  font-size: 13px;
  color: #707070;
`;
const Point = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  text-align: left;
  background: #fff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  font-size: 13px;
  &[data-active='true'] { border-color: #000; background: #fafafa; }
  div { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  span { color: #707070; }
`;
const Dot = styled.span`
  width: 16px; min-width: 16px; height: 16px; margin-top: 1px;
  border-radius: 50%; border: 1px solid #bdbdbd;
  &[data-active='true'] { border: 5px solid #000; }
`;
const Dist = styled.span`
  white-space: nowrap;
`;
