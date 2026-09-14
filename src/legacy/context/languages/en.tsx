// @ts-nocheck
const jorCustomPerks = {
  perk1: {
    perk1Start: 'Order before 15.00h on working days,',
    perk1End: 'delivered tomorrow',
  },
  perk2: {
    perk2Start: 'Free delivery, ',
    perk2End: 'on orders above €75',
  },
  perk3: {
    perk3Start: 'Easily return',
    perk3End: 'your item',
  },
  perk4: {
    perk4Start: 'Return within',
    perk4End: ` 14 days`,
  },
  perk5: {
    perk5Start: 'Customized items can also be returned.',
    perk5End: 'Change for different size or receive gift card',
  },
  perk6: {
    perk6Start: 'Customer service available until ',
    perk6End: '23.59h',
  },
  perk7: {
    perk7Start: '(JOR)CUSTOMERS give JORCUSTOM a ',
    perk7End: '9,1/10',
  },
};

const toolControlsBtns = {
  mobile: {
    reset: 'Reset',
    guide: 'Guide',
    save: 'Save',
  },
  desktop: {
    reset: 'Reset design',
    guide: 'How it works',
    save: 'Save design',
  },
};

const guideModalData = {
  mainTitle: {
    mobileTitle: 'Customize your item',
    desktopTitle: 'How it works',
  },
  prevBtn: 'Previous',
  nextBtn: 'Next',
  linksData: [
    'Choose which layer to customize',
    'Auto-Generate Colors',
    'Use Color Themes',
    'Use the Color Wheel',
    'Use the Color Picker',
    'Reset your design',
    'Finish and add-to-bag',
  ],
  descriptionData: [
    {
      title: 'Choose which layer to customise',
      descr:
        'Start by selecting which layer you would like to customize. You can always switch between different layers easily.',
    },
    {
      title: 'Auto-Generate Colors',
      descr:
        'Use the auto-generate button to automatically generate matching colors. This button will automatically change and match the colors of different layers. This function can be very useful to get a good starting point to customise your item. You can always get back to previous generated colors by using the “Previous Colors”-button.',
    },
    {
      title: 'Use Color Themes',
      descr:
        'We have selected and assembled different themes of colors which can be very useful to create your own customised design. The color themes help to create unique design very fast and efficiently.',
    },
    {
      title: 'Use the Color Wheel',
      descr:
        'The color wheel enables you to select any color you want. This tool can be very useful for more experienced designers.',
    },
    {
      title: 'Use the Color Picker',
      descr:
        'Looking for a specific color of an item or object to match your color? That is where the color picker tool is made for. Easily upload a picture and pick a color from the image. This is very useful to perfectly match the colors in your design with other parts of your outfit.',
    },
    {
      title: 'Reset your design',
      descr:
        'Not satisfied with your design yet? No problem, you can always reset your design to default settings and start all over again by using the ‘reset’ button. So you can go all the way by customising you items!',
    },
    {
      title: 'Finish and add-to-bag',
      descr:
        'When you are finished, easily add the product to your shopping bag by pressing the “add-to-bag” button.',
    },
  ],
};

const colorPickersData = {
  selectLayerTitle: 'Select Layer',
  selectColorTitle: 'Select colour',
  selectSourceTitle: 'Select color source',
  textInput: {
    placeHolder: 'Edit text',
    confirmBtn: 'Confirm',
    notices: {
      notice1: 'Text and numbers of _min_ to _max_ characters',
      notice2: 'Text and numbers of maximum _max_ characters',
      notice3: 'Text and numbers of minimum _min_ characters',
    },
  },
  autoGenerator: {
    title: 'Color generator',
    prevBtn: 'Previous colors',
    nextBtn: 'Generate new colors',
    paragraph1:
      'Use the Generate-New-Colors-button to automatically generate matching\n' +
      'colors. This button will automatically change and match the colors of\n' +
      'all different layers.',
    paragraph2:
      'You can always get back to previous generated colors by using the\n' +
      'Previous-Colors-button.',
  },
  colorThemes: {
    title: 'Color themes',
  },
  colorWheel: {
    title: 'Color wheel',
  },
  imagePicker: {
    title: 'Color picker',
    colorTitle: 'Selected color',
    mobileColorTitle: 'Pick color from image',
    paragraph:
      'Upload a picture and select specific colors from that picture. You can\n' +
      'use this tool to match colors with your items.',
    label: 'Upload Image',
    uploadLink: 'Drop your image, or click upload button',
    pickBtn: 'Pick this color',
    mobilePick: 'Pick this color for selected layer',
    cancelBtn: 'Cancel',
    finishLayer: 'Finish layer',
    finishLayers: 'Finish layers',
  },
};

