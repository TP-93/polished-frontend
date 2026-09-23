// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import Helmet from 'react-helmet';

import ProductInfo from './Info';
import ProductMedia from './Info/ProductMedia';
import AlsoLikeSection from './Info/AlsoLikeSection';
import StyleWithSection from './Info/StyleWithSection';

interface Props {
  product: any;
}

export default function Product({ product }: Props) {
  const isMobile = useMediaQuery('(max-width:767px)');

  const { imageGroups, styleWithProd, upsaleProducts } = product || {};

  const [isMounted, setMounted] = React.useState<boolean>(false);

  const analyticEventHandler = (properties: any) => {
    let itemDesign: string = '';

    if (properties?.designs?.length > 0) {
      const excludeExtension = properties?.designs[0].name
        .split('.')[0]
        .split('_');

      excludeExtension.pop();

      itemDesign = properties?.name?.split(' ')[0];
    }

    // @ts-ignore
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        items: [
          {
            item_name: properties?.name || '',
            item_id: properties?.productSku || '',
            item_group_id: properties?.productSku || '',
            price: properties?.price?.amount || '',
            item_category: properties?.category?.name || '',
            item_category2: properties?.category?.parent?.name || '',
            item_category3: properties?.color?.name || '',
            item_category4: itemDesign || '',
            item_category5: 'Original',
            item_variant: '',
            quantity: 1,
          },
        ],
      },
    });
  };

  React.useEffect(() => {
    if (isMounted) {
      if (product) analyticEventHandler(product);
    } else {
      setMounted(true);
    }
  }, [isMounted]);

  return (
    <Box sx={{ width: '100%' }}>
      <Helmet>
        <title>JORCUSTOM - {product.name}</title>
        <meta
          name="description"
          content={product.description.replace(/(<([^>]+)>)/gi, '')}
        />
      </Helmet>

      <Stack
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Box sx={{ width: isMobile ? '100%' : '50%' }}>
          <ProductMedia imageGroups={imageGroups} />
        </Box>

        <Box
          sx={{
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 0 : '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: isMobile ? '10px' : 0,
            width: isMobile ? '100%' : '50%',
            height: isMobile ? 'auto' : 'calc(100vh - 48px)',
          }}
        >
          <ProductInfo product={product} />
        </Box>
      </Stack>

      <StyleWithSection products={styleWithProd} />

      <AlsoLikeSection products={upsaleProducts} />
    </Box>
  );
}
