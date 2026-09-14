// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';

export default function NoData() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6">Your cart is empty</Typography>
    </Box>
  );
}
