// @ts-nocheck
import React from 'react';

import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

import { makeStyles } from '@mui/styles';
import { Stack as Stack } from '@mui/material';
import { Button as Button } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { useMediaQuery as useMediaQuery } from '@mui/material';

import { Box as Box } from '@mui/material';
import { cocoBold } from '../../styles/constants';
import { useUserProvider } from '../../context/user';

const useStyles = makeStyles({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopLink: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '1px',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease',
    },
  },
});

interface Props {
  changeCurrentComponentHandler: (name: string) => any;
}

export default function WelcomeTitle({ changeCurrentComponentHandler }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const classes = useStyles();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { specialEvents } = languages[currentLanguage];
  const { blackFriday } = specialEvents;

  const { welcome } = blackFriday;

  const clickHandler = () => {
    changeCurrentComponentHandler('register');
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        className={classes.textContainer}
        sx={{ width: isMobile ? '90vw' : '20vw' }}
      >
        <Typography
          variant="h5"
          sx={{
            ...cocoBold,
            color: '#fff',
            fontSize: isMobile ? '1.1rem' : '2rem',
          }}
        >
          {welcome.title1}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            ...cocoBold,
            color: '#fff',
            fontSize: isMobile ? '1.1rem' : '2rem',
          }}
        >
          {welcome.title2}
        </Typography>

        <Button
          onClick={clickHandler}
          sx={{
            zIndex: 20,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '50%' : '75%',
            outline: '1px solid transparent',
            border: `1px solid #fff`,
            p: '0.3rem 0',
            mt: '20px',
            borderRadius: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(2px)',
            '&:hover': {
              outline: '1px solid #fff',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover p::after': {
              transform: 'translateX(101%)',
            },
          }}
        >
          {!isMobile && (
            <ArrowForwardIcon
              sx={{
                mr: '0.5rem',
                fill: '#fff',
                width: '1.1rem',
              }}
            />
          )}

          <Typography
            variant="body1"
            className={classes.shopLink}
            sx={{
              ...cocoBold,
              color: '#fff',
              fontSize: isMobile ? '0.6rem' : '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            {welcome.btnText}
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}
