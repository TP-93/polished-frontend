// @ts-nocheck
import styled from 'styled-components';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { useHistory } from 'react-router';
import React, { useRef, useState, useEffect } from 'react';

import { getDesignsForProduct_product as ProductInterface } from '../../apollo/queries/types/getDesignsForProduct';

import { useUserProvider } from '../../context/user';

import {
  red,
  black,
  cocoBold,
  cocoRegular,
  desktop,
  noDesktop,
} from '../../styles/constants';
import getCartModalImages from './utils';

import Price from '../common/ProductDetails/ProductPrice';
import NextButton from '../common/Buttons/NextButton';
import ErrorModal from '../common/Modals/ErrorModal';
import ModalPortal from '../common/Modals/ModalPortal';
import ProductInfo from './ProductInfo';
import SelectSizes from './SizesSelector';
import JorCustomPerks from '../common/JorCustomPerks';
import AlsoLikeSlider from './AlsoLikeSlider';
import CustomizePopUp from './CustomizePopUp';
import CartModalWrapper from '../common/Modals/CartModal';
import MobileProductMedia from './MobileImagesSlider';
import DesktopProductMedia from './DesktopImagesSlider';
import MobileBottomControls from './MobileBottomControls';
import BackButton, { BackBtnWrapper } from '../common/Buttons/BackButton';

interface DescrProps {
  description: any;
}

