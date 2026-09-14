// @ts-nocheck
import React from 'react';

import Stack from '@mui/material/Stack';

import { useMediaQuery } from '@mui/material';
import Tabs from './Tabs';
import Content from './Content';

export type ProductInfoContentType =
  | 'main'
  | 'details'
  | 'proposal'
  | 'shipping';

interface Props {
  product: any;
}

export default function ProductInfo({ product }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const [contentType, setContentType] =
    React.useState<ProductInfoContentType>('main');

  const contentChangeHandler = (type: ProductInfoContentType) => {
    if (type.length && type !== contentType) setContentType(type);
  };

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        width: isMobile ? '100%' : '60%',
        height: '100%',
      }}
    >
      <Content
        type={contentType}
        product={product}
        contentChangeHandler={contentChangeHandler}
      />

      <Tabs
        contentType={contentType}
        contentChangeHandler={contentChangeHandler}
      />
    </Stack>
  );
}
