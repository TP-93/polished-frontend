// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';

import { useHeaderContext } from '../Provider';
import {
  buildCategoryGroups,
  buildCategoryColumns,
  getItemPathname,
} from '../menuModel';
import { cocoBold, cocoRegular } from '../../../styles/constants';
import PreventScrollWrapper from '../../common/PreventScrollWrapper';

interface Props {
  isShopDropDown: boolean;
  isWhiteColorHeader: boolean;
  setShopDropDown: (status: boolean) => void;
  setHeaderHovered: (status: boolean) => void;
}

const slugOf = (item: any) => (item?.collection?.slug || '').toLowerCase();
const isSaleSlug = (slug: string) => slug === 'sale' || slug.startsWith('sale-');

const navItems = [
  { id: 'new-in', label: 'New In', pathname: '/collection/new-in' },
  { id: 'shop', label: 'Shop All', dropdown: true },
  { id: 'collections', label: 'Collections', dropdown: true },
  { id: 'sale', label: 'Sale', dropdown: true },
];

const linkStyle = {
  ...cocoRegular,
  fontSize: '0.6875rem',
  color: '#6c6c6c',
};

const headingStyle = {
  ...cocoBold,
  fontSize: '0.6875rem',
  color: '#111',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

function CategoryGrid({ menu, allLabel, close }: any) {
  if (!menu) return null;
  const columns = buildCategoryColumns(buildCategoryGroups(menu));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        columnGap: '24px',
      }}
    >
      <Box>
        <NavLink
          to={{ pathname: getItemPathname(menu) }}
          onClick={close}
          style={headingStyle}
        >
          {allLabel}
        </NavLink>
      </Box>

      {columns.map((column: any) => (
        <Box key={column.id}>
          <Box sx={{ ...headingStyle, mb: '12px' }}>{column.name}</Box>
          {column.items.map((item: any) => (
            <Box key={item.id} sx={{ py: '4px' }}>
              <NavLink
                to={{ pathname: item.pathname, state: { title: item.name } }}
                onClick={close}
                style={linkStyle}
              >
                {item.name}
              </NavLink>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default function Shop({
  isWhiteColorHeader,
  setShopDropDown,
  setHeaderHovered,
}: Props) {
  const { shop } = useHeaderContext();
  const [active, setActive] = React.useState<string>('');

  const items: any[] = shop?.collections || [];
  const shopMenu = items.find((item) => slugOf(item) === 'shop');
  const saleMenu = items.find((item) => slugOf(item) === 'sale');
  const collectionItems = items.filter((item) => {
    const slug = slugOf(item);
    return item?.collection && slug !== 'shop' && slug !== 'accessoires' && !isSaleSlug(slug);
  });

  const open = (id: string) => {
    setActive(id);
    setShopDropDown(!!id);
    if (id) setHeaderHovered(true);
  };
  const close = () => {
    setActive('');
    setShopDropDown(false);
    setHeaderHovered(false);
  };

  const color = isWhiteColorHeader ? '#454545' : '#fbfbfb';

  return (
    <Box
      id="shop-item"
      onMouseLeave={close}
      sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: '20px', pl: '16px' }}
    >
      {navItems.map((nav) => {
        const textSx = {
          ...cocoRegular,
          color,
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          textDecoration: active === nav.id ? 'underline' : 'none',
          textUnderlineOffset: '4px',
        };

        return (
          <Box
            key={nav.id}
            onMouseEnter={() => open(nav.dropdown ? nav.id : '')}
            sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
          >
            {nav.pathname ? (
              <NavLink to={{ pathname: nav.pathname }} onClick={close} style={textSx}>
                {nav.label}
              </NavLink>
            ) : (
              <Box component="span" sx={textSx}>
                {nav.label}
              </Box>
            )}
          </Box>
        );
      })}

      <PreventScrollWrapper active={!!active}>
        {!!active && (
          <Box
            sx={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              borderTop: '1px solid #ededed',
              borderBottom: '1px solid #ededed',
              padding: '32px 40px 40px',
              maxHeight: 'calc(100vh - 68px)',
              overflowY: 'auto',
            }}
          >
            {active === 'shop' && (
              <CategoryGrid menu={shopMenu} allLabel="Shop All Products" close={close} />
            )}
            {active === 'sale' && (
              <CategoryGrid menu={saleMenu} allLabel="Shop All Sale" close={close} />
            )}
            {active === 'collections' && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  columnGap: '24px',
                  rowGap: '12px',
                }}
              >
                {collectionItems.map((item: any) => (
                  <NavLink
                    key={item.id || item.name}
                    to={{ pathname: getItemPathname(item) }}
                    onClick={close}
                    style={{ ...linkStyle, textTransform: 'uppercase' }}
                  >
                    {item.collection?.name || item.name}
                  </NavLink>
                ))}
              </Box>
            )}
          </Box>
        )}
      </PreventScrollWrapper>
    </Box>
  );
}
