// @ts-nocheck
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useUserProvider } from '../../context/user';
import ErrorMessage from '../common/Errors';
import { cocoRegular } from '../../styles/constants';

export default function LoginFrom() {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    specialEvents: { blackFriday },
  } = languages[currentLanguage];
  const { login } = blackFriday;

  const router = useHistory();

  const [error, setError] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const clearErrorHandler = () => setError('');
  const inputChangeHandler = (e: any) => {
    const {
      target: { value },
    } = e;

    const newValue = value.trim() === '' ? '' : value;

    setPassword((prev) => (newValue.length >= 50 ? prev : newValue));
  };
  const submitHandler = () => {
    if (password.toLowerCase() === 'kobalt')
      router.push('/collection/black-week-2024');
    else setError('Invalid password!');
  };

  const currentYear: string | number =
    new Date().getFullYear() || 'of this year';

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          ...cocoRegular,
          color: '#0c0c0c',
          fontSize: isMobile ? '1.1rem' : '2rem',
          fontWeight: 900,
        }}
      >
        {login.title1.replace('#', currentYear)}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          ...cocoRegular,
          fontWeight: 900,
          m: '20px 0 0 0',
          fontSize: isMobile ? '0.55rem' : '1rem',
          color: '#050505',
        }}
      >
        {login.title2}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          ...cocoRegular,
          fontWeight: 900,
          fontSize: isMobile ? '0.55rem' : '1rem',
          color: '#050505',
        }}
      >
        {login.title3}
      </Typography>

      <FormControl
        fullWidth
        sx={{
          margin: '5rem 0 1rem 0',
          input: {
            paddingTop: '11px',
            paddingBottom: '11px',
            backgroundColor: '#fff',
            outline: 'none',
            ...cocoRegular,
          },
          '.MuiFormLabel-root': {
            color: '#000 !important',
            fontSize: '0.6rem',
            ...cocoRegular,
            fontWeight: '700',
          },
        }}
      >
        <TextField
          value={password}
          name="Password"
          label={login.form.input1}
          fullWidth
          onChange={inputChangeHandler}
          onFocus={clearErrorHandler}
        />

        {error.length > 0 && (
          <ErrorMessage style={{ marginBottom: '1rem' }}>{error}</ErrorMessage>
        )}

        <Button
          disabled={!password.length}
          variant="contained"
          type="submit"
          sx={{
            m: '20px 0 20px 0',
            cursor: !password.length ? 'not-allowed' : 'pointer',
            color: '#fff !important',
            padding: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            fontSize: isMobile ? '0.7rem' : '1rem',
            textTransform: 'uppercase',
            ...cocoRegular,
          }}
          onClick={submitHandler}
        >
          {login.btnText}
        </Button>
      </FormControl>
    </>
  );
}
