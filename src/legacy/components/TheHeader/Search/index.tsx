// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';
import { ClickAwayListener as ClickAwayListener } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';

import {
  SearchField,
  SearchResultsGrid,
  fetchAllProducts,
  useProductSearch,
  useSearchLabels,
} from './searchShared';

interface Props {
  isWhiteHeader: boolean;
}

export default function Search({ isWhiteHeader }: Props) {
  const labels = useSearchLabels();

  const isMobile = useMediaQuery('(max-width:767px)');

  const { query, setQuery, results, isLoading, hasQuery } = useProductSearch();

  const [isOpen, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const color = isWhiteHeader ? 'var(--foreground)' : 'var(--background)';

  React.useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const close = () => setOpen(false);

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
              top: '76px',
              left: 0,
              right: 0,
              zIndex: 1200,
              maxHeight: 'calc(100vh - 76px)',
              overflowY: 'auto',
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
              <SearchField
                query={query}
                setQuery={setQuery}
                placeholder={labels.placeholder}
                inputRef={inputRef}
                onClose={close}
                closeLabel={labels.close}
              />
            </Box>

            <SearchResultsGrid
              results={results}
              isLoading={isLoading}
              hasQuery={hasQuery}
              noResultsLabel={labels.noResults}
              columns={isMobile ? '50vw 50vw' : 'repeat(5, 1fr)'}
              gap={isMobile ? '0.5rem' : '2rem'}
              padding={isMobile ? '1.5rem 0' : '3rem 0'}
              onPick={close}
            />
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
