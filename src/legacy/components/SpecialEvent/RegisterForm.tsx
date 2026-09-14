// @ts-nocheck
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';

import { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { isPossiblePhoneNumber } from 'libphonenumber-js';
import { TextField, Typography, FormControl } from '@mui/material';

import { useMediaQuery as useMediaQuery } from '@mui/material';
import { useUserProvider } from '../../context/user';
import validateEmail from '../../utils/regExps/emailRegExp';
import ErrorMessage from '../common/Errors';
import { cocoRegular } from '../../styles/constants';

interface Props {
  changeCurrentComponentHandler: (name: string) => any;
}

export default function RegisterFrom({ changeCurrentComponentHandler }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    specialEvents: { blackFriday },
  } = languages[currentLanguage];
  const { registration } = blackFriday;

  const [error, setError] = useState<string>('');
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [phoneFormat, setPhoneFormat] = useState<string>('');
  const [registerData, setRegisterData] = useState<any>({
    Voornaam: '',
    Achternaam: '',
    'E-mail': '',
    Telefoonnummer: '',
  });

  const btnDisabledConditions =
    isLoading ||
    error.length > 0 ||
    Object.values(registerData).filter((value: any) => value.length === 0)
      .length > 0;

  const registerDataChangeHandler = (e: any) => {
    const {
      target: { name, value },
    } = e;

    const newValue = value.trim() === '' ? '' : value;

    setRegisterData((prev: any) => {
      return {
        ...prev,
        [name]: newValue.length >= 50 ? prev[name] : newValue,
      };
    });
  };

  const clearErrorHandler = () => setError('');

  const phoneNumberHandler = (
    value: any,
    data: any,
    event: any,
    formattedValue: string,
  ) => {
    clearErrorHandler();

    setRegisterData((prev: any) => ({
      ...prev,
      Telefoonnummer: formattedValue,
    }));

    if (phoneFormat !== data.format) setPhoneFormat(data.format);
  };

  const registerHandler = async () => {
    try {
      toggleLoading(true);

      const isValidPhone = isPossiblePhoneNumber(registerData.Telefoonnummer);

      if (!isValidPhone) {
        toggleLoading(false);
        return setError('Invalid phone number');
      }

      const isValidEmail = validateEmail(registerData['E-mail']);

      if (!isValidEmail) {
        toggleLoading(false);
        return setError('Invalid email format');
      }

      // @ts-ignore
      const url: string = `${process.env.REACT_APP_GRAPHQL_URL.replace(
        'graphql',
        'event',
      )}`;

      const formData: any = new FormData();

      formData.append('Voornaam', registerData.Voornaam);
      formData.append('Achternaam', registerData.Achternaam);
      formData.append('E-mail', registerData['E-mail']);
      formData.append('Telefoonnummer', registerData.Telefoonnummer);

      const params = new URLSearchParams(formData);

      await fetch(url, {
        method: 'POST',
        body: params.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response: any) => {
          if (response.status === 200) {
            changeCurrentComponentHandler('finish');
            return response.json();
          }

          setError('Email must be already registered!');

          return response.json();
        })
        .catch((err: any) => {
          setError(err.message);
        })
        .finally(() => {
          toggleLoading(false);
        });
    } catch (err: any) {
      setError(err.message);
      toggleLoading(false);
    }

    return undefined;
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
          textTransform: 'uppercase',
        }}
      >
        {registration.title1.replace('#', currentYear)}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          m: '20px 0',
          ...cocoRegular,
          color: '#050505 !important',
          fontSize: isMobile ? '0.55rem' : '1rem',
          fontWeight: 700,
        }}
      >
        {registration.title2}
      </Typography>

      <FormControl
        fullWidth
        sx={{
          '& > div': {
            marginBottom: '0.6rem',
            '&:last-child': {
              marginBottom: '0',
            },
          },
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
          required
          disabled={isLoading}
          value={registerData.Voornaam}
          inputProps={{ maxLength: 50, autoComplete: 'off' }}
          name="Voornaam"
          label={registration.form.input1}
          fullWidth
          onInput={registerDataChangeHandler}
          onFocus={clearErrorHandler}
        />
        <TextField
          required
          disabled={isLoading}
          value={registerData.Achternaam}
          inputProps={{ maxLength: 50, autoComplete: 'off' }}
          name="Achternaam"
          label={registration.form.input2}
          fullWidth
          onInput={registerDataChangeHandler}
          onFocus={clearErrorHandler}
        />
        <TextField
          type="email"
          required
          disabled={isLoading}
          value={registerData['E-mail']}
          inputProps={{ maxLength: 50, autoComplete: 'off' }}
          name="E-mail"
          label={registration.form.input3}
          fullWidth
          onChange={registerDataChangeHandler}
          onFocus={clearErrorHandler}
        />

        <PhoneInput
          value={registerData.Telefoonnummer}
          country={'nl'}
          enableSearch
          countryCodeEditable={false}
          specialLabel=""
          inputProps={{
            name: 'phone',
            required: true,
          }}
          inputStyle={{
            width: '100%',
            minHeight: '45px',
            paddingTop: '12px',
            paddingBottom: '8px',
            ...cocoRegular,
          }}
          onChange={phoneNumberHandler}
        />

        {error.length > 0 && (
          <ErrorMessage style={{ marginTop: '20px' }}>{error}</ErrorMessage>
        )}

        <LoadingButton
          disabled={btnDisabledConditions}
          loading={isLoading}
          variant="contained"
          type="submit"
          onClick={registerHandler}
          sx={{
            m: '20px 0 20px 0',
            cursor: btnDisabledConditions ? 'not-allowed' : 'pointer',
            color: '#fff !important',
            padding: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            fontSize: isMobile ? '0.7rem' : '1rem',
            textTransform: 'uppercase',
            opacity: btnDisabledConditions ? '0.55' : 1,
            ...cocoRegular,
          }}
        >
          {registration.form.btnText}
        </LoadingButton>
      </FormControl>
    </>
  );
}