const customisePopUpPerks = {
  asideTitle1: 'Welcome.',
  asideTitle2: 'To our',
  asideTitle3: 'Customize tool',
  mainTitle: 'Would you like to customize your item?',
  paragraph1:
    'We believe everybody should be part of the design proces of their own clothing. That is why we created our unique “Customize Tool”. In this tool we give everybody the opportunity to upgrade their fashion item into something personal and unique.',
  paragraph2:
    'Step by step you can easily change every color in any design. And when you are not sure about your chosen colors you just press ‘Reset Designs’ to go back to the original.',
  paragraph3: 'Now that the choice is yours, will you start customizing?',
  customizeBtn: 'Yes, I would like to customize my item',
  addToCartBtn: 'No, I would like to add the current design to my shopping bag',
  perk1: {
    start: 'Customized items have the ',
    strong: 'same delivery time ',
    end: 'as original items',
  },
  perk2: {
    start: 'Customized items have the ',
    strong: 'same high quality ',
    end: 'as original items',
  },
  perk3: {
    start: 'Customized items have the',
    strong: 'same price ',
    end: 'as original items',
  },
  perk4: {
    start: 'Customized items can also be ',
    strong: 'returned: ',
    end: 'to change for a different size or to receive a gift card for the purchase value of your order',
  },
};

const sessionModalsText = {
  toolLoadText: 'Preparing the customization tool...',
  limitReachedText:
    'Editing session limit reached. If you proceed your earliest opened session for product _productName_ will be closed.',
  finishEditingText: 'Applying the finishing touches...',
  sessionExpiredText: 'Your editing session has expired.',
  closeConfirmText: 'All changes will be lost. Do you really want to exit?',
};

const addToCartModal = {
  sizeTitle: 'Size',
  priceTitle: 'Price',
  addToCartTitle: 'Added to cart',
  cntShoppingBtn: 'Continue shopping',
  cntCheckoutBtn: 'Continue to checkout',
  productColorTitle: 'Product-Color',
};

const blackFriday = {
  welcome: {
    title1: 'BLACK FRIDAY',
    title2: 'PRE-ACCESS',
    btnText: 'sign up here',
  },
  registration: {
    title1: 'BLACK FRIDAY #',
    title2: 'SIGN UP FOR EXCLUSIVE PRE-ACCESS',
    form: {
      input1: 'First Name',
      input2: 'Last Name',
      input3: 'E-mail',
      input4: 'Phone Number',
      btnText: 'SIGN UP',
      paragraph: 'By submitting this form, you accept the Terms & Conditions',
    },
    finish: {
      title1: 'THANK YOU FOR YOUR SUBSCRIPTION',
      title2: 'PLEASE CHECK YOUR EMAIL',
    },
  },
  login: {
    title1: 'BLACK FRIDAY #',
    title2: 'ENTER PASSWORD TO ENTER THE BLACK FRIDAY',
    title3: 'PRE-ACCESS SHOP',
    form: {
      input1: 'Password',
    },
    btnText: 'CONFIRM',
  },
};

const biggerSize: any = {
  title: {
    part1: 'We advice you to take',
    part2: 'one size bigger',
  },
  paragraph: {
    part1: 'For this specific product.',
    part2: 'We recommend ordering one size larger',
    part3: 'Then you normally wear.',
  },
  button: 'Understood',
  footer: {
    part1: 'Use the "Size Reference & Suggestion" button below',
    part2: 'for a personalized size suggestion.',
  },
};

