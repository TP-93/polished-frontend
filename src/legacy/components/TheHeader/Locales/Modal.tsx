// @ts-nocheck
import React from 'react';

import { Button as Button } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { DialogTitle as DialogTitle } from '@mui/material';
import { DialogContent as DialogContent } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';

import { cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  close: () => void;
}

export default function LocalesModal({ close }: Props) {
  const {
    state: { currency, currentLanguage },
    dispatch,
  } = useUserProvider();

  const title: any = {
    EN: 'Welcome',
    NL: 'Welkom',
  };

  const text: any = {
    EN: 'Please select desired language to continue to our store',
    NL: 'Selecteer de gewenste taal om door te gaan naar onze winkel',
  };

  const button: any = {
    EN: 'Confirm',
    NL: 'Bevestigen',
  };

  const [selectedLanguage, setSelectedLanguage] =
    React.useState<any>(currentLanguage);
  const [selectedCurrency, setSelectedCurrency] = React.useState<any>(currency);

  const confirmHandler = () => {
    dispatch({
      type: 'CHANGE_CURRENCY',
      payload: selectedCurrency,
    });

    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: selectedLanguage,
    });

    close();
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: '0.2rem',
          pr: '0.2rem',
        }}
      >
        <CloseIcon onClick={close} sx={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: '3rem',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...cocoRegular,
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#0c0c0c',
          }}
        >
          {title[currentLanguage]}
        </Typography>

        <Typography
          variant="body1"
          sx={{ margin: '1rem 0 3rem 0', ...cocoRegular, color: '#050505' }}
        >
          {text[currentLanguage]}
        </Typography>

        <LanguageSelector
          value={selectedLanguage}
          setValue={setSelectedLanguage}
        />

        <CurrencySelector
          value={selectedCurrency}
          setValue={setSelectedCurrency}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={confirmHandler}
          sx={{
            padding: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoRegular,
          }}
        >
          {button[currentLanguage]}
        </Button>
      </DialogContent>
    </>
  );
}
