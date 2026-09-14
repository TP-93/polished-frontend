// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import Price from './Price';
import Controls from './Controls';
import TrustIndicators from '../../../../common/TrustIndicators';
import ColorSelector from './ColorSelector';
import SizesSelector from './SizesSelector';

import { cocoRegular } from '../../../../../styles/constants';
import BiggerSizePopup from './BiggerSizePopup';

interface Props {
  product: any;
}

export default function MainContent({ product }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    id,
    price,
    stockItems,
    sizeTableImage,
    chooseSizeBigger,
    colorSelectionProducts,
  } = product || {};

  const productName = product?.name;

  const priceData = {
    price,
    isDiscount: Boolean(product?.discountPrice),
    discountPrice: product?.discountPrice?.localized,
  };

  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [isMissingSizeError, setMissingSizeError] =
    React.useState<boolean>(false);

  const [isBiggerSizePopup, toggleBiggerSizePopup] =
    React.useState<boolean>(false);
  const [isBiggerSizePopupTriggered, setBiggerSizePopupTrigger] =
    React.useState<boolean>(false);

  const sizeSelectHandler = (value: string) => {
    const hasBiggerSizes: boolean =
      Boolean(value) && stockItems[stockItems.length - 1].size !== value;

    if (chooseSizeBigger && !isBiggerSizePopupTriggered && hasBiggerSizes) {
      toggleBiggerSizePopup(true);
      setBiggerSizePopupTrigger(true);
    } else {
      setSelectedSize(value);

      setMissingSizeError(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ 'h6, span': { fontSize: isMobile ? '0.75rem' : '1.13rem' } }}
      >
        <Typography
          variant="h6"
          sx={{
            ...cocoRegular,
            color: '#050505',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          {productName}
        </Typography>

        <Price priceData={priceData} priceColor="#454545" />
      </Stack>

      <ColorSelector
        productId={id}
        colorSelectionProducts={colorSelectionProducts}
      />

      <SizesSelector
        sizes={stockItems}
        sizesTable={sizeTableImage}
        selectedSize={selectedSize}
        isMissingSizeError={isMissingSizeError}
        sizeSelectHandler={sizeSelectHandler}
      />

      <Controls
        product={product}
        selectedSize={selectedSize}
        isBiggerSizePopup={isBiggerSizePopup}
        setMissingSizeError={setMissingSizeError}
      />

      <TrustIndicators />

      {isBiggerSizePopup && (
        <BiggerSizePopup toggleBiggerSizePopup={toggleBiggerSizePopup} />
      )}
    </Box>
  );
}
