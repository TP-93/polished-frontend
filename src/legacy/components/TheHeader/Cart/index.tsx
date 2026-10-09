// @ts-nocheck
import * as React from 'react';

import { Stack as Stack } from '@mui/material';

import Error from './Error';
import NoData from './NoData';
import Loader from './Loader';
import Summary from './Summary';
import Products from './Products';
import ReservationTimer from './ReservationTimer';
import Payments from '../../common/Payments';
import TrustIndicators from '../../common/TrustIndicators';
import { useHeaderContext } from '../Provider';

interface Props {
  closeDrawer: () => void;
}

export default function Cart({ closeDrawer }: Props) {
  const { checkout } = useHeaderContext();
  const { error, totalPrice, loading, subTotalPrice, cartProducts } = checkout;

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (!loading && !error && !cartProducts?.length) return <NoData />;

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '100%',
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <Stack
        display="flex"
        flexDirection="column"
        sx={{
          width: '95%',
          minHeight: '30vh',
          maxHeight: 'max-content',
          overflow: 'hidden auto',
        }}
      >
        <Products cartProducts={cartProducts} />
      </Stack>

      <Stack
        id="summary"
        display="flex"
        flexDirection="column"
        sx={{ width: '95%', pb: '1rem' }}
      >
        <Summary
          totalPrice={totalPrice}
          subTotalPrice={subTotalPrice}
          closeDrawer={closeDrawer}
        />

        <Payments />

        <TrustIndicators />
      </Stack>
    </Stack>
  );
}
