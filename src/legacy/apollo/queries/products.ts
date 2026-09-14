// @ts-nocheck
import { gql } from 'apollo-boost';
import {
  imageGroupsFragment,
  productPageFragment,
  pageInfoFragment,
  customizedDesignFragment,
  changedTextLayersFragment,
  simpleProductFragment,
  simpleUserDesignFragment,
  simpleCustomizedDesignFragment,
} from '../fragments';

export const getDesignsForProduct = gql`
  ${productPageFragment}
  query getDesignsForProduct($slug: String!, $currency: String, $lang: String) {
    product(slug: $slug) {
      ...productPageFragment
    }
    colorThemes {
      id
      name
      colors
    }
  }
`;

export const getProducts = gql`
  ${pageInfoFragment}
  ${imageGroupsFragment}
  query getProducts(
    $first: Int
    $sizes: [String]
    $cursor: String
    $currency: String
    $categoryIds: [ID]
    $collectionIds: [ID]
  ) {
    products(
      first: $first
      after: $cursor
      sizes: $sizes
      categories: $categoryIds
      collections: $collectionIds
    ) {
      edges {
        node {
          id
          name
          slug
          new
          blackFriday
          salePercentValue
          color {
            name
            value
          }
          price(currency: $currency) {
            currency
            amount
            localized
          }
          stockItems {
            size
            isInStock
          }
          designs {
            id
          }
          discountPrice(currency: $currency) {
            currency
            amount
            localized
          }
          imageGroups {
            ...imageGroupsFragment
          }
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }

    totalProducts(categories: $categoryIds, collections: $collectionIds)

    stockItemSizes(categoryIds: $categoryIds)
  }
`;

export const getCollectionProducts = gql`
  ${pageInfoFragment}
  ${imageGroupsFragment}
  query getCollectionProducts(
    $categoryIds: [ID]
    $collectionIds: [ID]
    $cursor: String
    $sizes: [String]
    $currency: String
  ) {
    products(
      first: 100
      after: $cursor
      categories: $categoryIds
      collections: $collectionIds
      sizes: $sizes
    ) {
      edges {
        node {
          id
          name
          slug
          new
          category {
            rowNumber
          }
          color {
            name
            value
          }
          price(currency: $currency) {
            currency
            amount
            localized
          }
          stockItems {
            size
            isInStock
          }
          designs {
            id
          }
          discountPrice(currency: $currency) {
            currency
            amount
            localized
          }
          imageGroups {
            ...imageGroupsFragment
          }
          salePercentValue
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }

    totalProducts(categories: $categoryIds, collections: $collectionIds)
  }
`;

export const getUserDesignInfo = gql`
  ${changedTextLayersFragment}
  ${productPageFragment}
  ${customizedDesignFragment}
  ${simpleUserDesignFragment}
  query getUserDesign($designId: ID!, $currency: String, $lang: String) {
    userDesign(designId: $designId) {
      ...simpleUserDesignFragment
      changedTextLayers {
        ...changedTextLayersFragment
      }
      product {
        ...productPageFragment
      }
      customizedDesigns {
        ...customizedDesignFragment
      }
    }
    colorThemes {
      id
      name
      colors
    }
  }
`;

export const getUserDesigns = gql`
  ${pageInfoFragment}
  ${simpleProductFragment}
  ${simpleUserDesignFragment}
  ${simpleCustomizedDesignFragment}
  query getUserDesigns(
    $productId: ID
    $currency: String
    $cursor: String
    $token: UUID
  ) {
    userDesigns(
      token: $token
      productId: $productId
      after: $cursor
      first: 100
    ) {
      edges {
        node {
          ...simpleUserDesignFragment
          product {
            ...simpleProductFragment
          }
          customizedDesigns {
            ...simpleCustomizedDesignFragment
          }
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
