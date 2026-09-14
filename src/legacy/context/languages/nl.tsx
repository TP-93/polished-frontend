// @ts-nocheck
const jorCustomPerks = {
  perk1: {
    perk1Start: 'Bestel voor 15:00 uur, ',
    perk1End: 'morgen in huis',
  },
  perk2: {
    perk2Start: 'Gratis verzending, ',
    perk2End: 'voor bestellingen boven €39,99',
  },
  perk3: {
    perk3Start: 'Retourneer jouw ',
    perk3End: 'item gemakkelijk',
  },
  perk4: {
    perk4Start: 'Retourneer jouw item binnen',
    perk4End: '14 dagen',
  },
  perk5: {
    perk5Start: 'Customized items kunnen ook geretourneerd worden, ',
    perk5End: 'ruil voor een andere maat of ontvang een voucher.',
  },
  perk6: {
    perk6Start: 'Klantenservice beschikbaar tot ',
    perk6End: '23:59h',
  },
  perk7: {
    perk7Start: '(JOR)CUSTOMERS beoordelen jorcustom met een ',
    perk7End: '9,1/10',
  },
};

const toolControlsBtns = {
  mobile: {
    reset: 'Reset',
    guide: 'Uitleg',
    save: 'Sla op',
  },
  desktop: {
    reset: 'Reset design',
    guide: 'Hoe het werkt',
    save: ' Ontwerp opslaan',
  },
};

const guideModalData = {
  mainTitle: {
    mobileTitle: 'Customize jouw item',
    desktopTitle: 'Hoe het werkt',
  },
  prevBtn: 'Vorige',
  nextBtn: 'Volgende',
  linksData: [
    'Kies welke laag je wilt customizen',
    'Automatisch kleuren genereren',
    'Gebruik van kleurenthema’s',
    'Gebruik het kleurenwiel',
    'Gebruik het kleurenpincet',
    'Reset jouw design',
    'Afronden en aan winkelmand toevoegen',
  ],
  descriptionData: [
    {
      title: 'Kies welke laag je wilt customizen',
      descr:
        'Start met het selecteren van een laag welke je graag zou willen customizen. Je kunt altijd gemakkelijk switchen tussen verschillende lagen.',
    },
    {
      title: 'Automatisch kleuren genereren',
      descr:
        'Gebruik de ‘Genereer nieuwe kleuren’-knop om automatisch matchende kleuren te genereren. De knop zal automatisch iedere kleur uit elke laag veranderen en matchen. Je kunt altijd een stap terug gaan naar de voorgaande kleurencombinaties door op de ‘Vorige kleuren’-knop te drukken.',
    },
    {
      title: 'Gebruik van kleurenthema’s',
      descr:
        'Wij hebben verschillende kleurenthema’s geselecteerd en samengesteld welke heel handig kunnen zijn bij het ontwikkelen van jouw customized design. Met deze kleurenthema’s kun je snel en efficient unieke designs ontwikkelen.',
    },
    {
      title: 'Gebruik het kleurenwiel',
      descr:
        'Met het kleurenwiel kun je letterlijk elke kleur die je wil selecteren. Deze tool is erg handig voor de meer gevorderde designers.',
    },
    {
      title: 'Gebruik het kleurenpincet',
      descr:
        'Upload gemakkelijk een foto en selecteer een specifiek kleur uit die foto. Op deze manier kun je pas echt perfect kleuren in jouw outfit met elkaar matchen, bijvoorbeeld met je schoenen!',
    },
    {
      title: 'Reset jouw design',
      descr:
        'Je kunt op ieder moment jouw design resetten naar het originele design door op de ‘reset’-knop te drukken. Zo kun je echt helemaal wild gaan met het customizen van jouw items!',
    },
    {
      title: 'Afronden en aan winkelmand toevoegen',
      descr:
        'Wanneer je klaar bent klik je op de knop ‘Voeg toe aan winkelmand’. Heel gemakkelijk en snel!',
    },
  ],
};

