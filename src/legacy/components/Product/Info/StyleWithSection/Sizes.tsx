// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import ErrorMessage from '../../../common/Errors';
import { cocoRegular } from '../../../../styles/constants';
import { useUserProvider } from '../../../../context/user';

interface Props {
  sizes: any;
  selectedSize: string;
  isMissingSize: boolean;
  setSelectedSize: (value: string) => void;
}

export default function Sizes({
  sizes,
  selectedSize,
  isMissingSize,
  setSelectedSize,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: { unSelectedSizeAlert },
  } = languages[currentLanguage];

  const [hoveredSize, setHoveredSize] = React.useState<string>('');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <table
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          overflow: 'auto hidden',
          padding: '0.3rem 0',
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody style={{ width: '100%', overflow: 'hidden' }}>
          <tr
            style={{
              display: isMobile ? 'flex' : 'grid',
              overflow: 'auto hidden',
              alignItems: 'start',
              maxWidth: '99vw',
              gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
            }}
          >
            {sizes.map((item: any) => {
              const { size, isInStock } = item;

              const isHovered = hoveredSize === size;
              const isSelected = selectedSize === size;

              return (
                <td
                  key={size}
                  onClick={
                    isInStock
                      ? () => {
                          if (isSelected) setSelectedSize('');
                          if (!isSelected) setSelectedSize(size);
                        }
                      : undefined
                  }
                  onMouseEnter={
                    isInStock ? () => setHoveredSize(size) : undefined
                  }
                  onMouseLeave={
                    isInStock ? () => setHoveredSize('') : undefined
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border:
                      isHovered || isSelected
                        ? '1px solid #000'
                        : '1px solid #C6C6C8',
                    width: '100%',
                    height: isMobile ? '1.5rem' : '2rem',
                    cursor: isInStock ? 'pointer' : 'not-allowed',
                    color: '#050505',
                    fontSize: '0.6rem',
                    ...cocoRegular,
                    textTransform: 'uppercase',
                    backgroundColor: !isInStock ? '#ededed' : '#fff',
                  }}
                >
                  {!isInStock && (
                    <svg
                      style={{ position: 'absolute', top: 0, left: 0 }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      stroke="#C6C6C8"
                      strokeWidth="1"
                    >
                      <line x1="100%" y1="0" x2="0" y2="100%" />
                    </svg>
                  )}

                  {size}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      {isMissingSize && (
        <ErrorMessage
          style={{ paddingBottom: '0.3rem', fontSize: 'calc(0.3em + 1vmin)' }}
        >
          {unSelectedSizeAlert}
        </ErrorMessage>
      )}
    </Box>
  );
}
