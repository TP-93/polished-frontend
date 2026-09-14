// @ts-nocheck
import React from 'react';

import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { LinearProgress as LinearProgress } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import { cocoBold, cocoRegular } from '../../styles/constants';
import { useUserProvider } from '../../context/user';

interface Props {
  isFetching: boolean;
  totalCount: number;
  productsCount: number;
  loadMoreProductsHandler: () => void;
}

export default function LoadMore({
  isFetching,
  totalCount,
  productsCount,
  loadMoreProductsHandler,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Category } = languages[currentLanguage];

  const {
    productList: { loadMoreBtnText },
  } = Category;

  const isDisabled: boolean = totalCount === productsCount;

  if (isDisabled) return null;

  return (
    <Stack
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{ width: '100%', pb: '10px' }}
    >
      <LoadingButton
        loading={isFetching}
        disabled={isDisabled}
        onClick={loadMoreProductsHandler}
        sx={{
          width: isMobile ? '60vw' : '10vw',
          padding: '0.7rem 0',
          color: '#232323',
          border: `1px solid #4343`,
          borderRadius: 0,
          textTransform: 'uppercase',
          ...cocoBold,
          ':hover': {
            color: '#fff',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
          },
        }}
      >
        {loadMoreBtnText}
      </LoadingButton>

      <Typography
        variant="body1"
        sx={{
          m: '1rem 0',
          fontSize: '0.6rem',
          color: '#8b8b8b',
          ...cocoRegular,
        }}
      >
        {currentLanguage === 'EN' && (
          <>{`${productsCount} out of ${totalCount} items`}</>
        )}

        {currentLanguage === 'NL' && (
          <>{`${productsCount} van de ${totalCount} artikelen`}</>
        )}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={(productsCount * 100) / totalCount}
        sx={{
          width: isMobile ? '70%' : '30%',
          height: '0.2rem',
          backgroundColor: '#aaaaaa !important', // background color
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#5d5d5d', // foreground color
          },
        }}
      />
    </Stack>
  );
}
