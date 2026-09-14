// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { Collapse as Collapse } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import {
  buildCategoryGroups,
  buildMenuModel,
  getItemPathname,
} from '../../menuModel';
import { cocoBold, cocoRegular } from '../../../../styles/constants';
import { useUserProvider } from '../../../../context/user';

const translations: any = {
  categories: { EN: 'Categories', NL: 'Categorieën' },
  collections: { EN: 'Collections', NL: 'Collecties' },
  sale: { EN: 'Sale', NL: 'Sale' },
  viewAll: { EN: 'View all', NL: 'Alles bekijken' },
  discount: { EN: 'Discount', NL: 'Korting' },
};

function TabButton({ label, isActive, onClick }: any) {
  return (
    <Box
      onClick={onClick}
      sx={{
        ...cocoBold,
        flex: 1,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '0.7rem',
        padding: '10px 8px',
        borderRadius: '999px',
        textTransform: 'uppercase',
        color: isActive ? '#fff' : '#5c5c5c',
        backgroundColor: isActive ? '#111' : '#f4f4f4',
      }}
    >
      {label}
    </Box>
  );
}

function Group({ group, closeDrawer }: any) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Box sx={{ borderBottom: '1px solid #f0f0f0' }}>
      <Box
        onClick={() => setOpen((prev: boolean) => !prev)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 0',
          cursor: 'pointer',
        }}
      >
        <Typography
          sx={{
            ...cocoBold,
            fontSize: '0.75rem',
            color: '#111',
            textTransform: 'uppercase',
          }}
        >
          {group.name}
        </Typography>

        <ExpandMoreIcon
          sx={{
            fontSize: '1.1rem',
            color: '#8c8c8c',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </Box>

      <Collapse in={open}>
        <Box sx={{ pb: '8px' }}>
          {group.items.map((item: any) => (
            <Box key={item.id} sx={{ padding: '8px 0 8px 12px' }}>
              <NavLink
                to={{ pathname: item.pathname, state: { title: item.name } }}
                onClick={closeDrawer}
                style={{
                  ...cocoRegular,
                  fontSize: '0.72rem',
                  color: '#6c6c6c',
                  textTransform: 'uppercase',
                }}
              >
                {item.name}
              </NavLink>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function Sections({ collections, closeDrawer }: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const lang: string = currentLanguage === 'NL' ? 'NL' : 'EN';

  const { categoryMenus, saleMenus, discounts, collectionItems } =
    React.useMemo(() => buildMenuModel(collections), [collections]);

  const [activeTab, setActiveTab] = React.useState<string>('categories');

  return (
    <Box sx={{ pt: '12px' }}>
      <Box sx={{ display: 'flex', gap: '8px', mb: '8px' }}>
        <TabButton
          label={translations.categories[lang]}
          isActive={activeTab === 'categories'}
          onClick={() => setActiveTab('categories')}
        />

        <TabButton
          label={translations.collections[lang]}
          isActive={activeTab === 'collections'}
          onClick={() => setActiveTab('collections')}
        />

        <TabButton
          label={translations.sale[lang]}
          isActive={activeTab === 'sale'}
          onClick={() => setActiveTab('sale')}
        />
      </Box>

      {activeTab === 'categories' &&
        categoryMenus.map((menu: any) => (
          <Box key={menu.name}>
            <Box sx={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <NavLink
                to={{ pathname: getItemPathname(menu) }}
                onClick={closeDrawer}
                style={{
                  ...cocoBold,
                  fontSize: '0.75rem',
                  color: '#111',
                  textTransform: 'uppercase',
                }}
              >
                {translations.viewAll[lang]}
              </NavLink>
            </Box>

            {buildCategoryGroups(menu).map((group: any) => (
              <Group key={group.id} group={group} closeDrawer={closeDrawer} />
            ))}
          </Box>
        ))}

      {activeTab === 'collections' &&
        collectionItems.map((item: any) => (
          <Box
            key={item.name}
            sx={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}
          >
            <NavLink
              to={{ pathname: getItemPathname(item) }}
              onClick={closeDrawer}
              style={{
                ...cocoBold,
                fontSize: '0.75rem',
                color: '#3c3c3c',
              }}
            >
              {item.collection?.name || item.name}
            </NavLink>
          </Box>
        ))}

      {activeTab === 'sale' && (
        <Box>
          {discounts.length > 0 && (
            <Box sx={{ padding: '14px 0' }}>
              <Typography
                sx={{
                  ...cocoBold,
                  fontSize: '0.7rem',
                  color: '#111',
                  mb: '10px',
                  textTransform: 'uppercase',
                }}
              >
                {translations.discount[lang]}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {discounts.map((discount: any) => (
                  <NavLink
                    key={discount.name}
                    to={{ pathname: discount.pathname }}
                    onClick={closeDrawer}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        ...cocoBold,
                        fontSize: '0.7rem',
                        color: '#111',
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: '1px solid #e2e2e2',
                        backgroundColor: '#fafafa',
                      }}
                    >
                      {`-${discount.value}%`}
                    </Box>
                  </NavLink>
                ))}
              </Box>
            </Box>
          )}

          {saleMenus.map((menu: any) => (
            <Box key={menu.name}>
              <Box
                sx={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}
              >
                <NavLink
                  to={{ pathname: getItemPathname(menu) }}
                  onClick={closeDrawer}
                  style={{
                    ...cocoBold,
                    fontSize: '0.75rem',
                    color: '#111',
                    textTransform: 'uppercase',
                  }}
                >
                  {translations.viewAll[lang]}
                </NavLink>
              </Box>

              {buildCategoryGroups(menu).map((group: any) => (
                <Group key={group.id} group={group} closeDrawer={closeDrawer} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
