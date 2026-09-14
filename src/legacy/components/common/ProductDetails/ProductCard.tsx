// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router';
import { Typography, useMediaQuery } from '@mui/material';

import { useUserProvider } from '../../../context/user';

import Price from './ProductPrice';
import { extractId } from '../../../utils/idUtils';
import CustomiseButton from '../Buttons/CustomizeButton';
import ProductCardLabel from './ProductCardLabel';

import { cocoBold } from '../../../styles/constants';
import ProductMedia from './ProductMedia';

interface Props {
  sessionStorageInfo?: any;
  discount: boolean;
  initData: any;
  customizedProducts?: boolean;
}

const ProductCard = ({
  sessionStorageInfo,
  initData,
  customizedProducts,
}: Props) => {
  const router = useHistory();

  const isMobile = useMediaQuery('(max-width:767px)');

  const { designs, __typename, imageGroups } = initData;

  const isDesign = __typename === 'UserDesign';
  const isDesigns = designs?.length > 0;
  const isProduct = __typename === 'Product';

  const designId = customizedProducts ? extractId(initData.id) : null;
  const designName = customizedProducts ? initData.name : null;

  const product = isDesign ? initData.product : initData;

  const {
    new: newLabel,
    name,
    slug,
    price,
    blackFriday: blackFridayLabel,
    discountPrice,
    salePercentValue: saleLabel,
  } = product;

  const priceData = {
    price,
    isDiscount: Boolean(discountPrice),
    discountPrice: discountPrice?.localized || '',
  };

  const views = { front: '', back: '' };

  if (isDesign && initData?.customizedDesigns?.length) {
    views.front = initData.customizedDesigns[0].customizedPngDesign.url || '';
    views.back = initData.customizedDesigns[0].customizedPngDesign.url || '';
  }

  if (isProduct && imageGroups?.length) {
    if (imageGroups[0]) {
      const { url, images, imageSide } = imageGroups[0];

      const isFront = imageSide === 'A_1';
      const isBack = imageSide === 'A_2';
      const isLifeStyle = imageSide === 'A_3';

      views.front = url;

      if (!images?.length) {
        views.back = url;
      }

      if (isLifeStyle && images[2]) {
        views.back = images[2].url;
      }

      if (isFront && images[1]) {
        views.back = images[1].url;
      }

      if (isBack && images[0]) {
        views.back = images[0].url;
      }
    }
  }

  const redirectHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    sessionStorage.setItem(
      'selected_product',
      JSON.stringify({
        ...sessionStorageInfo,
      }),
    );
    // , scrollY: window.scrollY

    const linkPath: string = designId
      ? `/my-designs/${designId}`
      : `/product/${slug}`;

    router.push(linkPath);
  };

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Category: {
      productList: {
        productCard: { userDesignTitleText, customizeBtn },
      },
    },
  } = languages[currentLanguage];

  if (!initData) return null;

  return (
    <CardWrapper id={initData.id} onClick={redirectHandler}>
      <CardContent>
        {newLabel && <ProductCardLabel type={1} text="NEW" alignTo="left" />}

        {blackFridayLabel && (
          <ProductCardLabel
            type={0}
            text="Black Friday"
            alignTo={newLabel ? 'right' : 'left'}
          />
        )}

        {!(newLabel && blackFridayLabel) && saleLabel && (
          <ProductCardLabel type={2} text={`${saleLabel}%`} alignTo="right" />
        )}

        <ProductMedia front={views?.front} back={views?.back} />

        <CardInfo>
          <Typography
            variant="h3"
            sx={{
              mt: '0.3rem',
              ...cocoBold,
              fontSize: isMobile ? '0.63rem' : '0.75rem',
              userSelect: 'none',
              color: '#000',
              textAlign: 'center',
              whiteSpace: 'pre-wrap',
              width: '100%',
              textOverflow: 'ellipsis',
              textTransform: 'uppercase',
              overflow: 'hidden',
            }}
          >
            {designName || name}
          </Typography>

          {customizedProducts && name && (
            <Typography
              variant="h3"
              sx={{
                m: 0,
                p: 0,
                ...cocoBold,
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                color: '#000',
                userSelect: 'none',
              }}
            >
              {userDesignTitleText}
              <ProductName>{` ${name}`}</ProductName>
            </Typography>
          )}

          <PriceWrapper>
            <Price priceData={priceData} />
          </PriceWrapper>

          {!isDesigns && <EmptyMock />}

          {isDesigns && <CustomiseButton text={customizeBtn} />}
        </CardInfo>
      </CardContent>
    </CardWrapper>
  );
};

export default ProductCard;

const CardWrapper = styled.div`
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  position: relative;
  height: auto;
  padding: 1px;
  cursor: pointer;
  user-select: none !important;
`;

const CardContent = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: inherit;
  user-select: none !important;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ProductName = styled.span`
  text-decoration: underline;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1% 0;
`;

const EmptyMock = styled.div`
  min-height: 20px;
`;