const customisedAndOrdinaryProductPages = {
  nextBtn: 'Next',
  addToBagBtn: 'Add-to-cart',
  customizeBtn: 'Customize this item',
  sizeTitle: 'Size',
  sizeTableBtn: 'Size & Fit Guide',

  insufficientStock: 'Insufficient stock',

  errorMessage: 'Failed add to cart',
  unSelectedSizeAlert: 'Size selection is required',

  biggerSize,
  addToCartModal,
  guideModalData,
  jorCustomPerks,
  toolControlsBtns,
  colorPickersData,
  sessionModalsText,
  customisePopUpPerks,

  productInfo: {
    emptyValuesError: 'Values must be greater then 0!',
    bigLengthError: 'Length must be lower then 250cm!',
    bigWeightError: 'Weight must be lower then 300kg!',
    floatNumberError: 'Only integers allowed!',
    emptySizeReference: 'No reference',

    sectionTitle: 'Product information',
    relativeProductsTitle: 'You might also like',
    shipment: {
      title: 'Shipment',
      content: {
        paragraph1: 'We try to process all orders within 1-2 business days.',
        paragraph2:
          'The estimated delivery time depends on the country to which the product is sent. As soon as your order has been sent you will receive an email with the information about the shipment and a Track & Trace number.',
        table: {
          tableHead: {
            cell1: 'Country',
            cell2: 'Delivery time',
            cell3: 'Shipping costs',
          },
          tableRow1: {
            cell1: 'The Netherlands and Belgium',
            cell2: '1 - 2 business days',
            cell3: '€ 5, - (Free above € 40)',
          },
          tableRow2: {
            cell1: 'Europe Zone 1',
            cell2: '1 - 3 business days',
            cell3: '€ 5, - (Free above € 100)',
          },
          tableRow3: {
            cell1: 'Europe Zone 2',
            cell2: '2 - 4 business days',
            cell3: '€ 10, - (Free above € 150)',
          },
          tableRow4: {
            cell1: 'Europe Zone 3',
            cell2: '3 - 5 business days',
            cell3: '€ 15, - (Free above € 200)',
          },
          tableRow5: {
            cell1: 'Rest of the world',
            cell2: '3 - 6 business days',
            cell3: '€ 20, - (Free above € 250)',
          },
        },
      },
    },
    returns: {
      title: 'Returns',
      content: {
        paragraph1:
          'We have different return conditions that depend on the type of product in our store. Take into account the difference between a customised item and a non-customised item. For non-customised items we can pay out the entire purchase amount. Customised items, on the other hand, can be returned for a different size or we can issue a voucher for our store for the full purchase amount.',
        paragraph2:
          'We can accept returns for both customised and non-customised items if it meets the following conditions:',
        conditions: {
          condition1:
            '- All products must be returned within a maximum of 14 days from the purchase date.',
          condition2: '- All products are unwashed and unworn.',
          condition3:
            '- All original cards and labels are attached to the product.',
          condition4:
            '- Due to hygiene reasons, underwear, swimwear and pierced jewellery can only be returned if the products are damaged and / or broken.',
          condition5:
            '- The cost of returning products is borne by the customer.',
          condition6:
            '- The products are returned in the original packaging supplied.',
        },
      },
    },
    details: {
      title: 'Info',
    },
    proposal: {
      title: 'Size proposal',
      heightLabelText: 'What is your height?',
      heightPlaceholder: 'Fill in your height',
      weightLabelText: 'What is your weight?',
      weightPlaceholder: 'Fill in your weight',
      getSizeBtnText: 'Get a size proposal',
      enterParametersText: 'Enter parameters to get your ideal size.',
      noValueForParameters:
        'We need additional information to make a perfect size suggestion for you. Please contact our customer support via Whatsapp to get a personal size proposal.',
      sizeResponseText: 'We suggest you to take size __%__',
    },
    sizeReference: {
      title: 'Size reference',
    },
    sizeTable: {
      title: 'Size table',
    },
  },
};

