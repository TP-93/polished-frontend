// @ts-nocheck
import React from 'react';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import { useMediaQuery } from '@mui/material';

import Faq from '../common/Faq';
import NoData from '../common/PageDetails/NoData';
import Filters from './Filters';
import Toolbar from './Toolbar';
import SeoText from '../common/Seo';
import LoadMore from './LoadMore';
import { Drawer } from '../TheDrawer';
import ModalPortal from '../common/Modals/ModalPortal';
import ProductCard from '../common/ProductDetails/ProductCard';
import SubscriptionPopup from '../common/SubscriptionPopup';
import SubscriptionButton from '../common/Buttons/SubscriptionButton';
import { useUserProvider } from '../../context/user';
import { GUEST_TOKEN_NAME } from '../../constants';

function mergeArraysUnique(arr1: string[], arr2: string[]) {
  const combinedArray: string[] = arr1.concat(arr2);
  return Array.from(new Set(combinedArray));
}

function arraysHaveCommonElement(arr1: string[], arr2: string[]) {
  const set1 = new Set(arr1);

  for (let i = 0; i < arr2.length; i += 1) {
    if (set1.has(arr2[i])) {
      return true;
    }
  }

  return false;
}

interface Props {
  productsInfo: any;
  categoryInfo: any;
  collectionInfo: any;
  loadMoreProductsRequest: any;
}

