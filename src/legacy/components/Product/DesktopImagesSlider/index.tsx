// @ts-nocheck
import styled from 'styled-components';
import { ZoomIn } from 'styled-icons/boxicons-regular';
import React, { useState, useEffect } from 'react';

import BrokenImage from '../../common/ProductDetails/BrokenImage';
import VerticalSlider from '../VerticalImageSlider';
import FullscreenContainer from '../FullscreenContainer';
import { getMainImageIndexHandler } from '../../../utils/sliderUtils';

interface Props {
  imageGroups: any;
}

const DesktopImageSlider = ({ imageGroups }: Props) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isFullscreen, toggleFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const group: any = imageGroups && imageGroups[0];
    const images = group?.images;
    const imageSide = group?.imageSide;

    const imageIndex = getMainImageIndexHandler(images, imageSide);

    setCurrentImage(imageIndex);
  }, []);

  const toggleCurrentImage = (id: number) => setCurrentImage(id);

  const toggleFullScreenHandler = (image: number) => {
    setCurrentImage(image);
    toggleFullscreen((prev) => !prev);
  };

  const group: any = imageGroups && imageGroups[0];
  const images = group?.images;

  const isGroupUrl = group && group.url;
  const isImagesExist = images && images?.length > 0;
  const isCurrentImageExist = images && images[currentImage]?.url;

  return (
    <ImagesWrapper>
      {isImagesExist && (
        <VerticalSlider
          imageCollection={group?.images}
          toggleCurrentImage={toggleCurrentImage}
        />
      )}

      <BigImageContainer>
        {(isImagesExist || isGroupUrl) && (
          <ZoomIconWrapper
            onClick={() => toggleFullScreenHandler(currentImage)}
          >
            <ZoomIn />
          </ZoomIconWrapper>
        )}

        {isCurrentImageExist && (
          <Image src={images[currentImage]?.url} alt="Big Product Image" />
        )}

        {!isCurrentImageExist && isGroupUrl && <Image src={group.url} />}

        {!isCurrentImageExist && !isGroupUrl && <BrokenImage />}
      </BigImageContainer>

      {isFullscreen && (
        <FullscreenContainer
          currentImage={currentImage}
          imageCollection={isImagesExist ? images : []}
          alternativeImage={group.url}
          toggleFullscreen={toggleFullScreenHandler}
        />
      )}
    </ImagesWrapper>
  );
};

export default DesktopImageSlider;

const ImagesWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`;

const BigImageContainer = styled.div`
  position: relative;
  width: 52%;
`;

const ZoomIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border: 1px solid lightgrey;
  border-radius: 50%;
  background-color: white;
  box-shadow: 10px 10px 20px #00000029;
  cursor: pointer;

  & > svg {
    width: 25px;

    & > path {
      fill: lightgrey;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
