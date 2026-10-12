// @ts-nocheck
import * as React from 'react';
import { useQuery } from 'react-apollo';

import { getShopMenu } from '../../apollo/queries/shop';
import { getCheckout } from '../../apollo/queries/checkout';
import { storageLanguage, useUserProvider } from '../../context/user';
import { GUEST_TOKEN_NAME } from '../../constants';
import {
  getProductsByIds_products_edges_node_price as Price,
  getProductsByIds_products_edges_node_stockItems as StockItems,
  getProductsByIds_products_edges_node_imageGroups as Images,
} from '../../apollo/queries/types/getProductsByIds';

const HeaderContext: any = React.createContext(null);
export const useHeaderContext: any = (): any => React.useContext(HeaderContext);

const mockCartProductPrice: Price = {
  amount: NaN,
  currency: '--',
  localized: '--',
  __typename: 'Money',
};

interface Props {
  children: React.ReactNode;
}

export default function HeaderProvider({ children }: Props) {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  const localStorageLang = localStorage.getItem(storageLanguage);

  const {
    state: { currency, currentLanguage, isSubsButtonVisible },
    dispatch,
  } = useUserProvider();

  const [shopId, setShopId] = React.useState<string>('');
  const [newsLine, setNewsLine] = React.useState<string>('');
  const [collections, setCollections] = React.useState<any[]>([]);

  const [checkoutData, setCheckoutData] = React.useState<any>(null);

  const {
    data: shopData,
    error: shopError,
    loading: isShopLoading,
  } = useQuery(getShopMenu, {
    variables: { lang: currentLanguage },
  });

  React.useEffect(() => {
    if (!shopData?.shop?.navigation?.main) return;

    const data = shopData;
    const { id } = data.shop.navigation.main;
    const newsText: string = data.shop.topbarText;
    const { languageCode } = data.shop;
    const collectionsData: any[] = data.shop.navigation.main.items || [];
    const shouldSubPopUpBeShown: boolean = data.shop.popUp;

    // Nederlands is de standaardtaal; alleen overschrijven als de backend NL stuurt.
    if (
      languageCode &&
      languageCode.toUpperCase() === 'NL' &&
      !localStorageLang?.length
    ) {
      dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: 'NL',
      });
    }

    if (shouldSubPopUpBeShown !== isSubsButtonVisible) {
      dispatch({
        type: 'CHANGE_POPUP_VISIBILIY',
        payload: shouldSubPopUpBeShown,
      });
    }

    setShopId(id);
    setNewsLine(newsText);
    setCollections(collectionsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData]);

  const {
    data: checkoutQueryData,
    error: checkoutError,
    loading: isCheckoutLoading,
  } = useQuery(getCheckout, {
    // skip: !token,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: { lang: currentLanguage, token, currency },
  });

  const handleCheckoutData = React.useCallback(
    (data: any) => {
        if (data?.checkout?.lines) {
          const {
            id: checkoutId,
            lines,
            totalPrice,
            subtotalPrice,
            shippingPrice,
          } = data?.checkout || {};

          let totalQuantity: number = 0;
          const cartProductsData: any[] = [];

          lines.forEach((line: any) => {
            if (line?.variant?.product) {
              const { variant, quantity, userDesign } = line;
              const {
                id: productId,
                name,
                price,
                __typename,
                stockItems,
                imageGroups,
                discountPrice,
                salePercentValue,
              } = variant.product;

              totalQuantity += quantity;

              let userDesignUrl: string | null = null;

              if (
                userDesign?.customizedDesigns &&
                userDesign?.customizedDesigns[0]
              ) {
                const firstDesign = userDesign.customizedDesigns[0];

                if (firstDesign && firstDesign.customizedPngDesign) {
                  userDesignUrl = firstDesign.customizedPngDesign.url;
                }
              }

              const notNullStockItems: StockItems[] = [];
              const notNullImageGroups: Images[] = [];

              if (imageGroups) {
                imageGroups.forEach((group: any) => {
                  if (group) notNullImageGroups.push(group);
                });
              }

              if (stockItems) {
                stockItems.forEach((item: any) => {
                  if (item) notNullStockItems.push(item);
                });
              }

              cartProductsData.push({
                new: line.variant.product.new,
                name,
                size: line.size || '--',
                price: price || mockCartProductPrice,
                cartId: line.id,
                quantity: line.quantity,
                productId,
                __typename,
                stockItems: notNullStockItems,
                imageGroups: notNullImageGroups,
                stockMessage: line.stockMessage,
                userDesignId: line?.userDesign?.id,
                discountPrice,
                userDesignUrl,
                lineTotalPrice: line?.totalPrice?.localized,
                salePercentValue,
                selectedImageGroupId: line?.selectedImageGroup?.id,
              });
            }
          });

          setCheckoutData({
            id: checkoutId,
            totalPrice: totalPrice?.localized || '',
            subtotalPrice: subtotalPrice?.localized || '',
            shippingAmount: shippingPrice?.amount || 0,
            cartProducts: cartProductsData,
            cartLinesCounter: lines?.length || 0,
            cartProductsCounter: totalQuantity,
          });
        } else {
          setCheckoutData((prev: any) => ({ ...prev, cartProductsCounter: 0 }));
        }
    },
    [],
  );

  React.useEffect(() => {
    if (checkoutError) {
      setCheckoutData((prev: any) => ({ ...prev, cartProductsCounter: 0 }));
      return;
    }

    if (checkoutQueryData) handleCheckoutData(checkoutQueryData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutQueryData, checkoutError]);

  return (
    <HeaderContext.Provider
      value={{
        shop: {
          shopId,
          error: shopError,
          loading: isShopLoading,
          collections,
        },
        checkout: {
          ...checkoutData,
          error: checkoutError,
          loading: isCheckoutLoading,
        },
        newsLine,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
