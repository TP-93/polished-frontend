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

          const step = currentSection === 'shipping' || currentSection === 'checkout'
            ? currentSection
            : 'address';
          const steps = [
            { id: 'address', label: AddressDetails.title },
            { id: 'shipping', label: shippingMethod.title },
            { id: 'checkout', label: checkoutProvider.title },
          ];
          const stepIndex = steps.findIndex((s) => s.id === step);
          const goTo = (id: string) => {
            setCurrentSection(id);
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
          };

          return (
            <Wrapper>
              <FormsWrapper>
                <Breadcrumb aria-label="Checkout">
                  <a href="/cart">{shoppingCart.title}</a>
                  {steps.map((s, i) => (
                    <span key={s.id}>
                      <Chevron>›</Chevron>
                      {i < stepIndex ? (
                        <button type="button" onClick={() => goTo(s.id)}>{s.label}</button>
                      ) : (
                        <Crumb active={i === stepIndex}>{s.label}</Crumb>
                      )}
                    </span>
                  ))}
                </Breadcrumb>

                {quantityErrors?.length ? (
                  <Notice>{shoppingCart.title}: {quantityErrors.map((e) => e?.message).filter(Boolean).join(' · ')}</Notice>
                ) : null}

                <MediaQuery query={noTablet}>
                  <MobileSummary>
                    <summary>
                      <span>{shoppingCart.title} ({totalQuantity})</span>
                      <strong>{totalPrice ?? subtotalPrice}</strong>
                    </summary>
                    <CartProductsSummary
                      checkoutId={checkoutId}
                      products={orderLines}
                      linesNumber={linesNumber}
                      quantityErrors={quantityErrors}
                      setQuantityErrors={setQuantityErrors}
                    />
                    <PromoCode refetch={refetch} />
                  </MobileSummary>
                </MediaQuery>

                <StepTitle>{steps[stepIndex].label}</StepTitle>

                {step === 'address' && (
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
                    openNextSection={() => goTo('shipping')}
                    showQuantityErrors={(errors: (ServerQuantityError | null)[]) => {
                      setQuantityErrors(errors);
                      goTo('address');
                    }}
                  />
                )}

                {step === 'shipping' && <Shipping changeSection={goTo} />}

                {step === 'checkout' && (
                  <CheckoutFinish hideButton products={orderLines} changeSection={goTo} />
                )}

                {stepIndex > 0 && (
                  <BackLink type="button" onClick={() => goTo(steps[stepIndex - 1].id)}>
                    ‹ {steps[stepIndex - 1].label}
                  </BackLink>
                )}

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
                    changeSection={goTo}
                    currentSection={step}
                  />
                </MediaQuery>
              </FormsWrapper>

              <MediaQuery query={tablet}>
                <TotalWrapper>
                  <CartProductsSummary
                    checkoutId={checkoutId}
                    products={orderLines}
                    linesNumber={linesNumber}
                    quantityErrors={quantityErrors}
                    setQuantityErrors={setQuantityErrors}
                  />
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
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #e6e6e6;

  @media ${noTablet} {
    flex-direction: column;
  }
`;

const FormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 58%;
  padding: 40px 48px 64px 16px;

  @media ${noTablet} {
    width: 100%;
    padding: 24px 16px 120px;
  }
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 42%;
  padding: 40px 16px 64px 40px;
  background: #fafafa;
  border-left: 1px solid #e6e6e6;
  position: relative;
`;

const Breadcrumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 12px;
  margin-bottom: 24px;
  color: #707070;
  a, button { color: #1a1a1a; background: none; border: 0; padding: 0; cursor: pointer; font: inherit; text-decoration: none; }
  a:hover, button:hover { text-decoration: underline; }
`;

const Chevron = styled.span`
  margin: 0 8px;
  color: #a0a0a0;
`;

const Crumb = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? '#1a1a1a' : '#a0a0a0')};
  font-weight: ${({ active }) => (active ? 700 : 400)};
`;

const StepTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px;
`;

const BackLink = styled.button`
  align-self: flex-start;
  margin-top: 24px;
  background: none;
  border: 0;
  padding: 0;
  font-size: 13px;
  color: #1a1a1a;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const Notice = styled.div`
  border: 1px solid #e0b4b4;
  background: #fff6f6;
  color: #9f3a38;
  padding: 12px 16px;
  font-size: 13px;
  margin-bottom: 16px;
`;

const MobileSummary = styled.details`
  border: 1px solid #e6e6e6;
  background: #fafafa;
  padding: 12px 16px;
  margin-bottom: 24px;
  summary { display: flex; justify-content: space-between; cursor: pointer; font-size: 14px; list-style: none; }
  &[open] summary { margin-bottom: 16px; }
`;
