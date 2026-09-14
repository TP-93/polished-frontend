// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import Content from './Content';
import PreventScrollWrapper from '../../../common/PreventScrollWrapper';

interface Props {
  isOpen: boolean;
  closeDrawer: () => void;
  openLocalesModal: () => void;
}

export default function Drawer({
  isOpen,
  closeDrawer,
  openLocalesModal,
}: Props) {
  const styles: any = {
    display: 'grid',
    width: '100vw',
    height: '100%',
    gridTemplateColumns: '90vw 10vw',
  };

  return (
    <PreventScrollWrapper active={isOpen}>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            zIndex: 1300,
          }}
        >
          <Stack sx={{ ...styles }}>
            <Content
              closeDrawer={closeDrawer}
              openLocalesModal={openLocalesModal}
            />

            <Box sx={{ zIndex: 1000, backdropFilter: 'blur(5px)' }} />
          </Stack>
        </Box>
      )}
    </PreventScrollWrapper>
  );
}
