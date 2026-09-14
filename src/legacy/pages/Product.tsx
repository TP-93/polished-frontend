// @ts-nocheck
import React from 'react';

import MediaQuery from 'react-responsive';
import { useHistory, useLocation } from 'react-router-dom';
import { Redirect, useParams } from 'react-router';

import { useQuery } from 'react-apollo';
import { useUserProvider } from '../context/user';
import { getDesignsForProduct } from '../apollo/queries/products';

import { desktop } from '../styles/constants';
import { GUEST_TOKEN_NAME } from '../constants';

import NoData from '../components/common/PageDetails/NoData';
import Loader from '../components/common/PageDetails/Loader';
import PageWrapper from '../components/common/PageDetails/PageWrapper';

import Product from '../components/Product';
import ModalPortal from '../components/common/Modals/ModalPortal';
import SubscriptionPopup from '../components/common/SubscriptionPopup';
import SubscriptionButton from '../components/common/Buttons/SubscriptionButton';

const token = localStorage.getItem(GUEST_TOKEN_NAME);

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function RegularProductPage() {
  const history = useHistory();
  const { slug } = useParams<any>();

  const query = useUrlQuery();
  const visibleDraft = query.get('visibleDraft');

  const [isSubModal, toggleSubModal] = React.useState<boolean>(false);
  const [isDraftVerification, toggleDraftVerification] =
    React.useState<boolean>(true);

  const {
    state: { currency, languages, currentLanguage: lang, isSubsButtonVisible },
  } = useUserProvider();

  const {
    Subscription: { subButton },
  } = languages[lang];

  const { data, error, loading, refetch } = useQuery(getDesignsForProduct, {
    variables: {
      slug,
      lang,
      token,
      currency,
    },
  });

  React.useEffect(() => {
    if (lang.length && refetch) refetch();
  }, [lang, refetch]);

  React.useEffect(() => {
    if (data?.product) {
      const { isPublished } = data?.product || {};

      if (!isPublished && !visibleDraft) {
        history.replace('/404');
      } else {
        toggleDraftVerification(false);
      }
    }
  }, [data]);

  const subModalToggleHandler = () => toggleSubModal((prev) => !prev);

  if (error) return <Redirect to="/404" />;
  if (loading || isDraftVerification) return <Loader />;
  if (!data?.product) return <NoData title="Product not found" />;

  return (
    <PageWrapper>
      <Product product={data.product} />

      <MediaQuery query={desktop}>
        {isSubsButtonVisible ? (
          <SubscriptionButton hideModal={subModalToggleHandler}>
            {subButton}
          </SubscriptionButton>
        ) : (
          <></>
        )}
      </MediaQuery>

      {isSubsButtonVisible && (
        <ModalPortal
          color="transparent"
          isOpen={isSubModal}
          close={subModalToggleHandler}
        >
          <SubscriptionPopup hideModal={subModalToggleHandler} />
        </ModalPortal>
      )}
    </PageWrapper>
  );
}
