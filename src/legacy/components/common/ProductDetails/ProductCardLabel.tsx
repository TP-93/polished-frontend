// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

import { pink, white, black, cocoRegular } from '../../../styles/constants';

interface Props {
  type: 0 | 1 | 2;
  text: any;
  alignTo: string;
}

export default function ProductCardLabel({ type, text, alignTo }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const bgColors = {
    0: '#0051ca',
    1: black,
    2: pink,
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        [alignTo]: 0,
        zIndex: 1,
        padding: isMobile ? '2px 5px' : '5px 10px',
        backgroundColor: bgColors[type],
      }}
    >
      <Typography
        variant="body1"
        sx={{ ...cocoRegular, color: white, fontSize: 'calc(0.4em + 1vmin)' }}
      >
        {text}
      </Typography>
    </Box>
  );
}