export default function Category({
  productsInfo,
  categoryInfo,
  collectionInfo,
  loadMoreProductsRequest,
}: Props) {
  const listRef: any = React.useRef();
  const isMounted: any = React.useRef();

  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  const isModalClosed = localStorage.getItem('isModalClosed');

  const sessionProductData: any = JSON.parse(
    sessionStorage.getItem('selected_product') as any,
  );

  const {
    slug,
    name: productsTitle,
    rowNumber: productsInRow = 5,
  } = categoryInfo || collectionInfo || {};

  const isMobile = useMediaQuery('(max-width:767px)');

  const {
    state: { currency, languages, currentLanguage, isSubsButtonVisible },
  } = useUserProvider();
  const {
    Subscription: { subButton },
  } = languages[currentLanguage];

  const [isSubModal, toggleSubModal] = React.useState<boolean>(false);
  const [isFiltersDrawer, setFiltersDrawer] = React.useState<boolean>(false);

  const [isFetching, setFetching] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any>({
    filtered: [],
    unfiltered: [],
    totalCount: 0,
  });
  const [sizeFilters, setSizeFilters] = React.useState<any>({
    data: [],
    selected: [],
  });
  const [colorFilters, setColorFilters] = React.useState<any>({
    data: [],
    selected: [],
  });
  const [discountFilters, setDiscountFilters] = React.useState<any>({
    data: [],
    selected: [],
  });

  function scrollToProduct() {
    const product: any = document.getElementById(`${sessionProductData.id}`);

    setTimeout(() => {
      window.scrollTo({
        top: product?.offsetTop - 100,
        behavior: 'smooth',
      });
    }, 100);
  }

  React.useEffect(() => {
    if (listRef.current && products?.filtered.length > 0) {
      if (sessionProductData) {
        if (categoryInfo && !collectionInfo) {
          if (categoryInfo.id === sessionProductData?.category?.id) {
            scrollToProduct();
          }
        } else if (!categoryInfo && collectionInfo) {
          if (collectionInfo.id === sessionProductData?.collection?.id) {
            scrollToProduct();
          }
        } else if (categoryInfo && collectionInfo) {
          if (
            categoryInfo.id === sessionProductData?.category?.id &&
            collectionInfo.id === sessionProductData?.collection?.id
          ) {
            scrollToProduct();
          }
        }
      }
    }
  }, [products, sessionProductData]);

  const toggleSubModalHandler = () => toggleSubModal((prev) => !prev);

  const applyFilters = (dataList: any[]) => {
    const selectedSizes: string[] = sizeFilters.selected;
    const selectedColors: string[] = colorFilters.selected;
    const selectedDiscounts: string[] = discountFilters.selected;

    const filteredProducts: any[] = dataList.filter((product: any) => {
      const {
        node: { color, stockItems },
      }: any = product || {};

      const productDiscount = getDiscountPercent(product.node);

      const productStockSizes = stockItems
        .filter((tmp1: any) => tmp1.isInStock)
        .map((tmp2: any) => tmp2.size);

      const matchesSizes =
        selectedSizes.length === 0 ||
        arraysHaveCommonElement(selectedSizes, productStockSizes);

      const matchesColors =
        selectedColors.length === 0 ||
        arraysHaveCommonElement(selectedColors, [color.value]);

      const matchesDiscounts =
        selectedDiscounts.length === 0 ||
        selectedDiscounts.some(
          (value: string) => Number(salePercentValue || 0) >= Number(value),
        );

      return matchesSizes && matchesColors && matchesDiscounts;
    });

    return filteredProducts;
  };

  const applyFiltersHandler = () => {
    if (
      sizeFilters.selected.length === 0 &&
      colorFilters.selected.length === 0 &&
      discountFilters.selected.length === 0
    ) {
      return setProducts((prev: any) => ({
        ...prev,
        filtered: prev.unfiltered,
      }));
    }

    const filteredProducts = applyFilters(products.unfiltered);

    setProducts((prev: any) => ({
      ...prev,
      filtered: filteredProducts,
    }));

    return setFiltersDrawer(false);
  };

  React.useEffect(() => {
    const handleBeforeUnload = () => {
      // window.scrollTo(0, 0); // Scroll to top before reload
      sessionStorage.removeItem('selected_product');
    };

    if (!isModalClosed && isSubsButtonVisible) {
      setTimeout(() => {
        localStorage.setItem('isModalClosed', JSON.stringify(true));
        toggleSubModal(true);
      }, 5000);
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    isMounted.current = true;

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  React.useEffect(() => {
    if (productsInfo) {
      const sizes = productsInfo.stockItemSizes;

      const fetchedProducts = productsInfo.products.edges;

      const colors = fetchedProducts
        .map(({ node }: any) => node.color.value)
        .filter((col: any, ind: any, arr: any) => arr.indexOf(col) === ind);

      const discountLevels = fetchedProducts
        .map(({ node }: any) => Number(node.salePercentValue || 0))
        .filter((value: number) => value > 0)
        .map((value: number) => String(Math.floor(value / 10) * 10))
        .filter((value: string) => value !== '0');

      if (
        sizeFilters.selected.length > 0 ||
        colorFilters.selected.length > 0 ||
        discountFilters.selected.length > 0
      ) {
        const joinedProductsList = mergeArraysUnique(
          products.unfiltered,
          fetchedProducts,
        );

        const filteredProducts = applyFilters(joinedProductsList);

        setProducts({
          filtered: filteredProducts,
          unfiltered: joinedProductsList,
          totalCount: productsInfo.totalProducts,
        });
      } else {
        setProducts((prev: any) => {
          return {
            filtered: mergeArraysUnique(prev.unfiltered, fetchedProducts),
            unfiltered: mergeArraysUnique(prev.unfiltered, fetchedProducts),
            totalCount: productsInfo.totalProducts,
          };
        });
      }

      setSizeFilters((prev: any) => {
        return {
          ...prev,
          data: mergeArraysUnique(prev.data, sizes),
        };
      });

      setColorFilters((prev: any) => {
        return {
          ...prev,
          data: mergeArraysUnique(prev.data, colors),
        };
      });

      setDiscountFilters((prev: any) => {
        return {
          ...prev,
          data: mergeArraysUnique(prev.data, discountLevels).sort(
            (a: string, b: string) => Number(a) - Number(b),
          ),
        };
      });
    }
  }, [productsInfo]);

  const loadMoreProductsHandler = async () => {
    if (productsInfo) {
      const { pageInfo: pageInfoData } = productsInfo?.products || {};
      const { endCursor }: any = pageInfoData || {};

      const variables = {
        sizes: [],
        token,
        cursor: endCursor,
        currency,
        categoryIds: categoryInfo ? [categoryInfo?.id] : [],
        collectionIds: collectionInfo ? [collectionInfo?.id] : [],
      };

      setFetching(() => true);

      await loadMoreProductsRequest({
        ...variables,
      });

      setFetching(() => false);
    }
  };

  const filterHandler = (
    type: 'size' | 'color' | 'discount',
    selectedValue: string,
  ) => {
    if (type === 'discount') {
      setDiscountFilters((prev: any) => {
        const isValueAlreadySelected = prev.selected.includes(selectedValue);

        return {
          ...prev,
          selected: isValueAlreadySelected
            ? prev.selected.filter((i: any) => i !== selectedValue)
            : [...prev.selected, selectedValue],
        };
      });
    }

    if (type === 'size') {
      const isValueAlreadySelected =
        sizeFilters.selected.includes(selectedValue);

      if (isValueAlreadySelected) {
        setSizeFilters((prev: any) => {
          return {
            ...prev,
            selected: prev.selected.filter((i: any) => i !== selectedValue),
          };
        });
      }

      if (!isValueAlreadySelected) {
        setSizeFilters((prev: any) => {
          const extendedSelection = [...prev.selected, selectedValue];

          return {
            ...prev,
            selected: extendedSelection,
          };
        });
      }
    }

    if (type === 'color') {
      const isValueAlreadySelected =
        colorFilters.selected.includes(selectedValue);

      if (isValueAlreadySelected) {
        setColorFilters((prev: any) => {
          return {
            ...prev,
            selected: prev.selected.filter((i: any) => i !== selectedValue),
          };
        });
      }

      if (!isValueAlreadySelected) {
        setColorFilters((prev: any) => {
          const extendedSelection = [...prev.selected, selectedValue];

          return {
            ...prev,
            selected: extendedSelection,
          };
        });
      }
    }
  };

  const clearSelection = () => {
    setSizeFilters((prev: any) => ({ ...prev, selected: [] }));
    setColorFilters((prev: any) => ({ ...prev, selected: [] }));
    setDiscountFilters((prev: any) => ({ ...prev, selected: [] }));

    setProducts((prev: any) => ({
      ...prev,
      filtered: prev.unfiltered,
    }));
  };

  const clearFiltersSelectionHandler = () => {
    clearSelection();

    setFiltersDrawer(false);
  };

  return (
    <>
      <Stack
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          zIndex: 1000,
        }}
      >
        <Toolbar
          totalCount={products.totalCount}
          categoryName={productsTitle}
          openFilters={() => setFiltersDrawer(true)}
        />

        {products?.filtered.length === 0 && (
          <NoData title="Nothing found for yours selection" />
        )}

        {products?.filtered.length > 0 && (
          <Box
            ref={listRef}
            sx={{
              width: '100%',
              display: 'grid',
              gridRowGap: isMobile ? '0.5rem' : '2rem',
              alignItems: 'start',
              padding: isMobile ? '1.5rem 0' : '5vh 0 3rem 0',
              gridTemplateColumns: isMobile
                ? '50vw 50vw'
                : `repeat(${productsInRow}, 1fr)`,
            }}
          >
            {products.filtered.map((product: any, index: number) => {
              return (
                <ProductCard
                  key={product.node.id}
                  sessionStorageInfo={{
                    id: product.node.id,
                    index,
                    category: categoryInfo,
                    collection: collectionInfo,
                  }}
                  discount={false}
                  initData={product.node}
                />
              );
            })}
          </Box>
        )}

        {products.unfiltered.length > 0 && (
          <LoadMore
            totalCount={products.totalCount}
            isFetching={isFetching}
            productsCount={products.unfiltered.length}
            loadMoreProductsHandler={loadMoreProductsHandler}
          />
        )}

        <SeoText slug={slug} />

        <Faq slug={slug} />
      </Stack>

      <Drawer
        open={isFiltersDrawer}
        title="Filter"
        close={() => setFiltersDrawer(false)}
      >
        <Filters
          sizeFilters={sizeFilters}
          colorFilters={colorFilters}
          discountFilters={discountFilters}
          filterHandler={filterHandler}
          applyFiltersHandler={applyFiltersHandler}
          clearFiltersSelectionHandler={clearFiltersSelectionHandler}
        />
      </Drawer>

      {isSubsButtonVisible && (
        <>
          <SubscriptionButton hideModal={toggleSubModalHandler}>
            {subButton}
          </SubscriptionButton>

          <ModalPortal
            isOpen={isSubModal}
            close={toggleSubModalHandler}
            color="transparent"
          >
            <SubscriptionPopup hideModal={toggleSubModalHandler} />
          </ModalPortal>
        </>
      )}
    </>
  );
}
