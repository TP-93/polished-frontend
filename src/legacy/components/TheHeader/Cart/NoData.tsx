// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
