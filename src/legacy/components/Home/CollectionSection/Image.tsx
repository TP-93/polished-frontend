// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Button, useMediaQuery } from '@mui/material';


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
              padding: isMobile ? '12px 24px' : '14px 36px',
              border: '2px solid rgba(255, 255, 255, 0.7)',
              borderRadius: 0,
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(4px)',
              ...cocoBold,
              fontWeight: 500,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              whiteSpace: 'nowrap',
              transition: 'all 0.7s ease',
              '&:hover': {
                borderColor: '#fff',
                letterSpacing: '0.4em',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Shop now
          </Button>
      </Box>
    </Box>
  );
}
