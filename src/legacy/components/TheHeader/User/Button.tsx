// @ts-nocheck
import * as React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import { cocoRegular } from '../../../styles/constants';

interface Props {
  text: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function AuthButton({
  text,
  loading,
  disabled,
  onClick,
}: Props) {
  return (
    <LoadingButton
      variant="contained"
      fullWidth
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      sx={{
        padding: '0.7rem',
        boxShadow: '10px 10px 20px #00000040',
        background:
          'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
        borderRadius: 0,
        textTransform: 'uppercase',
        ...cocoRegular,
        fontSize: '0.7rem',
      }}
    >
      {text}
    </LoadingButton>
  );
}
