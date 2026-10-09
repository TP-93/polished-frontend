// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';

import Login from './Login';
import ResetPassword from './Reset';

interface Props {
  closeDrawer: () => void;
  checkout?: boolean;
}

export default function User({ closeDrawer, checkout = false }: Props) {
  const [formType, setFormType] = React.useState<'login' | 'reset'>('login');

  const toggleFormHandler = () => {
    if (formType === 'login') setFormType('reset');
    if (formType === 'reset') setFormType('login');
  };

  return (
    <Box
      sx={{
        pt: '1rem',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {formType === 'login' && (
        <Login openReset={toggleFormHandler} closeDrawer={closeDrawer} checkout={checkout} />
      )}

      {formType === 'reset' && (
        <ResetPassword
          openLogin={toggleFormHandler}
          closeDrawer={closeDrawer}
        />
      )}
    </Box>
  );
}
