// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
