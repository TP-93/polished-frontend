// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Modal as Modal } from '@mui/material';
import { IconButton as IconButton } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
  open: boolean;
  images: any;
  handleClose: any;
}

export default function MobileFullscreen({ open, images, handleClose }: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'white',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '4vh',
            right: '5px',
            zIndex: 10000,
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ path: { fill: '#4C4C4C' } }} />
        </IconButton>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
          }}
        >
          {images.map((item: any) => {
            return (
              <Box
                key={item.url}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                  width: '100vw',
                  height: '100vh',
                  position: 'relative',
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                }}
              >
                <img
                  key={item.url}
                  src={item.url}
                  alt="Product"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '100vh',
                    objectFit: 'fill',
                    transform: 'scale(1.4)',
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Modal>
  );
}
