// @ts-nocheck
import { Typography } from '@mui/material';
import { useMediaQuery as useMediaQuery } from '@mui/material';
import { useUserProvider } from '../../context/user';
import { cocoRegular } from '../../styles/constants';

export default function RegisterFinish() {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    specialEvents: { blackFriday },
  } = languages[currentLanguage];
  const {
    registration: { finish },
  } = blackFriday;

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          ...cocoRegular,
          fontSize: isMobile ? '0.9rem' : '2rem',
          color: '#0c0c0c',
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        {finish.title1}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginTop: '20px',
          ...cocoRegular,
          color: '#050505 !important',
          fontSize: isMobile ? '0.55rem' : '1rem',
          fontWeight: 700,
        }}
      >
        {finish.title2}
      </Typography>
    </>
  );
}
