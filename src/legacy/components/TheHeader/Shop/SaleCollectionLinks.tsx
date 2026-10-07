// ============= Full file contents =============
// Lists the SALE - XX% OFF collection links under "Shop All Sale".
// Every candidate slug is checked live; a link is only rendered when the
// collection exists and actually contains products.
// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { linkStyle } from './styles';

const SALE_SLABS = [20, 30, 40, 50, 60, 70];

const QUERY = `
query SaleCollectionLinks {
${SALE_SLABS.map(
  (value) =>
    `c${value}: collection(slug: "sale-${value}-off") { name products { totalCount } }`,
).join('\n')}
}
`;

interface SaleCollection {
  name: string;
  products: { totalCount: number } | null;
}

export default function SaleCollectionLinks({ close }: any) {
  const [sales, setSales] = React.useState<SaleCollection[]>([]);

  React.useEffect(() => {
    let cancelled = false;

    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (cancelled) return;

        const data = result?.data || {};
        const found: SaleCollection[] = [];

        SALE_SLABS.forEach((value) => {
          const collection = data[`c${value}`];

          if (collection?.products?.totalCount > 0) found.push(collection);
        });

        setSales(found);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (sales.length === 0) return null;

  return (
    <Box sx={{ mt: '12px' }}>
      {sales.map((sale) => (
        <Box key={sale.name} sx={{ py: '4px' }}>
          <NavLink
            to={{
              pathname: `/collection/${sale.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            }}
            onClick={close}
            style={linkStyle}
          >
            {sale.name}
          </NavLink>
        </Box>
      ))}
    </Box>
  );
}
