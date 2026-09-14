// @ts-nocheck
import * as React from 'react';

import { Stack as Stack } from '@mui/material';

import Error from './Error';
import Loader from './Loader';
import MenuImage from './MenuImage';
import NestedCollectionsList from './NestedCollectionsList';
import TopLevelCollectionsList from './TopLevelCollectionsList';

interface Props {
  error: any;
  loading: boolean;
  shopId: string;
  collections: any[];
  closeDrawer: () => void;
}

export default function Content({
  error,
  loading,
  shopId,
  collections,
  closeDrawer,
}: Props) {
  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      onMouseLeave={(e: any) => {
        if (e.target.id !== 'shop-item') closeDrawer();
      }}
      sx={{
        pl: '20px',
        backgroundColor: '#fbfbfb',
      }}
    >
      <TopLevelCollectionsList
        collections={collections}
        closeDrawer={closeDrawer}
      />

      <NestedCollectionsList
        collections={collections}
        closeDrawer={closeDrawer}
      />

      <MenuImage shopId={shopId} />
    </Stack>
  );
}
