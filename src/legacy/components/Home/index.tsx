// @ts-nocheck
import { useQuery } from 'react-apollo';

import Loader from '../common/PageDetails/Loader';
import PageWrapper from '../common/PageDetails/PageWrapper';
import CustomizeInfo from './CustomizeInfo';
import CollectionSection from './CollectionSection';

import { useUserProvider } from '../../context/user';
import { getHomePageSections } from '../../apollo/queries/shop';

export default function Home() {
  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const { data, loading } = useQuery(getHomePageSections, {
    variables: { lang, currency },
  });

  if (loading) return <Loader />;

  return (
    <PageWrapper>
      {data?.homePageSections?.sections
        .filter((item: any) => item.sectionOn) // filter sections that were marked as active
        .map((section: any) => {
          return (
            <CollectionSection
              key={section.backgroundImage}
              section={section}
            />
          );
        })}

      <CustomizeInfo />
    </PageWrapper>
  );
}
