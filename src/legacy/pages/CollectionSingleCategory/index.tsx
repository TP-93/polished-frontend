// @ts-nocheck
import React from 'react';

import { Helmet } from 'react-helmet';
import { useQuery } from 'react-apollo';
import { Redirect, useParams } from 'react-router-dom';

import NoData from '../../components/common/PageDetails/NoData';
import Loader from '../../components/common/PageDetails/Loader';
import Category from '../../components/Category';
import PageWrapper from '../../components/common/PageDetails/PageWrapper';

import { getProducts } from '../../apollo/queries/products';
import { useUserProvider } from '../../context/user';
import { GUEST_TOKEN_NAME } from '../../constants';
import getCollectionAndCategory from '../../apollo/queries/collection';

const descriptionFormatter = (value: string) =>
  value.replace(/(<([^>]+)>)/gi, '');

export default function Collection() {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const { collection, category } = useParams<any>();

  const sessionProductData: any = JSON.parse(
    sessionStorage.getItem('selected_product') as any,
  );

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const [productsQueryPayload, setProductsQueryPayload] = React.useState<any>({
    sizes: [],
    token,
    currency,
  });

  const catalogQueryPayload: any = {
    lang,
    category,
    collection: collection.toLowerCase(),
  };

  const {
    data: catalogInfo,
    error: catalogInfoError,
    loading: isCatalogInfoLoading,
  } = useQuery(getCollectionAndCategory, {
    variables: catalogQueryPayload,
  });

  React.useEffect(() => {
    if (catalogInfo?.collection?.id) {
      const productsPayload: any = {
        first: 45,
        categoryIds: [catalogInfo?.category?.id],
        collectionIds: [catalogInfo?.collection?.id],
      };

      if (sessionProductData) {
        if (
          sessionProductData?.collection?.id === catalogInfo?.collection?.id
        ) {
          if (sessionProductData?.index > 45) {
            productsPayload.first = sessionProductData.index + 10;
          }
        }
      }

      setProductsQueryPayload((prev: any) => {
        return {
          ...prev,
          ...productsPayload,
        };
      });
    }
  }, [catalogInfo]);

  const {
    data: productsInfo,
    error: productsError,
    loading: isProductsLoading,
    refetch: loadMoreProductsRequest,
  } = useQuery(getProducts, {
    skip:
      !(catalogInfo?.category && catalogInfo?.collection) ||
      !productsQueryPayload.first,
    variables: productsQueryPayload,
    fetchPolicy: 'network-only',
  });

  const isError: boolean = !!catalogInfoError || !!productsError;
  const isLoading: boolean = isCatalogInfoLoading || isProductsLoading;

  const pageTitle =
    `JORCUSTOM-${catalogInfo?.collection?.name || ''}-${
      catalogInfo?.category?.name || ''
    }` || 'Jorcustom';
  const pageDescription = `${descriptionFormatter(
    catalogInfo?.collection?.description || '',
  )}-${descriptionFormatter(catalogInfo?.category?.description || '')}`;

  return (
    <PageWrapper>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      {isLoading && <Loader />}

      {!isLoading && isError && <Redirect to="/404" />}

      {!isLoading && !isError && productsInfo?.products?.edges.length === 0 && (
        <NoData title="No products found" />
      )}

      {!isLoading && !isError && productsInfo?.products?.edges.length > 0 && (
        <Category
          productsInfo={productsInfo}
          categoryInfo={catalogInfo?.category}
          collectionInfo={catalogInfo?.collection}
          loadMoreProductsRequest={loadMoreProductsRequest}
        />
      )}
    </PageWrapper>
  );
}
