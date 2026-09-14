// @ts-nocheck
import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import ProductSize from './Size';
import ProductPrice from './Price';
import DeleteProduct from './Delete';
import ProductQuantity from './Quantity';

import { cocoBold, cocoRegular } from '../../../../styles/constants';

interface Props {
  product: any;
  checkoutId: any;
  cartLinesCounter: number;
}

export default function Product({
  product,
  checkoutId,
  cartLinesCounter,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    name,
    price,
    imageGroups,
    stockMessage,
    discountPrice,
    userDesignUrl,
    selectedImageGroupId,
  } = product;

  const productImages: any[] = imageGroups.find(
    (group: any) => group.id === selectedImageGroupId,
  )?.images;

  const frontImageUrl: string = userDesignUrl || productImages[0]?.url;

  const backImageUrl: string = userDesignUrl || productImages[1]?.url;

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ p: '5px 0', borderBottom: '1px solid lightgrey' }}
    >
      <Stack display="flex" flexDirection="row" justifyContent="space-between">
        <Stack
          display="flex"
          flexDirection="row"
          sx={{ flexBasis: isMobile ? '45%' : '30%' }}
        >
          <img
            src={frontImageUrl}
            style={{
              display: 'block',
              width: '50%',
              height: 'auto',
            }}
          />

          <img
            src={backImageUrl}
            style={{ display: 'block', width: '50%', height: 'auto' }}
          />
        </Stack>

        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ flexBasis: isMobile ? '55%' : '70%', p: '0 5px 0 10px' }}
        >
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              variant="body1"
              sx={{
                ...cocoBold,
                color: '#050505',
                fontSize: isMobile ? '0.65rem' : '0.85rem',
              }}
            >
              {name}
            </Typography>

            <ProductPrice price={price} discountPrice={discountPrice} />
          </Stack>

          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexBasis: '30%' }}
            >
              <ProductQuantity product={product} checkoutId={checkoutId} />

              <ProductSize product={product} checkoutId={checkoutId} />
            </Stack>

            <DeleteProduct
              product={product}
              checkoutId={checkoutId}
              cartLinesCounter={cartLinesCounter}
            />
          </Stack>
        </Stack>
      </Stack>

      {stockMessage?.length > 0 && (
        <Typography
          sx={{
            ...cocoRegular,
            mt: '5px',
            color: '#129c10',
            textAlign: 'center',
            fontSize: isMobile ? '0.65rem' : '0.75rem',
          }}
        >
          {stockMessage}
        </Typography>
      )}
    </Stack>
  );
}
