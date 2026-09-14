// @ts-nocheck
import { gql } from 'apollo-boost';

export const getCollection: any = gql`
  query getCollection($slug: String!, $lang: String!) {
    collection(slug: $slug) {
      id
      name
      faq(lang: $lang)
      description
    }
  }
`;

const getCollectionAndCategory = gql`
  query getCollectionAndCategory(
    $lang: String!
    $collection: String!
    $category: String!
  ) {
    collection(slug: $collection) {
      id
      name
      slug
      faq(lang: $lang)
      description
    }

    category(slug: $category) {
      id
      slug
      name
      rowNumber
      faq(lang: $lang)
      description
    }
  }
`;

export default getCollectionAndCategory;
