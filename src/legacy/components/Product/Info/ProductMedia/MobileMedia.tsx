// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { IconButton as IconButton } from '@mui/material';

import { Add as AddIcon } from '@mui/icons-material';

import { cocoRegular } from '../../../../styles/constants';
import MobileFullscreen from './MobileFullscreen';

interface Props {
  imageGroups: any;
}

export default function MobileMedia({ imageGroups }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const group: any = imageGroups && imageGroups[0];
  const images = group?.images;

  const handleOpen = () => {
    setOpen(true);

    // @ts-ignore
    document.querySelector('html').style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);

    // @ts-ignore
    document.querySelector('html').style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    const newIndex = Math.round(scrollLeft / event.currentTarget.clientWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          '::-webkit-scrollbar': {
            display: 'block !important',
            cursor: 'pointer',
            height: '2px',
            border: 'none',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#0a0a0a',
          },
        }}
        onScroll={handleScroll}
      >
        {images.map((item: any) => {
          return (
            <Box
              key={item.url}
              sx={{
                flex: '0 0 auto',
                width: '100%',
                height: '100%',
                position: 'relative',
                scrollSnapAlign: 'start',
              }}
            >
              <img
                key={item.url}
                src={item.url}
                alt="Product"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  maxHeight: '100vh',
                }}
              />
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 2,
          color: '#4C4C4C',
          padding: '4px 8px',
          borderRadius: '4px',
          ...cocoRegular,
          fontSize: '0.8rem',
        }}
      >
        {currentIndex + 1}/{images.length}
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
        onClick={handleOpen}
      >
        <AddIcon sx={{ path: { fill: '#4C4C4C' } }} />
      </IconButton>

      <MobileFullscreen open={open} images={images} handleClose={handleClose} />
    </Box>
  );
}
