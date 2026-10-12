// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';

import {
  SearchField,
  SearchResultsGrid,
  useProductSearch,
  useSearchLabels,
} from './searchShared';

interface Props {
  closeDrawer: () => void;
}

export default function DrawerSearch({ closeDrawer }: Props) {
  const { query, setQuery, results, isLoading, hasQuery } = useProductSearch();
  const labels = useSearchLabels();

  return (
    <Box sx={{ width: '100%' }}>
      <SearchField
        variant="boxed"
        query={query}
        setQuery={setQuery}
        placeholder={labels.placeholder}
        closeLabel={labels.clear}
        onClose={query.length ? () => setQuery('') : undefined}
      />

      <SearchResultsGrid
        results={results}
        isLoading={isLoading}
        hasQuery={hasQuery}
        noResultsLabel={labels.noResults}
        columns="repeat(2, minmax(0, 1fr))"
        gap="0.75rem"
        padding="1.25rem 0 0.5rem"
        onPick={closeDrawer}
      />
    </Box>
  );
}
