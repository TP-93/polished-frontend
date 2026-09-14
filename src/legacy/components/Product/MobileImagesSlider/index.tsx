// @ts-nocheck
import styled from 'styled-components';
import { ZoomIn } from 'styled-icons/boxicons-regular';
import { useSwipeable } from 'react-swipeable';
import React, { useRef, useState, useEffect } from 'react';

import { tablet } from '../../../styles/constants';
import FullscreenContainer from '../FullscreenContainer';
import { getMainImageIndexHandler } from '../../../utils/sliderUtils';

interface Props {
  imageSide: any;
  alternativeImage: any;
  imageCollection: any;
}

export default ({ imageSide, alternativeImage, imageCollection }: Props) => {
  const sliderRef: any = useRef(null);

  const { ref } = useSwipeable({
    onSwipedLeft: () => {
      if (currentImage + 1 <= imageCollection.length - 1)
        setCurrentImage((prev: any) => prev + 1);
    },
    onSwipedRight: () => {
      if (currentImage - 1 >= 0) setCurrentImage((prev: any) => prev - 1);
    },
  }) as { ref: typeof sliderRef };

  const [imageHeight, setImageHeight] = useState<number>(
    window.innerHeight * 0.9,
  );
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const isImages = imageCollection && imageCollection?.length > 0;
  const currentImageUrl = imageCollection[currentImage]?.url;

  const calcPreviewH = () => {
    const screenH: number = window.innerHeight;
    const height: number = (screenH * 88) / 100;

    setImageHeight(height);
  };

  const getMainImageIndex = () => {
    const imageIndex = getMainImageIndexHandler(imageCollection, imageSide);

    setCurrentImage(imageIndex);
  };

  useEffect(() => {
    calcPreviewH();
    getMainImageIndex();
  }, []);

  useEffect(() => {
    ref(sliderRef.current);
  });

  const toggleFullscreenHandler = (currentImageId: number) => {
    setCurrentImage(currentImageId);
    setFullscreen((prev: boolean) => !prev);
  };

  return (
    <SliderContainer ref={sliderRef}>
      <Preview bg={currentImageUrl || alternativeImage} height={imageHeight} />

      <Shadow />

      {isImages && (
        <ThumbnailsWrapper>
          {imageCollection.map((obj: any, idx: number) => (
            <Thumbnail
              key={obj?.url}
              bg={obj?.url}
              onClick={() => {
                setCurrentImage(idx);
              }}
            />
          ))}
        </ThumbnailsWrapper>
      )}

      {(isImages || alternativeImage) && (
        <ZoomIconWrapper
          onClick={() => {
            toggleFullscreenHandler(currentImage);
          }}
        >
          <ZoomIn />
        </ZoomIconWrapper>
      )}

      <Dots>
        {imageCollection.map((obj: any, idx: number) => (
          <Dot
            key={obj?.url?.length * idx}
            onClick={() => {
              setCurrentImage(idx);
            }}
            isActive={currentImage === idx}
          />
        ))}
      </Dots>

      {isFullscreen && (
        <FullscreenContainer
          currentImage={currentImage}
          alternativeImage={alternativeImage}
          imageCollection={imageCollection}
          toggleFullscreen={toggleFullscreenHandler}
        />
      )}
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  bottom: -30px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: #2c2c2e;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.16);
`;

const Preview = styled.div<{ bg: string; height: any }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background-image: url(${({ bg }) => bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.3s ease-in-out;

  @media (min-width: 768px) and (max-width: 1024px) {
    background-size: contain;
  }
`;

const ZoomIconWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 5px;
  padding: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 10px 10px 20px #00000029;
  cursor: pointer;

  > svg {
    width: 25px;

    > path {
      fill: lightgrey;
    }
  }
`;

const ThumbnailsWrapper = styled.div`
  position: absolute;
  bottom: 3%;
  left: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  max-height: 280px;

  @media ${tablet} {
    max-height: 400px;
  }
`;

const Thumbnail = styled.div<{ bg: string }>`
  min-width: 60px;
  min-height: 75px;
  margin-bottom: 8px;
  border-radius: 15px;
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid gray;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${tablet} {
    width: 100px;
    height: 110px;
  }
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%, 0px);
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (!isActive ? '#333333' : '#fff')};
  opacity: 0.95;
  cursor: pointer;
  border: ${({ isActive }) =>
    !isActive ? '1 px solid transparent' : '1px solid grey'};

  &:last-child {
    margin-right: 0;
  }
`;
