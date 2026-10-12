// @ts-nocheck
import * as React from 'react';
import { Box as Box } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import { useUserProvider } from '../../../../context/user';
import { useHeaderContext } from '../../Provider';
import Sections from './Sections';

import { ReactComponent as NL } from '../../../../assets/images/icons/flags/FLAG_NL.svg.tsx';
import { ReactComponent as GB } from '../../../../assets/images/icons/flags/FLAG_GB.svg.tsx';
import { ReactComponent as RightArrow } from '../../../../assets/images/icons/arrows/right_arrow_icon_black.svg.tsx';

interface Props {
  closeDrawer: () => void;
  openLocalesModal: () => void;
}

export default function Content({ closeDrawer, openLocalesModal }: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const { shop } = useHeaderContext();

  const openLocalesModalHandler = () => {
    closeDrawer();
    openLocalesModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: '20px 20px 10px 20px',
        height: '100%',
        overflow: 'hidden auto',
        backgroundColor: '#fff',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon
            onClick={closeDrawer}
            sx={{ height: '30px', cursor: 'pointer' }}
          />
        </Box>

        <Sections
          collections={shop.collections}
          closeDrawer={closeDrawer}
        />
      </Box>

      <Box
        onClick={openLocalesModalHandler}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px 0 0 0',
          borderTop: '1px solid gray',
        }}
      >
        <SvgIcon
          component={currentLanguage === 'NL' ? NL : GB}
          inheritViewBox
          onClick={openLocalesModal}
          sx={{ mr: '5px' }}
        />

        <SvgIcon
          component={RightArrow}
          inheritViewBox
          sx={{
            height: '20px',
            transform: 'rotate(90deg)',
          }}
        />
      </Box>
    </Box>
  );
}
