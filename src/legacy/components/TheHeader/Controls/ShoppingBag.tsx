// @ts-nocheck
import * as React from 'react';

import { Badge as Badge } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';

import { useUserProvider } from '../../../context/user';
import { useHeaderContext } from '../Provider';

import { ReactComponent as BagIconBlack } from '../../../assets/images/icons/checkout/bag_icon_black.svg.tsx';
import { ReactComponent as BagIconWhite } from '../../../assets/images/icons/checkout/bag_icon_white.svg.tsx';

interface Props {
  isHeaderWhite: boolean;
  openDrawer: (content: 'cart' | 'user') => void;
}

export default function ShoppingBag({ isHeaderWhite, openDrawer }: Props) {
  const { checkout } = useHeaderContext();
  const { cartProductsCounter } = checkout || {};

  const {
    state: { drawerState },
  } = useUserProvider();

  React.useEffect(() => {
    if (drawerState.open) openDrawer(drawerState.type);
  }, [drawerState]);

  return (
    <Badge
      color="secondary"
      badgeContent={cartProductsCounter}
      showZero
      onClick={() => openDrawer('cart')}
      sx={{
        '.MuiBadge-badge': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '1px',
          right: '2px',
          p: '0',
          minWidth: 0,
          width: '9px',
          height: '9px',
          color: '#fff',
          border: '1px solid black',
          fontSize: '4px',
          lineHeight: 'auto',
          borderRadius: '50%',
          backgroundColor: '#3c3c3c',
        },
      }}
    >
      <SvgIcon
        component={isHeaderWhite ? BagIconBlack : BagIconWhite}
        inheritViewBox
        sx={{
          mr: '0 !important',
          height: '22px',
          cursor: 'pointer',
        }}
      />
    </Badge>
  );
}
