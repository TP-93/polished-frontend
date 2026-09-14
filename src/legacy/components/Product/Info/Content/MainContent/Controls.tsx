// @ts-nocheck
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useQuery, useMutation, useApolloClient } from 'react-apollo';

import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMediaQuery } from '@mui/material';

import { cocoBold } from '../../../../../styles/constants';
import {
  createCheckout,
  addCheckoutLine,
} from '../../../../../apollo/mutations/checkout';
import customizeIcon from '../../../../../assets/images/customize-tool/customize_icon.png';
import { getCheckout } from '../../../../../apollo/queries/checkout';
import { useUserProvider } from '../../../../../context/user';
import { GUEST_TOKEN_NAME } from '../../../../../constants';

interface Props {
  product: any;
  selectedSize: string;
  isBiggerSizePopup: boolean;
  setMissingSizeError: (status: boolean) => void;
}

export default function Controls({
  product,
  selectedSize,
  isBiggerSizePopup,
  setMissingSizeError,
}: Props) {
  const client = useApolloClient();
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const isMobile = useMediaQuery('(max-width:767px)');

  const router = useHistory();
  const { id, slug } = useParams<any>();

  const {
    dispatch,
    state: { currency, languages, currentLanguage: lang },
  } = useUserProvider();

  const {
    Product: { customizeBtn, addToBagBtn },
  } = languages[lang];

  const { id: productId, imageGroups } = product;

  const selectedImageGroupId = imageGroups && imageGroups[0]?.id;

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
            item_id: `${properties?.productSku}-${selectedSize}`,
            item_group_id: properties?.productSku,
            price: properties?.price?.amount || '',
            item_category: properties?.category?.name || '',
            item_category2: properties?.category?.parent?.name || '',
            item_category3: properties?.color?.name || '',
            item_category4: itemDesign || '',
            item_category5: 'Original',
            item_variant: selectedSize || '',
            quantity: 1,
          },
        ],
      },
    });
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

  const { data: checkoutData, loading: isCheckoutLoading } = useQuery(
    getCheckout,
    {
      fetchPolicy: 'network-only',
      variables: {
        lang,
        token,
        currency,
      },
    },
  );

  const [addProductLineRequest, { loading: isLineLoading }] = useMutation(
    addCheckoutLine,
    {
      refetchQueries: ['Checkout'],
      onCompleted: () => {
        addToCartAnalyticsEventHandler(product);

        openCartDrawerHandler();
      },
      onError: (err: any) => {
        Swal.fire({
          toast: true,
          icon: 'error',
          title: err?.message || 'Something went wrong...',
          position: 'top',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
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
            client.writeQuery({
              query: getCheckout,
              data: { checkout },
              variables: { token: checkout.token },
            });

            openCartDrawerHandler();
          }
        }
      },
    },
  );

  const addToCartHandler = () => {
    if (selectedSize.length) {
      const checkoutId = checkoutData?.checkout?.id;

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
    }

    if (!selectedSize.length) {
      setMissingSizeError(true);
    }
  };

  const customizePageRedirectHandler = () => {
    if (selectedSize.length) {
      if (id) router.push(`/product-customize-edit/${id}/${selectedSize}`);

      if (slug)
        router.push(`/product-customize-create/${slug}/${selectedSize}`);
    }

    if (!selectedSize.length) {
      setMissingSizeError(true);
    }
  };

  return (
    <Box sx={{ p: isMobile ? '0.5rem 0 0 0' : '0.5rem 0 3rem 0' }}>
      <LoadingButton
        fullWidth
        loading={isLineLoading || isCheckoutLoading || isCheckoutCreating}
        onClick={addToCartHandler}
        sx={{
          mb: '1rem',
          padding: '0.5rem',
          height: 'calc(2rem + 1vmax)',
          color: '#fff',
          fontSize: isMobile ? '0.75rem' : '0.9rem',
          boxShadow: '10px 10px 20px #00000040',
          background: isBiggerSizePopup
            ? '#fff'
            : 'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
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

      {product?.designs?.length > 0 && (
        <Button
          fullWidth
          onClick={customizePageRedirectHandler}
          sx={{
            height: 'calc(2rem + 1vmax)',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem',
            color: '#000',
            fontSize: isMobile ? '0.75rem' : '0.9rem',
            background: 'none',
            border: '1px solid #C6C6C8',
            borderRadius: 0,
            verticalAlign: 'center',
            textAlign: 'center',
            textTransform: 'uppercase',
            ...cocoBold,
          }}
        >
          <img
            src={customizeIcon}
            alt="customize"
            style={{ width: '1.2rem', marginRight: '10px' }}
          />
          <span>{customizeBtn}</span>
        </Button>
      )}
    </Box>
  );
}
