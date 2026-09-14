// @ts-nocheck
import { Select as Select } from '@mui/material';
import { MenuItem as MenuItem } from '@mui/material';

import { useMutation } from 'react-apollo';

import { cocoRegular } from '../../../../styles/constants';
import { useUserProvider } from '../../../../context/user';
import { GUEST_TOKEN_NAME } from '../../../../constants';
import { updateCheckoutLine } from '../../../../apollo/mutations/checkout';

interface Props {
  product: any;
  checkoutId: any;
}

export default function ProductSize({ product, checkoutId }: Props) {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const {
    size,
    cartId,
    quantity,
    productId,
    stockItems,
    userDesignId,
    selectedImageGroupId,
  } = product || {};

  const [updateProductSizeRequest, { loading }] = useMutation(
    updateCheckoutLine,
    {
      refetchQueries: ['Checkout'],
      onCompleted: () => {},
    },
  );

  const updateProductSizeHandler = async (event: any) => {
    const {
      target: { value: newSize },
    } = event;

    if (checkoutId) {
      const variables = {
        lang,
        token,
        currency,
        checkoutId,
        lines: [
          {
            size: newSize,
            lineId: cartId,
            quantity,
            productId,
            userDesignId,
            selectedImageGroupId,
          },
        ],
      };

      await updateProductSizeRequest({ variables });
    }
  };

  return (
    <Select
      size="small"
      value={size}
      variant="standard"
      disabled={loading}
      onChange={updateProductSizeHandler}
      sx={{
        ...cocoRegular,
        color: '#050505',
        fontSize: '0.75rem',
      }}
    >
      {stockItems
        .filter((i: any) => i?.isInStock)
        .map((item: any) => {
          return (
            <MenuItem
              key={item.size}
              value={String(item.size)}
              sx={{ ...cocoRegular, color: '#050505', fontSize: '0.75rem' }}
            >
              {item.size}
            </MenuItem>
          );
        })}
    </Select>
  );
}
