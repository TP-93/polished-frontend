// @ts-nocheck
import * as React from 'react';

import { Link } from 'react-router-dom';

import SvgIcon from '@mui/material/SvgIcon';
import { useMediaQuery } from '@mui/material';

import { ReactComponent as LogoIcon } from '../../assets/images/icons/header/jorcustom_logo_min_simplified.svg.tsx';

interface Props {
  isWhiteHeader: boolean;
}

export default function Logo({ isWhiteHeader }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Link to="/" style={{ margin: 'auto', color: '#000' }}>
      <SvgIcon
        component={LogoIcon}
        inheritViewBox
        sx={{
          height: isMobile ? '28px' : '2.5rem',
          width: 'auto',
          fill: isWhiteHeader ? '#000' : '#fff',
        }}
      />
    </Link>
  );
}
