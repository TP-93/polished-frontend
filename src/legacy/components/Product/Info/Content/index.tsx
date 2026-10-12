// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';

import { Stack as Stack } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import { useMediaQuery } from '@mui/material';

import Details from './Details';
import MainContent from './MainContent';
import SizeProposal from './SizeProposal';
import ShippingInfo from './Shipping';

import MobileDrawer from '../MobileDrawer';
import { useUserProvider } from '../../../../context/user';
import { cocoBold, cocoRegular } from '../../../../styles/constants';
import { ProductInfoContentType } from '../index';

const titles: any = {
  details: {
    EN: 'Product Details',
    NL: 'Productdetails',
  },
  proposal: {
    EN: 'Size Reference & Proposal',
    NL: 'Maat Referentie & Voorstel',
  },
  shipping: {
    EN: 'Shipping & Returns',
    NL: 'Verzending & Retourneren',
  },
};

interface Props {
  type: ProductInfoContentType;
  product: any;
  contentChangeHandler: (type: ProductInfoContentType) => void;
}

export default function Content({
  type,
  product,
  contentChangeHandler,
}: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currentLanguage },
  } = useUserProvider();

  const { id: productId, sizeReference } = product || {};
  const { faq, shippingFaq } = (product && product.category) || {};

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {!isMobile && type !== 'main' && (
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          onClick={() => contentChangeHandler('main')}
          sx={{
            pb: '2rem',
            width: '100%',
            '& > *': { ...cocoRegular, fontWeight: 700 },
          }}
        >
          <Typography
            sx={{
              ...cocoBold,
              textTransform: 'uppercase',
              fontSize: 'calc(0.5em + 1vmin)',
              fontWeight: 700,
              color: '#050505',
            }}
          >
            {titles[type][currentLanguage]}
          </Typography>

          <CloseIcon sx={{ cursor: 'pointer' }} />
        </Stack>
      )}

      <Box sx={{ width: '100%' }}>
        {type === 'main' && <MainContent product={product} />}

        {isMobile && type !== 'main' && (
          <MobileDrawer
            type={type}
            closeDrawer={() => contentChangeHandler('main')}
          >
            {type === 'details' && (
              <Details faq={faq} description={product?.description || ''} />
            )}

            {type === 'proposal' && (
              <SizeProposal
                productId={productId}
                sizeReference={sizeReference}
              />
            )}

            {type === 'shipping' && <ShippingInfo shippingFaq={shippingFaq} />}
          </MobileDrawer>
        )}

        {!isMobile && (
          <>
            {type === 'details' && (
              <Details faq={faq} description={product?.description || ''} />
            )}

            {type === 'proposal' && (
              <SizeProposal
                productId={productId}
                sizeReference={sizeReference}
              />
            )}

            {type === 'shipping' && <ShippingInfo shippingFaq={shippingFaq} />}
          </>
        )}
      </Box>
    </Box>
  );
}
