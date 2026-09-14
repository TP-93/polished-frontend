// @ts-nocheck
import { gql } from 'apollo-boost';

export const isAuthenticated = gql`
  query checkAuthenticatedState {
    isLoggedIn @client
  }
`;

export const getUserId = gql`
  query getUserId {
    userId @client
  }
`;
