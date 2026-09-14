// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useUserProvider } from '../../../../context/user';

import {
  grey,
  pink,
  cocoBold,
  cocoRegular,
} from '../../../../styles/constants';

interface Props {
  product: any;
  selectedSize: string;
  userDesignName: string | null;
  checkoutImages: any;
}

const Content = ({
  product,
  selectedSize,
  userDesignName,
  checkoutImages,
}: Props) => {
  const { name, category, price, color, discountPrice } = product;

  const amount = price?.localized;
  const isSingleImage = !checkoutImages?.front || !checkoutImages?.back;
  const productName = userDesignName || name;
  const designName = productName.split(' ')[0];

  const sizeFromRedirect = localStorage.getItem('sizeFromRedirect');
  const designSize = localStorage.getItem('customizedProductSize');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const {
    Product: {
      addToCartModal: { sizeTitle, priceTitle, productColorTitle },
    },
  } = languages[currentLanguage];

  return (
    <AddedProductContainer>
      <ImagesContainer isSingleImage={isSingleImage}>
        {checkoutImages?.front && (
          <Image
            src={`${checkoutImages?.front}?${Date.now()}`}
            alt="product added to cart "
          />
        )}
        {checkoutImages?.back && (
          <Image
            src={`${checkoutImages?.back}?${Date.now()}`}
            alt="product added to cart "
          />
        )}
      </ImagesContainer>

      <Title>{productName}</Title>

      <Info>
        <span>Product</span>
        <span>{category && category.name}</span>
      </Info>

      {color?.name.length > 0 && (
        <Info>
          <span>{productColorTitle}</span>
          <span>{color.name}</span>
        </Info>
      )}

      <Info>
        <span>Design</span>
        <span>{designName}</span>
      </Info>

      <Info>
        <span>{sizeTitle}</span>
        <span>{selectedSize || designSize || sizeFromRedirect}</span>
      </Info>

      <Info>
        <span>{priceTitle}</span>

        {!discountPrice && <span>{amount}</span>}

        {discountPrice && (
          <div>
            <OldPrice>{amount}</OldPrice>
            <NewPrice>{discountPrice?.localized}</NewPrice>
          </div>
        )}
      </Info>
    </AddedProductContainer>
  );
};

export default Content;

const AddedProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2% 1% 10% 1%;
`;

const ImagesContainer = styled.div<{ isSingleImage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  display: block;
  border-radius: 5px;
  height: 25vh;
  //width: auto;
  margin-right: 2%;

  &:last-child {
    margin-right: 0;
  }
`;

const Title = styled.p`
  margin-bottom: 8%;
  ${cocoBold};
  text-transform: uppercase;
  color: #f7f7f7;
  font-size: calc(0.35em + 1vmin);
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  ${cocoRegular};
  color: #f7f7f7;
  font-size: calc(0.45em + 1vmin);

  &:last-child {
    margin-bottom: 0;
  }

  > span:last-child {
    ${cocoBold};
  }
`;

const OldPrice = styled.span`
  margin-right: 4px;
  ${cocoRegular};
  color: ${grey};
  text-decoration: line-through;
  font-size: calc(0.45rem + 1vmin);
`;

const NewPrice = styled.span`
  ${cocoBold};
  color: ${pink};
  font-size: calc(0.45rem + 1vmin);
`;