const colorPickersData = {
  selectLayerTitle: 'Selecteer een laag',
  selectColorTitle: 'Selecteer Kleur',
  selectSourceTitle: 'Selecteer een bron voor kleuren',
  textInput: {
    placeHolder: 'Tekst bewerken',
    confirmBtn: 'Bevestigen',
    notices: {
      notice1: 'Tekst en getallen van _min_ tot _max_ tekens',
      notice2: 'Tekst en getallen van maximaal _max_ tekens',
      notice3: 'Tekst en getallen van minimaal _min_ tekens',
    },
  },
  autoGenerator: {
    title: 'Kleur Generator',
    prevBtn: 'Vorige kleuren',
    nextBtn: 'Genereer nieuwe kleuren',
    paragraph1:
      'Gebruik de “Genereer Nieuwe Kleuren”-knop om automatisch\n' +
      'matchende kleuren te genereren.\n' +
      'Deze knop vervangt automatisch kleuren uit iedere laag en\n' +
      'matcht de kleuren onderling zodat ze goed bij elkaar passen. ',
    paragraph2:
      'Je kunt altijd een stap terug gaan om de voorgaande kleurenpaletten\n' +
      'opnieuw te zien door op de “Vorige Kleuren”-knop te drukken. ',
  },
  colorThemes: {
    title: 'Kleurenthema’s',
  },
  colorWheel: {
    title: 'Kleurenwiel',
  },
  imagePicker: {
    title: 'Kleuren matchen',
    colorTitle: 'Geselecteerde kleur',
    mobileColorTitle: 'Kies kleur van afbeelding',
    paragraph:
      'Upload een foto en selecteer specifieke kleuren uit deze foto. Je kunt deze functie gebruiken om exact kleuren van jouw outfit te matchen.',
    label: 'Upload foto',
    uploadLink: 'Drop uw afbeelding, of klik op de upload knop',
    pickBtn: 'Kies deze kleur',
    mobilePick: 'Kies deze kleur voor de geselecteerde laag',
    cancelBtn: 'Annuleren',
    finishLayer: 'VOLTOOI LAAG',
    finishLayers: 'Afwerkingslagen',
  },
};

// const customisePopUpPerks = {
//   asideTitle1: 'Welkom.',
//   asideTitle2: 'In de',
//   asideTitle3: 'Customize tool',
//   mainTitle: 'Wil je jouw item customizen?',
//   paragraph1:
//     'Wij vinden dat iedereen deel moet uitmaken van het ontwerpproces van zijn eigen kleding. Daarom hebben we onze unieke "Customize Tool" gemaakt. In deze tool geven we iedereen de mogelijkheid om hun fashion item te upgraden naar iets persoonlijks en unieks.',
//   paragraph2:
//     "Stap voor stap verander je eenvoudig elke kleur in elk ontwerp. En als je niet zeker bent van je gekozen kleuren, druk je gewoon op 'Reset Designs' om terug te gaan naar het origineel.",
//   paragraph3:
//     'Jetzt, da Sie die Wahl haben, werden Sie mit der Anpassung begin?',
//   customizeBtn: 'Ja, ik wil mijn item graag customizen',
//   addToCartBtn: 'Nee, plaats het originele item in mijn winkelmand',
//   perk1: {
//     start: 'Customized items hebben ',
//     strong: 'dezelfde levertijd ',
//     end: 'als originele items',
//   },
//   perk2: {
//     start: 'Customized items hebben ',
//     strong: 'dezelfde hoge kwaliteit ',
//     end: 'als originele items',
//   },
//   perk3: {
//     start: 'Customized items hebben ',
//     strong: 'dezelfde prijs ',
//     end: 'als originele items',
//   },
//   perk4: {
//     start: 'Customized items kunnen ook ',
//     strong: 'geretourneerd worden: ',
//     end: 'ruil voor een andere maat, of ontvang een voucher voor de waarde van het aankoopbedrag',
//   },
// };

const sessionModalsText = {
  toolLoadText: 'Preparing the customization tool...',
  limitReachedText:
    'Bewerking sessie limiet bereikt. Als u doorgaat zal uw oudste sessie voor product _productName_ gesloten worden.',
  finishEditingText: 'De laatste hand leggen...',
  sessionExpiredText: 'Jouw customize sessie is verlopen, probeer het opnieuw.',
  closeConfirmText:
    'Alle wijzigingen gaan verloren, weet je zeker dat je wilt afsluiten?',
};

const addToCartModal = {
  sizeTitle: 'Maat',
  priceTitle: 'Prijs',
  addToCartTitle: 'Toegevoegd aan winkelwagen',
  cntShoppingBtn: 'Shop verder',
  cntCheckoutBtn: 'Ga naar winkelmand',
  productColorTitle: 'Product-Kleur',
};

