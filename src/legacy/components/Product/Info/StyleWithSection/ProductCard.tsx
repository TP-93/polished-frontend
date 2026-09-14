// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useLazyQuery, useMutation } from 'react-apollo';

import LoadingButton from '@mui/lab/LoadingButton';

import { useHistory } from 'react-router-dom';
import Sizes from './Sizes';
import Price from '../../../common/ProductDetails/ProductPrice';
import { cocoBold } from '../../../../styles/constants';
import ProductCardLabel from '../../../common/ProductDetails/ProductCardLabel';
import { useUserProvider } from '../../../../context/user';
import { GUEST_TOKEN_NAME } from '../../../../constants';
import { validateCheckoutExistence } from '../../../../apollo/queries/checkout';
import {
  addCheckoutLine,
  createCheckout,
} from '../../../../apollo/mutations/checkout';
import ProductMedia from '../../../common/ProductDetails/ProductMedia';

const token = localStorage.getItem(GUEST_TOKEN_NAME);
interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  const router = useHistory();

  const {
    dispatch,
    state: { currency, languages, currentLanguage: lang },
  } = useUserProvider();

  const {
    Product: { addToBagBtn },
  } = languages[lang];

  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [isMissingSize, setMissingSizeError] = React.useState<boolean>(false);

  const {
    id: productId,
    new: newLabel,
    name,
    slug,
    price,
    stockItems,
    imageGroups,
    blackFriday: blackFridayLabel,
    discountPrice,
    salePercentValue: saleLabel,
  } = product;

  const selectedImageGroupId = imageGroups && imageGroups[0]?.id;

  const priceData = {
    price,
    isDiscount: Boolean(discountPrice),
    discountPrice: discountPrice?.localized || '',
  };

  const views = { front: '', back: '' };

  if (imageGroups?.length) {
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

  const selectSizeHandler = (size: string) => {
    setSelectedSize(size);

    if (isMissingSize) setMissingSizeError(false);
  };

  const openCartDrawerHandler = () => {
    dispatch({
      type: 'TRIGGER_DRAWER',
      payload: {
        type: 'cart',
        open: true,
      },
    });
  };

  const [addProductLineRequest, { loading: isLineLoading }] = useMutation(
    addCheckoutLine,
    {
      refetchQueries: ['Checkout'],
      onCompleted: () => {
        openCartDrawerHandler();
      },
    },
  );

  const [createCheckoutRequest, { loading: isCheckoutCreating }] = useMutation(
    createCheckout,
    {
      refetchQueries: ['Checkout'],
      onCompleted: (data) => {
        if (data?.checkoutCreate) {
          const { checkout } = data.checkoutCreate;

          if (checkout) {
            openCartDrawerHandler();
          }
        }
      },
    },
  );

  const [validateCheckoutExistenceRequest, { loading: isCheckoutLoading }] =
    useLazyQuery(validateCheckoutExistence, {
      fetchPolicy: 'network-only',
      variables: {
        lang,
        token,
        currency,
      },
      onCompleted: (data) => {
        const checkoutId = data?.checkout?.id;

        if (checkoutId) {
          const productLinePayload = {
            lang,
            token,
            currency,
            checkoutId,
            lines: [
              {
                size: selectedSize,
                quantity: 1,
                productId,
                userDesignId: undefined,
                selectedImageGroupId,
              },
            ],
          };

          addProductLineRequest({
            variables: {
              ...productLinePayload,
            },
          });
        }

        if (!checkoutId) {
          const checkoutPayload = {
            lang,
            currency,
            input: {
              token,
              lines: [
                {
                  size: selectedSize,
                  quantity: 1,
                  productId,
                  userDesignId: undefined,
                  selectedImageGroupId,
                },
              ],
            },
          };

          createCheckoutRequest({
            variables: {
              ...checkoutPayload,
            },
          });
        }
      },
    });

  const addToCartHandler = () => {
    if (selectedSize.length) {
      validateCheckoutExistenceRequest();
    }

    if (!selectedSize.length) {
      setMissingSizeError(true);
    }
  };

  const redirectHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.localName === 'img') {
      const linkPath: string = `/product/${slug}`;

      router.push(linkPath);
    }
  };

  return (
    <CardWrapper onClick={redirectHandler}>
      <CardContent>
        {newLabel && <ProductCardLabel type={1} text="NEW" alignTo="left" />}

        {blackFridayLabel && (
          <ProductCardLabel type={0} text="Black Friday" alignTo="left" />
        )}

        {saleLabel && (
          <ProductCardLabel type={2} text={`${saleLabel}%`} alignTo="right" />
        )}

        <ProductMedia front={views?.front} back={views?.back} />

        <Sizes
          sizes={stockItems}
          selectedSize={selectedSize}
          isMissingSize={isMissingSize}
          setSelectedSize={selectSizeHandler}
        />

        <LoadingButton
          loading={isLineLoading || isCheckoutLoading || isCheckoutCreating}
          variant="contained"
          fullWidth
          onClick={addToCartHandler}
          sx={{
            padding: '0.5rem 0.7rem',
            fontSize: '0.5rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoBold,
            svg: {
              color: '#fff',
              path: { color: '#fff', fill: '#fff' },
            },
          }}
        >
          {addToBagBtn}
        </LoadingButton>

        <CardInfo>
          <CardTitle>{name}</CardTitle>

          <PriceWrapper>
            <Price priceData={priceData} />
          </PriceWrapper>
        </CardInfo>
      </CardContent>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
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
  padding: 0.3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardTitle = styled.h3`
  padding: 0;
  margin-top: 1%;
  ${cocoBold};
  font-size: 0.6rem;
  user-select: none;
  color: #000;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1% 0;
`;
