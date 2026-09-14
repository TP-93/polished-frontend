// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import MediaQuery from 'react-responsive';
import { v4 as uuid4 } from 'uuid';
import { Query, useApolloClient, useMutation } from 'react-apollo';

import Loader from '../components/common/PageDetails/Loader';
import initState from '../apollo/local/initState';
import PageTitle from '../components/common/PageDetails/PageTitle';
import OrderList from '../components/Orders/OrderList';
import MobileLink from '../components/Header/MobileMenu/MobileLink';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import ErrorMessage from '../components/common/Errors';
import PasswordForm from '../components/Account/PasswordForm';
import AddressForms from '../components/Checkout/AddressForms';
import AccountTabNav from '../components/Account/TabNav';
import { getCheckout } from '../apollo/queries/checkout';
import listenScreenWidth from '../utils/hooks/listenScreenWidth';
import { BtnBlackMedium } from '../components/common/Buttons';
import { useUserProvider } from '../context/user';
import { getCurrentUserInfo } from '../apollo/queries/account';
import { Address, ShippingAddress } from '../interfaces/checkout';
import { createOrMergeCheckoutLogOut } from '../apollo/mutations/checkout';
import { desktop, noDesktop, cocoBold } from '../styles/constants';
import {
  AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  PREV_GUEST_TOKEN_NAME,
} from '../constants';

const DATA_TAB: string = 'dataTab';
const ORDER_TAB: string = 'orderTab';
const SECURITY_TAB: string = 'securityTab';
const MOBILE_ACCOUNT: string = 'mobileAccount';

interface UserCacheMock {
  email?: string;
  address?: Address;
  shippingAddress?: ShippingAddress;
}

interface Props {
  history: any;
  location: Location;
}

