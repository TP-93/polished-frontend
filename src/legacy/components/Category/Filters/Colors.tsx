// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Divider as Divider } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  colors: any;
  filterHandler: (type: 'size' | 'color', selectedValue: string) => void;
}

export default function Colors({ colors, filterHandler }: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const titles: any = {
    color: {
      EN: 'Color',
      NL: 'Kleur',
    },
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          ...cocoRegular,
          fontSize: '0.7rem',
          fontWeight: 500,
          color: '#4c4c4c',
        }}
      >
        {titles.color[currentLanguage]}
      </Typography>

      <Divider sx={{ m: '0.5rem 0' }} />

      <Stack
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
        }}
      >
        {colors.data.map((color: string) => {
          const isColorSelected: boolean = colors.selected.includes(color);

          return (
            <Box
              key={color}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => filterHandler('color', color)}
              sx={{
                padding: '4%',
                height: '6vh',
                cursor: 'pointer',
                border: !isColorSelected ? '1px solid #4343' : '1px solid #000',
                borderRight: !isColorSelected ? 0 : '1px solid #000',
                ':last-child': {
                  borderRight: !isColorSelected
                    ? '1px solid #4343'
                    : '1px solid #000',
                },
                ':hover': !isColorSelected
                  ? {
                      borderColor: '#000',
                      borderRight: '1px solid #000',
                    }
                  : undefined,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  p: '1rem',
                  border: '1px solid #4343',
                  backgroundColor: `${color}`,
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
