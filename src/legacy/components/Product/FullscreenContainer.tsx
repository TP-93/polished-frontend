// @ts-nocheck
import { Cross } from 'styled-icons/entypo';
// @ts-ignore
import ZoomPanPinch from 'react-responsive-pinch-zoom-pan';
import styled, { css } from 'styled-components';
import { ChevronLeft, ChevronRight } from 'styled-icons/boxicons-regular';
import React, { useEffect, useState } from 'react';

import Magnifier from '../../assets/images/customize-tool/magnifier70x70.svg.tsx';
import { noDesktop } from '../../styles/constants';
import {
  verticalAnimation,
  horizontalForwardAnimation,
  horizontalBackwardAnimation,
} from './DesktopImagesSlider/animation';

interface Props {
  currentImage: number;
  imageCollection: any;
  alternativeImage?: any;
  toggleFullscreen: (currentImage: number) => void;
}

const FullscreenContainer = ({
  currentImage,
  imageCollection,
  toggleFullscreen,
  alternativeImage,
}: Props) => {
  const [imageId, setImageId] = useState<number>(currentImage);

  useEffect(() => {
    document.body.style.position = 'fixed';
    document.body.style.inset = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const isImages = imageCollection.length > 0;
  const isPrevBtn = imageId - 1 >= 0;
  const isNextBtn = isImages && imageId !== imageCollection.length - 1;

  const prevSlideHandler = () => {
    if (imageId - 1 >= 0) setImageId((prev: any) => prev - 1);
  };

  const nextSlideHandler = () => {
    if (imageId + 1 < imageCollection.length)
      setImageId((prev: any) => prev + 1);
  };

  return (
    <FullScreenWrapper>
      <FullScreenImageWrapper>
        <ZoomPanPinch maxScale={4} zoomButtons={false}>
          <FullScreenImage
            src={isImages ? imageCollection[imageId].url : alternativeImage}
          />
        </ZoomPanPinch>

        <ViewControls>
          {isPrevBtn && (
            <PrevControl onClick={prevSlideHandler}>
              <PrevIcon />
            </PrevControl>
          )}

          {!isPrevBtn && <EmptyControl />}

          <ExitControl
            onClick={() => {
              toggleFullscreen(imageId);
            }}
          >
            <ExitIcon />
          </ExitControl>

          {isNextBtn && (
            <NextControl onClick={nextSlideHandler}>
              <NextIcon />
            </NextControl>
          )}

          {!isNextBtn && <EmptyControl />}
        </ViewControls>
      </FullScreenImageWrapper>
    </FullScreenWrapper>
  );
};

export default FullscreenContainer;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 30000;
  background-color: #fff;
  overflow-y: hidden;
`;

const FullScreenImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const FullScreenImage = styled.div<{ src: any }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: url(${Magnifier}), auto !important;

  @media ${noDesktop} {
    height: 80vh;
  }
`;

const ViewControls = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;

  @media ${noDesktop} {
    bottom: 16%;
    width: 250px;
  }
`;

const controlStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  overflow: hidden;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgb(54 54 54 / 15%);
  transition: background 0.15s ease-in-out, opacity 0.15s ease-in-out,
    transform 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const EmptyControl = styled.div`
  width: 45px;
  height: 45px;
`;

const PrevControl = styled.div`
  ${controlStyles};

  &:hover {
    svg {
      animation: ${horizontalBackwardAnimation} 0.5s ease-in-out backwards;
    }
  }
`;

const NextControl = styled.div`
  ${controlStyles};

  &:hover {
    svg {
      animation: ${horizontalForwardAnimation} 0.5s ease-in-out forwards;
    }
  }
`;

const ExitControl = styled.div`
  ${controlStyles};
  width: 55px;
  height: 55px;

  &:hover {
    svg {
      animation: ${verticalAnimation} 0.5s ease-in-out forwards;
    }
  }
`;

const iconStyles = css`
  position: absolute;
  width: 40px;
  height: 40px;

  path {
    fill: #8c8c8c;
  }
`;

const PrevIcon = styled(ChevronLeft)`
  ${iconStyles};
`;
const NextIcon = styled(ChevronRight)`
  ${iconStyles};
`;
const ExitIcon = styled(Cross)`
  ${iconStyles};
`;
