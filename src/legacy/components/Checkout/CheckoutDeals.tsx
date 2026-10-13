import { useRef, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from 'react-apollo';
import { Link } from '@/legacy-compat/router';
import styled from 'styled-components';
import { gql } from 'apollo-boost';

const getDealsCategory = gql`
  query getDealsCategory($slug: String!) {
    category(slug: $slug) { id }
  }
`;
import { getProducts } from '../../apollo/queries/products';
import { useUserProvider } from '../../context/user';
import { BtnBase } from '../common/Buttons';
import { addCheckoutLine } from '../../apollo/mutations/checkout';
import { getCheckout } from '../../apollo/queries/checkout';
import { GUEST_TOKEN_NAME } from '../../constants';

interface Deal {
  id: string;
  slug: string;
  name: string;
  color?: { name?: string };
  price?: { localized?: string };
  discountPrice?: { localized?: string };
  imageGroups?: { id?: string; url?: string; images?: { url?: string }[] }[];
  stockItems?: { size: string; isInStock: boolean }[];
}

export default function CheckoutDeals({ checkoutId }: { checkoutId?: string }) {
  const { state: { currentLanguage, currency } } = useUserProvider();
  const client = useApolloClient();
  const [addLine] = useMutation(addCheckoutLine);
  const busy = useRef(false);
  const [pending, setPending] = useState<string | null>(null);
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const nl = currentLanguage === 'NL';
  const addDeal = async (product: Deal) => {
    if (busy.current || !checkoutId) return;
    const availableSizes = product.stockItems?.filter((item) => item.isInStock) || [];
    const size = sizes[product.id] || (availableSizes.length === 1 ? availableSizes[0]?.size : undefined);
    if (!size || !availableSizes.some((item) => item.size === size)) {
      setFeedback((previous) => ({ ...previous, [product.id]: nl ? 'Kies eerst een maat.' : 'Choose a size first.' }));
      return;
    }
    busy.current = true;
    setPending(product.id);
    setFeedback((previous) => ({ ...previous, [product.id]: '' }));
    try {
      const token = localStorage.getItem(GUEST_TOKEN_NAME);
      const result = await addLine({ variables: {
        checkoutId, token, currency, lang: currentLanguage,
        lines: [{ productId: product.id, size, quantity: 1, selectedImageGroupId: product.imageGroups?.[0]?.id }],
      } });
      const response = result.data?.checkoutLinesAdd;
      if (response?.errors?.length || !response?.checkout) {
        setFeedback((previous) => ({ ...previous, [product.id]: response?.errors?.[0]?.message || (nl ? 'Toevoegen mislukt. Probeer opnieuw.' : 'Could not add this item. Please try again.') }));
        return;
      }
      client.writeQuery({ query: getCheckout, variables: { token, currency, lang: currentLanguage }, data: { checkout: response.checkout } });
      setFeedback((previous) => ({ ...previous, [product.id]: nl ? 'Toegevoegd aan je winkelmand.' : 'Added to your bag.' }));
    } catch {
      setFeedback((previous) => ({ ...previous, [product.id]: nl ? 'Toevoegen mislukt. Probeer opnieuw.' : 'Could not add this item. Please try again.' }));
    } finally {
      busy.current = false;
      setPending(null);
    }
  };
  const collection = useQuery(getDealsCategory, { variables: { slug: 'checkout-deals' } });
  const categoryId = collection.data?.category?.id;
  const products = useQuery(getProducts, {
    skip: !categoryId,
    variables: { categoryIds: [categoryId], currency, first: 6 },
  });
  const deals: Deal[] = products.data?.products?.edges?.map((edge: { node: Deal }) => edge.node) || [];
  if (collection.error || products.error || !deals.length) return null;

  return (
    <Deals aria-label="Checkout deals">
      <h3>CHECKOUT DEALS</h3>
      {deals.map((product) => {
        const availableSizes = product.stockItems?.filter((item) => item.isInStock) || [];
        return (
        <DealRow key={product.id}>
          <Link to={`/product/${product.slug}`} aria-label={product.name}>
            <img src={product.imageGroups?.[0]?.url || product.imageGroups?.[0]?.images?.[0]?.url} alt={product.name} />
          </Link>
          <div>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
            {product.color?.name && <p>{product.color.name}</p>}
            {(() => {
              const regular = product.price as { localized?: string; amount?: number } | undefined;
              const deal = product.discountPrice as { localized?: string; amount?: number } | undefined;
              const hasDeal = !!deal?.localized && (deal.amount ?? 0) > 0 && (regular?.amount ?? 0) > (deal.amount ?? 0);
              return hasDeal ? (
                <PriceLine><del aria-label={nl ? 'Originele prijs' : 'Original price'}>{regular?.localized}</del><strong>{deal?.localized}</strong></PriceLine>
              ) : <span>{regular?.localized}</span>;
            })()}
            {availableSizes.length > 1 && (
              <select aria-label={`${nl ? 'Maat' : 'Size'}: ${product.name}`} value={sizes[product.id] || ''} disabled={pending !== null} onChange={(event) => {
                setSizes((previous) => ({ ...previous, [product.id]: event.target.value }));
                setFeedback((previous) => ({ ...previous, [product.id]: '' }));
              }}>
                <option value="">{nl ? 'Kies maat' : 'Choose size'}</option>
                {availableSizes.map((item) => <option key={item.size} value={item.size}>{item.size}</option>)}
              </select>
            )}
            {feedback[product.id] && <p role="status">{feedback[product.id]}</p>}
          </div>
          <DealAction type="button" disabled={pending !== null || !checkoutId || !availableSizes.length} onClick={() => addDeal(product)} aria-label={`${nl ? 'Toevoegen' : 'Add'}: ${product.name}`}>
            {!availableSizes.length ? (nl ? 'Uitverkocht' : 'Sold out') : pending === product.id ? (nl ? 'Toevoegen…' : 'Adding…') : (nl ? 'Toevoegen' : 'Add')}
          </DealAction>
        </DealRow>
        );
      })}
    </Deals>
  );
}

const Deals = styled.section`
  padding: 24px 0;
  border-top: 1px solid var(--checkout-border);
  h3 { font-size: 14px; margin-bottom: 20px; }
`;
const DealRow = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
  &:last-child { margin-bottom: 0; }
  img { width: 64px; height: 64px; object-fit: contain; border: 1px solid var(--checkout-border); border-radius: 6px; background: var(--checkout-background); }
  a { color: var(--checkout-text); text-decoration: none; font-size: 12px; font-weight: bold; }
  a:hover { text-decoration: underline; }
  p { font-size: 12px; color: var(--checkout-muted); margin: 4px 0; }
  span { font-size: 12px; }
  select { display: block; margin-top: 8px; max-width: 100%; padding: 6px; border: 1px solid var(--checkout-border); border-radius: 0; background: var(--checkout-background); color: var(--checkout-text); font: inherit; font-size: 12px; }
`;
const DealAction = styled(BtnBase)`
  && { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 10px 12px; border-radius: 0; background: var(--checkout-action-background); color: var(--checkout-on-action); font-size: 10px; box-shadow: var(--checkout-action-shadow); text-decoration: none; transition: box-shadow 250ms ease; }
  &&:hover { box-shadow: var(--checkout-action-hover-shadow); text-decoration: none; }
  &&:disabled { opacity: 0.5; cursor: not-allowed; }
`;const PriceLine = styled.span`
  display: inline-flex; gap: 8px; align-items: baseline;
  del { color: var(--checkout-muted); font-size: 12px; }
  strong { font-size: 13px; font-weight: bold; color: var(--checkout-text); }
`;
