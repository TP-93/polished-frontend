// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Divider as Divider } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  discounts: any;
  filterHandler: (type: 'size' | 'color' | 'discount', value: string) => void;
}

export default function Discount({ discounts, filterHandler }: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const titles: any = {
    discount: {
      EN: 'Discount',
      NL: 'Korting',
    },
  };

  if (!discounts?.data?.length) return null;

  return (
    <Box sx={{ mb: '1rem' }}>
      <Typography
        variant="body1"
        sx={{
          ...cocoRegular,
          fontSize: '0.7rem',
          fontWeight: 500,
          color: '#4c4c4c',
        }}
      >
        {titles.discount[currentLanguage] || titles.discount.EN}
      </Typography>

      <Divider sx={{ m: '0.5rem 0' }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {discounts.data.map((value: any) => {
          const isSelected: boolean = discounts.selected.includes(value);

          return (
            <Box
              key={value}
              onClick={() => filterHandler('discount', value)}
              sx={{
                ...cocoRegular,
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                userSelect: 'none',
                padding: '10px 16px',
                borderRadius: '999px',
                backgroundColor: isSelected ? '#111' : '#fff',
                color: isSelected ? '#fff' : '#111',
                border: `1px solid ${isSelected ? '#111' : '#C6C6C8'}`,
                '&:hover': { borderColor: '#111' },
              }}
            >
              {`-${value}%`}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
