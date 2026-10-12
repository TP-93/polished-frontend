// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { Collapse as Collapse } from '@mui/material';
import { Plus, Minus } from 'lucide-react';

import {
  buildCategoryGroups,
  buildCategoryColumns,
  getItemPathname,
} from '../../menuModel';
import { cocoBold, cocoRegular } from '../../../../styles/constants';

const slugOf = (item: any) => (item?.collection?.slug || '').toLowerCase();
const isSaleSlug = (slug: string) => slug === 'sale' || slug.startsWith('sale-');

const topStyle = {
  ...cocoBold,
  fontSize: '0.8125rem',
  color: '#111',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const subHeadStyle = {
  ...cocoBold,
  fontSize: '0.75rem',
  color: '#111',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const linkStyle = {
  ...cocoRegular,
  fontSize: '0.75rem',
  color: '#6c6c6c',
};

function Row({ children, onClick, open, level = 0 }: any) {
  const Icon = open ? Minus : Plus;
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: level === 0 ? '16px' : '12px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {children}
      <Icon size={level === 0 ? 16 : 14} strokeWidth={1.35} color="#111" />
    </Box>
  );
}

function CategoryAccordion({ menu, allLabel, closeDrawer }: any) {
  const [open, setOpen] = React.useState<string>('');
  if (!menu) return null;
  const columns = buildCategoryColumns(buildCategoryGroups(menu), slugOf(menu));

  return (
    <Box sx={{ pl: '12px', pb: '8px' }}>
      {allLabel && <Box sx={{ py: '12px' }}>
        <NavLink to={{ pathname: getItemPathname(menu) }} onClick={closeDrawer} style={subHeadStyle}>
          {allLabel}
        </NavLink>
      </Box>}
      {columns.map((column: any) => (
        <Box key={column.id}>
          <Row level={1} open={open === column.id} onClick={() => setOpen(open === column.id ? '' : column.id)}>
            <Box sx={subHeadStyle}>{column.name}</Box>
          </Row>
          <Collapse in={open === column.id}>
            <Box sx={{ pl: '12px', pb: '8px' }}>
              <Box sx={{ py: '8px' }}>
                <NavLink to={{ pathname: column.allPathname, state: { title: column.name } }} onClick={closeDrawer} style={linkStyle}>
                  Shop all {column.name}
                </NavLink>
              </Box>
              {column.items.map((item: any) => (
                <Box key={item.id} sx={{ py: '8px' }}>
                  <NavLink
                    to={{ pathname: item.pathname, state: { title: item.name } }}
                    onClick={closeDrawer}
                    style={linkStyle}
                  >
                    {item.name}
                  </NavLink>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function Sections({ collections = [], closeDrawer }: Props) {
  const [open, setOpen] = React.useState<string>('');
  const toggle = (id: string) => setOpen(open === id ? '' : id);

  const shopMenu = collections.find((item) => slugOf(item) === 'shop');
  const saleMenu = collections.find((item) => slugOf(item) === 'sale');
  const collectionItems = collections.filter((item) => {
    const slug = slugOf(item);
    return item?.collection && slug !== 'shop' && slug !== 'accessoires' && !isSaleSlug(slug);
  });

  const border = { borderBottom: '1px solid #ededed' };

  return (
    <Box sx={{ pt: '16px' }}>
      <Box sx={{ ...border, py: '16px' }}>
        <NavLink to={{ pathname: '/collection/new-in' }} onClick={closeDrawer} style={topStyle}>
          New In
        </NavLink>
      </Box>

      <Box sx={border}>
        <Row open={open === 'shop'} onClick={() => toggle('shop')}>
          <Box sx={topStyle}>Shop All</Box>
        </Row>
        <Collapse in={open === 'shop'}>
          <CategoryAccordion menu={shopMenu} closeDrawer={closeDrawer} />
        </Collapse>
      </Box>

      <Box sx={border}>
        <Row open={open === 'collections'} onClick={() => toggle('collections')}>
          <Box sx={topStyle}>Collections</Box>
        </Row>
        <Collapse in={open === 'collections'}>
          <Box sx={{ pl: '12px', pb: '8px' }}>
            {collectionItems.map((item: any) => (
              <Box key={item.name} sx={{ py: '10px' }}>
                <NavLink to={{ pathname: getItemPathname(item) }} onClick={closeDrawer} style={subHeadStyle}>
                  {item.collection?.name || item.name}
                </NavLink>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>

      <Box sx={border}>
        <Row open={open === 'sale'} onClick={() => toggle('sale')}>
          <Box sx={topStyle}>Sale</Box>
        </Row>
        <Collapse in={open === 'sale'}>
          <CategoryAccordion menu={saleMenu} allLabel="Shop All Sale" closeDrawer={closeDrawer} />
        </Collapse>
      </Box>
    </Box>
  );
}
