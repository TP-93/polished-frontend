// @ts-nocheck
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import ErrorMessage from '../../../../common/Errors';
import { cocoBold, cocoRegular } from '../../../../../styles/constants';
import { useUserProvider } from '../../../../../context/user';
import PreventScrollWrapper from '../../../../common/PreventScrollWrapper';

interface Props {
  sizes: any;
  sizesTable: string;
  selectedSize: string;
  isMissingSizeError: boolean;
  sizeSelectHandler: (value: string) => void;
}

export default function SizesSelector({
  sizes,
  sizesTable,
  selectedSize,
  isMissingSizeError,
  sizeSelectHandler,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: { sizeTitle, sizeTableBtn, unSelectedSizeAlert },
  } = languages[currentLanguage];

  const [hoveredSize, setHoveredSize] = React.useState<string>('');
  const [isSizeModal, setSizeModal] = React.useState<boolean>(false);
  const [stockMessageText, setStockMessageText] = React.useState<string>('');

  return (
    <>
      <Box sx={{ width: '100%', p: '1rem 0 0 0' }}>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          sx={{
            width: '100%',
            p: '0 0 0.5rem 0',
            borderBottom: '1px solid #C6C6C8',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...cocoRegular,
              color: '#4c4c4c',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            {sizeTitle}
          </Typography>

          {sizesTable && (
            <Typography
              variant="body1"
              onClick={() => setSizeModal(true)}
              sx={{
                ...cocoRegular,
                color: '#4c4c4c',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 500,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#C6C6C8',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  '&::after': { transform: 'translateX(101%)' },
                },
              }}
            >
              {sizeTableBtn}
            </Typography>
          )}
        </Stack>

        <table
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '1rem 0 0.5rem 0',
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
                const { size, isInStock, stockMessage } = item;

                const isHovered = hoveredSize === size;
                const isSelected = selectedSize === size;

                return (
                  <td
                    key={size}
                    onClick={
                      isInStock
                        ? () => {
                            if (isSelected) sizeSelectHandler('');
                            if (!isSelected) sizeSelectHandler(size);
                            if (stockMessage?.length) {
                              setStockMessageText(stockMessage);
                            } else {
                              setStockMessageText('');
                            }
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
                      height: isMobile ? '2.5rem' : '3.8rem',
                      cursor: isInStock ? 'pointer' : 'not-allowed',
                      color: '#050505',
                      fontSize: '0.75rem',
                      ...cocoBold,
                      textAlign: 'center',
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

        {isMissingSizeError && (
          <ErrorMessage style={{ fontSize: '0.85rem' }}>
            {unSelectedSizeAlert}
          </ErrorMessage>
        )}

        {stockMessageText?.length > 0 && (
          <ErrorMessage style={{ color: '#129c10', fontSize: '0.85rem' }}>
            {stockMessageText}
          </ErrorMessage>
        )}
      </Box>

      <Dialog
        open={isSizeModal}
        onClose={() => {
          setSizeModal(false);
        }}
      >
        <PreventScrollWrapper active={isSizeModal}>
          <img src={sizesTable} style={{ height: '50%' }} />
        </PreventScrollWrapper>
      </Dialog>
    </>
  );
}
