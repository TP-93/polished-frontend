// @ts-nocheck
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon } from '@mui/icons-material';

import { cocoBold } from '../../../../styles/constants';

export default function Error() {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '40vh', pl: '20px', backgroundColor: '#fff' }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <SentimentVeryDissatisfiedIcon sx={{ mr: '1rem' }} />

        <Typography variant="body1" sx={{ ...cocoBold }}>
          Failed to load Shop data
        </Typography>
      </Stack>
    </Stack>
  );
}
