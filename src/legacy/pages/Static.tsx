// @ts-nocheck
import { match as Match, Redirect } from 'react-router-dom';
import { ApolloError } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import getPage from '../apollo/queries/pages';
import { getPage as getPageData } from '../apollo/queries/types/getPage';
import { useUserProvider } from '../context/user';

import Loader from '../components/common/PageDetails/Loader';
import PageTitle from '../components/common/PageDetails/PageTitle';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import ErrorMessage from '../components/common/Errors';
import StaticContent from '../components/common/PageDetails/StaticContent';

export interface Result {
  data: getPageData;
  loading: boolean;
  error?: ApolloError;
}

interface PageMatch extends Match {
  params: {
    slug: string;
  };
}

interface Props {
  match: PageMatch;
}

const Page = ({ match }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Static } = languages[currentLanguage];

  return (
    <Query
      query={getPage}
      variables={{
        slug: match.path.replace('/', ''),
        lang: currentLanguage,
      }}
    >
      {({ data, loading, error }: Result) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage>{Static.errorMessage}</ErrorMessage>;
        if (!data.page) return <Redirect to="/404" />;

        const { page } = data;

        return (
          <>
            <Helmet>
              <title>JORCUSTOM - {page.title}</title>
              <meta
                name="description"
                content={page.content
                  .replace(/(<([^>]+)>)/gi, '')
                  .slice(0, 200)}
              />
            </Helmet>

            <PageWrapper>
              <PageTitle title={page.title} />
              <CustomContainer>
                <StaticContent content={page.content} />
              </CustomContainer>
            </PageWrapper>
          </>
        );
      }}
    </Query>
  );
};

const CustomContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: auto;
  padding: 0 10px 20px 10px;
`;

export default Page;
