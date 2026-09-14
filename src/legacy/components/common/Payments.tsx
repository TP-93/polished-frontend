// @ts-nocheck
import React from 'react';
import { Stack, useMediaQuery } from '@mui/material';

import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as Visa } from '../../assets/images/icons/paymanets/visa.svg.tsx';
import { ReactComponent as Ideal } from '../../assets/images/icons/paymanets/ideal.svg.tsx';
import { ReactComponent as Klarna } from '../../assets/images/icons/paymanets/klarna.svg.tsx';
import { ReactComponent as PayPal } from '../../assets/images/icons/paymanets/paypal.svg.tsx';
import { ReactComponent as Maestro } from '../../assets/images/icons/paymanets/maestro.svg.tsx';
import { ReactComponent as ApplePay } from '../../assets/images/icons/paymanets/applePay.svg.tsx';
import { ReactComponent as MasterCard } from '../../assets/images/icons/paymanets/mastercard.svg.tsx';

const Icons: any[] = [
  Ideal,
  Klarna,
  PayPal,
  ApplePay,
  Visa,
  Maestro,
  MasterCard,
];

export default function Payments() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ m: '1.5rem 0' }}
    >
      {Icons.map((Icon: any, index: number) => (
        <SvgIcon
          key={index + 10}
          component={Icon}
          inheritViewBox
          sx={{
            width: isMobile ? '1.7rem' : 'calc(1em + 2vmax)',
            maxWidth: 'min-content',
            mr: isMobile ? '0.6rem' : '1rem',
            ':last-child': { mr: 0 },
          }}
        />
      ))}
    </Stack>
  );
}