const Account = ({ location, history }: Props) => {
  const prevToken: any = localStorage.getItem(PREV_GUEST_TOKEN_NAME);
  const token: string = prevToken || uuid4();

  const client = useApolloClient();

  const {
    state: { currency, languages, currentLanguage: lang },
  } = useUserProvider();

  const {
    Account: {
      pageTitle,
      errorMessage,
      noDesktop: {
        acountCategory: { profile, orders, security, btnText },
      },
    },
  } = languages[lang];

  const [logoutRequest, { loading: isLoading }] = useMutation(
    createOrMergeCheckoutLogOut,
    {
      refetchQueries: ['checkAuthenticatedState'],
      variables: {
        lang,
        input: {
          token,
        },
        currency,
      },
      onCompleted: (data) => {
        localStorage.removeItem(AUTH_TOKEN_NAME);
        localStorage.setItem(GUEST_TOKEN_NAME, token);

        client.writeData({ data: initState });

        if (data) {
          client.writeQuery({
            query: getCheckout,
            data: data.checkoutCreateOrMergeLogOut,
            variables: { token },
          });

          history.push('/');
        }
      },
    },
  );

  const userCacheMock: UserCacheMock = {
    email: '',
    address: undefined,
    shippingAddress: undefined,
  };

  const [keyValue, setKeyValue] = React.useState<any>(location.pathname);
  const [isMobile, setIsMobile] = React.useState(false);
  const [togglers, setTogglers] = React.useState(DATA_TAB);
  const [userCache, setUserCache] = React.useState(userCacheMock);

  listenScreenWidth(setIsMobile);

  React.useEffect(() => {
    setKeyValue(location.pathname);
  }, [location]);

  React.useEffect(() => {
    const desktopTab = location.pathname.includes('orders')
      ? ORDER_TAB
      : DATA_TAB;

    setTogglers(isMobile ? MOBILE_ACCOUNT : desktopTab);
  }, [isMobile, keyValue]);

  const toggleTab = (e: React.ChangeEvent): any => {
    setTogglers(e.target.id);
  };

  return (
    <PageWrapper key={keyValue}>
      <MediaQuery query={desktop}>
        <PageTitle title={pageTitle} />

        <AccountTabNav
          // @ts-ignore
          activeTab={togglers}
          toggleState={toggleTab}
        />
      </MediaQuery>

      <Query query={getCurrentUserInfo}>
        {({ data, loading, error, fetchMore }: any) => {
          if (loading) return <Loader />;
          if (error && !data)
            return <ErrorMessage>{errorMessage}</ErrorMessage>;

          const {
            email,
            personalDataAgreed,
            defaultBillingAddress,
            defaultShippingAddress,
          } = data.me;
          const { country: shippingCountry } = defaultShippingAddress;
          const {
            firstName,
            lastName,
            country: billingCountry,
          } = defaultBillingAddress;

          return (
            <>
              <MediaQuery query={noDesktop}>
                {togglers !== MOBILE_ACCOUNT && (
                  <MobileLink
                    title="account"
                    reverse
                    onClick={() => {
                      setTogglers(MOBILE_ACCOUNT);
                    }}
                  />
                )}
              </MediaQuery>

              <MobileWrapper>
                {togglers === MOBILE_ACCOUNT && (
                  <MobileContainer>
                    <MobileTop>{`${firstName} ${lastName}`}</MobileTop>
                    <MobileLink
                      title={profile}
                      onClick={() => {
                        setTogglers(DATA_TAB);
                      }}
                    />
                    <MobileLink
                      title={orders}
                      onClick={() => {
                        setTogglers(ORDER_TAB);
                      }}
                    />
                    <MobileLink
                      title={security}
                      onClick={() => {
                        setTogglers(SECURITY_TAB);
                      }}
                    />

                    <BtnBlackMedium
                      role="none"
                      disabled={isLoading}
                      onClick={() => {
                        logoutRequest();
                      }}
                    >
                      {btnText}
                    </BtnBlackMedium>
                  </MobileContainer>
                )}

                {togglers === DATA_TAB && (
                  <AddressFormsContainer>
                    <AddressForms
                      account
                      checkoutEmail={email}
                      checkoutAddress={{
                        ...defaultBillingAddress,
                        country: billingCountry.code,
                      }}
                      checkoutShippingAddress={{
                        ...defaultShippingAddress,
                        country: shippingCountry.code,
                      }}
                      cachedEmail={userCache?.email}
                      cachedAddress={userCache.address}
                      cachedShippingAddress={userCache.shippingAddress}
                      cacheUserData={(user) => {
                        setUserCache(user);
                      }}
                      personalDataAgreed={personalDataAgreed}
                      // mock for ts
                      orderLines={[]}
                      openNextSection={() => {}}
                      showQuantityErrors={() => {}}
                    />
                  </AddressFormsContainer>
                )}

                {togglers === ORDER_TAB && (
                  <OrderList
                    orders={data.me.orders.edges}
                    hasNextPage={data.me.orders.pageInfo.hasNextPage}
                    loadMore={() => {
                      fetchMore({
                        variables: {
                          cursor: data.me.orders.pageInfo.endCursor,
                        },
                        updateQuery: (
                          previousResult: any,
                          { fetchMoreResult }: any,
                        ) => {
                          const {
                            me: {
                              orders: { edges: newEdges, pageInfo },
                            },
                          } = fetchMoreResult;

                          if (newEdges.length) {
                            const newResult = JSON.parse(
                              JSON.stringify(previousResult),
                            );

                            newResult.me.orders = {
                              __typename: previousResult.me.orders.__typename,
                              edges: [
                                ...previousResult.me.orders.edges,
                                ...newEdges,
                              ],
                              pageInfo,
                            };

                            return newResult;
                          }

                          return previousResult;
                        },
                      });
                    }}
                  />
                )}

                {togglers === SECURITY_TAB && <PasswordForm />}
              </MobileWrapper>
            </>
          );
        }}
      </Query>
    </PageWrapper>
  );
};

const MobileWrapper = styled.div`
  min-height: calc(100vh - 62px);

  @media ${desktop} {
    height: auto;
  }
`;

const MobileContainer = styled.div`
  width: 100%;

  & > ${BtnBlackMedium} {
    width: 100px;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: black;
  ${cocoBold};
  color: white;
  font-size: 12px;
  text-transform: uppercase;
`;

const AddressFormsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export default Account;
