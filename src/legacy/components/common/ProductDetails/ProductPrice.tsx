// @ts-nocheck
import React from 'react';
import { useMediaQuery } from '@mui/material';
import styled, { css } from 'styled-components';

import { pink, black, cocoBold, cocoRegular } from '../../../styles/constants';

interface Price {
  priceData: any;
  priceColor?: string;
}

const ProductPrice = ({ priceData, priceColor }: Price) => {
  const isMobile = useMediaQuery('(max-width:767px)');

  const { isDiscount, discountPrice, price } = priceData;

  // @ts-ignore
  const colorValue = priceColor?.length > 0 ? { color: priceColor } : undefined;

  const priceValue = price?.localized || '';
  const discountValue = discountPrice || '';

  if (isDiscount) {
    return (
      <PriceBlock>
        <OldPrice style={colorValue} isMobile={isMobile}>
          {priceValue}
        </OldPrice>

        <NewPrice isMobile={isMobile}>{discountValue}</NewPrice>
      </PriceBlock>
    );
  }

  return (
    <PriceBlock>
      <RegularPrice style={colorValue} isMobile={isMobile}>
        {priceValue}
      </RegularPrice>
    </PriceBlock>
  );
};

export default ProductPrice;

const PriceBlock = styled.div`
  text-align: left;
`;

const textStyles = css`
  user-select: none;
  font-size: 0.65rem;
`;

const RegularPrice = styled.span<{ isMobile: boolean }>`
  ${textStyles};
  ${cocoRegular};
  font-size: ${({ isMobile }) => (isMobile ? '0.65rem' : '0.75rem')};
  color: ${({ isMobile }) => (isMobile ? '#454545' : black)};
`;

const OldPrice = styled.span<{ isMobile: boolean }>`
  margin-right: 4px;
  ${textStyles};
  ${cocoRegular};
  font-size: ${({ isMobile }) => (isMobile ? '0.65rem' : '0.75rem')};
  color: ${({ isMobile }) => (isMobile ? '#454545' : black)};
  text-decoration: line-through;
`;

const NewPrice = styled.span<{ isMobile: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '0.65rem' : '0.75rem')};
  ${textStyles};
  ${cocoBold};
  color: ${pink};
`;
