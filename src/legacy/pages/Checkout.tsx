// @ts-nocheck
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { useState } from 'react';
import { LockKeyhole, ShoppingBag } from 'lucide-react';

import CheckoutCartWrapper, {
  CheckoutCartProps,
} from '../components/Checkout/CheckoutCartWrapper';
import NoData from '../components/common/PageDetails/NoData';
import Shipping from '../components/Checkout/Shipping';
import PromoCode from '../components/PromoCode';
import AddressForms from '../components/Checkout/AddressForms';
import CheckoutFinish from '../components/Checkout/CheckoutFinish';
import JorCustomPerks from '../components/common/JorCustomPerks';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import CartProductsSummary from '../components/Checkout/CartProductsSummary';
import { useUserProvider } from '../context/user';
import { Address, ShippingAddress } from '../interfaces/checkout';
import { tablet, noTablet } from '../styles/constants';
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
      sections: {
        shoppingCart,
        AddressDetails,
        shippingMethod,
        checkout: checkoutProvider,
      },
    },
  } = languages[currentLanguage];

  return (
    <CheckoutPage>
      <CheckoutHeader>
        <a href="/" aria-label="JORCUSTOM home"><img src="/static/media/jorcustom_logo_min_simplified.3f65452da1dc1649dad3775defb4f7aa.svg" alt="JORCUSTOM" /></a>
        <LockKeyhole size={18} aria-label="Checkout" />
      </CheckoutHeader>




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
              <FormsWrapper className="checkout-form">
                <Breadcrumb aria-label="Checkout">
                  <span>{shoppingCart.title}</span>
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
                      <span><ShoppingBag size={16} /> {shoppingCart.title} ({totalQuantity})</span>
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
                    <CheckoutSummary refetch={refetch} checkoutId={checkoutId} discountAmount={discountAmount} voucherCode={voucherCode} cartDiscount={cartDiscount} subtotalPrice={subtotalPrice} shippingPrice={shippingPrice} totalPrice={totalPrice} />
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
                  <CheckoutFinish products={orderLines} changeSection={goTo} />
                )}

                {stepIndex > 0 && (
                  <BackLink type="button" onClick={() => goTo(steps[stepIndex - 1].id)}>
                    ‹ {steps[stepIndex - 1].label}
                  </BackLink>
                )}


              </FormsWrapper>

              <MediaQuery query={tablet}>
                <TotalWrapper className="checkout-order">
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
    </CheckoutPage>
  );
}

const CheckoutPage = styled.main`
  background: var(--checkout-background);
  color: var(--checkout-text);
  min-height: 100vh;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  h1, h2, h3, h4 { font-family: inherit; letter-spacing: 0; }

  .checkout-form > button:not(nav button), .checkout-form button[type="submit"], .checkout-form button[role="none"] {
    min-height: 52px;
    max-height: none;
    height: auto;
    border-radius: 5px;
    background: var(--checkout-action);
    color: var(--checkout-on-action);
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    text-transform: none;
    padding: 16px 24px;
    border: 1px solid transparent;
    transition: background 150ms ease;
  }
  .checkout-form > button:not(nav button), .checkout-form button[type="submit"], .checkout-form button[role="none"]:hover { background: var(--checkout-action-hover); }
  .checkout-form button:disabled { opacity: 0.5; cursor: not-allowed; }
  .checkout-form button[role="none"][type="button"] { background: transparent; color: var(--checkout-action); min-height: 32px; padding: 0; border: 0; }
  .checkout-form label > span { font: inherit; text-transform: none; color: var(--checkout-text); }
  .checkout-form input::placeholder { font: inherit; text-transform: none; color: var(--checkout-muted); }
  .checkout-form input[name="invoiceAddress"] + div { width: 18px; height: 18px; min-width: 18px; border-color: var(--checkout-border); border-radius: 3px; margin-right: 10px; }
  .checkout-form input[name="invoiceAddress"] + div img { width: 12px; }
  .checkout-order > ul:last-child li { font-family: inherit; font-size: 12px; line-height: 1.7; color: var(--checkout-muted); }
  .checkout-order > ul:last-child { padding-top: 24px; border-top: 1px solid var(--checkout-border); }
  .checkout-form h3 { font-size: 18px; text-transform: none; font-weight: 500; }
  .checkout-form label { font-family: inherit; text-transform: none; font-weight: 400; }
  .checkout-form input[type="text"], .checkout-form input[type="email"], .checkout-form input[type="number"] {
    border-radius: 5px; height: 52px; font-family: inherit; font-size: 14px;
    border-color: var(--checkout-border); color: var(--checkout-text);
  }
  .checkout-form input:focus { border-color: var(--checkout-focus); outline: 1px solid var(--checkout-focus); }
  .checkout-form input[data-invalid="true"] { border-color: var(--destructive); }
  .checkout-field { margin-bottom: 12px; }
  .checkout-field label { color: var(--checkout-muted); font-size: 14px; }
  .checkout-field label[data-active="true"], .checkout-field input:focus + label { top: 12px; font-size: 11px; }
  .checkout-field input { padding: 18px 40px 4px 14px; }
  .checkout-field input[data-invalid="true"] + label { color: var(--destructive); }
  .checkout-form select { font-family: inherit; font-size: 14px; border-radius: 5px; }

  .checkout-product {
    flex-direction: row; align-items: flex-start; gap: 16px;
    padding: 12px 24px 12px 0; border: 0; border-radius: 0; margin: 0;
  }
  .checkout-product-image {
    width: 72px; height: 88px; flex: 0 0 72px; border: 1px solid var(--checkout-border);
    border-radius: 6px; overflow: hidden; background: var(--checkout-background);
  }
  .checkout-product-image img { width: 100%; height: 100%; object-fit: contain; }
  .checkout-product-info { padding: 0; min-width: 0; }
  .checkout-product h2 { font-size: 13px; text-transform: none; margin: 0 0 8px; padding-right: 8px; line-height: 1.4; }
  .checkout-product span { font-size: 12px; text-transform: none; }
  .checkout-product button { top: 12px; right: 0; }
  .checkout-product select, .checkout-product input { max-width: 72px; font-size: 12px; background: transparent; border-bottom: 1px solid var(--checkout-border); }
  .checkout-product button { min-height: 20px; padding: 0; background: transparent; color: var(--checkout-text); border: 0; }
  .checkout-product button:hover { background: transparent; }
  .checkout-product input[type="number"] { height: 28px; padding: 0; border-radius: 0; }
  .checkout-form .checkout-discount button { min-height: 48px; height: 48px; padding: 0 16px; background: var(--secondary); color: var(--checkout-text); }
  .checkout-product-info { padding-bottom: 24px; }
  .checkout-product svg { max-width: 18px; }
  .checkout-totals { border: 0; border-radius: 0; padding: 20px 0 0; border-top: 1px solid var(--checkout-border); }
  .checkout-totals h3 { display: none; }
  .checkout-totals span { font-size: 14px; text-transform: none; }
  .checkout-total { border-top: 1px solid var(--checkout-border); margin-top: 16px; padding-top: 20px; }
  .checkout-total span { font-size: 20px; font-weight: 500; }
  .checkout-discount { margin: 0; padding: 20px 0; border-top: 1px solid var(--checkout-border); }
  .checkout-discount > div { border: 0; padding: 0; border-radius: 0; gap: 12px; }
  .checkout-discount input { width: 100%; min-width: 0; height: 48px; border: 1px solid var(--checkout-border); border-radius: 5px; padding: 12px; background: var(--checkout-background); font-family: inherit; font-size: 14px; }
  .checkout-discount input::placeholder { font-family: inherit; font-size: 14px; text-transform: none; color: var(--checkout-muted); }
  .checkout-discount button { width: auto; flex-shrink: 0; min-height: 48px; padding: 0 16px; border-radius: 5px; background: var(--secondary); color: var(--checkout-text); border: 1px solid var(--checkout-border); font-size: 13px; text-transform: none; }
  .checkout-discount button:hover { background: var(--accent); }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
`;

