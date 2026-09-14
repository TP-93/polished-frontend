// @ts-nocheck
import * as React from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-apollo';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Input from './Input';
import AuthButton from './Button';
import ErrorMessage, { SuccessMessage } from '../../common/Errors';

import { fontFamily } from '../../../styles/constants';
import { resetPassword } from '../../../apollo/mutations/account';
import { useUserProvider } from '../../../context/user';

const validationSchema = yup.object({
  email: yup.string().required(),
});

interface Props {
  openLogin: () => void;
  closeDrawer: () => void;
}

export default function ResetPassword({ openLogin, closeDrawer }: Props) {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Auth } = languages[currentLanguage];
  const { resetBtnText, resetBackToLogin, resetEmailPlaceholder } = Auth;

  const [errors, setErrors] = React.useState<any[]>([]);
  const [success, setSuccess] = React.useState<string>('');

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: () => {},
  });

  const [passwordResetRequest, { loading }] = useMutation(resetPassword, {
    variables: {
      email: formik.values.email,
      lang: currentLanguage,
    },
    onCompleted: (data: any) => {
      const { errors: requestErrors, success: requestSuccess } =
        data.passwordReset;

      if (requestErrors?.length) {
        setSuccess('');
        return setErrors(requestErrors);
      }

      if (requestSuccess) {
        const status: any = {
          NL: 'Nieuw wachtwoord is verzonden',
          EN: 'New password request sent',
        };

        setErrors([]);
        setSuccess(status[currentLanguage]);
      }

      return closeDrawer;
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
        id="email"
        type="email"
        name="email"
        required
        disabled={false}
        placeholder={resetEmailPlaceholder}
        onChange={formik.handleChange}
      />

      <Typography
        variant="body2"
        onClick={openLogin}
        sx={{
          mb: '10px',
          color: '#4C4C4C',
          cursor: 'pointer',
          fontSize: '0.6rem',
          fontFamily,
          textTransform: 'none',
          textDecoration: 'underline',
        }}
      >
        {resetBackToLogin}
      </Typography>

      <AuthButton
        text={resetBtnText}
        loading={loading}
        disabled={loading}
        onClick={passwordResetRequest}
      />

      {success.length > 0 && (
        <Box sx={{ padding: '1rem', width: '100%' }}>
          <SuccessMessage>{success}</SuccessMessage>
        </Box>
      )}

      {errors.length > 0 && (
        <Box sx={{ padding: '1rem', width: '100%' }}>
          {errors.map((err: { field: string; message: string }) => (
            <ErrorMessage key={`${err.field}`}>{err.message}</ErrorMessage>
          ))}
        </Box>
      )}
    </Box>
  );
}
