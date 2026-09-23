// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, useMediaQuery } from '@mui/material';

import { ArrowRight } from 'lucide-react';

import { useHistory } from 'react-router-dom';
import { cocoBlack, cocoBold, defaultHomeBg } from '../../../styles/constants';

const useStyles = makeStyles({
  imageContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    maxWidth: '100%',
    backgroundImage: `${defaultHomeBg}`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    '&:before': {
      content: 'jorcustom',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textTransform: 'uppercase',
      ...cocoBlack,
      fontSize: '40px',
      color: '#888',
      textShadow: '1px 1px 20px #777',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -90%)',
  },
  baseOverlay: {
    ...cocoBold,
    textTransform: 'uppercase',
  },
  overlayText: {
    color: '#fff',
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  defaultOverlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#888',
    fontSize: '2rem',
    textShadow: '1px 1px 20px #777',
  },
  image: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  shopLink: {
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '5px',
    lineHeight: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease',
      transformOrigin: 'right center',
    },
  },
});

interface Props {
  imageUrl: string;
  sectionText: string;
  sectionLink: string;
}

export default function Image({ imageUrl, sectionText, sectionLink }: Props) {
  const router = useHistory();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:767px)');

  const overlayStyles = [classes.baseOverlay, classes.overlayText];

  const shopRedirectHandler = () => router.push(sectionLink);

  return (
    <Box
      className={classes.imageContainer}
      sx={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Box
        className={classes.textContainer}
        sx={{ width: isMobile ? '90vw' : '20vw' }}
      >
        <Typography
          variant="h5"
          className={overlayStyles.join(' ')}
          style={{ fontSize: isMobile ? '1.1rem' : '2rem' }}
        >
          {sectionText || ''}
        </Typography>

          <Button
            onClick={shopRedirectHandler}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              height: isMobile ? '36px' : '40px',
              border: '1px solid #fff',
              px: isMobile ? '16px' : '22px',
              borderRadius: 0,
              color: '#fff',
              gap: isMobile ? '8px' : '10px',
              transition: 'background-color 0.25s ease, color 0.25s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              },
              '&:hover p::after': {
                transform: 'scaleX(0)',
              },
            }}
          >
            <ArrowRight
              aria-hidden="true"
              size={isMobile ? 13 : 14}
              strokeWidth={1.5}
            />

            <Typography
              variant="body1"
              className={classes.shopLink}
              sx={{
                ...cocoBold,
                color: '#fff',
                fontSize: isMobile ? '0.6875rem' : '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              Shop now
            </Typography>
          </Button>
      </Box>
    </Box>
  );
}
