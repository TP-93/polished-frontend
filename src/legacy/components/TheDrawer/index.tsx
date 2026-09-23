// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import Title from './Title';
import PreventScrollWrapper from '../common/PreventScrollWrapper';

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  close: () => void;
}

export function Drawer({ open, title, children, close }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const height = window.innerHeight;

  const styles: any = {
    display: 'grid',
    width: '100vw',
    height: isMobile ? `${window.innerHeight}px` : 'calc(100vh - 60px)',
    maxHeight: isMobile ? `${window.innerHeight}px` : 'calc(100vh - 60px)',
    gridTemplateColumns: isMobile ? '10vw 90vw' : '70vw 30vw',
  };

  return (
    <PreventScrollWrapper active={open}>
      {open && height && (
        <Box
          sx={{
            position: 'fixed',
            top: isMobile ? 0 : '60px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            height: `${window.innerHeight}px`,
          }}
        >
          <Stack sx={{ ...styles }}>
            <Box sx={{ backdropFilter: 'blur(5px)' }} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
            >
              <Title text={title} close={close} />

              <Stack
                display="flex"
                flexDirection="column"
                sx={{
                  height: isMobile
                    ? `calc(${window.innerHeight}px - 4vh)`
                    : `calc(${window.innerHeight}px - 4vh - 60px)`,
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                {children}
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </PreventScrollWrapper>
  );
}
