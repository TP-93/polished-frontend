// @ts-nocheck
import React from 'react';
import { Query } from 'react-apollo';

import { getUserDesigns } from '../../apollo/queries/products';
import { useUserProvider } from '../../context/user';

import Loader from '../common/PageDetails/Loader';
import { GUEST_TOKEN_NAME } from '../../constants';
import CustomizedProductList from './CustomizedProductsList';
import ErrorMessage, { SuccessMessage } from '../common/Errors';

export default () => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency },
  } = useUserProvider();

  const loadMoreHandler = async (fetchMore: any, userDesigns: any) => {
    await fetchMore({
      variables: {
        cursor: userDesigns.pageInfo.endCursor,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        const {
          userDesigns: { pageInfo, edges: newEdges },
        } = fetchMoreResult;

        if (newEdges.length) {
          const newResult = JSON.parse(JSON.stringify(previousResult));

          newResult.userDesigns = {
            __typename: previousResult.userDesigns.__typename,
            edges: [...previousResult.userDesigns.edges, ...newEdges],
            pageInfo,
          };

          return newResult;
        }

        return previousResult;
      },
    });
  };

  return (
    <Query query={getUserDesigns} variables={{ token, currency }}>
      {({ data, loading, fetchMore, error }: any) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage>er is iets fout gegaan</ErrorMessage>;

        const { userDesigns } = data;

        if (userDesigns?.edges?.length > 0)
          return (
            <CustomizedProductList
              data={userDesigns || []}
              loadMore={() => loadMoreHandler(fetchMore, userDesigns)}
            />
          );

        return <SuccessMessage>Je hebt geen ontwerpen</SuccessMessage>;
      }}
    </Query>
  );
};
