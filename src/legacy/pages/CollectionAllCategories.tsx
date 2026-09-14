// @ts-nocheck
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useQuery } from 'react-apollo';

import Loader from '../components/common/PageDetails/Loader';
import NoData from '../components/common/PageDetails/NoData';
import Category from '../components/Category';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import { getProducts } from '../apollo/queries/products';
import { getCollection } from '../apollo/queries/collection';
import { useUserProvider } from '../context/user';
import { GUEST_TOKEN_NAME } from '../constants';

const token = localStorage.getItem(GUEST_TOKEN_NAME);

const descriptionFormatter = (value: string) =>
  value.replace(/(<([^>]+)>)/gi, '');

export default function CollectionAllCategories() {
  const { collectionName } = useParams<any>();

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const sessionProductData: any = JSON.parse(
    sessionStorage.getItem('selected_product') as any,
  );

  const [productsQueryPayload, setProductsQueryPayload] = React.useState<any>({
    sizes: [],
    token,
    currency,
    categoryIds: [],
  });

  const collectionQueryPayload = {
    lang,
    slug: collectionName.toLowerCase(),
  };

  const {
    data: catalogInfo,
    error: catalogInfoError,
    loading: isCatalogInfoLoading,
  } = useQuery(getCollection, {
    skip: !collectionName.length,
    variables: collectionQueryPayload,
  });

  React.useEffect(() => {
    if (catalogInfo?.collection?.id) {
      const productsPayload: any = {
        first: 45,
        collectionIds: [catalogInfo.collection.id],
      };

      if (sessionProductData) {
        if (
          sessionProductData?.collection?.id === catalogInfo?.collection?.id
        ) {
          if (sessionProductData.index > 45) {
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
    skip: !productsQueryPayload.first,
    fetchPolicy: 'network-only',
    variables: productsQueryPayload,
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
          categoryInfo={null}
          collectionInfo={catalogInfo?.collection}
          loadMoreProductsRequest={loadMoreProductsRequest}
        />
      )}
    </PageWrapper>
  );
}
