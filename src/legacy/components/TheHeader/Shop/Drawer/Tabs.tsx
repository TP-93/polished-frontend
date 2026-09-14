// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';

import { cocoBold } from '../../../../styles/constants';

interface Props {
  tabs: { id: string; label: string }[];
  active: string;
  onSelect: (id: string) => void;
}

export default function Tabs({ tabs, active, onSelect }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        pb: '16px',
        borderBottom: '1px solid #ededed',
      }}
    >
      {tabs.map((tab: any) => {
        const isActive: boolean = tab.id === active;

        return (
          <Box
            key={tab.id}
            id="shop-item"
            onMouseEnter={() => onSelect(tab.id)}
            onClick={() => onSelect(tab.id)}
            sx={{
              ...cocoBold,
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: '999px',
              transition: 'all 0.2s ease',
              color: isActive ? '#fff' : '#5c5c5c',
              backgroundColor: isActive ? '#111' : '#f4f4f4',
              '&:hover': {
                color: isActive ? '#fff' : '#111',
                backgroundColor: isActive ? '#111' : '#ececec',
              },
            }}
          >
            {tab.label}
          </Box>
        );
      })}
    </Box>
  );
}
