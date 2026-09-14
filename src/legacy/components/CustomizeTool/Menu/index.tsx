// @ts-nocheck
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { useParams } from 'react-router';
import { useEffect, useState, lazy, Suspense } from 'react';

import { useUserProvider } from '../../../context/user';
import { useCustomizationStateValue } from '../../../context/customize';

import Loader from '../../common/PageDetails/Loader';
import TabsRow from './SourcesTabs';
import TextInput from './TextInput';
import ErrorModal from '../../common/Modals/ErrorModal';
import ModalPortal from '../../common/Modals/ModalPortal';
import LayersPicker from './LayersPicker';
import AsideButtons from './AsideControls/AsideButtons';
import ToolCartModal from '../Modals/ToolCartModal';
import AsideControls from './AsideControls';
import { cocoRegular } from '../../../styles/constants';
import CartModalWrapper from '../../common/Modals/CartModal';
import getCartModalImages from '../../Product/utils';
import MobileLayerControls from './LayerControls';
import MobileBottomControls from '../../Product/MobileBottomControls';

const ColorManipulators = lazy(
  () => import(/* webpackChunkName: "ColorPickers" */ './ColorManipulators'),
);

const isEmptyObject = (obj: any) => JSON.stringify(obj) === '{}';

interface Props {
  product: any;
  designId: any;
  colorThemes: any;
  userDesignName?: any;
  newTextLayerApplyStatus: number;
  saveDesign: () => string;
  openSubmitModal: () => void;
  removeDesignHandler: () => void;
  setNewTextLayerStatus: any;
}

