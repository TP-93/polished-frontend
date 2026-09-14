// @ts-nocheck
import { gql } from 'apollo-boost';

export default gql`
  query getPage($slug: String!, $lang: String!) {
    page(slug: $slug) {
      id
      slug
      title(lang: $lang)
      content(lang: $lang)
    }
  }
`;
