// @ts-nocheck
import React from 'react';

import { Select as Select } from '@mui/material';
import { MenuItem as MenuItem } from '@mui/material';

import { useMutation } from 'react-apollo';

import Swal from 'sweetalert2';
import { useUserProvider } from '../../../../context/user';
import { GUEST_TOKEN_NAME } from '../../../../constants';
import { updateCheckoutLine } from '../../../../apollo/mutations/checkout';
import { cocoRegular } from '../../../../styles/constants';

const mockArray: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

interface Props {
  product: any;
  checkoutId: any;
}

export default function ProductQuantity({ product, checkoutId }: Props) {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, languages, currentLanguage: lang },
  } = useUserProvider();

  const {
    Product: { insufficientStock },
  } = languages[lang];

  const {
    size,
    cartId,
    quantity,
    productId,
    stockItems,
    userDesignId,
    selectedImageGroupId,
  } = product || {};

  const [updateProductLineQuantityRequest, _] = useMutation(
    updateCheckoutLine,
    {
      refetchQueries: ['Checkout'],
      onError: () => {},
      onCompleted: () => {},
    },
  );

  const updateProductSizeHandler = async (event: any) => {
    const {
      target: { value: newQuantity },
    } = event;

    if (checkoutId) {
      const stockItem = stockItems.find((i: any) => i.size === size);

      if (stockItem) {
        if (stockItem.quantity < newQuantity) {
          return Swal.fire({
            toast: true,
            icon: 'warning',
            title: insufficientStock,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }

        const variables = {
          lang,
          token,
          currency,
          checkoutId,
          lines: [
            {
              size,
              lineId: cartId,
              quantity: Number(newQuantity) || 1,
              productId,
              userDesignId,
              selectedImageGroupId,
            },
          ],
        };

        try {
          await updateProductLineQuantityRequest({ variables });
        } catch (err) {
          console.log({ err });
        }
      }
    }

    return undefined;
  };

  return (
    <Select
      size="small"
      value={quantity}
      variant="standard"
      MenuProps={{
        PaperProps: { style: { maxHeight: 200 } },
      }}
      sx={{
        ...cocoRegular,
        color: '#050505',
        fontSize: '0.75rem',
      }}
      onChange={updateProductSizeHandler}
    >
      {mockArray.map((value: number) => {
        return (
          <MenuItem
            key={value}
            value={value}
            sx={{ ...cocoRegular, color: '#050505', fontSize: '0.75rem' }}
          >
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
}
