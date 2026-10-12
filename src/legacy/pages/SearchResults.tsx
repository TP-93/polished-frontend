// @ts-nocheck
import * as React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router';

import {
  SearchResultsGrid,
  fetchAllProducts,
  useSearchLabels,
} from '../components/TheHeader/Search/searchShared';

export default function SearchResults() {
  const location = useLocation();
  const labels = useSearchLabels();
  const isMobile = useMediaQuery('(max-width:767px)');
  const q = (new URLSearchParams(location.search).get('q') || '').trim();

  const [results, setResults] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAllProducts().then((all) => {
      if (!active) return;
      const needle = q.toLowerCase();
      setResults(
        needle.length >= 2
          ? all.filter((p: any) => p.name?.toLowerCase().includes(needle))
          : [],
      );
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [q]);

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: isMobile ? 0 : '24px', pt: '32px', pb: '64px' }}>
      <Box sx={{ textAlign: 'center', px: '16px' }}>
        <Box component="h1" sx={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, m: 0 }}>
          {labels.title} “{q}”
        </Box>
        {!isLoading && (
          <Box sx={{ mt: '8px', fontSize: '13px', color: 'rgba(0,0,0,0.55)' }}>
            {results.length} {results.length === 1 ? 'product' : 'producten'}
          </Box>
        )}
      </Box>
      <SearchResultsGrid
        results={results}
        isLoading={isLoading}
        hasQuery={q.length >= 2}
        noResultsLabel={labels.noResults}
        columns={isMobile ? '50vw 50vw' : 'repeat(5, 1fr)'}
        gap={isMobile ? '0.5rem' : '2rem'}
        padding={isMobile ? '1.5rem 0' : '2.5rem 0'}
      />
    </Box>
  );
}
