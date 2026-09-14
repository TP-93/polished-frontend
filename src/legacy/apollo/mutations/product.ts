// @ts-nocheck
import { gql } from 'apollo-boost';
import { customizedDesignFragment } from '../fragments';

export const createUserDesign = gql`
  ${customizedDesignFragment}
  mutation createUserDesign($input: UserDesignInput!) {
    userDesignCreate(input: $input) {
      userDesign {
        id
        name
        token
        customizedDesigns {
          ...customizedDesignFragment
        }
      }
      success
      errorList {
        id
        errors {
          field
          message
        }
      }
    }
  }
`;

export const bulkUpdateCustomizedDesign = gql`
  ${customizedDesignFragment}
  mutation bulkUpdateCustomizedDesign(
    $input: [UpdateCustomizedPrintDesignInput]!
    $token: UUID
  ) {
    customizedDesignBulkUpdate(input: $input, token: $token) {
      success
      userDesign {
        id
        name
        customizedDesigns {
          ...customizedDesignFragment
        }
      }
      errorList {
        id
        errors {
          field
          message
        }
      }
    }
  }
`;

export const deleteCustomizedDesign = gql`
  mutation bulkDeleteUserDesign($ids: [ID]!, $token: UUID) {
    userDesignBulkDelete(ids: $ids, token: $token) {
      count
      errors {
        field
        message
      }
    }
  }
`;

export const getSizeProposal = gql`
  query getSize($height: Int!, $weight: Int!, $productId: ID!) {
    productSizeReference(
      height: $height
      weight: $weight
      productId: $productId
    ) {
      size
    }
  }
`;
