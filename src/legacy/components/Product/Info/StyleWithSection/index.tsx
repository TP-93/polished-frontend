// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';
import SectionTitle from '../../../common/Titles';

interface Props {
  products: any[];
}

export default function StyleWithSection({ products }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  if (!products.length) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        pt: isMobile ? '1.5rem' : '3rem',
        pb: isMobile ? '1.5rem' : '3rem',
      }}
    >
      <SectionTitle title="Style with" />

      <Stack
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : `repeat(${products.length}, 20vw)`,
        }}
      >
        {products.map((product: any) => {
          if (!product) return null;

          return <ProductCard key={product.id} product={product} />;
        })}
      </Stack>
    </Box>
  );
}
