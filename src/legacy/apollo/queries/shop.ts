// @ts-nocheck
import { gql } from 'apollo-boost';
import { pageInfoFragment, imageGroupsFragment } from '../fragments';

// get top-level categories
export const getShopMenu = gql`
  query getShopMenu($lang: String!) {
    shop {
      topbarText(lang: $lang)
      popUp
      countries {
        code
        country
      }
      languageCode
      currencies
      navigation {
        main {
          id
          items {
            id
            name
            enableSubmenu
            page {
              slug
            }
            collection {
              name
              slug
              productCategoryList {
                id
                slug
                name
                parentName
                position
                parentPosition
              }
            }
          }
        }
      }
    }
  }
`;

export const getMenuImage = gql`
  query getMenuImage($id: ID) {
    menu(id: $id) {
      menuImage
    }
  }
`;

// TODO: remove hardcode
export const getShopHomePageCollection = gql`
  ${pageInfoFragment}
  ${imageGroupsFragment}
  query getShopHomePageCollection($currency: String) {
    shop {
      homepageCollection {
        name
        products(first: 100) {
          edges {
            node {
              id
              name
              slug
              price(currency: $currency) {
                currency
                amount
                localized
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
      }
    }
  }
`;

export const getHomePageSections = gql`
  ${imageGroupsFragment}
  query getHomePageSections($lang: String, $currency: String) {
    homePageSections {
      sections(lang: $lang) {
        video
        sectionOn
        sectionText
        sectionLink
        videoMobile
        backgroundImage
        backgroundImageMobile
        products {
          id
          name
          slug
          new
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
    }
  }
`;
