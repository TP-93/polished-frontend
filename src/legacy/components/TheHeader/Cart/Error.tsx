// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon } from '@mui/icons-material';

import { cocoBold } from '../../../styles/constants';

export default function Error() {
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
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <SentimentVeryDissatisfiedIcon sx={{ mr: '1rem' }} />

        <Typography variant="body1" sx={{ ...cocoBold }}>
          Failed to load Cart data
        </Typography>
      </Stack>
    </Box>
  );
}
