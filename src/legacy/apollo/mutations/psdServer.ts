// @ts-nocheck
import { gql } from 'apollo-boost';

export const initSession = gql`
  mutation initSession($productId: ID!, $psdName: ID!, $token: UUID) {
    initEditingSession(
      productId: $productId
      psdName: $psdName
      token: $token
    ) {
      limitReached
      success
      product {
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
`;

export const sessionHeartBeat = gql`
  mutation SessionHeartBeat($token: UUID, $productId: ID!) {
    sessionHeartbeat(token: $token, productId: $productId) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export const finalizeEditingSession = gql`
  mutation FinalizeEditing($psdNames: [ID]!, $token: UUID) {
    finalizeEditingSession(psdNames: $psdNames, token: $token) {
      success
      errors {
        field
        message
      }
    }
  }
`;

export const editText = gql`
  mutation EditTextLayer($input: EditTextLayerInput!, $token: UUID) {
    editTextLayer(input: $input, token: $token) {
      newTextLayerImgUrl
      rectangle
      success
      errors {
        field
        message
      }
    }
  }
`;

export const removeEarliestProduct = gql`
  mutation RemoveEarliestProduct($token: UUID) {
    removeEarliestProduct(token: $token) {
      success
      errors {
        field
        message
      }
    }
  }
`;
