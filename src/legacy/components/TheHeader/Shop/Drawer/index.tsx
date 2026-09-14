// @ts-nocheck
import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';

import Content from './Content';

import { useHeaderContext } from '../../Provider';
import PreventScrollWrapper from '../../../common/PreventScrollWrapper';

interface Props {
  open: boolean;
  close: () => void;
}

export default function ShopDropDown({ open, close }: Props) {
  const { shop } = useHeaderContext();

  const isMobile = useMediaQuery('(max-width:767px)');

  const styles: any = {
    display: 'grid',
    width: '100vw',
    height: isMobile ? 'calc(100vh - 6vh)' : 'calc(100vh - 8vh)',
    gridAutoRows: 'min-content 1fr',
  };

  return (
    <PreventScrollWrapper active={open}>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: '8vh',
            left: 0,
            right: 0,
          }}
        >
          <Stack sx={{ ...styles }}>
            <Content
              error={shop.error}
              loading={shop.loading}
              shopId={shop.shopId}
              collections={shop.collections}
              closeDrawer={close}
            />

            <Box sx={{ zIndex: 1000, backdropFilter: 'blur(5px)' }} />
          </Stack>
        </Box>
      )}
    </PreventScrollWrapper>
  );
}
