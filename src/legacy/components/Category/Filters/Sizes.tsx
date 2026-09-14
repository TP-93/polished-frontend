// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Divider as Divider } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { cocoRegular } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

interface Props {
  sizes: any;
  filterHandler: (type: 'size' | 'color', selectedValue: string) => void;
}

export default function Sizes({ sizes, filterHandler }: Props) {
  const [hoveredSize, setHoveredSize] = React.useState<string>('');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const titles: any = {
    size: {
      EN: 'Size',
      NL: 'Maat',
    },
  };

  return (
    <Box sx={{ mb: '1rem' }}>
      <Typography
        variant="body1"
        sx={{
          ...cocoRegular,
          fontSize: '0.7rem',
          fontWeight: 500,
          color: '#4c4c4c',
        }}
      >
        {titles.size[currentLanguage]}
      </Typography>

      <Divider sx={{ m: '0.5rem 0' }} />

      <table
        style={{
          overflow: 'auto hidden',
          padding: '0.3rem 0',
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(6, 1fr)`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {sizes.data.map((size: any) => {
              const isHovered = hoveredSize === size;
              const isSelected: boolean = sizes.selected.includes(size);

              return (
                <td
                  key={size}
                  onClick={() => filterHandler('size', size)}
                  onMouseEnter={() => setHoveredSize(size)}
                  onMouseLeave={() => setHoveredSize('')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border:
                      isHovered || isSelected
                        ? '1px solid #000'
                        : '1px solid #C6C6C8',
                    height: '6vh',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    ...cocoRegular,
                    textAlign: 'center',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    backgroundColor: '#fff',
                    userSelect: 'none',
                  }}
                >
                  {size}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </Box>
  );
}
