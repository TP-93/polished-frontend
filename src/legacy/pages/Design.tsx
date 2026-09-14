// @ts-nocheck
import { useState } from 'react';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-boost';
import { Redirect, useParams } from 'react-router';

import { getUserDesignInfo } from '../apollo/queries/products';
import { useUserProvider } from '../context/user';

import { makeId } from '../utils/idUtils';
import { GUEST_TOKEN_NAME } from '../constants';

import Loader from '../components/common/PageDetails/Loader';
import Product from '../components/Product/index2';
import PageWrapper from '../components/common/PageDetails/PageWrapper';

interface QueryProps {
  data: any;
  error?: ApolloError;
  loading: boolean;
}

const CustomizedProductPage = () => {
  const { id } = useParams<any>();

  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  const designId = makeId('UserDesign', id);

  const [imagesHash, setImagesHash] = useState<string>(`${Date.now()}`);

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const vars = { lang, token, designId, currency };

  return (
    <Query query={getUserDesignInfo} variables={vars}>
      {({ data, loading, error }: QueryProps) => {
        if (error) return <Redirect to="/404" />;
        if (loading) return <Loader />;
        if (!data?.userDesign) return <Redirect to="/404" />;

        const { userDesign } = data;

        const imageGroups = [
          {
            images: userDesign.customizedDesigns.map((cd: any) => ({
              url: `${cd?.customizedPngDesign?.url}?${imagesHash}`,
            })),
          },
        ];

        return (
          <PageWrapper>
            <Product
              product={null}
              designId={designId}
              userDesign={userDesign}
              imageGroups={imageGroups}
              setImagesHash={setImagesHash}
            />
          </PageWrapper>
        );
      }}
    </Query>
  );
};

export default CustomizedProductPage;
