// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import { useUserProvider } from '../../../../context/user';

import Price from '../../../common/ProductDetails/ProductPrice';
import ToolLogo from '../../../../assets/images/customize-tool/customizeToolLogo.png';
import NextButton from '../../../common/Buttons/NextButton';
import AsideButtons from './AsideButtons';
import { cocoBold, cocoRegular } from '../../../../styles/constants';

interface Props {
  product: any;
  saveDesign: any;
  isTextEditing: boolean;
  addToCartHandler: () => void;
  setCartProcessError: (value: any) => void;
  toggleSavingProcess: (value: any) => void;
  resetSelectionHandler: () => void;
}

const AsideControls = ({
  product,
  saveDesign,
  isTextEditing,
  addToCartHandler,
  setCartProcessError,
  toggleSavingProcess,
  resetSelectionHandler,
}: Props) => {
  const { size } = useParams<any>();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      addToBagBtn,
      toolControlsBtns,
      addToCartModal: { sizeTitle, priceTitle, productColorTitle },
    },
  } = languages[currentLanguage];

  const {
    name,
    price,
    color: { name: colorName },
    discountPrice: dP,
  } = product;

  const designName = name.split(' ')[0];
  const discountPrice = dP ? dP.localized : '';

  const priceData = {
    price,
    isDiscount: Boolean(discountPrice),
    discountPrice,
  };

  const addToCartAnalyticsEventHandler = (properties: any) => {
    let itemDesign = '';

    if (properties?.designs?.length > 0) {
      const excludeExtension = properties?.designs[0].name
        .split('.')[0]
        .split('_');

      excludeExtension.pop();

      itemDesign = properties?.name?.split(' ')[0];
    }

    // @ts-ignore
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [
          {
            item_name: properties?.name || '',
            item_id: `${properties?.productSku}-${size}`,
            item_group_id: properties?.productSku,
            price: properties?.price?.amount || '',
            item_category: properties?.category?.name || '',
            item_category2: properties?.category?.parent?.name || '',
            item_category3: properties?.color?.name || '',
            item_category4: itemDesign || '',
            item_category5: properties?.id ? 'Customized' : 'Original',
            item_variant: size || '',
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <>
      <Logo src={ToolLogo} alt="customize logo" />

      <AsideButtons
        titles={toolControlsBtns.desktop}
        saveDesign={saveDesign}
        isTextEditing={isTextEditing}
        setCartProcessError={setCartProcessError}
        toggleSavingProcess={toggleSavingProcess}
        resetSelectionHandler={resetSelectionHandler}
      />

      <ParagraphsWrapper>
        <Paragraph>
          <Property>Summary</Property>
        </Paragraph>
        <Paragraph>
          <Property>Product</Property>
          <Value>{name}</Value>
        </Paragraph>
        <Paragraph>
          <Property>{productColorTitle}</Property>
          <Value>{colorName}</Value>
        </Paragraph>
        <Paragraph>
          <Property>Design</Property>
          <Value>{designName}</Value>
        </Paragraph>
        <Paragraph>
          <Property>{sizeTitle}</Property>
          <Value>{size}</Value>
        </Paragraph>
        <Paragraph>
          <Property>{priceTitle}</Property>
          <Value>
            <Price priceData={priceData} priceColor="#f7f7f7" />
          </Value>
        </Paragraph>
      </ParagraphsWrapper>

      <NextBtnWrapper>
        <NextButton
          text={addToBagBtn}
          onClick={() => {
            addToCartAnalyticsEventHandler(product);
            addToCartHandler();
          }}
          isTextEditing={isTextEditing}
        />
      </NextBtnWrapper>
    </>
  );
};

export default AsideControls;

const Logo = styled.img`
  display: block;
  width: 60%;
  height: auto;
  margin: 0 auto;
`;

const ParagraphsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Paragraph = styled.article`
  width: 100%;
  padding: 3% 0;
  border-bottom: 1px solid #f7f7f7;

  &:first-child {
    padding: 0;
    text-transform: uppercase;
  }

  &:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid transparent;
  }

  > * {
    font-size: calc(0.5em + 1vmin);
  }
`;

const Property = styled.h4`
  margin-bottom: 1%;
  ${cocoBold};
  color: #f7f7f7;
  user-select: none;
`;

const Value = styled.div`
  ${cocoRegular};
  color: #f7f7f7;
  user-select: none;
  opacity: 0.7;
`;

const NextBtnWrapper = styled.div`
  width: 100%;
  cursor: pointer;

  @media (max-width: 1360px) {
    > button {
      font-size: calc(0.1em + 1vmin);
    }
  }
`;
