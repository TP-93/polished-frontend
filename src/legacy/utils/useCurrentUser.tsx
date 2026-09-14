// @ts-nocheck
import React from 'react';

import { useQuery } from 'react-apollo';

import { useUserProvider } from '../context/user';
import { getCurrentUserInfo } from '../apollo/queries/account';

// @ts-ignore
export default function useCurrentUser() {
  const { dispatch } = useUserProvider();

  useQuery(getCurrentUserInfo, {
    onError: () => {
      // console.log('guest');
    },
    onCompleted: (data) => {
      if (data?.me?.email) {
        const { me } = data || {};
        const { email, defaultBillingAddress } = me || {};
        const {
          // city,
          phone,
          // country,
          // lastName,
          // firstName,
          // postalCode,
          // streetAddress1,
        } = defaultBillingAddress || {};

        if (email?.length > 0) {
          // console.log('user');

          dispatch({
            type: 'SAVE_USER_DATA',
            payload: {
              // city,
              email,
              phone,
              // street: streetAddress1,
              // country: country?.code || '',
              // lastName,
              // firstName,
              // postalCode,
            },
          });
        }
      }
    },
  });

  return <></>;
}
