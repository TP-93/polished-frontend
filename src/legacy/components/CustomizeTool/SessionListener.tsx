// @ts-nocheck
import React, { useEffect, ReactNode, useState, Suspense, lazy } from 'react';
import styled from 'styled-components';
import { ApolloClient } from 'apollo-boost';
// @ts-ignore
import ifvisible from 'ifvisible.js';

import {
  initSession,
  sessionHeartBeat,
  removeEarliestProduct,
} from '../../apollo/mutations/psdServer';
import { getDesignsForProduct_product_designs as DesignInterface } from '../../apollo/queries/types/getDesignsForProduct';

import { useUserProvider } from '../../context/user';
import { useCustomizationStateValue } from '../../context/customize';

import Loader from '../common/PageDetails/Loader';
import ModalPortal from '../common/Modals/ModalPortal';
import LimitReachedModal from './Modals/LimitModal';
import { GUEST_TOKEN_NAME } from '../../constants';

const ExpirationModal = lazy(
  () =>
    import(
      /* webpackChunkName: "CustomizeExpirationModal" */ './Modals/ExpirationModal'
    ),
);

interface Props {
  client: ApolloClient<ReactNode>;
  designs: (DesignInterface | null)[] | null;
  finalizing: boolean;
  currentProductId: string;
  removeDesignHandler: any;
}

const SessionListener = ({
  client,
  designs,
  finalizing,
  currentProductId,
  removeDesignHandler,
}: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  let heartBeatInterval: number;

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [isExpirationModal, toggleExpirationModal] = useState<boolean>(false);
  // used to prevent clashes between onEvery and wakeup heartbeats
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [limitReachedProduct, setLimitReachedProduct] = useState({ name: '' });

  const {
    state: { newTextEditingSession, selectedDesignId },
    dispatch,
  } = useCustomizationStateValue();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      sessionModalsText: { toolLoadText, limitReachedText, sessionExpiredText },
    },
  } = languages[currentLanguage];

  const toggleSessionStatus = (status: boolean) => {
    dispatch({
      type: 'TOGGLE_TEXT_EDITING_SESSION_SERVER_CONNECTION_STATUS',
      payload: status,
    });
  };

  const heartBeat = async () => {
    try {
      setIsProcessingRequest(true);

      const res = await client.mutate({
        mutation: sessionHeartBeat,
        variables: {
          token,
          productId: currentProductId,
        },
      });

      if (res) {
        if (!res?.data?.sessionHeartbeat?.success) toggleSessionStatus(false);
      } else {
        toggleSessionStatus(false);
      }
    } catch (e: any) {
      toggleSessionStatus(false);
    } finally {
      setIsProcessingRequest(false);
    }
  };

  const sendHeartBeatResponse = () => {
    if (isProcessingRequest) return;
    heartBeat();
  };

  const setActivityStatusTracking = () => {
    // crutch used to prevent reiniting ifvisible wakeup
    // event which wouldn't properly be removed otherwise
    if (finalizing) return;

    ifvisible.wakeup(() => {
      sendHeartBeatResponse();
    });

    heartBeatInterval = window.setInterval(() => {
      if (!ifvisible.now('active')) return;

      sendHeartBeatResponse();
    }, 300000);
  };

  const initializeSession = async (designId: string) => {
    // prevent mutation from firing in case component gets unmounted and mounted again
    if (finalizing) return;

    try {
      setLoading(true);

      const res = await client.mutate({
        mutation: initSession,
        variables: {
          token,
          psdName: designId,
          productId: currentProductId,
        },
      });

      if (res) {
        const {
          data: {
            initEditingSession: {
              success,
              product,
              limitReached: responseLimitReached,
            },
          },
        } = res;

        if (responseLimitReached) {
          setLimitReached(true);
          setLimitReachedProduct(product);
          return;
        }

        if (!success) {
          toggleSessionStatus(false);
          return;
        }

        if (firstLoad) {
          setActivityStatusTracking();
          toggleSessionStatus(true);
          setFirstLoad(false);
        }

        dispatch({
          type: 'ADD_LOADED_DESIGNS_TO_EDITING_SESSION',
          payload: designId,
        });
      } else {
        toggleSessionStatus(false);
      }
    } catch (e) {
      toggleSessionStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const confirmProceedWithEditingSession = async () => {
    const firstDesign = designs && designs[0];

    if (firstDesign) {
      try {
        const res = await client.mutate({
          mutation: removeEarliestProduct,
          variables: {
            token,
          },
        });

        if (res) {
          if (!res?.data?.removeEarliestProduct?.success) {
            toggleSessionStatus(false);
            return;
          }

          await initializeSession(selectedDesignId || firstDesign?.id);
        }

        toggleSessionStatus(false);
      } catch (e) {
        toggleSessionStatus(false);
      } finally {
        setLimitReached(false);
        setLimitReachedProduct({ name: '' });
      }
    }
  };

  useEffect(() => {
    const firstDesign = designs && designs[0];

    if (firstDesign) initializeSession(selectedDesignId || firstDesign.id);

    return () => {
      ifvisible.off('wakeup');

      clearInterval(heartBeatInterval);
    };
  }, []);

  useEffect(() => {
    if (
      !firstLoad &&
      selectedDesignId &&
      newTextEditingSession.active &&
      // added to ensure that on mount use effect does not overlap with this one
      !newTextEditingSession.loadedDesigns.includes(selectedDesignId)
    )
      initializeSession(selectedDesignId);
  }, [selectedDesignId]);

  const simpleClose = () => setLimitReached(false);
  const expirationModalHandler = () => toggleExpirationModal((prev) => !prev);

  useEffect(() => {
    if (newTextEditingSession.active === false) expirationModalHandler();
  }, [newTextEditingSession.active]);

  return (
    <>
      <ModalPortal isOpen={loading} close={() => {}}>
        <LoaderWrapper>
          <Loader />
          <CustomizationToolMsg>{toolLoadText}</CustomizationToolMsg>
        </LoaderWrapper>
      </ModalPortal>

      <ModalPortal isOpen={limitReached} close={simpleClose}>
        <LimitReachedModal
          close={simpleClose}
          closeParent={confirmProceedWithEditingSession}
        >
          <div>
            {limitReachedText.replace(
              '_productName_',
              limitReachedProduct.name || 'Some product',
            )}
          </div>
        </LimitReachedModal>
      </ModalPortal>

      <ModalPortal isOpen={isExpirationModal} close={expirationModalHandler}>
        <Suspense fallback={<></>}>
          <ExpirationModal
            msg={sessionExpiredText}
            closeParent={removeDesignHandler}
          />
        </Suspense>
      </ModalPortal>
    </>
  );
};

export default SessionListener;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    height: auto;
  }
`;

const CustomizationToolMsg = styled.div`
  padding-top: 2%;
  color: bisque;
`;
