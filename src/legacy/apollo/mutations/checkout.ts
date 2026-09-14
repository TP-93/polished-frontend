// @ts-nocheck
import { gql } from 'apollo-boost';
import { checkoutFragment } from '../fragments';

export const createCheckout = gql`
  ${checkoutFragment}
  mutation createCheckout(
    $input: CheckoutCreateInput!
    $currency: String!
    $lang: String!
  ) {
    checkoutCreate(input: $input, currency: $currency, lang: $lang) {
      errors {
        field
        message
      }
      quantityErrors {
        productId
        size
        message
      }
      billingAddressErrors {
        field
        message
      }
      shippingAddressErrors {
        field
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const createOrMergeCheckout = gql`
  ${checkoutFragment}
  mutation checkoutCreateOrMerge(
    $input: CheckoutMergeInput!
    $lang: String
    $currency: String
  ) {
    checkoutCreateOrMerge(input: $input, currency: $currency) {
      shippingAddressErrors {
        field
        message
      }

      billingAddressErrors {
        field
        message
      }

      quantityErrors {
        size
        productId
        message
      }

      errors {
        field
        message
      }

      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const createOrMergeCheckoutLogOut = gql`
  ${checkoutFragment}
  mutation checkoutCreateOrMegeLogOut(
    $input: CheckoutMergeInput!
    $currency: String
    $lang: String
  ) {
    checkoutCreateOrMergeLogOut(input: $input, currency: $currency) {
      shippingAddressErrors {
        field
        message
      }

      billingAddressErrors {
        field
        message
      }

      quantityErrors {
        size
        productId
        message
      }

      errors {
        field
        message
      }

      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const updateShippingMethod = gql`
  ${checkoutFragment}
  mutation updateShippingMethod(
    $checkoutId: ID
    $shippingMethodId: ID!
    $date: Date
    $pickupPoint: String
    $token: UUID
    $currency: String
    $lang: String!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
      date: $date
      pickupPoint: $pickupPoint
      token: $token
      currency: $currency
    ) {
      errors {
        field
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

// $apiCode: UUID
// apiCode: $apiCode

export const finishCheckout = gql`
  mutation finishCheckout(
    $apiCode: UUID
    $checkoutId: ID!
    $currency: String!
    $token: UUID
    $lang: String!
  ) {
    checkoutFinish(
      apiCode: $apiCode
      checkoutId: $checkoutId
      currency: $currency
      token: $token
      lang: $lang
    ) {
      errors {
        field
        message
      }
      token
      paymentUrl
    }
  }
`;

export const addCheckoutLine = gql`
  ${checkoutFragment}
  mutation checkoutLinesAdd(
    $checkoutId: ID!
    $lines: [CheckoutLineInput]!
    $token: UUID
    $currency: String
    $lang: String
  ) {
    checkoutLinesAdd(
      checkoutId: $checkoutId
      lines: $lines
      token: $token
      currency: $currency
    ) {
      errors {
        field
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const updateCheckoutLine = gql`
  ${checkoutFragment}
  mutation checkoutLinesUpdate(
    $checkoutId: ID!
    $lines: [CheckoutLineInput]!
    $token: UUID
    $currency: String
    $lang: String
  ) {
    checkoutLinesUpdate(
      checkoutId: $checkoutId
      lines: $lines
      token: $token
      currency: $currency
    ) {
      errors {
        field
        message
      }
      quantityErrors {
        productId
        size
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const deleteCheckoutLine = gql`
  ${checkoutFragment}
  mutation checkoutLineDelete(
    $checkoutId: ID!
    $lineId: ID!
    $currency: String
    $token: UUID
    $lang: String
  ) {
    checkoutLineDelete(
      checkoutId: $checkoutId
      lineId: $lineId
      token: $token
      currency: $currency
    ) {
      errors {
        field
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const updateCheckoutAddresses = gql`
  ${checkoutFragment}
  mutation updateCheckoutAddresses(
    $checkoutId: ID!
    $billingAddress: AddressInput!
    $shippingAddress: AddressInput!
    $token: UUID
    $email: String!
    $currency: String
    $lang: String
  ) {
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email, token: $token) {
      errors {
        field
        message
      }

      checkout {
        ...checkoutFragment
      }
    }

    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
      token: $token
    ) {
      errors {
        field
        message
      }

      checkout {
        ...checkoutFragment
      }
    }

    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
      token: $token
    ) {
      errors {
        field
        message
      }
      checkout {
        ...checkoutFragment
      }
    }
  }
`;

export const deleteCheckout = gql`
  mutation checkoutDelete($checkoutId: ID!, $currency: String, $token: UUID) {
    checkoutDelete(
      checkoutId: $checkoutId
      currency: $currency
      token: $token
    ) {
      errors {
        field
        message
      }
    }
  }
`;

export const deleteVoucher = gql`
  mutation deleteVoucher($checkoutId: ID!, $token: UUID) {
    checkoutDeleteVoucher(checkoutId: $checkoutId, token: $token) {
      errors {
        field
        message
      }
      success
    }
  }
`;
