// @ts-nocheck
import React from 'react';
import { Query } from 'react-apollo';

import { getUserDesignInfo } from '../../../apollo/queries/products';

import { useUserProvider } from '../../../context/user';

import { QueryProps } from '../../../interfaces/common';
import CartModalWrapper from '../../common/Modals/CartModal';
import getCartModalImages from '../../Product/utils';
import { GUEST_TOKEN_NAME } from '../../../constants';

interface Props {
  productId: any;
  selectedSize: any;
  close: () => void;
  setCartProcessError: (error: string) => void;
  removeDesignHandler: () => void;
}

const ToolCartModal = ({
  productId,
  selectedSize,
  close,
  setCartProcessError,
  removeDesignHandler,
}: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, currentLanguage },
  } = useUserProvider();

  const vars = {
    lang: currentLanguage,
    token,
    currency,
    designId: productId,
  };

  const errorText = 'Cannot get product data. Try again later!';

  return (
    <Query query={getUserDesignInfo} variables={vars}>
      {({ data, error: productError }: QueryProps) => {
        if (productError) {
          setCartProcessError(errorText);
          return null;
        }

        if (data) {
          const { userDesign } = data;
          const { id: designId, name, product, customizedDesigns } = userDesign;

          const productImages = product?.imageGroups[0];
          let front: any = null;
          let back: any = null;

          if (productImages?.images?.length >= 2) {
            front = productImages?.images[0];
            back = productImages?.images[1];
          }

          const imageGroups: any[] = [
            {
              images: customizedDesigns.map((design: any) => ({
                ...design.customizedPngDesign,
              })),
            },
          ];

          let designProjection: string = '';

          if (customizedDesigns.length === 1) {
            designProjection = customizedDesigns[0]?.projection;

            if (designProjection === 'back')
              imageGroups[0].images.unshift(front);
            if (designProjection === 'front') imageGroups[0].images.push(back);
          }

          return (
            <CartModalWrapper
              product={product}
              designId={designId}
              selectedSize={selectedSize}
              userDesignName={name}
              checkoutImages={getCartModalImages(imageGroups)}
              close={close}
              networkErrorHandler={() => setCartProcessError(errorText)}
              removeDesignHandler={removeDesignHandler}
            />
          );
        }

        return null;
      }}
    </Query>
  );
};

export default ToolCartModal;
