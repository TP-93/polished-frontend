// @ts-nocheck
import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ShopDropDown from './Drawer';
import { cocoRegular } from '../../../styles/constants';

interface Props {
  isShopDropDown: boolean;
  isWhiteColorHeader: boolean;
  setShopDropDown: (status: boolean) => void;
  setHeaderHovered: (status: boolean) => void;
}

export default function Shop({
  isShopDropDown,
  isWhiteColorHeader,
  setShopDropDown,
  setHeaderHovered,
}: Props) {
  return (
    <Box
      id="shop-item"
      sx={{
        height: '100%',
        position: 'relative',
        width: 'min-content',
        display: 'flex',
        alignItems: 'center',
        p: '0 0 0 20px',
      }}
      onMouseEnter={() => {
        setShopDropDown(true);
        setHeaderHovered(true);
      }}
      // onMouseLeave={() => setShopDropDown(false)}
    >
      <Typography
        variant="body2"
        sx={{
          width: 'min-content',
          ...cocoRegular,
          color: isWhiteColorHeader ? '#454545' : '#fbfbfb',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        Shop
      </Typography>

      <ShopDropDown
        open={isShopDropDown}
        close={() => {
          setShopDropDown(false);

          setHeaderHovered(false);
        }}
      />
    </Box>
  );
}
