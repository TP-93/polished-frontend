// @ts-nocheck
import * as React from 'react';

import TextField from '@mui/material/TextField';
import { cocoRegular } from '../../../styles/constants';

interface Props {
  id: string;
  type: string;
  name: string;
  required: boolean;
  disabled: boolean;
  placeholder: string;
  onChange: (event: any) => void;
}

export default function Input({
  id,
  type,
  name,
  required,
  disabled,
  placeholder,
  onChange,
}: Props) {
  return (
    <TextField
      id={id}
      type={type}
      name={name}
      size="small"
      required={required}
      disabled={disabled}
      fullWidth
      placeholder={placeholder}
      onChange={onChange}
      sx={{
        mb: '10px',
        textTransform: 'none',
        '.MuiOutlinedInput-notchedOutline': { borderRadius: 0 },

        '& .MuiInputBase-input::placeholder': {
          ...cocoRegular,
          color: '#000',
          opacity: 1,
          fontSize: '0.5rem',
          fontWeight: 600,
        },
      }}
    />
  );
}
