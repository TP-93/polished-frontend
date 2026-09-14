// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';

import {
  pink,
  black,
  cocoBold,
  cocoRegular,
  raisinBlack,
} from '../../../../../styles/constants';

interface IPrice {
  priceData: any;
  priceColor?: string;
}

export default function Price({ priceData, priceColor }: IPrice) {
  const { isDiscount, discountPrice, price } = priceData;

  // @ts-ignore
  const colorValue = priceColor?.length > 0 ? { color: priceColor } : undefined;

  const priceValue = price?.localized || '';
  const discountValue = discountPrice || '';

  if (isDiscount) {
    return (
      <PriceBlock>
        <OldPrice style={colorValue}>{priceValue}</OldPrice>
        <NewPrice>{discountValue}</NewPrice>
      </PriceBlock>
    );
  }

  return (
    <PriceBlock>
      <RegularPrice style={colorValue}>{priceValue}</RegularPrice>
    </PriceBlock>
  );
}

const PriceBlock = styled.div`
  text-align: left;
`;

const textStyles = css`
  user-select: none;
  ${cocoRegular};
  font-size: 0.7rem;
  font-weight: 700;
`;

const RegularPrice = styled.span`
  ${textStyles};
  color: ${black};
`;

const OldPrice = styled.span`
  margin-right: 4px;
  ${textStyles};
  color: ${raisinBlack};
  text-decoration: line-through;
`;

const NewPrice = styled.span`
  ${textStyles};
  ${cocoBold};
  color: ${pink};
`;
