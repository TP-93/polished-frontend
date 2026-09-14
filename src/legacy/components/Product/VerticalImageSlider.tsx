// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import {
  VerticalArrowTop,
  VerticalArrowBottom,
} from '../common/Buttons/VerticalSlideButtons';
import {
  SlickArrowLeft,
  SlickArrowRight,
} from '../common/Buttons/SliderButtons';

import '../../styles/slick.css';

interface Props {
  imageCollection: any;
  toggleCurrentImage: (id: number) => void;
  vertical?: boolean;
  slidesToShow?: number;
  dots?: boolean;
  size?: string;
}

const settings = (
  vertical: boolean = true,
  slidesToShow: number = 3,
  dots = false,
) => {
  return {
    dots,
    speed: 500,
    centerMode: false,
    vertical,
    infinite: false,
    slidesToShow,
    slidesToScroll: 1,
    /* eslint-disable */
    prevArrow: dots ? undefined : vertical ? (
      <VerticalArrowTop />
    ) : (
      <SlickArrowLeft />
    ),
    nextArrow: dots ? undefined : vertical ? (
      <VerticalArrowBottom />
    ) : (
      <SlickArrowRight />
    ),

    /* eslint-enable */
    variableHeight: true,
  };
};

const VerticalSlider = ({
  dots,
  vertical = true,
  slidesToShow,
  imageCollection,
  toggleCurrentImage,
}: Props) => {
  return (
    <Container>
      <Slider {...settings(vertical, slidesToShow, dots)}>
        {imageCollection.map((image: any, idx: number) => (
          <ImageContainer
            key={image.length * idx}
            onClick={() => {
              toggleCurrentImage(idx);
            }}
          >
            <Image src={image.url} alt="Product Image" />
          </ImageContainer>
        ))}
      </Slider>
    </Container>
  );
};

export default VerticalSlider;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 30%;

  > div {
    max-height: 80vh !important;

    > div {
      max-height: 80vh !important;

      > div {
        max-height: 80vh !important;
      }
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const Image = styled.img`
  display: block;
  width: 50%;
  height: 100%;
  margin: auto;
`;
