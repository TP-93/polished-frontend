// @ts-nocheck
import { gql } from 'apollo-boost';

export default gql`
  mutation newsletterSubscribe($input: SubscribeNewsletterInput!) {
    newsletterSubscribe(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;
