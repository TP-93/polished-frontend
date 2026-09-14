// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMediaQuery } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import { useUserProvider } from '../../../../../context/user';
import { cocoBold, cocoRegular } from '../../../../../styles/constants';

interface Props {
  toggleBiggerSizePopup: (value: boolean) => void;
}
export default function BiggerSizePopup({ toggleBiggerSizePopup }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      biggerSize: { title, paragraph, button, footer },
    },
  } = languages[currentLanguage];

  return (
    <Box
      sx={{
        zIndex: 1000,
        position: isMobile ? 'fixed' : 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        maxHeight: isMobile ? '40vh' : 'auto',
        maxWidth: isMobile ? '95vw' : 'auto',
        backdropFilter: 'blur(20px)',
        padding: '15px',
        textAlign: 'center',
        border: `1px solid #4C4C4C`,
      }}
    >
      <CloseIcon
        onClick={() => toggleBiggerSizePopup(false)}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
      />

      <Box sx={{ mb: '3rem' }}>
        <Typography
          variant="h6"
          sx={{
            width: '100%',
            mb: '1.5rem',
            color: '#0C0C0C',
            fontSize: '26px',
            textTransform: 'uppercase',
            ...cocoBold,
            fontWeight: 900,
          }}
        >
          {title.part1 || ''}
          <br />
          {title.part2 || ''}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            width: '100%',
            color: '#050505',
            fontSize: '12px',
            textTransform: 'uppercase',
            ...cocoBold,
            fontWeight: 900,
          }}
        >
          {paragraph?.part1 || ''}
          <br />
          {paragraph?.part2 || ''}
          <br />
          {paragraph?.part3 || ''}
        </Typography>
      </Box>

      <LoadingButton
        fullWidth
        onClick={() => toggleBiggerSizePopup(false)}
        sx={{
          mb: '1rem',
          padding: '0.5rem',
          maxWidth: '95%',
          height: 'calc(2rem + 1vmax)',
          color: '#fff',
          fontSize: isMobile ? '0.6rem' : '0.75rem',
          boxShadow: '10px 10px 20px #00000040',
          background:
            'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
          borderRadius: 0,
          textTransform: 'uppercase',
          ...cocoBold,
          svg: {
            color: '#fff',
            path: { color: '#fff', fill: '#fff' },
          },
        }}
      >
        {button}
      </LoadingButton>

      <Typography sx={{ color: '#4C4C4C', fontSize: '10px', ...cocoRegular }}>
        {footer?.part1 || ''}
        <br />
        {footer?.part2 || ''}
      </Typography>
    </Box>
  );
}
