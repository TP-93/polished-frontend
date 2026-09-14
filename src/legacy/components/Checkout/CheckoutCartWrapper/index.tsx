// @ts-nocheck
import React, { ReactNode, useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import { ApolloError, ApolloClient } from 'apollo-boost';

import { getCheckout } from '../../../apollo/queries/checkout';
import { Checkout as CheckoutData } from '../../../apollo/queries/types/Checkout';
import { useUserProvider } from '../../../context/user';

import copyUserFromCacheToState, {
  dummyUser,
  UserResult,
} from './copyUserFromCacheToState';
import {
  getProductsByIds_products_edges_node_price as Price,
  getProductsByIds_products_edges_node_imageGroups as Images,
  getProductsByIds_products_edges_node_stockItems as StockItems,
} from '../../../apollo/queries/types/getProductsByIds';
import Loader from '../../common/PageDetails/Loader';
import ErrorMsg from '../../common/Errors';
import { OrderLine } from '../../../interfaces/product';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { Address, ShippingAddress } from '../../../interfaces/checkout';

type FetchPolicy =
  | 'cache-first'
  | 'network-only'
  | 'cache-only'
  | 'no-cache'
  | 'standby'
  | 'cache-and-network';

const defaultFetchPolicy: FetchPolicy = 'cache-first';

interface QueryProps {
  data: CheckoutData;
  loading: boolean;
  error?: ApolloError;
  client: ApolloClient<ReactNode>;
  refetch: () => void;
}

export interface CheckoutCartProps {
  checkoutId?: string;
  shippingMethodId?: string | null;
  orderLines: OrderLine[];
  totalQuantity: number;
  subtotalPrice: string | null;
  shippingPrice?: string | null;
  totalPrice?: string | null;
  address?: Address | null;
  shippingAddress?: ShippingAddress | null;
  email?: string;
  linesNumber: number;
  cartDiscount: string | null;
  voucherCode: string | null;
  discountAmount: string | null;
  refetch: () => void;
}

export default ({ children }: { children: (p: CheckoutCartProps) => void }) => {
  const [appolloClient, setApolloClient] = useState<any>();
  const [_fetchPolicy, setFetchPolicy] = useState(
    defaultFetchPolicy as FetchPolicy,
  );
  const [user, setUser] = useState<UserResult>(dummyUser);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (appolloClient && !isUserLoaded) {
      copyUserFromCacheToState(appolloClient, setUser);
      setIsUserLoaded(true);
    }
  }, [appolloClient]);

  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  const {
    state: { currency, currentLanguage },
  } = useUserProvider();

  const [prevCurrency, setPrevCurrency] = useState(currency);

  useEffect(() => {
    setPrevCurrency(currency);
  }, [currency]);

  return (
    <Query
      fetchPolicy={prevCurrency === currency ? 'cache-first' : 'network-only'}
      query={getCheckout}
      variables={{ token, currency, lang: currentLanguage }}
    >
      {({
        data: checkoutData,
        loading: checkoutLoading,
        error: checkoutError,
        client,
        refetch: refetchCheckout,
      }: QueryProps) => {
        if (!appolloClient) setApolloClient(client);
        if (checkoutLoading) return <Loader />;
        if (checkoutError)
          return (
            <ErrorMsg>
              {checkoutError.message || 'Er is iets fout gegaan'}
            </ErrorMsg>
          );

        if (checkoutData && checkoutData.checkout) {
          const {
            id,
            lines,
            email,
            subtotalPrice,
            shippingPrice,
            totalPrice,
            billingAddress,
            shippingAddress,
            shippingMethod,
            cartDiscount,
            voucherCode,
            discountAmount,
          } = checkoutData.checkout;
          const orderLines: OrderLine[] = [];
          let totalQuantity = 0;

          if (lines) {
            lines.forEach((line) => {
              if (line && line.variant && line.variant.product) {
                const { userDesign } = line;
                let userDesignUrl: string | null = null;

                if (
                  userDesign &&
                  userDesign.customizedDesigns &&
                  userDesign.customizedDesigns[0]
                ) {
                  const firstDesign = userDesign.customizedDesigns[0];

                  if (firstDesign && firstDesign.customizedPngDesign)
                    userDesignUrl = firstDesign.customizedPngDesign.url;
                }
                const {
                  imageGroups,
                  stockItems,
                  price,
                  id: productId,
                  name,
                  discountPrice,
                  salePercentValue,
                  __typename,
                } = line.variant.product;
                const notNullImageGroups: Images[] = [];
                const notNullStockItems: StockItems[] = [];
                const mockPrice: Price = {
                  __typename: 'Money',
                  currency: '--',
                  amount: NaN,
                  localized: '--',
                };

                if (imageGroups) {
                  imageGroups.forEach((group) => {
                    if (group) notNullImageGroups.push(group);
                  });
                }

                if (stockItems) {
                  stockItems.forEach((item) => {
                    if (item) notNullStockItems.push(item);
                  });
                }

                orderLines.push({
                  __typename,
                  name,
                  new: line.variant.product.new,
                  lineTotalPrice: line.totalPrice && line.totalPrice.localized,
                  productId,
                  imageGroups: notNullImageGroups,
                  stockItems: notNullStockItems,
                  price: price || mockPrice,
                  discountPrice,
                  cartId: line.id,
                  quantity: line.quantity,
                  size: line.size || '--',
                  salePercentValue,
                  userDesignId: line.userDesign && line.userDesign.id,
                  userDesignUrl,
                  selectedImageGroupId:
                    line.selectedImageGroup && line.selectedImageGroup.id,
                  stockMessage: line.stockMessage,
                });
              }
            });

            totalQuantity = lines.reduce((sum, line) => {
              if (line) return sum + line.quantity;
              return sum;
            }, 0);
          }

          const togglePolicyAndRefecthCheckout = async () => {
            setFetchPolicy('cache-and-network');
            await refetchCheckout();
            setFetchPolicy(defaultFetchPolicy);
          };

          return (
            <>
              {children({
                checkoutId: id,
                shippingMethodId: shippingMethod && shippingMethod.id,
                email: email || '',
                linesNumber: lines ? lines.length : 0,
                orderLines,
                totalQuantity,
                refetch: togglePolicyAndRefecthCheckout,
                subtotalPrice: subtotalPrice && subtotalPrice.localized,
                shippingPrice: shippingPrice && shippingPrice.localized,
                totalPrice: totalPrice && totalPrice.localized,
                cartDiscount: cartDiscount && cartDiscount.localized,
                voucherCode,
                discountAmount: discountAmount && discountAmount.localized,
                address: billingAddress
                  ? {
                      ...billingAddress,
                      country: billingAddress.country.code,
                    }
                  : user.userAddress,
                shippingAddress: shippingAddress
                  ? {
                      ...shippingAddress,
                      country: shippingAddress.country.code,
                    }
                  : user.userShippingAddress,
              })}
            </>
          );
        }

        return (
          <>
            {children({
              linesNumber: 0,
              orderLines: [],
              totalQuantity: 0,
              subtotalPrice: '',
              email: '',
              voucherCode: null,
              cartDiscount: null,
              address: null,
              discountAmount: null,
              shippingAddress: null,
              refetch: () => {},
            })}
          </>
        );
      }}
    </Query>
  );
};
