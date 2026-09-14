// @ts-nocheck
import { ReactNode } from 'react';
import { ApolloClient } from 'apollo-boost';

import { getUserId } from '../../../apollo/queries/auth';
import { fullUserFragment } from '../../../apollo/fragments';
import { Address, ShippingAddress } from '../../../interfaces/checkout';

export interface UserResult {
  userEmail: string;
  userAddress: Address | null;
  userShippingAddress: ShippingAddress | null;
}

export const dummyUser: UserResult = {
  userEmail: '',
  userAddress: null,
  userShippingAddress: null,
};

export default async (
  client: ApolloClient<ReactNode>,
  setState: (user: UserResult) => void,
) => {
  try {
    const root = await client.query({ query: getUserId });

    if (root?.data?.userId) {
      const { userId } = root.data;

      const user = client.readFragment({
        id: `User:${userId}`,
        fragment: fullUserFragment,
        fragmentName: 'fullUserFragment',
      });

      if (user) {
        const {
          email,
          defaultBillingAddress: dBA,
          defaultShippingAddress: dSA,
        } = user;

        if (dBA) {
          delete dBA.__typename;
          delete dBA.id;
        }

        if (dSA) {
          delete dSA.__typename;
          delete dSA.id;
        }

        const userInfo: UserResult = {
          userEmail: email,
          userAddress: dBA ? { ...dBA, country: dBA.country.code } : null,
          userShippingAddress: dSA
            ? { ...dSA, country: dSA.country.code }
            : null,
        };

        setState(userInfo);
      }
    }
  } catch (e: any) {
    console.error(e);
  }
};
