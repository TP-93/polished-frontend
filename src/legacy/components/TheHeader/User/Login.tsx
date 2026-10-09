// @ts-nocheck
import * as React from 'react';

import * as yup from 'yup';

import { useFormik } from 'formik';
import { useMutation, useApolloClient } from 'react-apollo';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import Input from './Input';
import AuthButton from './Button';
import ErrorMessage from '../../common/Errors';

import {
  AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  PREV_GUEST_TOKEN_NAME,
} from '../../../constants';
import { getCheckout } from '../../../apollo/queries/checkout';
import { useUserProvider } from '../../../context/user';
import { isAuthenticated } from '../../../apollo/queries/auth';
import { createTokenMutation } from '../../../apollo/mutations/auth';
import { createOrMergeCheckout } from '../../../apollo/mutations/checkout';
import { fontFamily } from '../../../styles/constants';

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

interface Props {
  openReset: () => void;
  closeDrawer: () => void;
  checkout?: boolean;
}

export default function Login({ openReset, closeDrawer, checkout = false }: Props) {
  const client = useApolloClient();

  const {
    state: { currency, languages, currentLanguage },
  } = useUserProvider();

  const { Auth } = languages[currentLanguage];
  const {
    authBtnText,
    authForgotPassword,
    authEmailPlaceholder,
    authPasswordPlaceholder,
  } = Auth;

  const [errors, setErrors] = React.useState<any[]>([]);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {},
  });

  const [loginRequest, { loading }] = useMutation(createTokenMutation, {
    refetchQueries: ['checkAuthenticatedState'],
    variables: { email: formik.values.email, password: formik.values.password },
    onCompleted: (data: any) => {
      const {
        tokenCreate: { token, errors: optErrors, user },
      } = data;

      if (optErrors?.length) {
        return setErrors(optErrors);
      }

      const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);

      if (token) {
        localStorage.setItem(AUTH_TOKEN_NAME, token);

        if (guestToken) {
          localStorage.setItem(PREV_GUEST_TOKEN_NAME, guestToken);
        }

        localStorage.removeItem(GUEST_TOKEN_NAME);

        client.writeQuery({
          query: isAuthenticated,
          data: { isLoggedIn: true },
        });

        client.writeData({
          data: { userId: user?.id },
        });

        client
          .mutate({
            mutation: createOrMergeCheckout,
            variables: {
              lang: currentLanguage,
              currency,
              input: {
                token: guestToken,
              },
            },
          })
          .then((res: any) => {
            if (checkout && res?.data?.checkoutCreateOrMerge?.checkout) {
              client.writeQuery({
                query: getCheckout,
                data: { checkout: res.data.checkoutCreateOrMerge.checkout },
                variables: { token: null, currency, lang: currentLanguage },
              });
            } else if (res?.data) {
              client.writeQuery({
                query: getCheckout,
                data: res.data.checkoutCreateOrMerge,
                variables: { token: null },
              });
            }
          })
          .catch((err) => {
            console.log({ err });
          });

        closeDrawer();
      }

      return undefined;
    },
  });

  return (
    <Box
      sx={{
        width: '95%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Input
        id="name"
        type="email"
        name="email"
        required
        disabled={loading}
        placeholder={authEmailPlaceholder}
        onChange={formik.handleChange}
      />

      <Input
        id="password"
        type="password"
        name="password"
        required
        disabled={loading}
        placeholder={authPasswordPlaceholder}
        onChange={formik.handleChange}
      />

      <Typography
        variant="body2"
        onClick={openReset}
        sx={{
          mb: '10px',
          pl: '3px',
          color: '#4C4C4C',
          cursor: 'pointer',
          fontSize: '0.6rem',
          textTransform: 'none',
          fontFamily,
          textDecoration: 'underline',
        }}
      >
        {authForgotPassword}
      </Typography>

      <AuthButton
        text={authBtnText}
        loading={loading}
        disabled={loading}
        onClick={loginRequest}
      />

      {errors.length > 0 &&
        errors.map((err: { field: string; message: string }) => (
          <ErrorMessage
            key={`${err.field}`}
            style={{ marginTop: '1rem', fontSize: '0.85rem' }}
          >
            {err.message}
          </ErrorMessage>
        ))}
    </Box>
  );
}
