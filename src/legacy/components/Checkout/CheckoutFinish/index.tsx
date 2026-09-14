// @ts-nocheck
import React from 'react';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-boost';

import { useUserProvider } from '../../../context/user';

import { getCheckout } from '../../../apollo/queries/checkout';
import { Checkout as CheckoutData } from '../../../apollo/queries/types/Checkout';

import Finish from './Finish';
import Loader from '../../common/PageDetails/Loader';
import { OrderLine } from '../../../interfaces/product';
import ErrorMessage from '../../common/Errors';
import DeliveryOverview from '../DeliveryOverview';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { compareAddresses } from '../AddressForms';
import SmallProductOverview from '../SmallProductOverview';
import PersonalInfoOverview from '../PersonalInfoOverview';

interface QueryProps {
  data: CheckoutData;
  loading: boolean;
  error?: ApolloError;
}

interface Props {
  products: OrderLine[];
  hideButton?: boolean;
  changeSection: (key: string) => void;
}

export default ({ products, hideButton, changeSection }: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, currentLanguage },
  } = useUserProvider();

  return (
    <Query
      query={getCheckout}
      variables={{ token, currency, lang: currentLanguage }}
    >
      {({ data, loading, error }: QueryProps) => {
        if (loading) return <Loader />;

        if (error)
          return (
            <ErrorMessage>
              {error.message || 'Er is iets fout gegaan'}
            </ErrorMessage>
          );

        if (!data.checkout) changeSection('address');

        if (data.checkout) {
          const {
            id,
            email,
            shippingPrice,
            shippingMethod,
            billingAddress,
            shippingAddress,
            shippingPreferredDate,
            shippingPreferredPickupLocation,
          } = data.checkout;

          if (!billingAddress) changeSection('address');
          if (!shippingMethod) changeSection('shipping');

          const sameAddress = compareAddresses(
            billingAddress && {
              ...billingAddress,
              country: billingAddress.country.code,
            },
            shippingAddress && {
              ...shippingAddress,
              country: shippingAddress.country.code,
            },
          );

          return (
            <>
              <SmallProductOverview
                products={products}
                openShoppingBag={() => changeSection('bag')}
              />
              <PersonalInfoOverview
                email={email}
                address={billingAddress}
                shippingAddress={shippingAddress}
                sameAddress={sameAddress}
                openAddressForm={() => changeSection('address')}
              />
              <DeliveryOverview
                date={shippingPreferredDate}
                location={shippingPreferredPickupLocation}
                price={shippingPrice && shippingPrice}
                openShippingMethods={() => changeSection('shipping')}
              />
              <Finish id={id} hideButton={hideButton} />
            </>
          );
        }
        return <ErrorMessage>Er is iets fout gegaan</ErrorMessage>;
      }}
    </Query>
  );
};
