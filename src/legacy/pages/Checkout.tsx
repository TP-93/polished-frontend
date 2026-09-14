// @ts-nocheck
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import { useState } from 'react';

import CheckoutCartWrapper, {
  CheckoutCartProps,
} from '../components/Checkout/CheckoutCartWrapper';
import NoData from '../components/common/PageDetails/NoData';
import Section from '../components/Checkout/Section';
import Shipping from '../components/Checkout/Shipping';
import PageTitle from '../components/common/PageDetails/PageTitle';
import PromoCode from '../components/PromoCode';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import AddressForms from '../components/Checkout/AddressForms';
import CheckoutFinish from '../components/Checkout/CheckoutFinish';
import JorCustomPerks from '../components/common/JorCustomPerks';
import { ContinueBtn } from '../components/common/Buttons';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import CartProductsSummary from '../components/Checkout/CartProductsSummary';
import MobilePurchaseBlock from '../components/Checkout/MobilePurchaseBlock';
import { useUserProvider } from '../context/user';
import { Address, ShippingAddress } from '../interfaces/checkout';
import { tablet, noTablet, noDesktop } from '../styles/constants';
import { createCheckout_checkoutCreate_quantityErrors as ServerQuantityError } from '../apollo/mutations/types/createCheckout';

interface CacheProps {
  email: string;
  address: Address;
  sameAddress: boolean;
  shippingAddress: ShippingAddress;
}

export default function Checkout() {
  const [cachedEmail, setCachedEmail] = useState<any>();
  const [cachedAddress, setCachedAddress] = useState<any>();
  const [quantityErrors, setQuantityErrors] = useState<any>();
  const [currentSection, setCurrentSection] = useState('bag');
  const [_cachedSameAddress, setSameAddress] = useState(false);
  const [cachedShippingAddress, setCachedShippingAddress] = useState<any>();

  const cacheUserData = ({
    email,
    address,
    shippingAddress,
    sameAddress,
  }: CacheProps) => {
    setCachedEmail(email);
    setCachedAddress(address);
    setCachedShippingAddress(shippingAddress);
    setSameAddress(sameAddress);
  };

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Checkout: {
      errorMessage,
      pageTitle,
      sections: {
        shoppingCart,
        AddressDetails,
        shippingMethod,
        checkout: checkoutProvider,
      },
    },
  } = languages[currentLanguage];

  return (
    <PageWrapper>
      <Helmet>
        <title>JORCUSTOM - Make It Personal</title>
        <meta
          name="description"
          content="JORCUSTOM is the webshop where you can buy your streetwear clothing. From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for. Streetwear is undoubtedly the style that has formed its own culture."
        />
      </Helmet>

      <PageTitle title={pageTitle} />

      <CheckoutCartWrapper>
        {({
          email,
          address,
          refetch,
          orderLines,
          checkoutId,
          totalPrice,
          voucherCode,
          linesNumber,
          cartDiscount,
          subtotalPrice,
          shippingPrice,
          totalQuantity,
          discountAmount,
          shippingAddress,
          shippingMethodId,
        }: CheckoutCartProps) => {
          if (!linesNumber) return <NoData title={errorMessage} />;

          return (
            <Wrapper>
              <FormsWrapper>
                <MediaQuery query={noTablet}>
                  <PromoCode refetch={refetch} />
                </MediaQuery>

                <Section
                  id="bag"
                  title={`${shoppingCart.title} (${totalQuantity})`}
                  currentSection={currentSection}
                  changeSection={setCurrentSection}
                >
                  <CartProductsSummary
                    checkoutId={checkoutId}
                    products={orderLines}
                    linesNumber={linesNumber}
                    quantityErrors={quantityErrors}
                    setQuantityErrors={setQuantityErrors}
                  />

                  <ContinueBtn
                    role="none"
                    onClick={() => {
                      setCurrentSection('address');
                    }}
                  >
                    {shoppingCart.continueBtn}
                  </ContinueBtn>
                </Section>

                <Section
                  id="address"
                  title={AddressDetails.title}
                  currentSection={currentSection}
                  changeSection={setCurrentSection}
                >
                  <AddressForms
                    checkoutId={checkoutId}
                    checkoutEmail={email}
                    checkoutAddress={address}
                    checkoutShippingAddress={shippingAddress}
                    cachedEmail={cachedEmail}
                    cachedAddress={cachedAddress}
                    cachedShippingAddress={cachedShippingAddress}
                    orderLines={orderLines}
                    cacheUserData={cacheUserData}
                    openNextSection={() => {
                      setCurrentSection('shipping');
                    }}
                    showQuantityErrors={(
                      errors: (ServerQuantityError | null)[],
                    ) => {
                      setQuantityErrors(errors);
                      setCurrentSection('bag');
                    }}
                  />
                </Section>

                <Section
                  id="shipping"
                  title={shippingMethod.title}
                  currentSection={currentSection}
                  changeSection={setCurrentSection}
                >
                  <Shipping changeSection={setCurrentSection} />
                </Section>

                <Section
                  id="checkout"
                  title={checkoutProvider.title}
                  currentSection={currentSection}
                  changeSection={setCurrentSection}
                >
                  <CheckoutFinish
                    hideButton
                    products={orderLines}
                    changeSection={setCurrentSection}
                  />
                </Section>

                <MediaQuery query={noTablet}>
                  <MobilePurchaseBlock
                    refetch={refetch}
                    discountAmount={discountAmount}
                    voucherCode={voucherCode}
                    cartDiscount={cartDiscount}
                    checkoutId={checkoutId}
                    isBillingAddress={Boolean(address)}
                    shippingMethodId={shippingMethodId}
                    subtotalPrice={subtotalPrice}
                    shippingPrice={shippingPrice}
                    totalPrice={totalPrice}
                    onClick={() => {}}
                    changeSection={setCurrentSection}
                    currentSection={currentSection}
                  />
                </MediaQuery>
              </FormsWrapper>

              <MediaQuery query={tablet}>
                <TotalWrapper>
                  <PromoCode refetch={refetch} />

                  <CheckoutSummary
                    refetch={refetch}
                    discountAmount={discountAmount}
                    voucherCode={voucherCode}
                    cartDiscount={cartDiscount}
                    checkoutId={checkoutId}
                    subtotalPrice={subtotalPrice}
                    shippingPrice={shippingPrice}
                    totalPrice={totalPrice}
                  />

                  <JorCustomPerks />
                </TotalWrapper>
              </MediaQuery>
            </Wrapper>
          );
        }}
      </CheckoutCartWrapper>
    </PageWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 85px;

  @media ${noDesktop} {
    padding: 0 10px;
  }
`;

const FormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;

  @media ${noTablet} {
    width: 100%;
  }
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
