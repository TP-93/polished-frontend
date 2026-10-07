// @ts-nocheck
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { ClickAwayListener as ClickAwayListener } from '@mui/material';
import { Search as SearchIcon, X as CloseIcon } from 'lucide-react';
import { gql } from 'apollo-boost';

import client from '../../../apollo/client';
import { useUserProvider } from '../../../context/user';

const searchProductsQuery = gql`
  query headerSearchProducts($currency: String) {
    products(first: 1000) {
      edges {
        node {
          id
          name
          slug
          price(currency: $currency) {
            localized
          }
          imageGroups {
            id
            url
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

function fetchAllProducts(): Promise<any[]> {
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

function getThumb(product: any): string | null {
  const groups = product?.imageGroups || [];
  const front =
    groups.find((g: any) => g.imageSide === 'FRONT') || groups[0] || null;
  return front?.images?.[0]?.url || front?.url || null;
}

interface Props {
  isWhiteHeader: boolean;
}

export default function Search({ isWhiteHeader }: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const [isOpen, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const color = isWhiteHeader ? 'var(--foreground)' : 'var(--background)';

  React.useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

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
      const matches = all
        .filter((p: any) => p.name?.toLowerCase().includes(q))
        .slice(0, 8);
      setResults(matches);
      setLoading(false);
    }, 200);

    return () => clearTimeout(handle);
  }, [query]);

  const close = () => setOpen(false);

  const labels = {
    placeholder: currentLanguage === 'EN' ? 'Search products…' : 'Zoek producten…',
    noResults:
      currentLanguage === 'EN' ? 'No products found' : 'Geen producten gevonden',
    aria: currentLanguage === 'EN' ? 'Search' : 'Zoeken',
  };

  return (
    <ClickAwayListener onClickAway={close}>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Box
          component="button"
          type="button"
          aria-label={labels.aria}
          onClick={() => setOpen((v) => !v)}
          sx={{
            p: 0,
            border: 0,
            color,
            cursor: 'pointer',
            display: 'flex',
            background: 'transparent',
          }}
        >
          <SearchIcon
            aria-hidden="true"
            size={19}
            strokeWidth={1.35}
            style={{
              width: '19px',
              height: '19px',
              margin: '0 2px',
              overflow: 'visible',
              transform: 'scaleX(1.22)',
              transformOrigin: 'center',
            }}
          />
        </Box>

        {isOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              zIndex: 1200,
              backgroundColor: '#fff',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <Box
              sx={{
                maxWidth: '720px',
                margin: '0 auto',
                p: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                  pb: '8px',
                }}
              >
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
                    if (e.key === 'Escape') close();
                  }}
                  placeholder={labels.placeholder}
                  sx={{
                    flex: 1,
                    border: 0,
                    outline: 'none',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    background: 'transparent',
                    color: 'var(--foreground)',
                  }}
                />
                <Box
                  component="button"
                  type="button"
                  aria-label="Sluiten"
                  onClick={close}
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
              </Box>

              {query.trim().length >= 2 && (
                <Box sx={{ pt: '8px' }}>
                  {!isLoading && results.length === 0 && (
                    <Box
                      sx={{
                        py: '16px',
                        fontSize: '13px',
                        color: 'rgba(0,0,0,0.5)',
                        textAlign: 'center',
                      }}
                    >
                      {labels.noResults}
                    </Box>
                  )}

                  {results.map((product: any) => {
                    const thumb = getThumb(product);
                    return (
                      <Box
                        key={product.id}
                        component={Link}
                        to={`/product/${product.slug}`}
                        onClick={close}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          py: '8px',
                          px: '4px',
                          color: 'var(--foreground)',
                          textDecoration: 'none',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                        }}
                      >
                        {thumb ? (
                          <Box
                            component="img"
                            src={thumb}
                            alt=""
                            sx={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <Box sx={{ width: '40px', height: '40px', flexShrink: 0 }} />
                        )}
                        <Box sx={{ flex: 1, fontSize: '13px', lineHeight: 1.3 }}>
                          {product.name}
                        </Box>
                        <Box sx={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
                          {product.price?.localized}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
