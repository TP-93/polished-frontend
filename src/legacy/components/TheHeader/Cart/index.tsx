// @ts-nocheck
import * as React from 'react';

import { Stack as Stack } from '@mui/material';

import Error from './Error';
import NoData from './NoData';
import Loader from './Loader';
import Summary from './Summary';
import Products from './Products';
import Payments from '../../common/Payments';
import { FeedbackCompanyReview } from '../../common/TrustIndicators';
import { useHeaderContext } from '../Provider';

interface Props {
  closeDrawer: () => void;
}

export default function Cart({ closeDrawer }: Props) {
  const { checkout } = useHeaderContext();
  const { error, totalPrice, loading, shippingAmount, cartProducts } = checkout;

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
        minHeight: 0,
        overflow: 'hidden',
        backgroundColor: 'var(--checkout-background)',
      }}
    >
      <Stack
        display="flex"
        flexDirection="column"
        sx={{
          width: '95%',
          flex: '1 1 0',
          minHeight: 0,
          overflow: 'hidden auto',
          overscrollBehavior: 'contain',
        }}
      >
        <Products cartProducts={cartProducts} />
      </Stack>

      <Stack
        id="summary"
        display="flex"
        flexDirection="column"
        sx={{ width: '95%', flexShrink: 0, pb: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <Summary
          totalPrice={totalPrice}
          shippingAmount={shippingAmount}
          closeDrawer={closeDrawer}
        />

        {/* Gap below the order button matches the 1.5rem gap above it. */}
        <Payments margin="1.5rem 0 12px" />

        <FeedbackCompanyReview />
      </Stack>
    </Stack>
  );
}
