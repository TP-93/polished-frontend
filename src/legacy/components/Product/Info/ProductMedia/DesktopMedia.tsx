// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import FullscreenContainer from '../../FullscreenContainer';

interface Props {
  imageGroups: any;
}

export default function DesktopMedia({ imageGroups }: Props) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isFullscreen, toggleFullscreen] = React.useState<boolean>(false);

  const group: any = imageGroups && imageGroups[0];
  const images = group?.images;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft } = event.currentTarget;
    const newIndex = Math.round(scrollLeft / event.currentTarget.clientWidth);
    setCurrentIndex(newIndex);
  };

  const toggleFullScreenHandler = (index: number) => {
    setCurrentIndex(index);
    toggleFullscreen((prev) => !prev);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          scrollSnapType: 'none',
          '::-webkit-scrollbar': {
            display: 'block !important',
            cursor: 'pointer',
            height: '0.2rem',
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
              onClick={() => toggleFullScreenHandler(currentIndex)}
              sx={{
                flex: '0 0 auto',
                width: 'auto',
                height: '100%',
                position: 'relative',
                scrollSnapAlign: 'start',
                cursor: 'crosshair',
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
                  maxHeight: 'auto',
                }}
              />
            </Box>
          );
        })}
      </Stack>

      {isFullscreen && (
        <FullscreenContainer
          currentImage={currentIndex}
          imageCollection={images}
          alternativeImage={group.url}
          toggleFullscreen={toggleFullScreenHandler}
        />
      )}
    </Box>
  );
}
