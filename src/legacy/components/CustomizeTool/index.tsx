// @ts-nocheck
import styled from 'styled-components';
import { useState, useEffect, Suspense, lazy } from 'react';

import { useUserProvider } from '../../context/user';
import { useCustomizationStateValue } from '../../context/customize';

import Menu from './Menu';
import ModalPortal from '../common/Modals/ModalPortal';
import { noDesktop } from '../../styles/constants';
import SessionListener from './SessionListener';

const Preview = lazy(
  () => import(/* webpackChunkName: "CustomizePreview" */ './Preview'),
);
const SubmitModal = lazy(
  () =>
    import(/* webpackChunkName: "CustomizeExitModal" */ './Modals/SubmitModal'),
);

interface CustomizationToolRenderProps {
  client: any;
  product: any;
  designId?: any;
  finalizing: boolean;
  colorThemes?: any;
  userDesignName?: any;
  customizedImageGroups?: any;
  processDesign: () => string;
  removeDesignHandler: () => void;
}

export default ({
  client,
  product,
  designId,
  finalizing,
  colorThemes,
  userDesignName,
  customizedImageGroups,
  processDesign,
  removeDesignHandler,
}: CustomizationToolRenderProps) => {
  // can be set to false in .env to not spawn the server with likely invalid dev server requests
  const allowPsdServerInteractions =
    process.env.REACT_APP_ALLOW_PSD_SERVER_REQUESTS === 'true';

  const [isLoaded, toggleLoad] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [newTextLayerApplyStatus, setNewTextLayerStatus] = useState<number>(-1); // 0 - canceled, 1 - approved

  const { id: currentProductId, designs } = product;

  let imageGroups = [];

  if (customizedImageGroups) {
    imageGroups = customizedImageGroups;
  } else {
    imageGroups = product.imageGroups;
  }

  const { state, dispatch } = useCustomizationStateValue();
  const { selectedDesignId } = state;

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      sessionModalsText: { closeConfirmText },
    },
  } = languages[currentLanguage];

  const loadInitialDesign = () => {
    if (!selectedDesignId && designs) {
      const firstDesign = designs[0];

      if (firstDesign)
        dispatch({
          type: 'CHANGE_ACTIVE_DESIGN',
          payload: firstDesign.id,
        });
    }
  };

  function prevent(e: any) {
    e.preventDefault();
  }

  useEffect(() => {
    toggleLoad(true);
    loadInitialDesign();

    document.addEventListener('gesturestart', prevent);

    return () => {
      document.removeEventListener('gesturestart', prevent);
    };
  }, []);

  const toggleSubmitModal = () => {
    setShowSubmitModal((prev) => !prev);
  };

  return (
    <>
      {allowPsdServerInteractions && (
        <SessionListener
          client={client}
          designs={designs}
          finalizing={finalizing}
          currentProductId={currentProductId}
          removeDesignHandler={removeDesignHandler}
        />
      )}

      <Container>
        <PreviewWrapper>
          {isLoaded && (
            <Suspense fallback={<p>Loading...</p>}>
              <Preview
                data={designs}
                imageGroups={imageGroups}
                newTextLayerApplyStatus={newTextLayerApplyStatus}
                openSubmitModal={toggleSubmitModal}
                setNewTextLayerStatus={setNewTextLayerStatus}
              />
            </Suspense>
          )}
        </PreviewWrapper>

        <MenuWrapper>
          <Shadow />

          <Menu
            product={product}
            designId={designId}
            saveDesign={processDesign}
            colorThemes={colorThemes}
            userDesignName={userDesignName}
            newTextLayerApplyStatus={newTextLayerApplyStatus}
            openSubmitModal={toggleSubmitModal}
            removeDesignHandler={removeDesignHandler}
            setNewTextLayerStatus={setNewTextLayerStatus}
          />
        </MenuWrapper>
      </Container>

      {isLoaded && (
        <ModalPortal isOpen={showSubmitModal} close={toggleSubmitModal}>
          <Suspense fallback={<></>}>
            <SubmitModal
              msg={closeConfirmText}
              close={() => setShowSubmitModal(false)}
              closeParent={removeDesignHandler}
            />
          </Suspense>
        </ModalPortal>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const PreviewWrapper = styled.div`
  width: 100%;
  height: 55%;
  max-height: 55%;
  background-color: #cecece;

  @media (min-width: 1024px) {
    height: 100%;
    max-height: 100%;
    width: 40%;
    max-width: 40%;
    flex-basis: 40%;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45%;
  max-height: 45%;
  box-shadow: -10px -15px 20px 10px #00000040;
  background-color: #2c2c2e;

  @media (min-width: 1024px) {
    position: relative;
    height: 100%;
    max-height: 100%;
    width: 60%;
    max-width: 60%;
    flex-basis: 60%;
  }
`;

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  width: 20px;
  height: 100%;
  box-shadow: -20px 0 20px #00000040;
  border-radius: 20px 0 0 20px;
  background-color: #2c2c2e;

  @media ${noDesktop} {
    top: -9px;
    left: -2px;
    width: 101%;
    height: 40px;
    margin: auto;
    box-shadow: none;
    border-radius: 20px 20px 0 0;
  }
`;
