import { useRef, useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation, useQuery } from 'react-apollo';
import { Check, Truck } from 'lucide-react';
import styled from 'styled-components';
import { useUserProvider } from '../../context/user';
import { GUEST_TOKEN_NAME } from '../../constants';
import { addCheckoutLine, deleteCheckoutLine } from '../../apollo/mutations/checkout';
import { getCheckout } from '../../apollo/queries/checkout';
import { BtnBase } from '../common/Buttons';

const insuranceProductQuery = gql`
  query CheckoutInsuranceProduct($currency: String) {
    product(slug: "verzendverzekering") {
      id
      price(currency: $currency) { amount currency }
      discountPrice(currency: $currency) { amount currency }
      stockItems { size isInStock }
    }
  }
`;

interface Props {
  checkoutId?: string;
  orderLines: { productId: string; cartId: string }[];
  shippingReady: boolean;
  onBusyChange: (busy: boolean) => void;
}

export default function ShippingInsurance({ checkoutId, orderLines, shippingReady, onBusyChange }: Props) {
  const { state: { currentLanguage, currency } } = useUserProvider();
  const nl = currentLanguage === 'NL';
  const client = useApolloClient();
  const { data, loading, error: productError } = useQuery(insuranceProductQuery, { variables: { currency } });
  const [addLine] = useMutation(addCheckoutLine);
  const [deleteLine] = useMutation(deleteCheckoutLine);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const busy = useRef(false);
  const product = data?.product;
  const insuranceLines = orderLines.filter(line => line.productId === product?.id);
  const selected = insuranceLines.length > 0;
  const availableSizes = product?.stockItems?.filter((item: { isInStock: boolean }) => item.isInStock) || [];
  const money = product?.discountPrice || product?.price;
  const price = money && Number.isFinite(money.amount)
    ? new Intl.NumberFormat(nl ? 'nl-NL' : 'en-GB', { style: 'currency', currency: money.currency || currency }).format(money.amount)
    : (nl ? '€2,95' : '€2.95');
  const unavailable = Boolean(productError) || (!loading && (!product || !money || availableSizes.length !== 1));

  const toggle = async () => {
    if (busy.current || !checkoutId || !product || (!selected && (unavailable || !shippingReady))) return;
    busy.current = true;
    setPending(true);
    setError(false);
    onBusyChange(true);
    const token = localStorage.getItem(GUEST_TOKEN_NAME);
    const variables = { checkoutId, token, currency, lang: currentLanguage };
    const writeCheckout = (response: any) => {
      if (response?.errors?.length || !response?.checkout) throw new Error('Insurance update failed');
      client.writeQuery({ query: getCheckout, variables: { token, currency, lang: currentLanguage }, data: { checkout: response.checkout } });
    };
    try {
      if (selected) {
        for (const line of insuranceLines) {
          const result = await deleteLine({ variables: { ...variables, lineId: line.cartId } });
          writeCheckout(result.data?.checkoutLineDelete);
        }
      } else {
        const size = availableSizes[0]?.size;
        if (!size) throw new Error('Insurance variant unavailable');
        const result = await addLine({ variables: { ...variables, lines: [{ productId: product.id, size, quantity: 1 }] } });
        writeCheckout(result.data?.checkoutLinesAdd);
      }
    } catch {
      setError(true);
    } finally {
      busy.current = false;
      setPending(false);
      onBusyChange(false);
    }
  };

  return (
    <Section aria-labelledby="insurance-heading">
      <h2 id="insurance-heading">{nl ? `Wil je jouw zending verzekeren? Slechts ${price} extra!` : `Would you like to insure your shipment? Just ${price} extra!`}</h2>
      <Offer>
        <Truck size={28} strokeWidth={1.5} aria-hidden="true" />
        <Copy>
          <strong id="insurance-label">{nl ? 'Verzendverzekering' : 'Shipping insurance'}</strong>
          <p>{nl ? `Verzeker tegen Schade, Verlies & Diefstal voor ${price}` : `Protect against Damage, Loss & Theft for ${price}`}</p>
          <p id="insurance-description">{nl ? 'Gemoedsrust met de JORCUSTOM Leveringsgarantie voor het geval jouw pakket beschadigd, verloren of gestolen wordt tijdens het transport.' : 'Peace of mind with the JORCUSTOM Delivery Guarantee in case your parcel is damaged, lost or stolen during transit.'}</p>
        </Copy>
        <Toggle type="button" role="switch" aria-checked={selected} aria-labelledby="insurance-label" aria-describedby="insurance-description" aria-busy={pending} disabled={pending || loading || !checkoutId || (!selected && (unavailable || !shippingReady))} onClick={toggle}>
          <span>{selected && <Check size={14} strokeWidth={2} aria-hidden="true" />}</span>
        </Toggle>
      </Offer>
      {error && <Message role="alert">{nl ? 'De verzendverzekering kon niet worden aangepast. Probeer opnieuw.' : 'Shipping insurance could not be updated. Please try again.'}</Message>}
      {unavailable && !selected && <Message role="status">{nl ? 'Verzendverzekering is momenteel niet beschikbaar.' : 'Shipping insurance is currently unavailable.'}</Message>}
      {!shippingReady && !selected && !unavailable && <Message role="status">{nl ? 'Kies eerst je verzendmethode.' : 'Select your shipping method first.'}</Message>}
    </Section>
  );
}

const Section = styled.section`
  margin-top: 32px;
  h2 { font-size: 18px; line-height: 1.5; margin: 0 0 16px; }
`;
const Offer = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 48px;
  align-items: start;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--checkout-border);
  border-radius: 6px;
  > svg { margin-top: 2px; color: var(--checkout-text); }
  @media (max-width: 480px) { gap: 10px; padding: 14px; }
`;
const Copy = styled.div`
  min-width: 0;
  strong { display: block; font-size: 14px; font-weight: bold; }
  p { margin: 6px 0 0; font-size: 12px; line-height: 1.6; color: var(--checkout-muted); }
`;
const Toggle = styled(BtnBase)`
  && { display: flex; align-items: center; width: 48px; height: 28px; min-height: 28px; padding: 3px; border: 0; border-radius: 16px; background: var(--checkout-border); box-shadow: none; }
  &&[aria-checked="true"] { background: var(--checkout-text); }
  &&:hover { box-shadow: none; }
  &&:focus-visible { outline: 2px solid var(--checkout-focus); outline-offset: 3px; }
  span { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: var(--checkout-background); color: var(--checkout-text); transition: transform 150ms ease; }
  &[aria-checked="true"] span { transform: translateX(20px); }
  @media (prefers-reduced-motion: reduce) { span { transition: none; } }
`;
const Message = styled.p`font-size: 12px; color: var(--checkout-muted); margin: 8px 0 0; &[role="alert"] { color: var(--destructive); }`;