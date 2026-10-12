// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';
import { Search as SearchIcon, X as CloseIcon } from 'lucide-react';
import { gql } from 'apollo-boost';

import client from '../../../apollo/client';
import { useUserProvider } from '../../../context/user';
import ProductCard from '../../common/ProductDetails/ProductCard';

export const MAX_RESULTS = 10;

const searchProductsQuery = gql`
  query headerSearchProducts($currency: String) {
    products(first: 1000) {
      edges {
        node {
          id
          __typename
          name
          slug
          new
          blackFriday
          salePercentValue
          color {
            name
            value
          }
          price(currency: $currency) {
            currency
            amount
            localized
          }
          discountPrice(currency: $currency) {
            currency
            amount
            localized
          }
          designs {
            id
          }
          imageGroups {
            id
            url
            name
            imageSide
            images {
              url
            }
          }
        }
      }
    }
  }
`;

let cachedProducts: any[] | null = null;
let pendingFetch: Promise<any[]> | null = null;

export function fetchAllProducts(): Promise<any[]> {
  if (cachedProducts) return Promise.resolve(cachedProducts);
  if (pendingFetch) return pendingFetch;

  pendingFetch = client
    .query({ query: searchProductsQuery, variables: { currency: 'EUR' } })
    .then((res: any) => {
      cachedProducts = (res?.data?.products?.edges || []).map(
        (e: any) => e.node,
      );
      return cachedProducts;
    })
    .catch(() => [])
    .finally(() => {
      pendingFetch = null;
    });

  return pendingFetch;
}

export function useSearchLabels() {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  return {
    placeholder:
      currentLanguage === 'EN' ? 'Search products…' : 'Zoek producten…',
    noResults:
      currentLanguage === 'EN'
        ? 'No products found'
        : 'Geen producten gevonden',
    aria: currentLanguage === 'EN' ? 'Search' : 'Zoeken',
    clear: currentLanguage === 'EN' ? 'Clear search' : 'Zoekopdracht wissen',
    close: currentLanguage === 'EN' ? 'Close' : 'Sluiten',
    more: currentLanguage === 'EN' ? 'More products' : 'Meer producten',
    title: currentLanguage === 'EN' ? 'Search results for' : 'Zoekresultaten voor',
  };
}

export function useProductSearch() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  React.useEffect(() => {
    const q = query.trim().toLowerCase();

    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handle = setTimeout(async () => {
      const all = await fetchAllProducts();
      const matches = all.filter((p: any) =>
        p.name?.toLowerCase().includes(q),
      );
      setTotal(matches.length);
      setResults(matches.slice(0, MAX_RESULTS));
      setLoading(false);
    }, 200);

    return () => clearTimeout(handle);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    total,
    isLoading,
    hasQuery: query.trim().length >= 2,
  };
}

interface FieldProps {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  variant?: 'underline' | 'boxed';
  inputRef?: any;
  onClose?: () => void;
  closeLabel?: string;
}

export function SearchField({
  query,
  setQuery,
  placeholder,
  variant = 'underline',
  inputRef,
  onClose,
  closeLabel = 'Sluiten',
}: FieldProps) {
  const wrapperSx =
    variant === 'boxed'
      ? {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid rgba(0,0,0,0.16)',
          px: '12px',
          py: '9px',
          backgroundColor: '#fff',
        }
      : {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          pb: '8px',
        };

  return (
    <Box sx={wrapperSx}>
      <SearchIcon
        aria-hidden="true"
        size={16}
        strokeWidth={1.5}
        style={{ flexShrink: 0, opacity: 0.6 }}
      />
      <Box
        ref={inputRef}
        component="input"
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === 'Escape' && onClose) onClose();
        }}
        placeholder={placeholder}
        sx={{
          flex: 1,
          minWidth: 0,
          border: 0,
          outline: 'none',
          fontSize: '14px',
          fontFamily: 'inherit',
          background: 'transparent',
          color: 'var(--foreground)',
        }}
      />
      {onClose && (
        <Box
          component="button"
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          sx={{
            p: 0,
            border: 0,
            cursor: 'pointer',
            display: 'flex',
            background: 'transparent',
            color: 'var(--foreground)',
          }}
        >
          <CloseIcon aria-hidden="true" size={16} strokeWidth={1.5} />
        </Box>
      )}
    </Box>
  );
}

interface GridProps {
  results: any[];
  isLoading: boolean;
  hasQuery: boolean;
  noResultsLabel: string;
  columns?: string;
  gap?: string;
  padding?: string;
  onPick?: () => void;
}

export function SearchResultsGrid({
  results,
  isLoading,
  hasQuery,
  noResultsLabel,
  columns = 'repeat(5, 1fr)',
  gap = '2rem',
  padding = '3rem 0',
  onPick,
}: GridProps) {
  if (!hasQuery) return null;

  // The product card stops propagation on click, so listen in the capture
  // phase and defer closing until after the card's own navigation ran.
  const handlePick = (e: any) => {
    if (!onPick) return;
    setTimeout(() => onPick(), 0);
  };

  return (
    <Box
      onClick={onPick}
      onClickCapture={handlePick}
      sx={{
        width: '100%',
        display: 'grid',
        gridRowGap: gap,
        alignItems: 'start',
        padding,
        gridTemplateColumns: columns,
      }}
    >
      {!isLoading && results.length === 0 && (
        <Box
          sx={{
            gridColumn: '1 / -1',
            py: '16px',
            fontSize: '13px',
            color: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
          }}
        >
          {noResultsLabel}
        </Box>
      )}

      {results.map((product: any, index: number) => (
        <ProductCard
          key={product.id}
          sessionStorageInfo={{
            id: product.id,
            index,
            category: null,
            collection: null,
          }}
          discount={false}
          initData={product}
        />
      ))}
    </Box>
  );
}
