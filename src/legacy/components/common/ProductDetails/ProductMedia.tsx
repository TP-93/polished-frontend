// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

interface Props {
  front: string;
  back: string;
}

const ProductMedia = ({ front, back }: Props) => {
  const isMobile = useMediaQuery('(max-width:767px)');

  const [isToggled, toggleUrl] = React.useState<boolean>(false);
  const [currentImage, setCurrentImage] = React.useState<number>(0);

  const touchEndX = React.useRef<number>(0);
  const touchStartX = React.useRef<number>(0);

  const backSrc: any = isToggled && back ? back : front;
  const frontSrc: any = !isToggled && front;

  const isScrollVisible: boolean = front?.length > 0 && back?.length > 0;

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 10) setCurrentImage(1);

    if (touchStartX.current - touchEndX.current < -10) setCurrentImage(0);
  };

  const hideContextMenu = (e: any) => e.preventDefault();
  const showProductOptions = (e: any) => {
    e.stopPropagation();
    toggleUrl(true);
  };
  const hideProductOptions = (e: any) => {
    e.stopPropagation();
    toggleUrl(false);
  };

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        onTouchStart={isScrollVisible ? handleTouchStart : undefined}
        onTouchMove={isScrollVisible ? handleTouchMove : undefined}
        onTouchEnd={isScrollVisible ? handleTouchEnd : undefined}
        onContextMenu={hideContextMenu}
      >
        <img
          src={currentImage === 0 ? front : back}
          alt="Swipable"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            transition: '0.5s ease-in-out',
          }}
        />

        {isScrollVisible && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              background: '#ddd',
              overflow: 'hidden',
              display: 'flex',
              transition: 'transform 0.5s ease-in-out',
              justifyContent: currentImage === 0 ? 'flex-start' : 'flex-end',
            }}
          >
            <div
              style={{
                width: '50%',
                height: '100%',
                background: '#000',
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Box
      onMouseEnter={showProductOptions}
      onMouseLeave={hideProductOptions}
      onContextMenu={hideContextMenu}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        userSelect: 'none',
        overflow: 'hidden',
        transition: '0.8s all ease-out',
      }}
    >
      <img
        alt="product"
        src={frontSrc || backSrc}
        style={{
          display: 'block',
          width: '100%',
          height: 'inherit',
          transition: '0.8s all ease-out',
        }}
      />
    </Box>
  );
};

export default ProductMedia;