const blackFriday = {
  welcome: {
    title1: 'BLACK FRIDAY',
    title2: 'PRE-ACCESS',
    btnText: 'SCHRIJF JE IN',
  },
  registration: {
    title1: 'BLACK FRIDAY #',
    title2: 'SIGN JE IN VOOR EXCLUSIEVE TOEGANG',
    form: {
      input1: 'Voornaam',
      input2: 'Achternaam',
      input3: 'E-mail',
      input4: 'Telefoonnummer',
      btnText: 'SCHRIJF JE IN',
      paragraph:
        'Door je in te schrijven ga je akkoord met onze algemene voorwaarden',
    },
    finish: {
      title1: 'BEDANKT VOOR JE INSCHRIJVING',
      title2: 'CHECK JE EMAIL VOOR DE BEVESTIGING',
    },
  },
  login: {
    title1: 'BLACK FRIDAY #',
    title2: 'VUL HET WACHTVOORD IN VOOR exclusieve toegang',
    title3: 'tot de black friday collectie',
    form: {
      input1: 'Wachtwoord',
    },
    btnText: 'GA DOOR',
  },
};

const biggerSize: any = {
  title: {
    part1: 'Neem één maat groter',
    part2: '',
  },
  paragraph: {
    part1: 'Voor dit specifieke product',
    part2: 'Raden we aan om één maat groter te bestellen',
    part3: 'dan je normaliter draagt.',
  },
  button: 'Begrepen',
  footer: {
    part1:
      'Maak gebruikt van de onderstaande knop “Maat referentie & Voorstel”',
    part2: 'voor een persoonlijke maatvoorstel.',
  },
};

const customisedAndOrdinaryProductPages = {
  // nextBtn: 'Volgende',
  addToBagBtn: 'Plaats in winkelmand',
  customizeBtn: 'Customize dit item',

  insufficientStock: 'Onvoldoende voorraad',

  sizeTitle: 'Selecteer je maat',
  sizeTableBtn: 'Maattabel',

  errorMessage: 'Toevoegen aan winkelwagentje mislukt',
  unSelectedSizeAlert: 'Maatselectie is verplicht',

  biggerSize,
  addToCartModal,
  guideModalData,
  jorCustomPerks,
  toolControlsBtns,
  colorPickersData,
  sessionModalsText,
  // customisePopUpPerks,

  productInfo: {
    emptyValuesError: 'Waarden moeten groter zijn dan 0!',
    bigLengthError: 'Lengte moet lager zijn dan 250cm!',
    bigWeightError: 'Gewicht moet lager zijn dan 300 kg!',
    floatNumberError: 'Alleen gehele getallen toegestaan!',
    emptySizeReference: 'Geen referentie',

    // sectionTitle: 'Productinformatie',
    relativeProductsTitle: 'Anderen bekeken ook',
    shipment: {
      title: 'Verzending',
      content: {
        paragraph1: 'We proberen alle orders binnen 1 werkdag te versturen.',
        paragraph2:
          'De verwachte levertijd hangt af van het land waaruit je een bestelling plaatst. Zodra jouw order is verzonden ontvangen je van ons een e-mail met daarin de Informatie over de verzending en een Track & Trace nummer.',
        table: {
          tableHead: {
            cell1: 'Land',
            cell2: 'Levertijd',
            cell3: 'Verzendkosten',
          },
          tableRow1: {
            cell1: 'The Netherlands and Belgium',
            cell2: '1-2 werkdagen',
            cell3: '€ 5,- (Gratis indien bestelwaarde groter dan € 40)',
          },
          tableRow2: {
            cell1: 'Europa Zone 1',
            cell2: '1 - 3 werkdagen',
            cell3: '€ 5, - (Gratis indien bestelwaarde groter dan € 100)',
          },
          tableRow3: {
            cell1: 'Europa Zone 2',
            cell2: '2 - 4 werkdagen',
            cell3: '€ 10, - (Gratis indien bestelwaarde groter dan € 150) ',
          },
          tableRow4: {
            cell1: 'Europa Zone 3',
            cell2: '3 - 5 werkdagen',
            cell3: '€ 15, - (Gratis indien bestelwaarde groter dan € 200)',
          },
          tableRow5: {
            cell1: 'Rest of the world',
            cell2: '3 - 6 werkdagen',
            cell3: '€ 20, - (FGratis indien bestelwaarde groter dan € 250)',
          },
        },
      },
    },
    returns: {
      title: 'Retourneren',
      content: {
        paragraph1:
          'We hebben verschillende voorwaarden voor retouren welke afhankelijk zijn van het type product welke je besteld hebt. ' +
          'Er bestaat een verschil tussen een customized item en een niet-gecustomized item. ' +
          'Voor een niet-customized item kan het volledige aankoopbedrag teruggestort worden indien gewenst. ' +
          'Customized items kunnen daarentegen geretourneerd worden voor een andere maat of voor een kortingsbon ter waarde van het aankoopbedrag.',
        paragraph2:
          'Wij kunnen retouren accepteren voor zowel customized als niet-customized items indien deze voldoen aan de onderstaande voorwaarde:',
        conditions: {
          condition1:
            '- Alle producten dienen geretourneerd te worden binnen 14 dagen na ontvangstdatum.',
          condition2:
            '- Alle producten dienen ongewassen en ongedragen te zijn.',
          condition3:
            '- Alle originele kaartjes en labels dienen aan het product vast te zitten.',
          condition4:
            '- Vanwege hygiene redenen kunnen ondergoed, zwemgoed en gepierste Juwelen alleen geretourneerd worden indien deze beschadigd of kapot zijn.',
          condition5:
            '- The kosten voor het retourneren van items zijn voor rekening van de klant.',
          condition6:
            '- Alle producten dienen in de origineel meegeleverde verpakking geretourneerd te worden.',
        },
      },
    },
    details: {
      title: 'Info',
    },
    proposal: {
      title: 'Maatvoorstel',
      heightLabelText: 'Wat is je lengte?',
      heightPlaceholder: 'Vul je lengte in',
      weightLabelText: 'Wat is je gewicht',
      weightPlaceholder: 'Vul je gewicht in',
      getSizeBtnText: 'Ontvang een maatvoorstel',
      enterParametersText: 'Voer gegevens in om jouw ideale maat te berekenen.',
      noValueForParameters:
        'We hebben meer informatie nodig om jou een goede maat aan te bevelen. Neem contact op met onze klantenservice via Whatsapp, zij zullen je verder helpen met het kiezen van de juiste maat.',
      sizeResponseText: 'Wij raden je aan om maat __%__ te nemen.',
    },
    sizeReference: {
      title: 'Maat referentie',
    },
    sizeTable: {
      title: 'Maattabel',
    },
  },
};

