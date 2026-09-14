// @ts-nocheck
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import SvgIcon from '@mui/material/SvgIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { ReactComponent as NL } from '../../../assets/images/icons/flags/FLAG_NL.svg.tsx';
import { ReactComponent as GB } from '../../../assets/images/icons/flags/FLAG_GB.svg.tsx';

import { cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function LanguageSelector({ value, setValue }: Props) {
  const {
    state: { currentLanguage: lang },
  } = useUserProvider();

  const options: any = {
    nl: {
      NL: 'Nederland',
      EN: 'Netherlands',
    },
    en: {
      NL: 'Engeland',
      EN: 'England',
    },
  };

  return (
    <Select
      value={value}
      fullWidth
      onChange={(e: any) => setValue(e.target.value)}
      sx={{
        ...cocoRegular,
        color: '#050505',
        mb: '1rem',
        '.MuiOutlinedInput-notchedOutline': { borderRadius: 0 },
      }}
    >
      <MenuItem value="NL">
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcon
            inheritViewBox
            component={NL}
            sx={{ width: '24px', marginRight: '0.5rem' }}
          />

          <Typography
            variant="body2"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#050505',
            }}
          >
            {options.nl[lang]}
          </Typography>
        </Stack>
      </MenuItem>

      <MenuItem value="EN" sx={{ display: 'flex' }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcon
            inheritViewBox
            component={GB}
            sx={{ width: '24px', marginRight: '0.5rem' }}
          />

          <Typography
            variant="body2"
            sx={{
              ...cocoRegular,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#050505',
            }}
          >
            {options.en[lang]}
          </Typography>
        </Stack>
      </MenuItem>
    </Select>
  );
}
