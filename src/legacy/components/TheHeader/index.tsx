// @ts-nocheck
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Dialog as Dialog } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import { useScrollTrigger as useScrollTrigger } from '@mui/material';

import Shop from './Shop';
import Cart from './Cart';
import User from './User';
import Logo from './Logo';
import Controls from './Controls';
import { Drawer } from '../TheDrawer';
import NewsString from './NewsString';
import MobileMenu from './MobileMenu';
import UserProfile from './Controls/UserProfile';
import HeaderProvider from './Provider';
import PreventScrollWrapper from '../common/PreventScrollWrapper';
import { useUserProvider } from '../../context/user';

const LocalesModal = React.lazy(
  () => import(/* webpackChunkName: 'LocalesModal' */ './Locales/Modal'),
);

const drawerTitles: any = {
  cart: {
    EN: 'Shopping cart',
    NL: 'Winkelwagen',
  },
  user: {
    EN: 'My account',
    NL: 'Mijn account',
  },
};

export default function TheHeader() {
  const { pathname } = useLocation();

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const isMobile = useMediaQuery('(max-width:767px)');

  const isScrollTriggered = useScrollTrigger({
    target: window,
    threshold: 0,
    disableHysteresis: true,
  });

  const isHomePage: boolean = pathname === '/';
  const isProductPage: boolean = pathname.includes('/product');
  const isCustomizePage: boolean = pathname.includes('product-customize');
  // const isSpecialEventPage: boolean = pathname.includes('special-event');

  const [isDrawer, setDrawer] = React.useState<boolean>(false);
  const [drawerContent, setDrawerContent] = React.useState<
    'cart' | 'user' | ''
  >('');
  const [isShopDropDown, setShopDropDown] = React.useState<boolean>(false);
  const [isLocalesModal, setLocalesModal] = React.useState<boolean>(false);
  const [isHeaderHovered, setHeaderHovered] = React.useState<boolean>(false);

  const [showHeader, setShowHeader] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const headerWhiteBgCondition = () => {
    if (isHomePage) {
      return isDrawer || isHeaderHovered || isScrollTriggered;
    }

    if (isProductPage) {
      if (isDrawer || isHeaderHovered || isScrollTriggered) {
        return true;
      }

      return false;
    }

    return true;
  };

  const headerWhiteColorCondition = () => {
    if (isHomePage) {
      if (!isDrawer && !isHeaderHovered && !isScrollTriggered) {
        return false;
      }
    }

    return true;
  };

  const isWhiteBgHeader: boolean = headerWhiteBgCondition();
  const isWhiteColorHeader: boolean = headerWhiteColorCondition();

  const openDrawer = (content: 'cart' | 'user') => {
    setDrawer(true);
    setDrawerContent(content);
  };

  const closeDrawer = () => {
    setDrawer(false);
    setDrawerContent('');
  };

  const openLocalesModal = () => {
    setLocalesModal(true);
    setHeaderHovered(false);
  };
  const closeLocalesModal = () => setLocalesModal(false);

  if (isCustomizePage) return null;

  return (
    <HeaderProvider>
      <Box
        id="header"
        component={'header'}
        onMouseEnter={isMobile ? undefined : () => setHeaderHovered(true)}
        onMouseLeave={() => {
          setHeaderHovered(false);

          if (isDrawer && isShopDropDown) closeDrawer();
        }}
        sx={{
          zIndex: 1100,
          position: 'fixed',
          display: 'flex',
          top: showHeader ? '0' : '-60px',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '60px',
          transition: 'all 0.5s ease-in-out',
          backgroundColor: isWhiteBgHeader ? '#fff' : 'transparent',
        }}
      >
        <NewsString />

        <Stack
          sx={{
            flexGrow: 1,
            width: '100%',
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr 1fr 1fr',
            pt: '4px',
            pb: '2px',
          }}
        >
          {isMobile && (
            <Stack
              sx={{
                pl: '16px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <MobileMenu
                isWhiteColorHeader={isWhiteColorHeader}
                openLocalesModal={openLocalesModal}
              />

              <UserProfile
                isWhiteHeader={isWhiteColorHeader}
                openDrawer={openDrawer}
              />
            </Stack>
          )}

          {!isMobile && (
            <Shop
              isShopDropDown={isShopDropDown}
              isWhiteColorHeader={isWhiteColorHeader}
              setShopDropDown={setShopDropDown}
              setHeaderHovered={setHeaderHovered}
            />
          )}

          <Logo isWhiteHeader={isWhiteColorHeader} />

          <Controls
            isWhiteHeader={isWhiteColorHeader}
            openDrawer={openDrawer}
            openLocalesModal={openLocalesModal}
          />
        </Stack>

        <Dialog
          open={isLocalesModal}
          sx={{ '.MuiPaper-root': { borderRadius: 0 } }}
        >
          <PreventScrollWrapper active={isLocalesModal}>
            <React.Suspense fallback={<></>}>
              <LocalesModal close={closeLocalesModal} />
            </React.Suspense>
          </PreventScrollWrapper>
        </Dialog>
      </Box>

      <Drawer
        open={isDrawer}
        title={
          drawerTitles[drawerContent || 'user'][currentLanguage || 'NL'] || ''
        }
        close={closeDrawer}
      >
        {drawerContent === 'cart' && <Cart closeDrawer={closeDrawer} />}
        {drawerContent === 'user' && <User closeDrawer={closeDrawer} />}
      </Drawer>
    </HeaderProvider>
  );
}
