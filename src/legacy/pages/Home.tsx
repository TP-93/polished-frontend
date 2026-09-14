// @ts-nocheck
import React from 'react';
import { Helmet } from 'react-helmet';

import { useUserProvider } from '../context/user';

import Home from '../components/Home';
import ModalPortal from '../components/common/Modals/ModalPortal';
import SubscriptionPopup from '../components/common/SubscriptionPopup';
import SubscriptionButton from '../components/common/Buttons/SubscriptionButton';

export default function HomePage() {
  const [isSubscriptionModal, toggleSubModal] = React.useState<boolean>(false);

  const {
    state: { isSubsButtonVisible, languages, currentLanguage },
  } = useUserProvider();
  const {
    Subscription: { subButton },
  } = languages[currentLanguage];

  const modalHandler = () => toggleSubModal((prev: any) => !prev);

  return (
    <>
      <Helmet>
        <title>JORCUSTOM - Make It Personal</title>
        <meta
          name="description"
          content="JORCUSTOM is the webshop where you can buy your streetwear clothing. From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for. "
        />
      </Helmet>

      <Home />

      {isSubsButtonVisible && (
        <>
          <ModalPortal
            isOpen={isSubscriptionModal}
            close={() => toggleSubModal(false)}
            color="transparent"
          >
            <SubscriptionPopup hideModal={modalHandler} />
          </ModalPortal>

          <SubscriptionButton hideModal={modalHandler}>
            {subButton}
          </SubscriptionButton>
        </>
      )}
    </>
  );
}
