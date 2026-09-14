// @ts-nocheck
import ApolloClient from 'apollo-boost';

import resolvers from './local/resolvers';
import initState from './local/initState';

import { AUTH_TOKEN_NAME } from '../constants';

const client = new ApolloClient({
  uri: '/api/graphql',
  request: async (operation) => {
    const token = await localStorage.getItem(AUTH_TOKEN_NAME);

    if (!token) {
      const { cache } = operation.getContext();

      cache.writeData({
        data: {
          isLoggedIn: false,
        },
      });
    } else {
      operation.setContext({
        headers: {
          authorization: token
            ? `JWT ${localStorage.getItem(AUTH_TOKEN_NAME)}`
            : '',
        },
      });
    }
  },
  onError: (error: any) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      try {
        const { cache } = error.operation.getContext();

        cache.writeData({
          data: {
            isLoggedIn: false,
          },
        });

        localStorage.removeItem(AUTH_TOKEN_NAME);
      } catch (e: any) {
        console.error(e);
      }
    }
  },
  resolvers,
});

client.writeData({ data: initState });

export default client;
