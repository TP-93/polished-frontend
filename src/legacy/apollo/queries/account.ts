// @ts-nocheck
import { gql } from 'apollo-boost';
import {
  orderFragment,
  pageInfoFragment,
  fullUserFragment,
} from '../fragments';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentUserInfo = gql`
  ${pageInfoFragment}
  ${fullUserFragment}
  ${orderFragment}
  query returnCurrentUser($cursor: String) {
    me {
      ...fullUserFragment

      orders(first: 12, after: $cursor) {
        edges {
          node {
            ...orderFragment
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
`;

export const getAddressByPostcode = gql`
  query getAddressByPostcode(
    $postCode: String!
    $houseNumber: String!
    $addition: String!
  ) {
    addressApi(
      postCode: $postCode
      houseNumber: $houseNumber
      addition: $addition
    ) {
      postCode
      houseNumber
      addition
      streetName
      city
      country
    }
  }
`;
