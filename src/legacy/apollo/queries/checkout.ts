// @ts-nocheck
import { gql } from 'apollo-boost';
import { checkoutFragment } from '../fragments';

export const getCheckout = gql`
  ${checkoutFragment}
  query Checkout($token: UUID, $currency: String, $lang: String) {
    checkout(token: $token) {
      ...checkoutFragment
    }
  }
`;

export const validateCheckoutExistence = gql`
  ${checkoutFragment}
  query ValidateCheckoutExistence(
    $token: UUID
    $currency: String
    $lang: String
  ) {
    checkout(token: $token) {
      ...checkoutFragment
    }
  }
`;

export const getOrderStatus = gql`
  query getOrderStatus($token: String!) {
    orderByToken(token: $token) {
      id
      number
      paymentStatus
      total {
        currency
        amount
      }
      shippingPrice {
        gross {
          currency
          amount
        }
      }
      lines {
        id
        tag
        productSku
        productName
        productSlug
        unitPrice {
          amount
          localized
          currency
        }
        variant {
          product {
            category {
              name
              parent {
                name
              }
            }
          }
        }
        userDesign {
          id
        }
        size
        quantity
      }
      userEmail
      user {
        firstName
        lastName
      }
      billingAddress {
        city
        phone
        country {
          code
        }
        lastName
        firstName
        postalCode
        streetAddress1
        streetAddress2
      }
    }
  }
`;