export default {
  backBtn: 'Terug',
  noDataMessages: {
    noMatchesFound: 'Geen overeenkomsten gevonden',
  },
  specialEvents: {
    blackFriday,
  },
  Account: {
    pageTitle: 'Mijn Account',
    errorMessage: 'Er is iets fout gegaan',
    networkErrorMessage:
      'Verzenden naar uw land is niet beschikbaar. Contacteer ons alsjeblieft',
    otherValidErrors: {
      email: {
        notValid: 'Dit is geen geldig e-mailadres',
        emptyEmail: 'Wat is je e-mailadres',
      },
      firstName: {
        emptyFirstName: 'Wat is je voornaam?',
      },
      lastName: {
        emptyLastName: 'Wat is je achternaam?',
      },
      postalCode: {
        emptyPostalCode: 'Wat is je postcode?',
        notValid: 'Dit is geen geldige postcode',
      },
      houseNumber: {
        emptyHouseNumber: 'Wat is je huisnummer?',
        notValid: 'Dit is geen geldig huisnummer',
      },
      houseNumberAddition: {
        notValid: 'Dit is geen geldige toevoeging',
      },
      country: {
        emptyCountry: 'Selecteer land',
      },
      phone: {
        emptyPhone: 'Wat is je telefoonnummer?',
      },
      street: {
        emptyStreet: 'Wat is jouw straat?',
      },
    },
    noDesktop: {
      acountCategory: {
        profile: 'Profiel',
        orders: 'Bestellingen',
        security: 'Veiligheid',
        btnText: 'Uitloggen',
      },
    },
    Desktop: {
      acountCategory: {
        clientProfile: 'Cliënt profiel',
        myOrders: 'Mijn bestellingen',
        security: 'Veiligheid',
        btnText: 'Uitloggen',
      },
    },
    profile: {
      emailPlaceholder: 'E-mailadres',
      firstNamePlaceholder: 'Voornaam',
      lastNamePlaceholder: 'Achternaam',
      postCodePlaceholder: 'Postcode',
      houseNumberPlaceholder: 'Huisnummer',
      additionPlaceholder: 'Toevoeging',
      streetPlaceholder: 'Straat',
      cityPlaceholder: 'Woonplaats',
      countryAreaPlaceHolder: 'Landgebied (staat/provincie)',
      countryPlaceholder: 'Land',
      phonePlaceholder: 'Telefoon',
      isSameAddress: {
        title: 'Ander verzendadres',
        companyName: 'Bedrijfsnaam',
      },
      continueBtn: 'Opslaan',
      shippingCheckbox: 'Verzendadres is gelijk aan factuuradres',
      agreementCheckbox:
        'U moet akkoord gaan met de verwerking van uw persoonlijke gegevens voordat u doorgaat',
    },
    orders: {
      order: {
        labelText1: 'Bestellings nummer:',
        labelText2: 'Totale prijs:',
        labelText3: 'Staat',
        info: {
          infoItem1: 'Maat:',
          infoItem2: 'Aantal:',
          infoItem3: 'Totaal prijs:',
        },
      },
      btnText: 'Meer laden',
    },
    security: {
      oldPasswordPlaceholder: 'Oud Wachtwoord',
      newPasswordPlaceholder: 'Nieuw Paswoord',
      btnText: 'Wijzig wachtwoord',
      errorMessage: 'Er is iets fout gegaan',
    },
  },

  Auth: {
    authTitle: 'log in',
    // authEmailPlaceholder: 'Jouw email',
    authEmailPlaceholder: 'E-mail',
    // authPasswordPlaceholder: 'Je wachtwoord',
    authPasswordPlaceholder: 'Wachtwoord',
    // authBtnText: 'Log in',
    authBtnText: 'Inloggen',
    authForgotPassword: 'Wachtwoord vergeten?',
    resetTitle: 'Wachtwoord opnieuw instellen',
    resetBackToLogin: 'Terug naar Inloggen',
    resetEmailPlaceholder: 'E-mail',
    resetBtnText: 'Wachtwoord opnieuw instellen',
    errorMessage: 'Er is iets fout gegaan',
  },

  Contact: {
    pageTitle: 'Contact',
    title1: 'Contact Formulier',
    article1: {
      title: 'Er zijn verschillende manieren om contact met ons op te nemen:',
      li1: '- gebruik de 24/7 Whats-app-service',
      li2: '- gebruik de 24/7 Chat-service gelinkt aan onze website',
      li3: '- Stuur ons een e-mail',
      endThanks: 'Vriendelijke dank!',
    },
    title2: 'Trots!',
    article2: {
      description:
        'We zijn natuurlijk altijd bezig om onze service en producten zo goed mogelijk aan u aan te bieden. We zijn er daarom erg trots op dat onze klanten ons beoordelen met een',
      question: 'Geef je ons ook een beoordeling? Bedankt!',
      startTextLink: 'Ga naar',
      endTextLink: 'Terugkoppeling Bedrijf',
    },
    title3: 'Bedrijfsgegevens',
    table: {
      tableRow1: {
        cell1: 'Postadres',
        cell2: 'Titaniumlaan 94',
        cell3: "5221CK 's-Hertogenbosch",
      },
      tableRow2: {
        cell1: 'E-mail',
        cell2: 'klantenservice@jorcustom.com',
      },
      tableRow3: {
        cell1: 'Kamer van Koophandel:',
        cell2: '92178634',
      },
      tableRow4: {
        cell1: 'VAT identificatie:',
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
    errorMessage: 'Uw winkelwagen is leeg',
    pageTitle: 'Winkelmandje',
    modalWindow: {},
    cartSummaryItem: {
      infoItem1: 'Grootte',
      infoItem2: 'Prijs',
      infoItem3: 'Aantal stuks',
      total: 'Totaal:',
      errors: {
        sizeChangeError:
          'Kan de grootte niet wijzigen. Probeer het later nog eens',
        quantityChangeError:
          'Kan winkelwagentje niet verwijderen. Probeer het later nog eens',
        removeProductError:
          'Kan winkelwagentje niet verwijderen. Probeer het later nog eens',
        failedDeleteCart:
          'Kan winkelwagentje niet verwijderen. Probeer het later nog eens',
      },
      deleteProductModal: {
        deleteTitle: 'Weet je zeker dat je dit product wilt verwijderen?',
        deleteConfirm: 'Yep, weg ermee!',
        deleteCancel: 'Ohnee toch niet',
      },
    },
    promoCode: {
      errors: {
        vaucherError: 'Voucher is niet toegepast',
        shopingCartError: 'Winkelwagen wordt opnieuw berekend ...',
      },
      couponcodePlaceholder: 'Coupon code',
      submitBtnText: 'Apply',
    },

    checkoutSummary: {
      title: 'Prijsopbouw',
      subTotal: 'Subtotaal',
      shipping: 'Verzenden',
      total: 'Totaal',
      packageDiscount: 'Pakketkorting',
      discountCode: 'Kortingscode',
      btnPayText: 'Afrekenen',
      finish: {
        errorMessage: 'Er is iets fout gegaan :(',
        continueBtnText: 'Nu bestellen en betalen',
      },
      shippingValue: 'Verzendkosten worden later berekend',
      voucherQuestion: 'Heb je een kortingscode of voucher?',
      voucherValue: 'Je kunt dit op de volgende pagina invullen',
      proceed: 'Bestellen',
    },
    jorCustomPerks,
  },

  Category: {
    colorFilterTitle: 'Filter op kleur',
    sizeFilterTitle: 'Filter op maat',
    errorCategoryMessage: 'Categorie niet gevonden',
    errorMessage: 'Er is iets fout gegaan',
    errorProductsMessage: 'Er zijn geen producten beschikbaar',
    productList: {
      loadMoreBtnText: 'Meer laden',
      productCard: {
        userDesignTitleText: 'Voor product',
        customizeBtn: 'Customise',
      },
    },
  },

  Checkout: {
    pageTitle: 'Afrekenen',
    errorMessage: 'Niets toegevoegd',
    countryError:
      'BELANGRIJK: Tijdelijk bestellen uit -name- is niet beschikbaar op de website. Neem contact met ons op info@jorcustom.com om een bestelling te plaatsen.',
    generalErrorMessage: 'Er is iets fout gegaan',
    sections: {
      shoppingCart: {
        title: 'Winkelwagen',
        continueBtn: 'Verder',
        changeLink: 'Wijzig winkelwagen',
        shipTitle: 'Bezorging',
        shipLink: 'Wijzig bezorgmethode',
      },
      AddressDetails: {
        title: '1. Adresgegevens',
      },
      shippingMethod: {
        title: '2. Verzendmethode',
        shipping: {
          free: 'Vrij',
          continueBtn: {
            start: 'Opslaan & ',
            end: 'Verder',
          },
          errorMessage:
            'Geen verzendmethoden beschikbaar voor uw land. Contacteer ons alsjeblieft.',
        },
      },
      checkout: {
        title: '3. Afrekenen',
        smallProductOverview: { changeBtn: 'Winkelwagen wijzigen' },
        personalIngoOverview: {
          title: 'Gegevens',
          blockTitle: 'Factuur - en verzendadres',
          titleNotSame: 'Factuuradres',
          row1: 'Naam:',
          row2: 'Straat + huisnr:',
          row3: 'Postcode:',
          row4: 'Land:',
          row5: 'E-mail:',
          row6: 'telefoon nummer',
          isSameAddress: {
            blockTitle: 'Verzendadres',
            row1: 'Bedrijfsnaam::',
            row2: 'Naam:',
            row3: 'Straat + huisnr:',
            row4: 'Land:',
            row5: 'E-mail:',
            row6: 'telefoon nummer',
          },
          changeBtn: 'Adres wijzigen',
        },
        finishBtn: 'bestel en betaal nu',
      },
    },
    jorCustomPerks,
  },

  CreateNewPassword: {
    title: 'Nieuw paswoord',
    placeholder: 'Nieuw paswoord',
    errorMessage: 'Er is iets fout gegaan',
    createNewPassBtn: 'Maak een nieuw wachtwoord',
  },

  Product: customisedAndOrdinaryProductPages,
  CustomizedProduct: customisedAndOrdinaryProductPages,

  Header: {
    login: 'Login',
    account: 'Account',
    menuItems: {
      account: 'Profile',
      orderOverview: 'Bestelhistorie',
      myDesigns: 'Mijn Designs',
      signout: 'Uitloggen',
    },
  },

  Footer: {
    noDesktopTitle: 'Kunnen we u verder helpen?',
    subscribeFormTitle: {
      title1:
        'Blijf altijd op de hoogte van de laatste aanbiedingen, nieuws en ontwikkelingen',
      title2: 'Kan zich niet abonneren',
      loading: 'Bezig met laden...',
      title3: 'Succesvol ingeschreven',
    },
    inputPlaceHolder: 'EMAIL',
    subscribeBtn: 'Abonneren',
    customerService: {
      title: 'Klantenservice',
      titleList: {
        faq: 'Faq',
        order: 'Bestellen',
        send: 'Verzenden',
        pay: 'Betalen',
        raturns: 'Retouren',
      },
    },
    jorcustom: {
      title: 'JorCustom',
      titleList: {
        ourStory: 'Ons verhaal',
        mediaAmbassadors: 'Media & Ambassadeurs',
        career: 'Carrière',
        contact: 'Contact',
      },
    },
    general: {
      title: 'Algemeen',
      titleList: {
        privacyPolicy: 'Privacybeleid',
        cookiePolicy: 'Cookiebeleid',
        general: 'Algemene',
        conditions: 'Voorwaarden',
      },
    },
    reviews: {
      title: 'Beoordelingen',
      titleList: {
        assessFeedback: 'Beoordeel ons op feedbackcompany',
        reviewUs: 'Review ons op',
      },
    },
  },

  Home: {
    leftTitle: {
      start: 'Make',
      middle: 'It',
      end: 'Personal',
    },
    anchor: 'Shop Nu',
    // homeBigNav: {
    //   startErrorMessage:
    //     'Er is een fout opgetreden bij het ophalen van categorieën van de server.',
    //   endErrorMessage: 'Controleer uw internetverbinding.',
    // },
    collectionSlideBottomText: 'Customise',
    // aboutUs: {
    //   paragraph1:
    //     'JorCustom is dé webshop waar jij jouw streetwear-kleding kunt kopen. Van hoodies tot sweaters en van tracksuits tot jackets, je vindt bij ons altijd het stijlvolle item waar jij naar op zoek bent. Streetwear is ongetwijfeld dé stijl die een volledig eigen cultuur heeft gevormd. Met deze kledingstijl zetten jongeren zich in de jaren ‘90 af van de standaard mode die je in het dagelijks leven zag. Sindsdien bleef men streetwear-kleding kopen, vooral omdat het zo’n tijdloze kledingstijl is en het een eigen karakter kreeg binnen de jongerencultuur. Hoewel streetwear vroeger zijn karakter kreeg doordat men zich onderscheidde van de massa, is het tegenwoordig een populaire en zeer gevarieerde kledingstijl die door veel mensen gedragen wordt. ',
    //   title1: 'Customize jouw streetwear-kleding',
    //   paragraph2: {
    //     part1: 'In onze webshop kun je niet alleen ',
    //     part2:
    //       ' kopen, maar ook precies aanpassen zoals jij het wilt! De stijl leent zich dan ook perfect voor het personaliseren van kleding, vooral omdat er binnen de stijl eigenlijk nauwelijks regels op het gebied van mode bestaan. Bij ons customize je dan ook ieder soort kledingstuk, vangstuk, van ',
    //     part3: ' tot ',
    //     part4:
    //       '. JorCustom gelooft bovendien dat iedereen zijn eigen persoonlijkheid moet kunnen uitstralen met volledig zelfgekozen kleding. In onze webshop bieden wij dan ook de meest gebruiksvriendelijke tools aan om jouw streetwear volledig naar jouw smaak te ontwerpen, zodat je zeker weet dat je écht de kleding gaat kopen die bij je past. Kies jouw item uit ons assortiment – trademark of van een ander streetwear-merk – en begin direct met het design. Vervolgens bestel je eenvoudig jouw artikel en ',
    //     part5: ' met bijvoorbeeld iDEAL of PayPal.',
    //     link1: 'streetwear',
    //     link2: 'sweaters',
    //     link3: 'spijkerjassen',
    //     link4: 'betaal je snel en veilig',
    //   },
    //   title2: 'Snelle levering en gemakkelijk retourneren wanneer nodig ',
    //   paragraph3: {
    //     part1:
    //       'Bestel je vóór 16.00 jouw kleding in de webshop? Dan wordt deze de volgende werkdag bij je thuisbezorgd. Wij willen graag de beste service bieden. Daarom heb je ook de mogelijkheid om eenvoudig je streetwear-kleding te ',
    //     part2:
    //       ' wanneer dit nodig is. Dit kan binnen veertien dagen via het retourformulier. Heb je vragen voor ons? Wij zijn heel gemakkelijk te bereiken via de 24/7 chatservice, via WhatsApp (',
    //     part3: ') of via het e-mailadres ',
    //     link1: 'retourneren',
    //     link2: '+31 6 20334231',
    //     link3: 'klantenservice@jorcustom.com',
    //   },
    // },
    customiseInfo: {
      header: {
        mainTitle: {
          part1: 'De',
          part2: 'Customize',
          part3: 'Tool',
        },
        list: {
          item1: 'Kleur Generator',
          item2: 'Kleurthema’s',
          item3: 'Kleurenwiel',
          item4: 'Kleuren Matchen',
        },
        p1: 'Al onze designs zijn opgebouwd uit verschillende lagen. En al deze lagen kunnen aangepast worden naar elke kleur die je maar wil.',
        p2: 'Na het selecteren van de laag die je aan wil passen krijg je 4 opties om de voor jou perfecte kleur te vinden.',
        p3: 'Als je de perfecte kleur voor een laag gevonden hebt klik je op “Voltooi Laag”.',
        p4: 'Vervolgens kan je hetzelfde doen voor de overige lagen om hiermee uiteindelijk een uniek en persoonlijk item te creëren!',
      },
      body: {
        section1: {
          title: 'KLEUR GENERATOR',
          description: {
            p1:
              'Als je het lastig vind om zelf kleuren te combineren maar wel iets unieks wil maken, ' +
              'kan je gebruik maken van de Kleuren Generator. ' +
              'Deze zal keer op keer andere kleuren combinaties genereren.',
            p2: 'Let wel op, als je deze optie gebruikt veranderen alle kleuren in het design, en dus niet alleen de geselecteerde laag.',
          },
        },
        section2: {
          title: 'KLEUREN THEMA’S',
          description: {
            p1: 'Dit zijn vooringestelde kleuren. Zo kan je thema’s zoals bijv pastel tinten makkelijk vinden en met elkaar combineren.',
          },
        },
        section3: {
          title: 'KLEURENWIEL',
          description: {
            p1:
              'Als jouw kleur er bij de Kleuren Thema’s toch steeds net niet bij zit kan je kiezen voor het “KleurenWiel”. ' +
              'Hierin kan je elke tint van elke kleur vinden. ',
            p2: 'Ook kan je hier een Hex-code invullen als je een specifieke kleur wil gebruiken.',
          },
        },
        section4: {
          title: 'KLEUREN MATCHEN',
          description: {
            p1:
              'Hiermee kan je perfect je outfit matchen met bijv je schoenen. Upload een foto van je ' +
              'schoenen en kies heel precies de kleur van je schoen die je wil matchen.',
            p2:
              'Tip: Zorg dat je foto goed belicht is zodat de kleuren op de foto goed ' +
              'overeenkomen met de daadwerkelijke kleuren en je makkelijk kan matchen!',
          },
        },
      },
    },
  },

  NotFound: {
    msg: 'Pagina niet gevonden',
  },

  Static: {
    errorMessage: 'Er is iets fout gegaan',
  },

  ThankYou: {
    title: 'Dankjewel',
    subTitle: 'Voor je aankoop bij jorcustom!',
    subTitleAnalog: 'Je bent nu officieel een jorcustomer!',
    subTitle2: 'Bestellings',
    stepsBlock: {
      title: 'WE BEGINNEN ONMIDDELLIJK. DIT IS WAT WIJ GAAN DOEN',
      stepBox1: {
        title: '1. Produceren',
        text: 'Wist je dat? we al onze kledingstukken zelf voorzien van de prints, precies naar jouw wens.',
      },
      stepBox2: {
        title: '2. Inpakken',
        text: 'Je ontvangt een mailtje als we jouw bestelling hebben ingepakt en hebben overgedragen aan onze verzendpartners',
      },
      stepBox3: {
        title: '3. Verzenden',
        text: 'We verzenden jouw pakket!',
      },
    },
    stepsBlockAnalog: {
      title1: 'Jouw bestelling met bestelnummer #',
      title2: 'is bijna voltooid!',
      title3: 'Wat moet je doen:',
      paragraph1: '1. Ga naar de kassa en neem je bestelnummer #',
      paragraph1Add: 'mee',
      paragraph2: '2. Reken je bestelling af en wij gaan direct aan de slag',
      paragraph3:
        '3. Je ontvangt een e-mail met alle informatie over je bestelling',
      paragraph4:
        '4. Leave the magic to us, je ontvangt jouw customised item spoedig',
    },
    serviceBlock: {
      serviceBox1: {
        title: 'Per ongeluk fout gemaakt in je bestelling?',
        paragraph:
          'Geen zorgen! neem even contact op met onze klantenservice en we gaat het samen oplossen.',
      },
      serviceBox2: {
        title: 'Vragen?',
        paragraph:
          'Bekijken onze faq pagina, grote kans dat het antwoord op jouw vraag hier al staat.',
      },
      customLink: 'Klik hier om naar de faq pagina te gaan',
    },
    serviceBlockAnalog: {
      title: 'Heb je per ongeluk een fout gemaakt in de bestelling?',
      paragraph:
        'Maak je geen zorgen! neem je bestelnummer mee naar de kassa en we gaan het samen oplossen.',
    },
    errorMessage: 'Betaling is mislukt',
  },

  GeneralError: {
    generalErrorMessage: 'Er is iets fout gegaan',
  },

  Subscription: {
    title: 'CLAIM 10% EXTRA KORTING',
    subContent: {
      subTitle: 'MELD JE DIRECT AAN:',
      subItem1: 'ALTIJD OP DE HOOGTE TE ZIJN VAN DE LAATSTE TRENDS',
      subItem2: 'ONTVANG DIRECT 10% EXTRA KORTING OP JOUW EERSTE AANKOOP',
      subItem3: 'EXCLUSIEVE AANBIEDINGEN',
    },
    subButton: 'CLAIM 10% EXTRA KORTING',
    errorMsgTxt: 'Je bent al ingeschreven',
    errorSuccessMsg: 'U bent succesvol ingeschreven',
    failedMsg: 'Mislukt',
    emailPlaceholder: 'JOUW E-MAILADRES',
    loadBtn: 'Bezig met laden...',
    subButtonPopup: 'Subscribe',
  },
};
