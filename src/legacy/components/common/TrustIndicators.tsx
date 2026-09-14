// @ts-nocheck
import React from 'react';

import { Stack as Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import { CheckBoxSharp as CheckBoxSharpIcon } from '@mui/icons-material';

import { useUserProvider } from '../../context/user';
import { cocoBold, cocoRegular } from '../../styles/constants';

export default function TrustIndicators() {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Cart } = languages[currentLanguage];
  const {
    jorCustomPerks: { perk1, perk2, perk3, perk4, perk5, perk6, perk7 },
  } = Cart;

  const conditions: any[] = [perk1, perk2, perk3, perk4, perk5, perk6, perk7];

  return (
    <Stack
      display="flex"
      flexDirection="column"
      sx={{ paddingTop: isMobile ? '1.5rem' : 'auto' }}
    >
      {conditions.map((condition: any, index: number) => {
        const conditionStart: string = 'perk#Start';
        const conditionEnd: string = 'perk#End';

        const startKey = conditionStart.replace('#', String(index + 1));
        const endKey = conditionEnd.replace('#', String(index + 1));

        const firstPartStyle =
          index === 1 ? { ...cocoBold } : { ...cocoRegular };
        const secondPartStyle =
          index === 2 || index === 1 ? { ...cocoRegular } : { ...cocoBold };

        return (
          <Stack
            key={condition[startKey]}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <CheckBoxSharpIcon
              sx={{
                display: 'inline-block',
                mr: '5px',
                width: '18px',
                height: '18px',
              }}
            />

            <Stack
              sx={{
                display: 'inline-flex',
                alignItems: index !== 4 ? 'center' : 'flex-start',
                flexDirection: index === 4 ? 'column' : 'row',
                justifyContent: 'flex-start',
              }}
            >
              <span
                style={{
                  ...firstPartStyle,
                  display: 'inline-block',
                  color: '#050505',
                  fontSize: isMobile ? '8px' : '12px',
                  verticalAlign: 'middle',
                }}
              >
                {condition[startKey]}
              </span>

              <span
                style={{
                  ...secondPartStyle,
                  display: 'inline-block',
                  color: '#050505',
                  fontSize: isMobile ? '8px' : '12px',
                  marginLeft: index === 4 ? '0' : '2px',
                  verticalAlign: 'middle',
                }}
              >
                {condition[endKey]}
              </span>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
