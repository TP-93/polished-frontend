// @ts-nocheck
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { useEffect, useState } from 'react';
import { LockKeyhole, ShoppingBag } from 'lucide-react';

import CheckoutCartWrapper, {
  CheckoutCartProps,
} from '../components/Checkout/CheckoutCartWrapper';
import NoData from '../components/common/PageDetails/NoData';
import Shipping from '../components/Checkout/Shipping';
import PromoCode from '../components/PromoCode';
import AddressForms from '../components/Checkout/AddressForms';
import PurchaseButton from '../components/Checkout/CheckoutFinish/Finish';
import Payments from '../components/common/Payments';
import CheckoutDeals from '../components/Checkout/CheckoutDeals';
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
  // Release scroll locks left behind by drawers/modals (e.g. the cart drawer) opened before navigating here.
  useEffect(() => {
    const release = () => {
      [document.documentElement, document.body].forEach(el => {
        if (el.style.overflow === 'hidden') el.style.overflow = '';
        el.style.touchAction = '';
        el.style.paddingRight = '';
      });
    };
    release();
    const t = setTimeout(release, 600);
    return () => clearTimeout(t);
  }, []);
  const [cachedEmail, setCachedEmail] = useState<any>();
  const [cachedAddress, setCachedAddress] = useState<any>();
  const [quantityErrors, setQuantityErrors] = useState<any>();
  const [addressesReady, setAddressesReady] = useState(false);
  const [shippingReady, setShippingReady] = useState(false);
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


          return (
            <Wrapper>
              <FormsWrapper className="checkout-form">

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
                      delBtn={false}
                      checkoutId={checkoutId}
                      products={orderLines}
                      linesNumber={linesNumber}
                      quantityErrors={quantityErrors}
                      setQuantityErrors={setQuantityErrors}
                    />
                    <PromoCode refetch={refetch} />
                    <CheckoutSummary refetch={refetch} checkoutId={checkoutId} discountAmount={discountAmount} voucherCode={voucherCode} cartDiscount={cartDiscount} subtotalPrice={subtotalPrice} shippingPrice={shippingPrice} totalPrice={totalPrice} />
                    <CheckoutDeals checkoutId={checkoutId} />
                  </MobileSummary>
                </MediaQuery>

                <PaymentIcons aria-label={currentLanguage === 'NL' ? 'Betaalmethoden' : 'Payment methods'}><Payments /></PaymentIcons>
                <AddressForms
                  onePage
                  checkoutId={checkoutId}
                  checkoutEmail={email}
                  checkoutAddress={address}
                  checkoutShippingAddress={shippingAddress}
                  cachedEmail={cachedEmail}
                  cachedAddress={cachedAddress}
                  cachedShippingAddress={cachedShippingAddress}
                  orderLines={orderLines}
                  cacheUserData={cacheUserData}
                  onDirty={() => { setAddressesReady(false); setShippingReady(false); }}
                  openNextSection={() => { setAddressesReady(true); setShippingReady(false); }}
                  showQuantityErrors={setQuantityErrors}
                />
                <OnePageSection aria-label={currentLanguage === 'NL' ? 'Verzendmethode' : 'Shipping method'}>
                  <StepTitle>{currentLanguage === 'NL' ? 'Verzendmethode' : 'Shipping method'}</StepTitle>
                  {addressesReady ? <Shipping onePage onDirty={() => setShippingReady(false)} changeSection={(section) => setShippingReady(section === 'checkout')} /> : <Pending>{currentLanguage === 'NL' ? 'Vul je adresgegevens in om de beschikbare verzendmethoden te bekijken.' : 'Enter your shipping address to view available shipping methods.'}</Pending>}
                </OnePageSection>
                <OnePageSection aria-label={currentLanguage === 'NL' ? 'Betaling' : 'Payment'}>
                  <StepTitle>{currentLanguage === 'NL' ? 'Betaling' : 'Payment'}</StepTitle>
                  <PaymentNote><LockKeyhole size={14} />{currentLanguage === 'NL' ? 'Alle betalingen zijn veilig en versleuteld.' : 'All transactions are secure and encrypted.'}</PaymentNote>
                  {addressesReady && shippingReady && shippingMethodId ? <PurchaseButton id={checkoutId} /> : <Pending>{currentLanguage === 'NL' ? 'Vul je adres in en kies een verzendmethode om je bestelling af te ronden.' : 'Enter your address and select a shipping method to complete your order.'}</Pending>}
                </OnePageSection>


              </FormsWrapper>

              <MediaQuery query={tablet}>
                <TotalWrapper className="checkout-order">
                  <SummarySticky>
                  <CartProductsSummary
                    delBtn={false}
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
                  <CheckoutDeals checkoutId={checkoutId} />
                  <JorCustomPerks />
                  </SummarySticky>
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
  font-family: var(--checkout-font);
  font-size: 14px;
  line-height: 1.5;
  h1, h2, h3, h4 { font-family: inherit; letter-spacing: 0; font-weight: bold; }
  button, input, select, textarea, label, p, span { font-family: inherit; }

  .checkout-form > button:not(nav button), .checkout-form button[type="submit"], .checkout-form button[role="none"] {
    min-height: 52px;
    max-height: none;
    height: auto;
    border-radius: 0;
    background: var(--checkout-action-background);
    box-shadow: var(--checkout-action-shadow);
    color: var(--checkout-on-action);
    font-family: inherit;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 16px 24px;
    border: 1px solid transparent;
    transition: background-color 250ms ease, box-shadow 250ms ease;
  }
  .checkout-form > button:not(nav button):hover, .checkout-form button[type="submit"]:hover, .checkout-form button[role="none"]:hover { background: var(--checkout-action-background); box-shadow: var(--checkout-action-hover-shadow); opacity: 1; }
  .checkout-form button:disabled { opacity: 0.5; cursor: not-allowed; }
  .checkout-form button[role="none"][type="button"], .checkout-form button[role="none"][type="button"]:hover { background: transparent; box-shadow: none; color: var(--checkout-action); min-height: 32px; padding: 0; border: 0; }
  .checkout-form label > span { font: inherit; text-transform: none; color: var(--checkout-text); }
  .checkout-form input::placeholder { font: inherit; text-transform: none; color: var(--checkout-muted); }
  .checkout-form input[name="invoiceAddress"] + div { width: 18px; height: 18px; min-width: 18px; border-color: var(--checkout-border); border-radius: 3px; margin-right: 10px; }
  .checkout-form input[name="invoiceAddress"] + div img { width: 12px; }
  .checkout-order > ul:last-child li { font-family: inherit; font-size: 12px; line-height: 1.7; color: var(--checkout-muted); }
  .checkout-order > ul:last-child { padding-top: 24px; border-top: 1px solid var(--checkout-border); }
  .checkout-form h3 { font-size: 18px; text-transform: none; font-weight: bold; }
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
  .checkout-shipping-method { border-color: var(--checkout-border); border-radius: 5px; padding: 16px; }
  .checkout-shipping-method[data-selected="true"] { border-color: var(--checkout-action); background: var(--checkout-summary); }
  .checkout-shipping-method > img, .checkout-shipping-method > div > svg { display: none; }
  .checkout-shipping-method span { text-transform: none; font-weight: 400; }
  .checkout-shipping-method input:checked ~ div { border-color: var(--checkout-action); }
  .checkout-shipping-method input:checked ~ div::before { background: var(--checkout-action); }

  .checkout-product {
    display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; align-items: start; gap: 16px;
    padding: 12px 0; border: 0; border-radius: 0; margin: 0;
  }
  .checkout-product-image {
    width: 64px; height: 64px; border: 1px solid var(--checkout-border);
    border-radius: 6px; overflow: hidden; background: var(--checkout-background);
  }
  .checkout-product-image img { width: 100%; height: 100%; object-fit: contain; }
  .checkout-product-info { padding: 4px 0 0; min-width: 0; width: auto; }
  .checkout-product h2 { font-size: 13px; text-transform: none; margin: 0 0 4px; padding: 0; line-height: 1.4; }
  .checkout-product span { font-size: 12px; text-transform: none; }
  .checkout-product button { top: 12px; right: 0; }
  .checkout-product select, .checkout-product input { max-width: 72px; font-size: 12px; background: transparent; border-bottom: 1px solid var(--checkout-border); }
  .checkout-product button { min-height: 20px; padding: 0; background: transparent; color: var(--checkout-text); border: 0; }
  .checkout-product button:hover { background: transparent; }
  .checkout-product input[type="number"] { height: 28px; padding: 0; border-radius: 0; }
  .checkout-form .checkout-discount button { min-height: 48px; height: 48px; padding: 0 16px; }
  .checkout-product-unit-price { display: none; }
  .checkout-product-size { justify-content: flex-start; gap: 8px; margin: 0; color: var(--checkout-muted); }
  .checkout-product-size > span { display: none; }
  .checkout-product-size select { height: 24px; border: 0; font-weight: normal; color: var(--checkout-muted); }
  .checkout-product-line-total { position: static; padding-top: 4px; white-space: nowrap; font-size: 13px; text-transform: none; }
  .checkout-product-line-total strong { display: none; }
  .checkout-product-quantity { position: absolute; top: 4px; left: 52px; margin: 0; }
  .checkout-product-quantity > span, .checkout-product-quantity button { display: none; }
  .checkout-product .checkout-product-quantity input[type="number"] { width: 24px; height: 24px; max-width: 24px; padding: 0; border: 2px solid var(--checkout-summary); border-radius: 50%; background: var(--checkout-text); color: var(--checkout-on-action); font-size: 11px; text-align: center; appearance: textfield; }
  .checkout-product-quantity input::-webkit-inner-spin-button, .checkout-product-quantity input::-webkit-outer-spin-button { appearance: none; margin: 0; }
  .checkout-product svg { max-width: 18px; }
  .checkout-totals { border: 0; border-radius: 0; padding: 20px 0 0; border-top: 1px solid var(--checkout-border); }
  .checkout-totals h3 { display: none; }
  .checkout-totals span { font-size: 14px; text-transform: none; }
  .checkout-totals span:first-child { font-weight: bold; }
  .checkout-total { border-top: 1px solid var(--checkout-border); margin-top: 16px; padding-top: 20px; }
  .checkout-total span { font-size: 20px; font-weight: normal; }
  .checkout-total span:first-child { font-weight: bold; }
  .checkout-discount { margin: 0; padding: 20px 0; border-top: 1px solid var(--checkout-border); }
  .checkout-discount > div { border: 0; padding: 0; border-radius: 0; gap: 12px; }
  .checkout-discount input { width: 100%; min-width: 0; height: 48px; border: 1px solid var(--checkout-border); border-radius: 5px; padding: 12px; background: var(--checkout-background); font-family: inherit; font-size: 14px; }
  .checkout-discount input::placeholder { font-family: inherit; font-size: 14px; text-transform: none; color: var(--checkout-muted); }
  .checkout-discount button { width: auto; flex-shrink: 0; min-height: 48px; padding: 0 16px; border-radius: 0; background: var(--checkout-action-background); color: var(--checkout-on-action); border: 1px solid transparent; font-family: inherit; font-size: 12px; font-weight: bold; text-transform: uppercase; box-shadow: var(--checkout-action-shadow); transition: box-shadow 250ms ease; }
  .checkout-discount button:hover { background: var(--checkout-action-background); box-shadow: var(--checkout-action-hover-shadow); opacity: 1; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
`;

const CheckoutHeader = styled.header`
  border-bottom: 1px solid var(--checkout-border);
  position: relative;
  &::before, &::after { content: ''; position: absolute; bottom: -1px; width: max(0px, calc((100vw - 1100px) / 2)); border-bottom: 1px solid var(--checkout-border); }
  &::before { right: 100%; }
  &::after { left: 100%; }
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
const SummarySticky = styled.div`
  position: sticky;
  top: 32px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
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
const PaymentIcons = styled.div`
  margin-bottom: 28px;
  > div { margin: 0; gap: 10px; flex-wrap: wrap; justify-content: center; }
  svg { width: 44px; height: 28px; max-width: none; margin: 0; }
`;
const StepTitle = styled.h2`font-size: 20px; font-weight: bold; margin: 0 0 16px;`;
const OnePageSection = styled.section`margin-top: 32px;`;
const Pending = styled.div`background: var(--checkout-summary); color: var(--checkout-muted); padding: 16px; border-radius: 5px; font-size: 13px;`;
const PaymentNote = styled.p`display: flex; align-items: center; gap: 8px; color: var(--checkout-muted); font-size: 13px; margin-bottom: 16px;`;
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
