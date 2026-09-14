// @ts-nocheck
import React from 'react';

import { List as List } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';
import { ListItem as ListItem } from '@mui/material';
import { Typography as Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import { useUserProvider } from '../../../context/user';
import { cocoBold, cocoRegular } from '../../../styles/constants';
import { ProductInfoContentType } from './index';

import { ReactComponent as RightArrow } from '../../../assets/images/icons/arrows/right_arrow_icon_black.svg.tsx';

interface Props {
  contentType: ProductInfoContentType;
  contentChangeHandler: (type: ProductInfoContentType) => void;
}

export default function Tabs({ contentType, contentChangeHandler }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const tabs: any[] = [
    { type: 'details', EN: 'Product Details', NL: 'Product Details' },
    {
      type: 'proposal',
      EN: 'Size Reference & Proposal',
      NL: 'Maat Referentie & Voorstel',
    },
    {
      type: 'shipping',
      EN: 'Shipping & Returns',
      NL: 'Verzending & Retourneren',
    },
  ];

  if (isMobile) {
    return (
      <>
        <List disablePadding sx={{ pt: '1.5rem' }}>
          {tabs.map((tab: any) => {
            return (
              <ListItem
                key={tab.type}
                disablePadding
                onClick={() => contentChangeHandler(tab.type)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: '1px solid gray',
                  '&:first-child': { borderTop: '1px solid gray' },
                }}
              >
                <Typography
                  style={{
                    ...cocoBold,
                    color: '#000',
                    fontSize: '0.75rem',
                  }}
                >
                  {tab[currentLanguage]}
                </Typography>

                <SvgIcon
                  component={RightArrow}
                  inheritViewBox
                  sx={{
                    height: '16px',
                    path: { fill: '#000' },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </>
    );
  }

  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      sx={{
        pb: '1rem',
      }}
    >
      {tabs.map((tab: any) => {
        return (
          <Typography
            key={tab.type}
            variant="body1"
            onClick={() => contentChangeHandler(tab.type)}
            sx={{
              ...cocoRegular,
              cursor: 'pointer',
              color: '#4c4c4c',
              fontSize: '0.75rem',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: tab.type !== contentType ? '1px' : 0,
                backgroundColor: '#C6C6C8',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                '&::after': { transform: 'translateX(101%)' },
              },
            }}
          >
            {tab[currentLanguage]}
          </Typography>
        );
      })}
    </Stack>
  );
}
