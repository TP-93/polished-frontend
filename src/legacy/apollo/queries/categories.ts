// @ts-nocheck
import { gql } from 'apollo-boost';

// TODO: remove hardcode (unlikely there's more categories, but still)
// get top-level categories
export const getParentCategories = gql`
  query getParentCategories {
    categories(first: 100, level: 0) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
          }
          slug
          orderingPosition
          children(first: 100) {
            edges {
              node {
                id
                rowNumber
                name
                backgroundImage {
                  url
                  alt
                }
                slug
                orderingPosition
              }
            }
          }
        }
      }
    }
  }
`;

export const getCategory = gql`
  query getCategory($slug: String!, $lang: String!) {
    category(slug: $slug) {
      id
      name
      slug
      faq(lang: $lang)
      rowNumber
      description
    }
  }
`;

export const getCategoryFaq = gql`
  query getCategoryFaq($slug: String!, $lang: String!) {
    category(slug: $slug) {
      id
      faq(lang: $lang)
    }
  }
`;

export const getCategorySeoText = gql`
  query getCategorySeoText($slug: String!, $lang: String!) {
    category(slug: $slug) {
      id
      SEOCategoryText(lang: $lang)
    }
  }
`;
