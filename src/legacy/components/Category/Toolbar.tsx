// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { useMediaQuery } from '@mui/material';
import { cocoBold, cocoRegular } from '../../styles/constants';

import { ReactComponent as FiltersIcon } from '../../assets/images/icons/filters_icon.svg.tsx';
import { useUserProvider } from '../../context/user';

interface Props {
  totalCount: number;
  categoryName: string;
  openFilters: () => void;
}

export default function Toolbar({
  totalCount,
  categoryName,
  openFilters,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const [showToolbar, setShowToolbar] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowToolbar(false);
    } else {
      setShowToolbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const mobileStyles = {
    position: 'fixed',
    top: showToolbar ? '6vh' : `-14vh`,
    left: 0,
    right: 0,
    zIndex: 1100,
    p: '10px 20px',
    height: '5vh',
    transition: 'all 0.8s ease-in-out',
    backgroundColor: '#fff',
  };

  const desktopStyles = {
    position: 'fixed',
    top: showToolbar ? '7.9vh' : `-16vh`,
    left: 0,
    right: 0,
    zIndex: 1100,
    p: '10px 20px',
    height: '5vh',
    transition: 'all 0.8s ease-in-out',
    backgroundColor: '#fff',
  };

  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={isMobile ? mobileStyles : desktopStyles}
    >
      <Box>
        <Typography variant="body1" sx={{ fontSize: '0.75rem', ...cocoBold }}>
          {categoryName}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#575757',
            fontSize: '0.75rem',
            ...cocoRegular,
          }}
        >
          {currentLanguage === 'EN' && (
            <>{`Total items on this page: ${totalCount}`}</>
          )}

          {currentLanguage === 'NL' && (
            <>{`Totaal op deze pagina: ${totalCount}`}</>
          )}
        </Typography>
      </Box>

      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ cursor: 'pointer' }}
        onClick={openFilters}
      >
        <Typography
          variant="body1"
          sx={{
            mt: '0.2rem',
            mr: '0.5rem',
            color: '#454545',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            ...cocoBold,
          }}
        >
          Refine
        </Typography>

        <SvgIcon
          component={FiltersIcon}
          inheritViewBox
          sx={{ height: '20px', fill: '#454545' }}
        />
      </Stack>
    </Stack>
  );
}
