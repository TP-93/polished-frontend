// @ts-nocheck
import * as React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import Error from './Error';
import Loader from './Loader';
import MenuImage from './MenuImage';
import Tabs from './Tabs';
import CategoriesPanel from './CategoriesPanel';
import CollectionsPanel from './CollectionsPanel';
import SalePanel from './SalePanel';

import { buildMenuModel } from '../../menuModel';
import { useUserProvider } from '../../../../context/user';

const translations: any = {
  categories: { EN: 'Categories', NL: "Categorieën" },
  collections: { EN: 'Collections', NL: 'Collecties' },
  sale: { EN: 'Sale', NL: 'Sale' },
  viewAll: { EN: 'View all', NL: 'Alles bekijken' },
  discount: { EN: 'Discount', NL: 'Korting' },
};

interface Props {
  error: any;
  loading: boolean;
  shopId: string;
  collections: any[];
  closeDrawer: () => void;
}

export default function Content({
  error,
  loading,
  shopId,
  collections,
  closeDrawer,
}: Props) {
  const {
    state: { currentLanguage },
  } = useUserProvider();

  const lang: string = currentLanguage === 'NL' ? 'NL' : 'EN';

  const labels: any = {
    viewAll: translations.viewAll[lang],
    discount: translations.discount[lang],
  };

  const { categoryMenus, saleMenus, discounts, collectionItems } =
    React.useMemo(() => buildMenuModel(collections), [collections]);

  const tabs: any[] = [];

  if (categoryMenus.length > 0)
    tabs.push({ id: 'categories', label: translations.categories[lang] });

  if (collectionItems.length > 0)
    tabs.push({ id: 'collections', label: translations.collections[lang] });

  if (saleMenus.length > 0 || discounts.length > 0)
    tabs.push({ id: 'sale', label: translations.sale[lang] });

  const [activeTab, setActiveTab] = React.useState<string>('categories');

  const currentTab: string =
    tabs.find((tab: any) => tab.id === activeTab)?.id || tabs[0]?.id;

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      onMouseLeave={(e: any) => {
        if (e.target.id !== 'shop-item') closeDrawer();
      }}
      sx={{
        backgroundColor: '#fff',
        borderTop: '1px solid #ededed',
      }}
    >
      <Box
        sx={{
          flexBasis: '76%',
          maxWidth: '76%',
          padding: '24px 32px 32px 40px',
          overflow: 'hidden auto',
        }}
      >
        <Tabs tabs={tabs} active={currentTab} onSelect={setActiveTab} />

        {currentTab === 'categories' && (
          <CategoriesPanel
            menus={categoryMenus}
            closeDrawer={closeDrawer}
            labels={labels}
          />
        )}

        {currentTab === 'collections' && (
          <CollectionsPanel items={collectionItems} closeDrawer={closeDrawer} />
        )}

        {currentTab === 'sale' && (
          <SalePanel
            menus={saleMenus}
            discounts={discounts}
            closeDrawer={closeDrawer}
            labels={labels}
          />
        )}
      </Box>

      <Box
        sx={{
          flexBasis: '24%',
          maxWidth: '24%',
          padding: '24px 24px 24px 0',
        }}
      >
        <Box
          sx={{
            height: '100%',
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: '#f6f6f6',
          }}
        >
          <MenuImage shopId={shopId} />
        </Box>
      </Box>
    </Stack>
  );
}
