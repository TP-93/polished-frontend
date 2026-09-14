// @ts-nocheck
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import Price from '../common/ProductDetails/ProductPrice';
import SliderTitle from '../common/Titles';
import windowWidth from '../../utils/hooks/windowWidth';
import CustomiseButton from '../common/Buttons/CustomizeButton';
import BrokenImageWrapper from '../common/ProductDetails/BrokenImage';
import { cocoBold } from '../../styles/constants';
import { useUserProvider } from '../../context/user';

interface Props {
  imageCollection: any;
}

const AlsoLikeSlider = ({ imageCollection }: Props) => {
  const { width } = windowWidth();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      productInfo: { relativeProductsTitle },
    },
    Category: {
      productList: {
        productCard: { customizeBtn },
      },
    },
  } = languages[currentLanguage];

  const setSlidesNumber = (viewPortWidth: number) => {
    let numberSlides = 5;

    if (viewPortWidth < 475) numberSlides = 2;

    if (viewPortWidth > 475 && viewPortWidth <= 768) numberSlides = 5;

    if (viewPortWidth >= 1024 && viewPortWidth <= 1280) numberSlides = 5;

    return numberSlides;
  };

  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: setSlidesNumber(width),
    slidesToScroll: 1,
    arrows: false,
  };

  if (!imageCollection.length) return null;

  return (
    <Wrapper>
      <SliderTitle title={relativeProductsTitle} />

      <Slider {...settings}>
        {imageCollection.map((item: any) => {
          const { slug, name, price, designs, discountPrice, imageGroups } =
            item;
          const link = `/product/${slug}`;

          const priceData = {
            isDiscount: Boolean(discountPrice),
            discountPrice: discountPrice?.localized || '',
            price,
          };

          const isDesigns = designs?.length > 0;

          const group = imageGroups?.length > 0 && imageGroups[0];
          const { images } = group;
          const image = images?.length > 0 && images[0];
          const isImage = image?.url?.length > 0;

          return (
            <Link to={link} key={slug}>
              <Slide>
                <ImageWrapper>
                  {isImage && <Image src={image.url} />}
                  {!isImage && <BrokenImageWrapper />}
                </ImageWrapper>

                <UserDesignTitle>{name}</UserDesignTitle>

                <PriceWrapper>
                  <Price priceData={priceData} />
                </PriceWrapper>

                {isDesigns && (
                  <ButtonWrapper>
                    <CustomiseButton text={customizeBtn} />
                  </ButtonWrapper>
                )}
              </Slide>
            </Link>
          );
        })}
      </Slider>
    </Wrapper>
  );
};

export default AlsoLikeSlider;

const Wrapper = styled.div`
  padding: 3rem 0;
`;

const Slide = styled.div`
  padding: 1px;
  user-select: none !important;
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: inherit;
  margin: auto;
  transition: 0.8s all ease-out;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1% 0;
`;

const UserDesignTitle = styled.h3`
  padding: 0;
  margin-top: 1%;
  ${cocoBold};
  font-size: calc(0.2em + 1vmin);
  user-select: none;
  color: #000;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
