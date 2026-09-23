// @ts-nocheck
import * as React from 'react';

import { Badge as Badge } from '@mui/material';
import { ShoppingBag as ShoppingBagIcon } from 'lucide-react';

import { useUserProvider } from '../../../context/user';
import { useHeaderContext } from '../Provider';

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
          top: '-1px',
          right: '-3px',
          p: '0',
          minWidth: 0,
          width: '11px',
          height: '11px',
          color: 'var(--primary-foreground)',
          border: '1px solid var(--background)',
          fontSize: '6px',
          lineHeight: 'auto',
          borderRadius: '50%',
          backgroundColor: 'var(--foreground)',
        },
      }}
    >
      <ShoppingBagIcon
        aria-hidden="true"
        size={19}
        strokeWidth={1.35}
        color={isHeaderWhite ? 'var(--foreground)' : 'var(--background)'}
        style={{ cursor: 'pointer', width: '22px', height: '19px' }}
      />
    </Badge>
  );
}
