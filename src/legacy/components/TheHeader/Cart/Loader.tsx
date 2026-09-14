// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { CircularProgress as CircularProgress } from '@mui/material';

export default function Loader() {
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
      <CircularProgress size={70} />
    </Box>
  );
}
