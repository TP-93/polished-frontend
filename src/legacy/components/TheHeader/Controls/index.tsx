// @ts-nocheck
import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

import { useMediaQuery } from '@mui/material';

import UserProfile from './UserProfile';
import ShoppingBag from './ShoppingBag';

import { useUserProvider } from '../../../context/user';

import { ReactComponent as NL } from '../../../assets/images/icons/flags/FLAG_NL.svg.tsx';
import { ReactComponent as GB } from '../../../assets/images/icons/flags/FLAG_GB.svg.tsx';
import { ReactComponent as WhatsAppIcon } from '../../../assets/images/icons/socials/whatsapp_icon.svg.tsx';

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
        p: '0 20px 0 0',
        '& > .MuiSvgIcon-root': {
          mr: '1.5rem',
          height: '1.5vh',
          cursor: 'pointer',
        },
      }}
    >
      {!isMobile && (
        <>
          <SvgIcon
            component={currentLanguage === 'NL' ? NL : GB}
            inheritViewBox
            onClick={openLocalesModal}
          />

          <UserProfile isWhiteHeader={isWhiteHeader} openDrawer={openDrawer} />
        </>
      )}

      {isMobile && (
        <Link
          to={{
            pathname: 'https://wa.me/31683206218',
          }}
          target="_blank"
          style={{ marginRight: '20px' }}
        >
          <SvgIcon
            component={WhatsAppIcon}
            inheritViewBox
            sx={{
              position: 'relative',
              top: '4px',
              height: '20px',
              cursor: 'pointer',
              path: {
                fill: isWhiteHeader ? '#0a0a0a' : '#fff',
              },
            }}
          />
        </Link>
      )}

      <ShoppingBag isHeaderWhite={isWhiteHeader} openDrawer={openDrawer} />
    </Box>
  );
}
