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
        gap: '6px',
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
              fontSize: '0.625rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '9px 18px',
              border: isActive ? '1px solid #8d8d8d' : '1px solid #d5d5d5',
              borderRadius: '0',
              boxShadow: isActive ? 'inset 0 -2px 0 #111' : 'none',
              transition: 'all 0.2s ease',
              color: '#111',
              background: isActive
                ? 'linear-gradient(180deg, #ffffff 0%, #e6e6e6 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%)',
              '&:hover': {
                borderColor: '#8d8d8d',
                background: 'linear-gradient(180deg, #ffffff 0%, #e9e9e9 100%)',
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
