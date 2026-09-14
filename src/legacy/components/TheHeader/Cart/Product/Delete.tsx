// @ts-nocheck
import React from 'react';

import Swal from 'sweetalert2';

import { Stack as Stack } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useMutation } from 'react-apollo';

import { useMediaQuery } from '@mui/material';
import { useUserProvider } from '../../../../context/user';
import {
  // AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  // PREV_GUEST_TOKEN_NAME,
} from '../../../../constants';
import { deleteCheckoutLine } from '../../../../apollo/mutations/checkout';
import { cocoRegular, green, red } from '../../../../styles/constants';
import { ReactComponent as DeleteIcon } from '../../../../assets/images/icons/delete_icon.svg.tsx';

const useStyles = makeStyles(() => ({
  box: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#4343',
      transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
      transform: 'translateX(100%)',
    },
  },
}));

interface Props {
  product: any;
  checkoutId: any;
  cartLinesCounter: number;
}

export default function DeleteProduct({
  product,
  checkoutId,
  cartLinesCounter,
}: Props) {
  const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);

  const isMobile = useMediaQuery('(max-width:767px)');

  const classes = useStyles();

  const {
    state: { currency, languages, currentLanguage },
  } = useUserProvider();

  const { Cart } = languages[currentLanguage];
  const { cartSummaryItem } = Cart;
  const { errors: errorsProvider, deleteProductModal } = cartSummaryItem;
  const { deleteTitle, deleteConfirm, deleteCancel } = deleteProductModal;

  const [_, setError] = React.useState<any>();

  const [deleteProductItemRequest, { loading }] = useMutation(
    deleteCheckoutLine,
    {
      refetchQueries: ['Checkout'],
      onError: (err: any) => {
        console.log({ err });
        setError(errorsProvider.removeProductError);
      },
      onCompleted: (data: any) => {
        if (data?.checkoutLineDelete) {
          const { checkout, errors } = data.checkoutLineDelete;

          if (cartLinesCounter >= 1 && (!checkout || errors?.length)) {
            setError(errorsProvider.removeProductError);
          }

          if (cartLinesCounter === 0 && errors?.length) {
            setError(errorsProvider.failedDeleteCart);
          }
        }
      },
    },
  );

  const deleteWarningHandler = (callback: () => void) => {
    Swal.fire({
      title: deleteTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: deleteConfirm,
      cancelButtonText: deleteCancel,
      confirmButtonColor: red,
      cancelButtonColor: green,
    }).then((result) => {
      if (result.value) {
        callback();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }

      return true;
    });
  };

  const deleteProductItemHandler = async () => {
    // const userToken = localStorage.getItem(AUTH_TOKEN_NAME);
    // const prevGuestToken = localStorage.getItem(PREV_GUEST_TOKEN_NAME);

    const variables: any = {
      lang: currentLanguage,
      token: guestToken,
      currency,
      checkoutId,
    };

    if (cartLinesCounter >= 1) variables.lineId = product.cartId;

    await deleteProductItemRequest({ variables });
  };

  return (
    <Stack
      display="inline-flex"
      flexDirection="row"
      alignItems="center"
      style={{
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.75 : 1,
        pointerEvents: loading ? 'none' : 'auto',
      }}
      className={!isMobile ? classes.box : undefined}
      onClick={() => deleteWarningHandler(deleteProductItemHandler)}
    >
      <SvgIcon
        component={DeleteIcon}
        inheritViewBox
        sx={{ width: '0.6rem', mr: '10px' }}
      />

      {!isMobile && (
        <Typography
          variant="body1"
          sx={{
            ...cocoRegular,
            mt: '2px',
            color: '#4c4c4c',
            fontSize: '0.75rem',
          }}
        >
          Delete item
        </Typography>
      )}
    </Stack>
  );
}
