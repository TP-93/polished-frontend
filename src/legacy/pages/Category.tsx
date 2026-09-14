// @ts-nocheck
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router';

import { Helmet } from 'react-helmet';
import { useQuery } from 'react-apollo';

import { getCategory } from '../apollo/queries/categories';

import Loader from '../components/common/PageDetails/Loader';
import Category from '../components/Category';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import { getProducts } from '../apollo/queries/products';
import { useUserProvider } from '../context/user';
import { PREV_GUEST_TOKEN_NAME } from '../constants';

const token = localStorage.getItem(PREV_GUEST_TOKEN_NAME);

export default function CategoryPage() {
  const { slug } = useParams<any>();

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const {
    data: categoryInfo,
    error: categoryInfoError,
    loading: isCategoryInfoLoading,
  } = useQuery(getCategory, {
    variables: {
      slug,
      lang,
    },
  });

  const {
    data: productsInfo,
    error: productsError,
    loading: isProductsLoading,
    refetch: loadMoreProductsRequest,
  } = useQuery(getProducts, {
    variables: {
      sizes: [],
      token,
      currency,
      categoryIds: [categoryInfo?.category?.id],
      collectionIds: [],
    },
    skip: !categoryInfo?.category,
    fetchPolicy: 'network-only',
  });

  const isError: boolean = !!categoryInfoError || !!productsError;
  const isLoading: boolean = isCategoryInfoLoading || isProductsLoading;

  return (
    <PageWrapper>
      <Helmet>
        <title>JORCUSTOM - {categoryInfo?.category?.name || ''}</title>
        <meta
          name="description"
          content={categoryInfo?.category?.description || ''}
        />
      </Helmet>

      {isLoading && <Loader />}

      {isError && !isLoading && <Redirect to="/404" />}

      {!isError && !isLoading && (
        <Category
          productsInfo={productsInfo}
          categoryInfo={categoryInfo?.category}
          collectionInfo={null}
          loadMoreProductsRequest={loadMoreProductsRequest}
        />
      )}
    </PageWrapper>
  );
}
