// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';

import { useLocation } from 'react-router-dom';
import Footer from '../../TheFooter';

interface Props {
  children: React.ReactNode;
  isFooterHidden?: boolean;
}

export default function PageWrapper({
  children,
  isFooterHidden = false,
}: Props) {
  const route: any = useLocation();

  const isHomePage: boolean = route.pathname === '/';
  const isProductPage: boolean = route.pathname.includes('product');
  const isSpecialEventPage: boolean = route.pathname.includes('special-event');

  const pageWrapperRef: any = React.useRef(null);

  React.useEffect(() => {
    pageWrapperRef.current.scrollIntoView();
  }, []);

  return (
    <Box
      ref={pageWrapperRef}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh',
        pt: !isHomePage && !isProductPage && !isSpecialEventPage ? '60px' : 0,
      }}
    >
      {children}

      {!isFooterHidden && <Footer />}
    </Box>
  );
}
