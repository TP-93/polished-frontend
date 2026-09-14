// @ts-nocheck
import React from 'react';
import { v4 as uuid4 } from 'uuid';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from 'react-apollo';

import { verifyTokenMutation } from '../../apollo/mutations/auth';

import Loader from '../common/PageDetails/Loader';
import PageWrapper from '../common/PageDetails/PageWrapper';
import { AUTH_TOKEN_NAME, GUEST_TOKEN_NAME } from '../../constants';

interface CheckerProps {
  client: any;
  children: React.ReactElement;
}

const LoginChecker = ({ children, client }: CheckerProps) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);
  const prevGuestToken = localStorage.getItem(GUEST_TOKEN_NAME);

  const [loading, setLoading] = React.useState<boolean>(true);

  const checkAuthState = async () => {
    let userId = null;
    let isLoggedIn = false;

    try {
      if (token) {
        const res = await client.mutate({
          mutation: verifyTokenMutation,
          variables: { token },
        });

        if (res?.data?.tokenVerify) {
          const { user } = res.data.tokenVerify;
          isLoggedIn = true;
          userId = user?.id;
        }
      } else if (!guestToken && !token && prevGuestToken) {
        console.log('checker found no guest or auth token');
        localStorage.setItem(GUEST_TOKEN_NAME, prevGuestToken);
      } else if (!guestToken && !token && !prevGuestToken) {
        console.log('checker found no token at all');
        localStorage.setItem(GUEST_TOKEN_NAME, uuid4());
      }
    } catch (e: any) {
      // wrong token
      if (e?.graphQLErrors && !isLoggedIn) {
        localStorage.removeItem(AUTH_TOKEN_NAME);
      }
    } finally {
      client.writeData({ data: { isLoggedIn, userId } });
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkAuthState();
  }, []);

  if (loading)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );

  return <>{children}</>;
};

const LoginApolloWrapper = ({ children }: { children: JSX.Element }) => (
  <ApolloConsumer>
    {(client: ApolloClient<any>) => (
      <LoginChecker client={client}>{children}</LoginChecker>
    )}
  </ApolloConsumer>
);

export default LoginApolloWrapper;
