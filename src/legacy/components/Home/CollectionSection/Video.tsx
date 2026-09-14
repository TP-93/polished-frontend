// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';

interface Props {
  videoLink: string;
}

export default function Video({ videoLink }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        iframe: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          border: 0,
        },
      }}
    >
      <iframe
        title="jorcustom"
        src={`${videoLink}?h=d363c447c2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
      />
    </Box>
  );
}