export default function CustomizeMenu({
  product,
  designId,
  colorThemes,
  userDesignName,
  saveDesign,
  newTextLayerApplyStatus,
  openSubmitModal,
  removeDesignHandler,
  setNewTextLayerStatus,
}: Props) {
  const { size } = useParams<any>();

  const [isLoaded, toggleLoad] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedLayer, setSelectedLayer] = useState<any>();
  const [isTextEditing, toggleTextEditingStatus] = useState<boolean>(false);
  const [cartProcessError, setCartProcessError] = useState<string>('');
  const [productIdForCheckout, setProductIdForCheckout] = useState<any>(null);

  const [isToolCartModal, toggleToolCartModal] = useState<boolean>(false);
  const [isSavingProcess, toggleSavingProcess] = useState<boolean>(false);
  const [isRegularCartModal, toggleRegularCartModal] = useState<boolean>(false);

  const { designs, flexFoilColors } = product;

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      addToBagBtn,
      toolControlsBtns,
      sessionModalsText: { finishEditingText },
    },
  } = languages[currentLanguage];

  const {
    state: {
      currentDesign: { hover, changedLayersWithText, changedLayersWithColor },
      selectedDesignId,
    },
    dispatch,
  } = useCustomizationStateValue();

  useEffect(() => {
    toggleLoad(true);
  }, []);

  useEffect(() => {
    if (setActiveIndex) setActiveIndex(-1);
    if (setSelectedLayer) setSelectedLayer(null);
  }, [selectedDesignId]);

  const resetLayerSelection = () => {
    setActiveIndex(-1);
    setSelectedLayer(null);
  };

  const toggleIndex = (index: number) => setActiveIndex(index);

  const networkErrorHandler = () => {
    const checkoutError = 'Design cannot be added to cart. Try again later!';
    setCartProcessError(checkoutError);
  };

  const resetSelectionHandler = () => {
    if (!isEmptyObject(hover))
      dispatch({
        type: 'CANCEL_HOVER_CHANGES',
      });

    if (newTextLayerApplyStatus === -1) setNewTextLayerStatus(0);

    setActiveIndex(-1);
    setSelectedLayer(null);
  };

  const handleChanges = () => {
    if (!isEmptyObject(hover)) {
      dispatch({
        type: 'APPLY_HOVER_SCHEME',
      });
    }

    dispatch({
      type: 'APPLY_NEW_LAYER_TEXT',
    });

    setNewTextLayerStatus(1);
  };

  const mobileChangesApply = () => {
    handleChanges();

    setActiveIndex(-1);
    setSelectedLayer(null);
  };

  const addToCartHandler = async () => {
    const createError = 'Design cannot be created. Try again later!';

    if (designId) {
      try {
        toggleSavingProcess(true);

        await saveDesign();

        setProductIdForCheckout(designId);
        toggleToolCartModal(true);
      } catch (error) {
        setCartProcessError(createError);
      } finally {
        toggleSavingProcess(false);
      }
    }

    if (!designId) {
      const withoutChanges =
        isEmptyObject(changedLayersWithText) &&
        isEmptyObject(changedLayersWithColor);

      if (withoutChanges) {
        return toggleRegularCartModal(true);
      }

      if (!withoutChanges) {
        try {
          toggleSavingProcess(true);

          const data = await saveDesign();

          if (data) {
            toggleSavingProcess(false);
            setProductIdForCheckout(data);
            toggleToolCartModal(true);
          }

          if (!data) {
            toggleSavingProcess(false);
            setCartProcessError(createError);
          }
        } catch (error) {
          setCartProcessError(createError);
        } finally {
          toggleSavingProcess(false);
        }
      }
    }

    return null;
  };

  const closeErrorModal = () => {
    setCartProcessError('');
    toggleToolCartModal(false);
    toggleRegularCartModal(false);
  };

  return (
    <>
      <MediaQuery query={`(max-width: 1023px)`}>
        <MobileWrapper>
          {!selectedLayer && (
            <>
              {isLoaded && (
                <LayersPicker
                  designs={designs}
                  withTitle
                  imgProportionCof={1.45}
                  setSelectedLayer={setSelectedLayer}
                />
              )}

              <MobileBottomControls
                isFixed={false}
                nextText={addToBagBtn}
                backHandler={openSubmitModal}
                nextHandler={addToCartHandler}
              />
            </>
          )}

          {selectedLayer && (
            <>
              {selectedLayer?.layerType === 'text' && (
                <TextInput
                  layer={selectedLayer}
                  designs={designs}
                  toggleTextEditingStatus={toggleTextEditingStatus}
                />
              )}

              <TabsRow
                isFlexFoil={flexFoilColors}
                activeIndex={activeIndex}
                isTextEditing={isTextEditing}
                toggleIndex={toggleIndex}
              />

              {isLoaded && activeIndex !== -1 && (
                <Suspense fallback={<></>}>
                  <MobileColorsWrapper>
                    <ColorManipulators
                      designs={designs}
                      isFlexFoil={flexFoilColors}
                      activeIndex={activeIndex}
                      colorThemes={colorThemes}
                      setSelectedLayer={setSelectedLayer}
                      mobileChangesApply={handleChanges}
                      resetLayerSelection={resetLayerSelection}
                    />
                  </MobileColorsWrapper>
                </Suspense>
              )}

              <MobileLayerControls
                isFixed={false}
                isImagePickerControls={false}
                doneHandler={mobileChangesApply}
                cancelHandler={resetSelectionHandler}
              />
            </>
          )}

          <MobileSummaryWrapper>
            <AsideButtons
              titles={toolControlsBtns.mobile}
              saveDesign={saveDesign}
              isTextEditing={isTextEditing}
              setCartProcessError={setCartProcessError}
              toggleSavingProcess={toggleSavingProcess}
              resetSelectionHandler={resetSelectionHandler}
            />
          </MobileSummaryWrapper>
        </MobileWrapper>
      </MediaQuery>

      <MediaQuery query={`(min-width: 1024px)`}>
        <DesktopWrapper>
          <DesktopContainer>
            <DesktopLayersWrapper>
              {isLoaded && (
                <LayersPicker
                  designs={designs}
                  withTitle
                  imgProportionCof={1.5}
                  setSelectedLayer={setSelectedLayer}
                />
              )}

              {selectedLayer?.layerType === 'text' && (
                <TextInput
                  layer={selectedLayer}
                  designs={designs}
                  toggleTextEditingStatus={toggleTextEditingStatus}
                />
              )}
            </DesktopLayersWrapper>

            {selectedLayer && (
              <TabsRow
                isFlexFoil={flexFoilColors}
                activeIndex={activeIndex}
                isTextEditing={isTextEditing}
                toggleIndex={toggleIndex}
              />
            )}

            {isLoaded && activeIndex !== -1 && selectedLayer && (
              <DesktopPickersWrapper>
                <Suspense fallback={<></>}>
                  <ColorManipulators
                    designs={designs}
                    isFlexFoil={flexFoilColors}
                    activeIndex={activeIndex}
                    colorThemes={colorThemes}
                    setSelectedLayer={setSelectedLayer}
                    mobileChangesApply={handleChanges}
                    resetLayerSelection={resetLayerSelection}
                  />
                </Suspense>
              </DesktopPickersWrapper>
            )}
          </DesktopContainer>

          <DesktopSummaryWrapper>
            <AsideControls
              product={product}
              saveDesign={saveDesign}
              isTextEditing={isTextEditing}
              addToCartHandler={addToCartHandler}
              setCartProcessError={setCartProcessError}
              toggleSavingProcess={toggleSavingProcess}
              resetSelectionHandler={resetSelectionHandler}
            />
          </DesktopSummaryWrapper>
        </DesktopWrapper>
      </MediaQuery>

      {isLoaded && (
        <ModalPortal isOpen={isSavingProcess} close={() => {}}>
          <LoaderWrapper>
            <Loader />
            <CustomizationToolMsg>{finishEditingText}</CustomizationToolMsg>
          </LoaderWrapper>
        </ModalPortal>
      )}

      {isLoaded && (
        <ModalPortal
          isOpen={isRegularCartModal}
          close={() => toggleRegularCartModal(false)}
        >
          <CartModalWrapper
            product={product}
            designId={designId}
            selectedSize={size}
            userDesignName={userDesignName}
            checkoutImages={getCartModalImages(product.imageGroups)}
            close={() => toggleRegularCartModal(false)}
            networkErrorHandler={networkErrorHandler}
            removeDesignHandler={removeDesignHandler}
          />
        </ModalPortal>
      )}

      {isLoaded && (
        <ModalPortal
          isOpen={isToolCartModal}
          close={() => toggleToolCartModal(false)}
        >
          <ToolCartModal
            selectedSize={size}
            productId={productIdForCheckout}
            close={() => toggleToolCartModal(false)}
            setCartProcessError={setCartProcessError}
            removeDesignHandler={removeDesignHandler}
          />
        </ModalPortal>
      )}

      {isLoaded && (
        <ModalPortal
          isOpen={cartProcessError.length > 0}
          close={closeErrorModal}
        >
          <ErrorModal errorMsg={cartProcessError} close={closeErrorModal} />
        </ModalPortal>
      )}
    </>
  );
}

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MobileColorsWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const MobileSummaryWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 100;
  padding: 8px 10px 8px 5px;
  background-color: black;
  border-radius: 0 20px 20px 0;

  > div > button {
    padding-left: 10%;
  }
`;

const DesktopWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 2.5% 0.5%;
`;

const DesktopLayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:last-child {
    padding-right: 5px;
  }
`;

const DesktopPickersWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  padding: 5px 5px 0 0;
`;

const DesktopSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  width: 35%;
  height: 100%;
  padding: 5% 1% 2% 1%;
  box-shadow: -10px 0 20px rgba(255, 255, 255, 0.15);
  background-color: #000000;
  border-radius: 20px 0 0 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    height: auto;
  }
`;

const CustomizationToolMsg = styled.div`
  padding-top: 30px;
  color: bisque;
  ${cocoRegular};
`;
