// @ts-nocheck
import { gql } from 'apollo-boost';
import { fullUserFragment } from '../fragments';

export const createTokenMutation = gql`
  ${fullUserFragment}
  mutation createToken($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      errors {
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

export const verifyTokenMutation = gql`
  ${fullUserFragment}
  mutation verifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...fullUserFragment
      }
    }
  }
`;
