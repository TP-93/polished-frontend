// @ts-nocheck
import React from 'react';

import { useMediaQuery } from '@mui/material';

import MobileMedia from './MobileMedia';
import DesktopMedia from './DesktopMedia';

interface Props {
  imageGroups: any;
}

export default function ProductMedia({ imageGroups }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      {isMobile && <MobileMedia imageGroups={imageGroups} />}

      {!isMobile && <DesktopMedia imageGroups={imageGroups} />}
    </>
  );
}
