// @ts-nocheck
import * as React from 'react';

import Box from '@mui/material/Box';

import Login from './Login';
import ResetPassword from './Reset';

interface Props {
  closeDrawer: () => void;
}

export default function User({ closeDrawer }: Props) {
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
        <Login openReset={toggleFormHandler} closeDrawer={closeDrawer} />
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
