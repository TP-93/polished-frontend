// @ts-nocheck
import React from 'react';

import { Stack as Stack } from '@mui/material';

import { useMediaQuery } from '@mui/material';

import ProductCard from '../../common/ProductDetails/ProductCard';

interface Props {
  products: any[];
}

export default function RelatedProducts({ products }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        maxWidth: '100vw',
        overflow: 'auto hidden',
        width: '100%',
        whiteSpace: isMobile ? 'wrap' : 'nowrap',
        transition: 'all 0.15s ease-in-out',
        pb: '0.5rem',
        '::-webkit-scrollbar': {
          height: '2px',
          display: isMobile ? 'none' : 'block !important',
          border: 'none',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          cursor: 'pointer',
          backgroundColor: '#0a0a0a',
        },
        '& > div': {
          minWidth: isMobile ? '47%' : '22vw !important',
        },
      }}
    >
      {products.map((product: any) => {
        return (
          <ProductCard key={product?.id} discount={false} initData={product} />
        );
      })}
    </Stack>
  );
}
