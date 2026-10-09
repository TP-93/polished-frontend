import { useQuery } from 'react-apollo';
import { Link } from '@/legacy-compat/router';
import styled from 'styled-components';
import { getCollection } from '../../apollo/queries/collection';
import { getProducts } from '../../apollo/queries/products';
import { useUserProvider } from '../../context/user';
import { BtnBase } from '../common/Buttons';

interface Deal {
  id: string;
  slug: string;
  name: string;
  color?: { name?: string };
  price?: { localized?: string };
  discountPrice?: { localized?: string };
  imageGroups?: { url?: string; images?: { url?: string }[] }[];
}

export default function CheckoutDeals() {
  const { state: { currentLanguage, currency } } = useUserProvider();
  const collection = useQuery(getCollection, {
    variables: { slug: 'checkout-deals', lang: currentLanguage },
  });
  const collectionId = collection.data?.collection?.id;
  const products = useQuery(getProducts, {
    skip: !collectionId,
    variables: { collectionIds: [collectionId], currency, first: 6 },
  });
  const deals: Deal[] = products.data?.products?.edges?.map((edge: { node: Deal }) => edge.node) || [];
  if (collection.error || products.error || !deals.length) return null;

  return (
    <Deals aria-label="Checkout deals">
      <h3>CHECKOUT DEALS</h3>
      {deals.map((product) => (
        <DealRow key={product.id}>
          <Link to={`/product/${product.slug}`} aria-label={product.name}>
            <img src={product.imageGroups?.[0]?.url || product.imageGroups?.[0]?.images?.[0]?.url} alt={product.name} />
          </Link>
          <div>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
            {product.color?.name && <p>{product.color.name}</p>}
            <span>{product.discountPrice?.localized || product.price?.localized}</span>
          </div>
          <DealAction as={Link} to={`/product/${product.slug}`}>
            {currentLanguage === 'NL' ? 'Selecteer' : 'Select'}
          </DealAction>
        </DealRow>
      ))}
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
`;
const DealAction = styled(BtnBase)`
  && { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 10px 12px; border-radius: 0; background: var(--checkout-action-background); color: var(--checkout-on-action); font-size: 10px; box-shadow: var(--checkout-action-shadow); text-decoration: none; transition: box-shadow 250ms ease; }
  &&:hover { box-shadow: var(--checkout-action-hover-shadow); text-decoration: none; }
`;