// @ts-nocheck
import { Stack as Stack } from '@mui/material';
import { Select as Select } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';
import { MenuItem as MenuItem } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { cocoRegular } from '../../../styles/constants';

import { ReactComponent as Euro } from '../../../assets/images/icons/currencies/euro_icon.svg.tsx';
import { ReactComponent as Pound } from '../../../assets/images/icons/currencies/pound_icon.svg.tsx';
import { ReactComponent as Dollar } from '../../../assets/images/icons/currencies/dollar_icon.svg.tsx';

interface Props {
  value: string;
  setValue: (value: string) => void;
}
export default function CurrencySelector({ value, setValue }: Props) {
  return (
    <Select
      value={value}
      fullWidth
      onChange={(e: any) => setValue(e.target.value)}
      sx={{
        color: '#050505',
        mb: '1rem',
        '.MuiOutlinedInput-notchedOutline': { borderRadius: 0 },
      }}
    >
      <MenuItem value="EUR">
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcon
            inheritViewBox
            component={Euro}
            sx={{ width: '20px', marginRight: '0.5rem' }}
          />

          <Typography
            variant="body2"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              color: '#050505',
              textTransform: 'uppercase',
            }}
          >
            Euro
          </Typography>
        </Stack>
      </MenuItem>

      <MenuItem value="USD" sx={{ display: 'flex' }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcon
            inheritViewBox
            component={Dollar}
            sx={{ width: '20px', marginRight: '0.5rem' }}
          />

          <Typography
            variant="body2"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              color: '#050505',
              textTransform: 'uppercase',
            }}
          >
            Dollar
          </Typography>
        </Stack>
      </MenuItem>

      <MenuItem value="GBP" sx={{ display: 'flex' }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcon
            inheritViewBox
            component={Pound}
            sx={{ width: '20px', marginRight: '0.5rem' }}
          />

          <Typography
            variant="body2"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              color: '#050505',
              textTransform: 'uppercase',
            }}
          >
            Pound
          </Typography>
        </Stack>
      </MenuItem>
    </Select>
  );
}
