// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useMediaQuery } from '@mui/material';

import Sizes from './Sizes';
import Colors from './Colors';
import { cocoBold } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  sizeFilters: any;
  colorFilters: any;
  filterHandler: (type: 'size' | 'color', selectedValue: string) => void;
  applyFiltersHandler: () => void;
  clearFiltersSelectionHandler: () => void;
}

export default function Filters({
  sizeFilters,
  colorFilters,
  filterHandler,
  applyFiltersHandler,
  clearFiltersSelectionHandler,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const titles: any = {
    applyFilter: {
      EN: 'Apply filter',
      NL: 'Filter toepassen',
    },
    clearSelection: {
      EN: 'Clear selection',
      NL: 'Selectie wissen',
    },
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ flexGrow: 1, pb: isMobile ? '16vh' : '2vh' }}
    >
      <Box sx={{ p: '1rem 0', width: '95%' }}>
        <Sizes sizes={sizeFilters} filterHandler={filterHandler} />

        <Colors colors={colorFilters} filterHandler={filterHandler} />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        sx={{ p: '0.5rem 0', width: '100%' }}
      >
        <Button
          onClick={applyFiltersHandler}
          sx={{
            mb: '1rem',
            width: '95%',
            padding: '0.7rem',
            color: '#fff',
            fontSize: '0.7rem',
            boxShadow: '10px 10px 20px #00000040',
            background:
              'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoBold,
          }}
        >
          {titles.applyFilter[currentLanguage]}
        </Button>

        <Button
          onClick={clearFiltersSelectionHandler}
          sx={{
            width: '95%',
            padding: '0.7rem',
            color: '#000',
            fontSize: '0.7rem',
            border: '1px solid #4343',
            borderRadius: 0,
            textTransform: 'uppercase',
            ...cocoBold,
            ':hover': {
              color: '#fff',
              background:
                'transparent linear-gradient(96deg, #2C2C2E 0%, #000000 100%) 0% 0% no-repeat padding-box',
            },
          }}
        >
          {titles.clearSelection[currentLanguage]}
        </Button>
      </Box>
    </Box>
  );
}
