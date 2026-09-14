// @ts-nocheck
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useMediaQuery } from '@mui/material';
import {
  pink,
  cocoBold,
  cocoRegular,
  raisinBlack,
} from '../../../../styles/constants';

interface Props {
  price: any;
  discountPrice: any;
}

export default function ProductPrice({ price, discountPrice }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const isDiscount: boolean = !!discountPrice?.localized;

  return (
    <Stack display="flex" flexDirection="row">
      <Typography
        variant="body1"
        sx={{
          mr: '5px',
          ...cocoRegular,
          color: isDiscount ? raisinBlack : '#050505',
          fontSize: isMobile ? '0.65rem' : '0.85rem',
          textTransform: isDiscount ? 'none' : 'uppercase',
          textDecoration: isDiscount ? 'line-through' : 'none',
        }}
      >
        {price.localized}
      </Typography>

      {isDiscount && (
        <Typography
          variant="body1"
          sx={{
            ...cocoBold,
            color: pink,
            fontSize: isMobile ? '0.65rem' : '0.85rem',
          }}
        >
          {discountPrice.localized}
        </Typography>
      )}
    </Stack>
  );
}
