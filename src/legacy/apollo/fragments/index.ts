// @ts-nocheck
import { gql } from 'apollo-boost';

export const pageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

export const stockItemsFragment = gql`
  fragment stockItemsFragment on StockItem {
    size
    quantity
    isInStock
    stockMessage
  }
`;

export const imageGroupsFragment = gql`
  fragment imageGroupsFragment on ImageGroup {
    id
    url
    name
    imageSide
    images {
      url
    }
  }
`;

export const productDesignsFragment = gql`
  fragment printDesignFragment on PrintDesign {
    id
    name
    projection
    layers {
      layerType
      position
      options {
        id
        src
        displayName
        editable
        palette {
          color
          name
        }
        allColors
        defaultColor
        minChars
        maxChars
        rectangle {
          x
          y
          width
          height
        }
      }
    }
  }
`;

export const productPageFragment = gql`
  ${stockItemsFragment}
  ${imageGroupsFragment}
  ${productDesignsFragment}
  fragment productPageFragment on Product {
    id
    tag
    new
    slug
    name
    productSku
    isPublished
    chooseSizeBigger
    salePercentValue
    description(lang: $lang)
    sizeReference(lang: $lang)
    sizeTableImage
    color {
      name
      value
    }
    flexFoilColors
    category {
      name
      faq(lang: $lang)
      shippingFaq(lang: $lang)
      parent {
        name
      }
    }
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
    stockItems {
      ...stockItemsFragment
    }
    colorSelectionProducts {
      id
      name
      slug
      imageGroups {
        ...imageGroupsFragment
      }
    }
    imageGroups {
      ...imageGroupsFragment
    }
    designs {
      ...printDesignFragment
    }
    styleWithProd {
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
      designs {
        ...printDesignFragment
      }
      imageGroups {
        ...imageGroupsFragment
      }
      stockItems {
        ...stockItemsFragment
      }
    }
    upsaleProducts {
      name
      slug
      price {
        localized
      }
      discountPrice {
        localized
      }
      designs {
        id
      }
      imageGroups {
        ...imageGroupsFragment
      }
    }
  }
`;

// Apollo silently returns empty object after mutaion if fragments differs
export const cartProductFragment = gql`
  ${productPageFragment}
  fragment cartProductFragment on Product {
    ...productPageFragment
  }
`;

export const addressFragment = gql`
  fragment addressFragment on Address {
    id
    companyName
    firstName
    lastName
    streetAddress1
    houseNumber
    houseNumberAddition
    postalCode
    city
    country {
      country
      code
    }
    phone
  }
`;

export const userFragment = gql`
  fragment userFragment on User {
    id
    email
    firstName
    lastName
    personalDataAgreed
  }
`;

export const fullUserFragment = gql`
  ${addressFragment}
  ${userFragment}
  fragment fullUserFragment on User {
    ...userFragment
    defaultBillingAddress {
      ...addressFragment
    }
    defaultShippingAddress {
      ...addressFragment
    }
  }
`;

export const customizedPNGDesignFragment = gql`
  fragment customizedPNGDesignFragment on CustomizedPNGDesign {
    id
    url
  }
`;

export const changedTextLayersFragment = gql`
  fragment changedTextLayersFragment on ChangedTextLayer {
    printDesignId
    layerId
    src
    rectangle
  }
`;

export const customizedDesignFragment = gql`
  ${customizedPNGDesignFragment}
  fragment customizedDesignFragment on CustomizedPrintDesign {
    id
    projection
    customizations
    printDesign {
      id
    }
    customizedPngDesign {
      ...customizedPNGDesignFragment
    }
  }
`;

export const simpleCustomizedDesignFragment = gql`
  ${customizedPNGDesignFragment}
  fragment simpleCustomizedDesignFragment on CustomizedPrintDesign {
    id
    projection
    customizedPngDesign {
      ...customizedPNGDesignFragment
    }
  }
`;

export const userDesignFragment = gql`
  ${customizedDesignFragment}
  fragment userDesignFragment on UserDesign {
    id
    name
    customizedDesigns {
      ...customizedDesignFragment
    }
  }
`;

export const orderLineFragment = gql`
  ${imageGroupsFragment}
  ${userDesignFragment}
  ${imageGroupsFragment}
  fragment orderLineFragment on OrderLine {
    id
    unitPrice {
      amount
      currency
      localized
    }
    variant {
      id
      product {
        id
        name
        slug
        imageGroups {
          ...imageGroupsFragment
        }
      }
    }
    total {
      currency
      amount
      localized
    }
    selectedImageGroup {
      ...imageGroupsFragment
    }
    quantity
    size
    userDesign {
      ...userDesignFragment
    }
  }
`;

export const orderFragment = gql`
  ${orderLineFragment}
  fragment orderFragment on Order {
    id
    paymentStatus
    total {
      currency
      amount
      localized
    }
    lines {
      ...orderLineFragment
    }
  }
`;

export const simpleProductFragment = gql`
  fragment simpleProductFragment on Product {
    id
    slug
    name
    new
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
    salePercentValue
  }
`;

export const simpleUserDesignFragment = gql`
  fragment simpleUserDesignFragment on UserDesign {
    id
    name
  }
`;

export const checkoutLineFragment = gql`
  ${cartProductFragment}
  ${changedTextLayersFragment}
  ${productPageFragment}
  ${customizedDesignFragment}
  ${simpleUserDesignFragment}
  fragment checkoutLineFragment on CheckoutLine {
    id
    quantity
    size
    stockMessage
    userDesign {
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
    selectedImageGroup {
      id
    }
    totalPrice(currency: $currency) {
      localized
    }
    variant {
      id
      product {
        ...cartProductFragment
      }
    }
  }
`;

export const checkoutFragment = gql`
  ${cartProductFragment}
  ${checkoutLineFragment}
  fragment checkoutFragment on Checkout {
    id
    token
    email
    lines {
      ...checkoutLineFragment
    }
    user {
      email
    }
    billingAddress {
      firstName
      lastName
      streetAddress1
      houseNumber
      houseNumberAddition
      postalCode
      city
      countryArea
      country {
        country
        code
      }
      phone
    }
    shippingAddress {
      companyName
      firstName
      lastName
      streetAddress1
      houseNumber
      houseNumberAddition
      postalCode
      city
      countryArea
      country {
        country
        code
      }
      phone
    }
    availableShippingMethods {
      id
      name
      type
      price(currency: $currency) {
        currency
        amount
        localized
      }
      hasPreferredDateSelection
      hasPreferredPickupLocationSelection
    }
    shippingMethod {
      id
      name
      price(currency: $currency) {
        currency
        amount
        localized
      }
    }
    cartDiscount(currency: $currency) {
      localized
    }
    shippingPreferredDate
    shippingPreferredPickupLocation
    shippingPrice(currency: $currency) {
      currency
      amount
      localized
    }
    subtotalPrice(currency: $currency) {
      localized
    }
    totalPrice(currency: $currency) {
      localized
    }
    voucherCode
    discountAmount(currency: $currency) {
      localized
    }
  }
`;
