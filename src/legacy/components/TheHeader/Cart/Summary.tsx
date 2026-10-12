// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

import { Stack as Stack } from '@mui/material';
import { Button as Button } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import { cocoBold, cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

import { ReactComponent as DiscountIcon } from '../../../assets/images/icons/discount_tag.svg.tsx';

interface Props {
  totalPrice: string;
  shippingAmount: number;
  closeDrawer: () => void;
}

export default function Summary({
  totalPrice,
  shippingAmount,
  closeDrawer,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Cart: {
      checkoutSummary: {
        total,
        proceed,
        shipping,
        voucherValue,
        voucherQuestion,
      },
    },
  } = languages[currentLanguage];

  // The cart assumes NL home delivery; checkout still uses actual backend rates.
  const numericPrice = totalPrice.replace(/[^\d.,-]/g, '');
  const decimalSeparator = numericPrice.lastIndexOf(',') > numericPrice.lastIndexOf('.') ? ',' : '.';
  const normalizedPrice = decimalSeparator === ','
    ? numericPrice.replace(/\./g, '').replace(',', '.')
    : numericPrice.replace(/,/g, '');
  const totalCents = Math.round(Number(normalizedPrice) * 100);
  const merchandiseCents = Math.max(0, totalCents - Math.round((shippingAmount || 0) * 100));
  const estimatedShippingCents = merchandiseCents >= 4000 ? 0 : 499;
  const formatPrice = (cents: number) => new Intl.NumberFormat(
    currentLanguage === 'NL' ? 'nl-NL' : 'en-IE',
    { style: 'currency', currency: 'EUR' },
  ).format(cents / 100);

  return (
    <Stack display="flex" flexDirection="column" sx={{ pt: '0.5rem' }}>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: '0.5rem' }}
      >
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ gap: '6px' }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: '0.7rem', color: '#050505', ...cocoBold }}
          >
            {shipping}
          </Typography>

        </Stack>

        <Typography
          variant="body1"
          sx={{ ...cocoRegular, color: '#050505', fontSize: '0.7rem' }}
        >
          {formatPrice(estimatedShippingCents)}
        </Typography>
      </Stack>

      {isMobile && (
        <>
          {/* <Stack */}
          {/*  display="flex" */}
          {/*  flexDirection="row" */}
          {/*  alignItems="flex-start" */}
          {/*  justifyContent="flex-start" */}
          {/*  sx={{ pb: '0.5rem' }} */}
          {/* > */}
          {/*  <SvgIcon */}
          {/*    component={DiscountIcon} */}
          {/*    inheritViewBox */}
          {/*    sx={{ width: '15px', mr: '1rem' }} */}
          {/*  /> */}

          {/*  <Stack */}
          {/*    display="flex" */}
          {/*    flexDirection="column" */}
          {/*    alignItems="flex-start" */}
          {/*  > */}
          {/*    <Typography */}
          {/*      variant="body1" */}
          {/*      sx={{ fontSize: '0.6rem', color: '#050505', ...cocoBold }} */}
          {/*    > */}
          {/*      {shipping} */}
          {/*    </Typography> */}

          {/*    <Typography */}
          {/*      variant="body1" */}
          {/*      sx={{ ...cocoRegular, color: '#050505', fontSize: '0.6rem' }} */}
          {/*    > */}
          {/*      {shippingValue} */}
          {/*    </Typography> */}
          {/*  </Stack> */}
          {/* </Stack> */}

          <Stack
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{ pb: '0.5rem' }}
          >
            <SvgIcon
              component={DiscountIcon}
              inheritViewBox
              sx={{ width: '15px', mr: '1rem' }}
            />

            <Stack
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Typography
                variant="body1"
                sx={{ fontSize: '0.6rem', color: '#050505', ...cocoBold }}
              >
                {voucherQuestion}
              </Typography>

              <Typography
                variant="body1"
                sx={{ ...cocoRegular, color: '#050505', fontSize: '0.6rem' }}
              >
                {voucherValue}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}

      {!isMobile && (
        <>
          {/* <Stack */}
          {/*  display="flex" */}
          {/*  flexDirection="row" */}
          {/*  alignItems="center" */}
          {/*  justifyContent="space-between" */}
          {/*  sx={{ mb: '0.5rem' }} */}
          {/* > */}
          {/*  <Typography */}
          {/*    variant="body1" */}
          {/*    sx={{ fontSize: '0.7rem', color: '#050505', ...cocoBold }} */}
          {/*  > */}
          {/*    {shipping} */}
          {/*  </Typography> */}

          {/*  <Typography */}
          {/*    variant="body1" */}
          {/*    sx={{ ...cocoRegular, color: '#050505', fontSize: '0.7rem' }} */}
          {/*  > */}
          {/*    {shippingValue} */}
          {/*  </Typography> */}
          {/* </Stack> */}

          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack display="flex" flexDirection="row" alignItems="center">
              <SvgIcon
                component={DiscountIcon}
                inheritViewBox
                sx={{ width: '15px', mr: '1rem' }}
              />

              <Typography
                variant="body1"
                sx={{ fontSize: '0.6rem', color: '#050505', ...cocoBold }}
              >
                {voucherQuestion}
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              sx={{ ...cocoRegular, color: '#050505', fontSize: '0.6rem' }}
            >
              {voucherValue}
            </Typography>
          </Stack>
        </>
      )}

      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{
          p: '0.5rem 0',
          borderTop: '1px solid #4343',
          borderBottom: '1px solid #4343',
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: '1.13rem', color: '#050505', ...cocoBold }}
        >
          {total}
        </Typography>

        <Typography
          variant="body1"
          sx={{ ...cocoRegular, color: '#050505', fontSize: '1.13rem' }}
        >
          {formatPrice(merchandiseCents + estimatedShippingCents)}
        </Typography>
      </Stack>

      <Link
        to="/checkout"
        style={{ margin: '1.5rem 0 0 0' }}
        onClick={closeDrawer}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: '0.7rem',
            fontSize: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoBold,
          }}
        >
          {proceed}
        </Button>
      </Link>
    </Stack>
  );
}
