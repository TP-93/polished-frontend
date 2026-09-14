// @ts-nocheck
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { isMobileOnly } from 'react-device-detect';

import { getDesignsForProduct_product_stockItems as StockItemInterface } from '../../../apollo/queries/types/getDesignsForProduct';
import { useUserProvider } from '../../../context/user';

import SizeSelectRadio from './SizeSelectRadio';
import { noTablet, noDesktop, cocoRegular } from '../../../styles/constants';

interface Props {
  sizes: (StockItemInterface | null)[] | null;
  selectedSize: string;
  sizeTableImage: string | null;
  setSelectedSize: (name: string) => void;
  setInsufficientStock: (msg: any) => void;
}

export default ({
  sizes,
  selectedSize,
  sizeTableImage,
  setSelectedSize,
  setInsufficientStock,
}: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Product } = languages[currentLanguage];
  const { sizeTitle, sizeTableBtn } = Product;

  const [isSizesModal, toggleSizesModal] = useState(false);

  if (sizes)
    return (
      <SizeBlock>
        <SizesTitles>
          <Title>{sizeTitle}</Title>

          {!isMobileOnly && sizeTableImage && (
            <ImageLink onClick={() => toggleSizesModal(true)}>
              {sizeTableBtn}
            </ImageLink>
          )}
        </SizesTitles>

        <SizesWrapper amount={sizes.length}>
          {sizes.map((stockItem) => {
            if (stockItem) {
              const { size, isInStock, stockMessage } = stockItem;

              return (
                <SizeSelectRadio
                  key={size || ''}
                  isSoldOut={!isInStock}
                  name={size || ''}
                  selected={selectedSize === size}
                  stockMessage={stockMessage}
                  setSelected={setSelectedSize}
                  setInsufficientStock={setInsufficientStock}
                />
              );
            }
            return null;
          })}
        </SizesWrapper>

        {isSizesModal && (
          <SizeTableBackground onClick={() => toggleSizesModal(false)}>
            <SizeTable>
              {sizeTableImage && <SizeTableImage src={sizeTableImage} />}
            </SizeTable>
          </SizeTableBackground>
        )}
      </SizeBlock>
    );
  return null;
};

const SizeBlock = styled.div`
  //height: 2.5vh;
  margin: 30px 0 2% 0;

  @media ${noDesktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3px 0 10px 0;
  }
`;

const SizesTitles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const textStyles = css`
  ${cocoRegular};
  font-size: calc(0.2em + 1vmin);

  @media ${noDesktop} {
    font-size: calc(0.4em + 1vmin);
  }
`;

const Title = styled.p`
  ${textStyles};
  color: #979797;
`;

const ImageLink = styled.p`
  ${textStyles};
  color: #3e6ae1;
  cursor: pointer;
`;

const SizesWrapper = styled.div<{ amount: number }>`
  display: grid;
  //grid-template-rows: 1fr;
  grid-template-columns: repeat(${(p: any) => p.amount}, 1fr);
  width: 100%;
  //height: 2.5vh;
  //min-height: 35px;
`;

const SizeTableBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const SizeTable = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 101;
`;

const SizeTableImage = styled.img`
  height: 100%;
  width: auto;
  max-height: 800px;

  @media ${noDesktop} {
    max-height: 600px;
  }

  @media ${noTablet} {
    max-height: 400px;
  }
`;
