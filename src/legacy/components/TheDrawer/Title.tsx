// @ts-nocheck
import * as React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Close as CloseIcon } from '@mui/icons-material';

import { useMediaQuery } from '@mui/material';
import { cocoBold } from '../../styles/constants';
import { useUserProvider } from '../../context/user';

interface Props {
  text: string;
  close: () => void;
}

export default function Title({ text, close }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const { dispatch } = useUserProvider();

  const closeDrawerHandler = () => {
    dispatch({
      type: 'TRIGGER_DRAWER',
      payload: {
        type: '',
        open: false,
      },
    });

    close();
  };

  return (
    <Stack
      id="drawer-title"
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        p: '1.5rem 0',
        height: '4vh',
        maxHeight: '4vh',
        width: '95%',
        borderBottom: `1px solid #4343`,
      }}
    >
      <Typography
        sx={{
          ...cocoBold,
          color: '#050505',
          fontSize: isMobile ? '0.9rem' : '1.15rem',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </Typography>

      <CloseIcon
        onClick={closeDrawerHandler}
        sx={{ width: '1.5rem', cursor: 'pointer' }}
      />
    </Stack>
  );
}
