// @ts-nocheck
import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Close as CloseIcon } from '@mui/icons-material';

import { useMediaQuery } from '@mui/material';
import { cocoBold, cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

const titles: any = {
  details: {
    EN: 'Product Details',
    NL: 'Product Details',
  },
  proposal: {
    EN: 'Size Reference & Proposal',
    NL: 'Maat Referentie & Voorstel',
  },
  shipping: {
    EN: 'Shipping & Returns',
    NL: 'Verzending & Retourneren',
  },
};

interface Props {
  type: string;
  children: React.ReactNode;
  closeDrawer: () => void;
}

export default function MobileDrawer({ type, children, closeDrawer }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  React.useEffect(() => {
    // @ts-ignore
    document.querySelector('html').style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      // @ts-ignore
      document.querySelector('html').style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  const styles: any = {
    display: 'grid',
    width: '100vw',
    height: '100%',
    gridTemplateColumns: '10vw 90vw',
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        zIndex: 1300,
      }}
    >
      <Stack sx={{ ...styles }}>
        <Box sx={{ zIndex: 1000, backdropFilter: 'blur(5px)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: '20px 20px 10px 20px',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            onClick={closeDrawer}
            sx={{
              pb: '2rem',
              width: '100%',
              '& > *': { ...cocoRegular, fontWeight: 700 },
            }}
          >
            <Typography
              sx={{
                ...cocoBold,
                textTransform: 'uppercase',
                fontSize: isMobile ? '0.88rem' : '1rem',
                fontWeight: 700,
                color: '#050505',
              }}
            >
              {titles[type][currentLanguage]}
            </Typography>

            <CloseIcon
              sx={{ cursor: 'pointer', path: { fill: '#0c0c0c !important' } }}
            />
          </Stack>

          {children}
        </Box>
      </Stack>
    </Box>
  );
}
