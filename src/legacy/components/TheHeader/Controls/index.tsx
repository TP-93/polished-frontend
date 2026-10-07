// @ts-nocheck
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { MessageCircle } from 'lucide-react';

import { useMediaQuery } from '@mui/material';

import UserProfile from './UserProfile';
import ShoppingBag from './ShoppingBag';
import Search from '../Search';

import { useUserProvider } from '../../../context/user';

interface Props {
  isWhiteHeader: boolean;
  openDrawer: (content: 'user' | 'cart') => void;
  openLocalesModal: () => void;
}

export default function Controls({
  isWhiteHeader,
  openLocalesModal,
  openDrawer,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        gap: '20px',
        p: '0 16px 0 0',
      }}
    >
      {!isMobile && (
        <>
          <Box
            component="button"
            type="button"
            aria-label="Taal en valuta wijzigen"
            onClick={openLocalesModal}
            sx={{
              p: 0,
              border: 0,
              color: isWhiteHeader ? 'var(--foreground)' : 'var(--background)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1,
              background: 'transparent',
            }}
          >
            {currentLanguage} / EUR
          </Box>

          <UserProfile isWhiteHeader={isWhiteHeader} openDrawer={openDrawer} />
        </>
      )}

      {isMobile && (
        <Link
          to={{
            pathname: 'https://wa.me/31683206218',
          }}
          target="_blank"
          style={{ display: 'flex', color: 'inherit' }}
        >
          <MessageCircle
            aria-hidden="true"
            size={19}
            strokeWidth={1.35}
            color={isWhiteHeader ? 'var(--foreground)' : 'var(--background)'}
            style={{
              width: '19px',
              height: '19px',
              margin: '0 2px',
              overflow: 'visible',
              transform: 'scaleX(1.22)',
              transformOrigin: 'center',
            }}
          />
        </Link>
      )}

      <ShoppingBag isHeaderWhite={isWhiteHeader} openDrawer={openDrawer} />
    </Box>
  );
}
