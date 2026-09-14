// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';

import Drawer from './Drawer';

import { ReactComponent as MenuIcon } from '../../../assets/images/icons/header/icon_menu_white.svg.tsx';

interface Props {
  isWhiteColorHeader: boolean;
  openLocalesModal: () => void;
}

export default function MobileMenu({
  isWhiteColorHeader,
  openLocalesModal,
}: Props) {
  const [isDrawer, setDrawer] = React.useState<boolean>(false);

  return (
    <>
      <Box
        onClick={() => setDrawer(true)}
        sx={{
          mr: '20px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SvgIcon
          component={MenuIcon}
          inheritViewBox
          sx={{
            zIndex: 1120,
            height: '20px',
            path: {
              fill: isWhiteColorHeader ? '#0a0a0a' : '#fff',
            },
          }}
        />
      </Box>

      <Drawer
        isOpen={isDrawer}
        closeDrawer={() => setDrawer(false)}
        openLocalesModal={openLocalesModal}
      />
    </>
  );
}