export default {
  backBtn: 'Back',
  noDataMessages: {
    noMatchesFound: 'No matches found',
  },
  specialEvents: {
    blackFriday,
  },
  Account: {
    pageTitle: 'My Account',
    errorMessage: 'Something went wrong',
    networkErrorMessage:
      'Shipping to your country is not available. Please, contact us',
    otherValidErrors: {
      email: {
        notValid: 'This is not a valid e-mail address',
        emptyEmail: 'What is your email address',
      },
      firstName: {
        emptyFirstName: 'What is your first name?',
      },
      lastName: {
        emptyLastName: 'What is your surname?',
      },
      postalCode: {
        emptyPostalCode: 'What is your zipcode?',
        notValid: 'This is not a valid zipcode',
      },
      houseNumber: {
        emptyHouseNumber: 'What is your house number?',
        notValid: 'This is not a valid house number',
      },
      houseNumberAddition: {
        notValid: 'This is not a valid addition',
      },
      country: {
        emptyCountry: 'Select country',
      },
      phone: {
        emptyPhone: 'What is your phone number?',
      },
      street: {
        emptyStreet: 'What is your street?',
      },
    },
    noDesktop: {
      acountCategory: {
        profile: 'Profile',
        orders: 'Orders',
        security: 'Security',
        btnText: 'Log out',
      },
    },
    Desktop: {
      acountCategory: {
        clientProfile: 'Client profile',
        myOrders: 'My orders',
        security: 'Security',
        btnText: 'Log out',
      },
    },
    profile: {
      emailPlaceholder: 'E-mail address',
      firstNamePlaceholder: 'First Name',
      lastNamePlaceholder: 'Last Name',
      postCodePlaceholder: 'Postcode',
      houseNumberPlaceholder: 'House number',
      additionPlaceholder: 'Addition',
      streetPlaceholder: 'Street',
      cityPlaceholder: 'City',
      countryAreaPlaceHolder: 'Country area (state/province)',
      countryPlaceholder: 'Country',
      phonePlaceholder: 'Phone',
      isSameAddress: {
        title: 'Other shipping address',
        companyName: 'Company Name',
      },
      continueBtn: 'Save',
      shippingCheckbox: 'Shipping address is the same as billing address',
      agreementCheckbox:
        'I agree to the processing of my personal data for profiling activities, such as creation of personalized content and offers',
    },
    orders: {
      order: {
        labelText1: 'Order Number:',
        labelText2: 'Total price:',
        labelText3: 'Status',
        info: {
          infoItem1: 'Size:',
          infoItem2: 'Quantity:',
          infoItem3: 'Price total:',
        },
      },
      btnText: 'Load more',
    },
    security: {
      oldPasswordPlaceholder: 'Old Password',
      newPasswordPlaceholder: 'New Password',
      btnText: 'Change password',
      errorMessage: 'Something went wrong',
    },
  },

  Auth: {
    authTitle: 'Login',
    // authEmailPlaceholder: 'Your email',
    authEmailPlaceholder: 'E-mail',
    // authPasswordPlaceholder: 'Your password',
    authPasswordPlaceholder: 'Password',
    authBtnText: 'Login',
    authForgotPassword: 'Forgot password?',
    resetTitle: 'Reset password',
    resetBackToLogin: 'Back to login',
    resetEmailPlaceholder: 'E-mail',
    resetBtnText: 'Reset password',
    errorMessage: 'Something went wrong',
  },

  Contact: {
    pageTitle: 'Contact',
    title1: 'Contact Form',
    article1: {
      title: 'There are different ways to get in touch with us:',
      li1: '- use the 24/7 Whats-app service',
      li2: '- use the 24/7 Chat service linked to our website',
      li3: '- Send us an email',
      endThanks: 'Friendly thanks!',
    },
    title2: 'Pride!',
    article2: {
      description: `We are of course always working to improve our service and products as well
        possible to offer to you. We are therefore very proud of it
        the fact that our customers rate us with a`,
      question: 'Do you also give us an assessment? Thanks!',
      startTextLink: 'Go to',
      endTextLink: 'The Feedback Company',
    },
    title3: 'Company details',
    table: {
      tableRow1: {
        cell1: 'Mailing address',
        cell2: 'Titaniumlaan 94',
        cell3: "5221CK 's-Hertogenbosch",
      },
      tableRow2: {
        cell1: 'Email',
        cell2: 'klantenservice@jorcustom.com',
      },
      tableRow3: {
        cell1: 'Chamber of Commerce:',
        cell2: '92178634',
      },
      tableRow4: {
        cell1: 'VAT identification:',
        cell2: 'NL854294296B01',
      },
      tableRow5: {
        cell1: 'Bank:',
        cell2: 'Rabobank',
      },
      tableRow6: {
        cell1: 'IBAN:',
        cell2: 'NL51 RABO 0191 8032 51',
      },
      tableRow7: {
        cell1: 'BIC:',
        cell2: 'RABONL2U',
      },
    },
  },

  Cart: {
    errorMessage: 'Your cart is empty',
    pageTitle: 'Shopping cart',
    modalWindow: {},
    cartSummaryItem: {
      infoItem1: 'Size',
      infoItem2: 'Price',
      infoItem3: 'Quantity',
      total: 'Total:',
      errors: {
        sizeChangeError: 'Failed to change size. Try again later',
        quantityChangeError: 'Failed to change quantity. Try again later',
        removeProductError: 'Failed to remove product. Try again later',
        failedDeleteCart: 'Failed to delete cart. Try again later',
      },
      deleteProductModal: {
        deleteTitle: 'Are you sure you want to remove this product?',
        deleteConfirm: 'Yes!',
        deleteCancel: 'No',
      },
    },
    promoCode: {
      errors: {
        vaucherError: 'Voucher has not been applied',
        shopingCartError: 'Shopping cart is being recalculated...',
      },
      couponcodePlaceholder: 'Promotional code',
      submitBtnText: 'Apply',
    },
    checkoutSummary: {
      title: 'Order',
      subTotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      packageDiscount: 'Package Discount',
      discountCode: 'Discount code',
      btnPayText: 'Purchase',
      finish: {
        errorMessage: 'Something went wrong :(',
        continueBtnText: 'Purchase',
      },
      shippingValue: 'Calculated at the checkout',
      voucherQuestion: 'Do you have gift voucher or credit?',
      voucherValue: 'You can add this in the checkout',
      proceed: 'Proceed to checkout',
    },
    jorCustomPerks,
  },

  Category: {
    colorFilterTitle: 'Filter Color',
    sizeFilterTitle: 'Filter Size',
    errorCategoryMessage: 'Category not found',
    errorMessage: 'Something went wrong',
    errorProductsMessage: 'There are no products available',
    productList: {
      loadMoreBtnText: 'Load more',
      productCard: {
        userDesignTitleText: 'For product',
        customizeBtn: 'Customize',
      },
    },
  },

  Checkout: {
    pageTitle: 'Checkout',
    errorMessage: 'Nothing added',
    countryError:
      'IMPORTANT: Order from -name- temporary is not available on the website. Please contact us info@jorcustom.com to make an order.',
    generalErrorMessage: 'Something went wrong',
    sections: {
      shoppingCart: {
        title: 'Shopping cart',
        continueBtn: 'Continue',
        changeLink: 'Change shopping cart',
        shipTitle: 'Shipping',
        shipLink: 'Change shipping method',
      },
      AddressDetails: {
        title: '1. Addresses',
      },
      shippingMethod: {
        title: '2. Shipping method',
        shipping: {
          free: 'Free',
          continueBtn: {
            start: 'Save and ',
            end: 'continue',
          },
          errorMessage:
            'No shipping methods available for you country. Please, contact us.',
        },
      },
      checkout: {
        title: '3. Checkout',
        smallProductOverview: { changeBtn: 'Change shopping cart' },
        personalIngoOverview: {
          title: 'Data',
          blockTitle: 'Billing and shipping',
          titleNotSame: 'Billing Address',
          row1: 'Name:',
          row2: 'Street + House no:',
          row3: 'Postcode:',
          row4: 'Country:',
          row5: 'E-mail:',
          row6: 'Phone number',
          isSameAddress: {
            blockTitle: 'Shipping Address',
            row1: 'Company Name:',
            row2: 'Name:',
            row3: 'Street + House no:',
            row4: 'Country:',
            row5: 'E-mail:',
            row6: 'Phone number',
          },
          changeBtn: 'Change addresses',
        },
        finishBtn: 'Purchase',
      },
    },
    jorCustomPerks,
  },

  CreateNewPassword: {
    title: 'New password',
    placeholder: 'New password',
    errorMessage: 'Something went wrong',
    createNewPassBtn: 'Create new password',
  },

  Product: customisedAndOrdinaryProductPages,
  CustomizedProduct: customisedAndOrdinaryProductPages,

  Header: {
    login: 'Login',
    account: 'Account',
    menuItems: {
      account: 'Profile',
      orderOverview: 'Order Overview',
      myDesigns: 'My Designs',
      signout: 'Sign Out',
    },
  },

  Footer: {
    noDesktopTitle: 'Can we be of further help?',
    subscribeFormTitle: {
      title1: 'Lets keep in touch',
      title2: 'Failed to subscribe',
      loading: 'Loading...',
      title3: 'Successfully subscribed',
    },
    inputPlaceHolder: 'EMAIL',
    subscribeBtn: 'Subscribe',
    customerService: {
      title: 'Customer service',
      titleList: {
        faq: 'Faq',
        order: 'Ordering',
        send: 'Shipping',
        pay: 'Payment',
        raturns: 'Returns',
      },
    },
    jorcustom: {
      title: 'JorCustom',
      titleList: {
        ourStory: 'Our story',
        mediaAmbassadors: 'Media & Ambassadors',
        career: 'Careers',
        contact: 'Contact',
      },
    },
    general: {
      title: 'General',
      titleList: {
        privacyPolicy: 'Privacy Policy',
        cookiePolicy: 'Cookie Policy',
        general: 'Terms &',
        conditions: 'TrustIndicators',
      },
    },
    reviews: {
      title: 'Reviews',
      titleList: {
        assessFeedback: 'Our clients review us with:',
        reviewUs: 'Review us',
      },
    },
  },

  Home: {
    leftTitle: {
      start: 'Make',
      middle: 'It',
      end: 'Personal',
    },
    anchor: 'Shop now',
    homeBigNav: {
      startErrorMessage:
        'An error occurred while fetching categories from the server.',
      endErrorMessage: ' Please check your Internet connection.',
    },
    collectionSlideBottomText: 'Customise',
    aboutUs: {
      paragraph1:
        'JorCustom is the webshop where you can buy your streetwear clothing. From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for. Streetwear is undoubtedly the style that has formed its own culture. With this clothing style, young people in the 90s turned away from the standard fashion you saw in everyday life. Since then, people continued to buy streetwear clothing, mainly because it is such a timeless clothing style and it got its own character within the youth culture. Although streetwear used to have its character because it distinguished itself from the masses, nowadays it is a popular and very varied clothing style worn by many people.',
      title1: 'Customize your streetwear clothing',
      paragraph2: {
        part1: 'In our webshop you can not only buy ',
        part2:
          ', but also customize it exactly the way you want it! The style lends itself perfectly to the personalization of clothing, especially because within the style there are actually hardly any rules in the field of fashion. With us you can customize any kind of clothing, from ',
        part3: ' to ',
        part4:
          '. JorCustom also believes that everyone should be able to    radiate their own personality with completely self chosen clothing. In our webshop we offer the most user-friendly tools to design your streetwear completely to your taste, so you can be sure you are really going to buy the clothes that suit you. Choose your item from our range - trademark or from another streetwear brand - and start designing right away. Then simply order your item ',
        part5: ' with iDEAL or PayPal, for example.',
        link1: 'streetwear',
        link2: 'sweaters',
        link3: 'Denim Jackets',
        link4: 'and pay fast and securely',
      },
      title2: 'Fast delivery and easy return when needed',
      paragraph3: {
        part1:
          'Do you order your clothes in the webshop before 16.00? Then it will be delivered to your home the next working day. We want to offer you the best service. That is why you also have the possibility to easily ',
        part2:
          ' your streetwear clothing when needed. This can be done within fourteen days via the return form. Do you have any questions for us? You can reach us easily via the 24/7 chat service, via WhatsApp (',
        part3: ') of via the email address ',
        link1: 'return',
        link2: '+31 6 20334231',
        link3: 'klantenservice@jorcustom.com',
      },
    },
    customiseInfo: {
      header: {
        mainTitle: {
          part1: 'The',
          part2: 'Customize',
          part3: 'Tool',
        },
        list: {
          item1: 'Color Generator',
          item2: 'Color Themes',
          item3: 'Color Wheel',
          item4: 'Color Matching',
        },
        p1: 'All our designs are composed of different layers. And all these layers can be customized to any color you want.',
        p2: 'After selecting the layer you want to customize you will get 4 options to find the perfect color for you.',
        p3: 'Once you have found the perfect color for a layer, click “Finish Layer”.',
        p4: 'Then you can do the same for the other layers to create a unique and personal item!',
      },
      body: {
        section1: {
          title: 'Color Generator',
          description: {
            p1: 'If you find it difficult to combine colors yourself but want to create something unique, you can use the Color Generator.',
            p2: 'It will generate different color combinations over and over again. Note that using this option changes all the colors in the design, not just the selected layer.',
          },
        },
        section2: {
          title: 'Color Themes',
          description: {
            p1: 'These are preset colors. So you can easily find and combine themes such as pastel shades.',
          },
        },
        section3: {
          title: 'COLOR WHEEL',
          description: {
            p1: 'If your color is still missing from the Color Themes, you can use the “Color Wheel” to find any shade of any color.',
            p2: 'Ultimately, you can find any shade of any color and enter a hex code if you want to use a specific color.',
          },
        },
        section4: {
          title: 'MATCH COLORS',
          description: {
            p1: 'It allows you to perfectly match your outfit with your shoes. Upload a picture of your shoes and choose exactly the color of shoes you want to match.',
            p2: 'Tip: Make sure your picture is well exposed so that the colors in the picture match the actual colors and you can easily match!',
          },
        },
      },
    },
  },

  NotFound: {
    msg: 'Page not found',
  },

  Static: {
    errorMessage: 'Something went wrong',
  },

  ThankYou: {
    title: 'Thank you',
    subTitle: 'For your purchase at jorcustom!',
    subTitleAnalog: 'You are now officially a jorcustomer!',
    subTitle2: 'Order',
    stepsBlock: {
      title: 'WE START IMMEDIATELY. THIS IS WHAT WE ARE GOING TO DO',
      stepBox1: {
        title: '1. Produce',
        text: 'Did you know that? we print all clothing by hand entirely according to your personal wishes!',
      },
      stepBox2: {
        title: '2. Packing',
        text: 'You will receive an email as soon as we have packed your order and it has been transferred to our shipping partner',
      },
      stepBox3: {
        title: '3. Send',
        text: 'We ship your package!',
      },
    },
    stepsBlockAnalog: {
      title1: 'Your order with ordernumber #',
      title2: 'is almost completed!',
      title3: 'This is what you have to do:',
      paragraph1: '1. Go to the cash desk and take your ordernumber #',
      paragraph1Add: 'with you',
      paragraph2:
        '2. Complete payment for your order and we will start on your order immeditiately',
      paragraph3:
        '3. You will receive an email with all information about your order.',
      paragraph4:
        '4. Leave the magic to us, you will receive your order very soon',
    },
    serviceBlock: {
      serviceBox1: {
        title: 'Accidentally made a mistake in your order?',
        paragraph: `No worries! just contact our customer service and we'll do it
          solve together.`,
      },
      serviceBox2: {
        title: 'Ask?',
        paragraph:
          'View our faq page, big chance that the answer to your question is already here.',
      },
      customLink: 'Click here to go to the FAQ page',
    },
    serviceBlockAnalog: {
      title: 'Did you accidentally make a mistake in your order?',
      paragraph:
        'No promblem! take you order to the cash desk and we will make sure the problem gets solved.',
    },
    errorMessage: 'Payment is unsuccesfull',
  },

  GeneralError: {
    generalErrorMessage: 'Something went wrong',
  },

  Subscription: {
    title: 'CLAIM 10% EXTRA DISCOUNT',
    subContent: {
      subTitle: 'SIGN UP DIRECTLY:',
      subItem1: 'ALWAYS BE AWARE OF THE LAST TRENDS',
      subItem2: 'GET 10% EXTRA DISCOUNT ON YOUR FIRST PURCHASE',
      subItem3: 'EXCLUSIVE OFFERS',
    },
    subButton: 'CLAIM 10% EXTRA DISCOUNT',
    errorMsgTxt: 'You are already subscribed',
    errorSuccessMsg: 'You are successfully subscribed',
    failedMsg: 'Failed',
    emailPlaceholder: 'YOUR EMAIL ADDRESS',
    loadBtn: 'Loading...',
    subButtonPopup: 'Subscribe',
  },
};