const ProductDescription = ({ description }: DescrProps) => {
  if (!description.length) return null;

  return (
    <Description
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

interface Props {
  product: ProductInterface | any;
  designId: any;
  userDesign: any;
  imageGroups: any;
  setImagesHash: null | ((hash: string) => void);
}

const Product = ({
  product,
  designId,
  userDesign,
  imageGroups,
  setImagesHash,
}: Props) => {
  const router = useHistory();

  const sizeSelection: any = useRef(null);
  const mobileDetailsRef: any = useRef(null);

  const [isSizeAlert, setSizeAlert] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isNetworkError, setNetworkError] = useState<boolean>(false);
  const [insufficientStockMsg, setInsufficientStock] = useState<any>(null);

  const [isCart, toggleCart] = useState<boolean>(false);
  const [isPopUp, togglePopUp] = useState<boolean>(false);

  const [isItemEventTriggered, toggleItemEvent] = useState<boolean>(false);

  const productData = product || userDesign?.product;

  useEffect(() => {
    if (setImagesHash) setImagesHash(`${Date.now()}`);
  }, []);

  useEffect(() => {
    if (!isItemEventTriggered && (product || userDesign?.product)) {
      const properties = product || userDesign?.product;

      let itemDesign = '';

      if (properties?.designs?.length > 0) {
        const excludeExtension = properties?.designs[0].name
          .split('.')[0]
          .split('_');

        excludeExtension.pop();

        itemDesign = properties?.name?.split(' ')[0];
      }

      // @ts-ignore
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [
            {
              item_name: properties?.name || '',
              item_id: properties?.productSku || '',
              item_group_id: properties?.productSku || '',
              price: properties?.price?.amount || '',
              item_category: properties?.category?.name || '',
              item_category2: properties?.category?.parent?.name || '',
              item_category3: properties?.color?.name || '',
              item_category4: itemDesign || '',
              item_category5: userDesign?.id ? 'Customized' : 'Original',
              item_variant: '',
              quantity: 1,
            },
          ],
        },
      });

      toggleItemEvent(true);
    }
  }, [product, userDesign]);

  const {
    price,
    designs,
    stockItems,
    description,
    upsaleProducts,
    sizeTableImage,
  } = productData;

  const group = imageGroups && imageGroups[0];
  const isDesigns = designs && designs.length > 0;
  const priceData = {
    price,
    isDiscount: Boolean(productData?.discountPrice),
    discountPrice: productData?.discountPrice?.localized,
  };

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: { nextBtn, addToBagBtn, errorMessage, unSelectedSizeAlert },
  } = languages[currentLanguage];

  const popUpToggleHandler = () => togglePopUp((prev) => !prev);

  const networkErrorHandler = () => {
    setNetworkError(true);
    toggleCart(false);
  };

  const backHandler = () => {
    if (!designId && !userDesign) {
      router.goBack();
      // const link: any = productData?.category?.name.toLowerCase();
      // const formatted: string = link.split(' ').join('-');
      //
      // router.push(`/category/${formatted}`);
    }

    if (designId && userDesign) router.push('/my-designs/');
  };

  const sizeAlertHandler = () => {
    if (sizeSelection?.current) {
      window.scrollTo({
        top: 200,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (!sizeSelection?.current) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    setSizeAlert(true);

    setTimeout(() => {
      setSizeAlert(false);
    }, 3000);
  };

  const addToCartAnalyticsEventHandler = (properties: any) => {
    let itemDesign = '';

    if (properties?.designs?.length > 0) {
      const excludeExtension = properties?.designs[0].name
        .split('.')[0]
        .split('_');

      excludeExtension.pop();

      itemDesign = properties?.name?.split(' ')[0];
    }

    // @ts-ignore
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [
          {
            item_name: properties?.name || '',
            item_id: `${properties?.productSku}-${selectedSize}`,
            item_group_id: properties?.productSku || {},
            price: properties?.price?.amount || '',
            item_category: properties?.category?.name || '',
            item_category2: properties?.category?.parent?.name || '',
            item_category3: properties?.color?.name || '',
            item_category4: itemDesign || '',
            item_category5: userDesign?.id ? 'Customized' : 'Original',
            item_variant: selectedSize || '',
            quantity: 1,
          },
        ],
      },
    });
  };

  const cartToggleHandler = () => {
    if (!selectedSize.length) return sizeAlertHandler();

    addToCartAnalyticsEventHandler(productData);

    return toggleCart((prev) => !prev);
  };

  const nextHandler = () => {
    if (!selectedSize.length) return sizeAlertHandler();

    return popUpToggleHandler();
  };

  return (
    <ProductWrapper>
      <Helmet>
        <title>JORCUSTOM - {productData?.name || userDesign?.name}</title>
        <meta
          name="description"
          content={description.replace(/(<([^>]+)>)/gi, '')}
        />
      </Helmet>

      <MediaQuery query={noDesktop}>
        <MobileDetails ref={mobileDetailsRef}>
          <MobileMediaWrapper>
            <MobileProductMedia
              imageSide={group?.imageSide}
              imageCollection={group?.images}
              alternativeImage={group?.url}
            />
          </MobileMediaWrapper>

          <MobileDetailsInfoWrapper ref={sizeSelection}>
            <MobileDetailsInfoContainer>
              <MobileTitle>{productData?.name || userDesign?.name}</MobileTitle>

              <PriceWrapper>
                <Price priceData={priceData} priceColor="#f7f7f7" />

                {isSizeAlert && <Alert>{unSelectedSizeAlert}</Alert>}
              </PriceWrapper>

              <SelectSizes
                sizes={stockItems}
                selectedSize={selectedSize}
                sizeTableImage={sizeTableImage}
                setSelectedSize={setSelectedSize}
                setInsufficientStock={setInsufficientStock}
              />
            </MobileDetailsInfoContainer>

            {insufficientStockMsg && (
              <StockMsg>{insufficientStockMsg}</StockMsg>
            )}

            <ProductInfo product={productData} />

            <AlsoLikeSlider imageCollection={upsaleProducts} />
          </MobileDetailsInfoWrapper>
        </MobileDetails>

        <MobileBottomControls
          isFixed={true}
          nextText={isDesigns ? nextBtn : addToBagBtn}
          backHandler={backHandler}
          nextHandler={isDesigns ? nextHandler : cartToggleHandler}
        />
      </MediaQuery>

      <MediaQuery query={desktop}>
        <DesktopWrapper>
          <BackBtnWrapper>
            <BackButton onClick={backHandler} />
          </BackBtnWrapper>

          <DesktopProductMedia imageGroups={imageGroups} />

          <DesktopDetails>
            <DesktopTitle>{productData?.name || userDesign?.name}</DesktopTitle>

            <PriceWrapper>
              <Price priceData={priceData} />

              {isSizeAlert && <Alert>{unSelectedSizeAlert}</Alert>}
            </PriceWrapper>

            <SelectSizes
              sizes={stockItems}
              selectedSize={selectedSize}
              sizeTableImage={sizeTableImage}
              setSelectedSize={setSelectedSize}
              setInsufficientStock={setInsufficientStock}
            />

            {insufficientStockMsg && (
              <StockMsg>{insufficientStockMsg}</StockMsg>
            )}

            <NextBtnWrapper>
              <NextButton
                text={isDesigns ? nextBtn : addToBagBtn}
                onClick={isDesigns ? nextHandler : cartToggleHandler}
              />
            </NextBtnWrapper>

            <ProductDescription description={description} />

            <JorCustomPerks />
          </DesktopDetails>
        </DesktopWrapper>

        <ProductInfo product={productData} />

        <AlsoLikeSlider imageCollection={upsaleProducts} />
      </MediaQuery>

      <ModalPortal isOpen={isPopUp} close={popUpToggleHandler}>
        <CustomizePopUp
          selectedSize={selectedSize}
          hasDesigns={designs && designs?.length > 0}
          closePopUp={popUpToggleHandler}
          toggleCartModal={cartToggleHandler}
        />
      </ModalPortal>

      <ModalPortal isOpen={isCart} close={cartToggleHandler}>
        <CartModalWrapper
          product={productData}
          designId={designId || null}
          selectedSize={selectedSize}
          userDesignName={userDesign?.name || null}
          checkoutImages={getCartModalImages(imageGroups)}
          close={cartToggleHandler}
          networkErrorHandler={networkErrorHandler}
        />
      </ModalPortal>

      <ModalPortal isOpen={isNetworkError} close={() => setNetworkError(false)}>
        <ErrorModal
          errorMsg={errorMessage}
          close={() => setNetworkError(false)}
        />
      </ModalPortal>
    </ProductWrapper>
  );
};

export default Product;

const ProductWrapper = styled.div`
  position: relative;
`;

const DesktopWrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: start;
  justify-content: center;
  padding: 20px 85px 20px 85px;
`;

const DesktopDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DesktopTitle = styled.h1`
  margin-bottom: 2%;
  ${cocoBold};
  color: ${black};
  font-size: calc(0.4em + 1vmin);
  text-align: left;
  text-transform: uppercase;
`;

const MobileTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.6em + 1vmin);
  color: #f7f7f7;
`;

const PriceWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const NextBtnWrapper = styled.div`
  margin-bottom: 4%;
`;

const Alert = styled.div`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  color: ${red};
  ${cocoBold};
`;

const StockMsg = styled.div`
  color: #129c10;
  ${cocoRegular};
`;

const MobileDetails = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 0 -5px 7px 2px rgba(34, 60, 80, 0.2);
`;

const MobileMediaWrapper = styled.div`
  width: 100%;
`;

const MobileDetailsInfoWrapper = styled.div`
  background-color: #2c2c2e;
`;

const MobileDetailsInfoContainer = styled.div`
  padding: 5px;
`;

const Description = styled.div`
  & > p {
    ${cocoRegular};
    font-size: calc(0.2em + 1vmin);
    line-height: calc(0.6em + 1vmin);
  }
`;
