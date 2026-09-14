// @ts-nocheck
import { gql } from 'apollo-boost';
import { fullUserFragment } from '../fragments';

export const updateCurrentUser = gql`
  ${fullUserFragment}
  mutation loggedUserUpdate($input: JorcustomUserUpdateInput!) {
    loggedUserUpdate(input: $input) {
      errors {
        field
        message
      }
      shippingAddressErrors {
        field
        message
      }
      billingAddressErrors {
        field
        message
      }
      token
      user {
        ...fullUserFragment
      }
    }
  }
`;

export const changePassword = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    userPasswordChange(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export const resetPassword = gql`
  mutation resetPassword($email: String!, $lang: String!) {
    passwordReset(email: $email, lang: $lang) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export const saveNewPassword = gql`
  mutation saveNewPassword(
    $newPassword: String!
    $token: String!
    $uid: String!
  ) {
    userPasswordChangeWithToken(
      newPassword: $newPassword
      token: $token
      uid: $uid
    ) {
      errors {
        field
        message
      }
      success
    }
  }
`;
