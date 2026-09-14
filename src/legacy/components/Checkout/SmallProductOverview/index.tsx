// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { OrderLine } from '../../../interfaces/product';
import { useUserProvider } from '../../../context/user';

import {
  black,
  cocoBold,
  cocoRegular,
  pink,
  desktop,
} from '../../../styles/constants';

export default ({
  products,
  openShoppingBag,
}: {
  products: OrderLine[];
  openShoppingBag: () => void;
}) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Checkout } = languages[currentLanguage];
  const { sections } = Checkout;

  return (
    <Overview>
      <Title>{sections.shoppingCart.title}</Title>
      {products.map(
        ({
          name,
          size,
          cartId,
          quantity,
          imageGroups,
          userDesignUrl,
          selectedImageGroupId,
          lineTotalPrice,
        }: OrderLine) => {
          let imageUrl = imageGroups[0].url;
          if (userDesignUrl) imageUrl = userDesignUrl;
          else {
            const found = imageGroups.find(
              (group) => group.id === selectedImageGroupId,
            );

            if (found) imageUrl = found.url;
          }

          return (
            <ProductRow key={cartId}>
              <ProductData>
                <Img src={imageUrl} alt="Hoodie" />
                {quantity}x &nbsp;
                {name}, &nbsp;
                {size}
              </ProductData>
              <ProductPrice>
                <Price>{lineTotalPrice}</Price>
              </ProductPrice>
            </ProductRow>
          );
        },
      )}
      <ChangeBtn type="button" onClick={openShoppingBag} role="none">
        {'>'} {sections.shoppingCart.changeLink}
      </ChangeBtn>
    </Overview>
  );
};

const Title = styled.h2`
  ${cocoBold};
  font-size: 14px;
  color: ${black};
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const Overview = styled.div`
  margin-bottom: 20px;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${cocoRegular};
  color: ${black};
  text-transform: uppercase;
  min-height: 50px;
  font-size: 12px;

  @media ${desktop} {
    font-size: 14px;
  }
`;

const ProductData = styled.div`
  display: flex;
  align-items: center;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 40px;
  height: auto;
  margin-right: 20px;
  margin-top: -3px;
`;

const Price = styled.span`
  font-size: 12px;
  @media ${desktop} {
    font-size: 14px;
  }
`;

const ChangeBtn = styled.button`
  border: none;
  background: none;
  ${cocoBold};
  font-size: 12px;
  color: ${pink};
  text-decoration: underline;
  padding: 0;
  cursor: pointer;
  @media ${desktop} {
    font-size: 14px;
  }
`;