const CheckoutHeader = styled.header`
  height: 88px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a { display: inline-flex; }
  img { width: 132px; height: 40px; object-fit: contain; filter: brightness(0); }
  svg { color: var(--checkout-muted); }
  @media ${noTablet} { height: 76px; padding: 18px 20px; img { width: 116px; } }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  max-width: 1100px;
  margin: 0 auto;
  min-height: calc(100vh - 88px);
  @media ${noTablet} { display: block; min-height: calc(100vh - 76px); }
`;
const FormsWrapper = styled.div`
  min-width: 0;
  padding: 32px 56px 64px 24px;
  @media ${noTablet} { padding: 8px 20px 40px; }
`;
const TotalWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  padding: 32px 24px 64px 40px;
  background: var(--checkout-summary);
  border-left: 1px solid var(--checkout-border);
  position: relative;
  &::after { content: ''; position: absolute; top: 0; bottom: 0; left: 100%; width: max(0px, calc((100vw - 1100px) / 2)); background: var(--checkout-summary); }
`;
const Breadcrumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 12px;
  margin-bottom: 32px;
  color: var(--checkout-muted);
  a, button { color: var(--checkout-action); background: none; border: 0; padding: 0; cursor: pointer; font: inherit; text-decoration: none; }
  a:hover, button:hover { text-decoration: underline; }
`;
const Chevron = styled.span`margin: 0 8px; color: var(--checkout-muted);`;
const Crumb = styled.span<{ active: boolean }>`
  color: ${({ active }) => active ? 'var(--checkout-text)' : 'var(--checkout-muted)'};
  font-weight: ${({ active }) => active ? 600 : 400};
`;
const StepTitle = styled.h2`font-size: 20px; font-weight: 500; margin: 0 0 20px;`;
const BackLink = styled.button`
  && { align-self: flex-start; margin-top: 16px; background: transparent; border: 0; padding: 0; min-height: 36px; font-size: 13px; font-weight: 400; color: var(--checkout-action); cursor: pointer; }
  &&:hover { background: transparent; text-decoration: underline; }
`;
const Notice = styled.div`
  border: 1px solid var(--destructive);
  background: var(--background);
  color: var(--destructive);
  padding: 12px 16px; font-size: 13px; margin-bottom: 16px;
`;
const MobileSummary = styled.details`
  background: var(--checkout-summary);
  border-top: 1px solid var(--checkout-border);
  border-bottom: 1px solid var(--checkout-border);
  padding: 16px 20px;
  margin: 0 -20px 28px;
  summary { display: flex; gap: 12px; justify-content: space-between; cursor: pointer; font-size: 14px; list-style: none; }
  summary > span { display: flex; gap: 8px; align-items: center; color: var(--checkout-action); }
  summary > span::after { content: '⌄'; }
  &[open] summary { margin-bottom: 20px; }
  &[open] summary > span::after { content: '⌃'; }
`;
