// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';

import ProductCard from '../../common/ProductDetails/ProductCard';
import SectionTitle from '../../common/Titles';

interface Props {
  products: any[];
}
export default function AlsoLikeSection({ products }: Props) {
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
      <SectionTitle title="You may also like" />

      <Stack
        sx={{
          display: 'grid',
          gridRowGap: '10px',
          gridTemplateRows: '1fr',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : `repeat(${products.length}, 20vw)`,
        }}
      >
        {products.map((product: any) => {
          if (!product) return null;

          return (
            <ProductCard
              key={`${product?.id}-${product?.name}`}
              discount={false}
              initData={product}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
