// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Menu } from 'lucide-react';

import Drawer from './Drawer';

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
          mr: '18px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu
          aria-hidden="true"
          size={18}
          strokeWidth={1.35}
          color={isWhiteColorHeader ? 'var(--foreground)' : 'var(--background)'}
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
