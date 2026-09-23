// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';

import { getItemPathname } from '../../menuModel';
import { cocoBold } from '../../../../styles/constants';

interface Props {
  items: any[];
  closeDrawer: () => void;
}

export default function CollectionsPanel({ items, closeDrawer }: Props) {
  return (
    <Box
      sx={{
        pt: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: '24px',
      }}
    >
      {items.map((item: any) => (
        <Box
          key={item.name}
          sx={{
            padding: '12px 0',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <NavLink
            to={{ pathname: getItemPathname(item) }}
            onClick={closeDrawer}
            style={{
              ...cocoBold,
              fontSize: '0.625rem',
              color: '#3c3c3c',
              letterSpacing: '0.03em',
            }}
          >
            {item.collection?.name || item.name}
          </NavLink>
        </Box>
      ))}
    </Box>
  );
}
