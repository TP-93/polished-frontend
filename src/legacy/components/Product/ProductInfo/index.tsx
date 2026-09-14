// @ts-nocheck
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
import MediaQuery from 'react-responsive';

import { useUserProvider } from '../../../context/user';

import {
  desktop,
  noTablet,
  noDesktop,
  cocoRegular,
  cocoBold,
} from '../../../styles/constants';
import SizeProposal from './SizeProposal';
import SizeReference from './SizeReference';
import JorCustomPerks from '../../common/JorCustomPerks';
import checkIconWhite from '../../../assets/images/icons/arrows/checkbox_white.svg.tsx';

interface Props {
  product: any;
}

const ProductInfo = ({ product }: Props) => {
  const wrapper: any = useRef(null);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    id: productId,
    sizeReference: sizeValuesNl,
    sizeReferenceEn: sizeValuesEn,
  } = product;

  const sizeInfo = currentLanguage === 'NL' ? sizeValuesNl : sizeValuesEn;

  const { Product } = languages[currentLanguage];
  const { productInfo } = Product;

  const {
    returns,
    details,
    proposal,
    shipment,
    sizeTable,
    sectionTitle,
    sizeReference,
  } = productInfo;
  const { content: contentProvider } = shipment;
  const { table: tableProvider } = contentProvider;
  const { content: contentReturn } = returns;
  const {
    conditions: {
      condition1,
      condition2,
      condition3,
      condition4,
      condition5,
      condition6,
    },
  } = contentReturn;
  const { tableHead, tableRow1, tableRow2, tableRow3, tableRow4, tableRow5 } =
    tableProvider;

  const initialTabIndex = isMobile ? 4 : 1;

  const [currentTabIndex, setCurrentTabIndex] =
    useState<number>(initialTabIndex);

  const formTitle = (id: number, title: string) => ({
    id,
    title,
  });

  const mobileTitles = [
    formTitle(1, sizeTable.title),
    formTitle(2, sizeReference.title),
    formTitle(3, proposal.title),
    formTitle(4, details.title),
    formTitle(5, shipment.title),
    formTitle(6, returns.title),
  ];

  const desktopTitles = [
    formTitle(1, sizeReference.title),
    formTitle(2, proposal.title),
    formTitle(3, shipment.title),
    formTitle(4, returns.title),
  ];

  const shipmentData = [
    tableHead,
    tableRow1,
    tableRow2,
    tableRow3,
    tableRow4,
    tableRow5,
  ];

  const returnData = [
    condition1,
    condition2,
    condition3,
    condition4,
    condition5,
    condition6,
  ];

  const toggleTabsHandler = (index: number) => {
    setCurrentTabIndex(index);
  };

  const TableRow = ({ data }: { data: any }) => (
    <ContentTableRow>
      {Object.entries(data).map(([key, value]) => (
        // @ts-ignore
        <ContentTableData key={key}>{value}</ContentTableData>
      ))}
    </ContentTableRow>
  );

  const MobileContent = ({ tabIndex }: { tabIndex: number }): any => {
    switch (tabIndex) {
      case 1:
        return (
          <>
            {!product?.sizeTableImage?.length && (
              <NoSizeImage>No image provided</NoSizeImage>
            )}
            {product?.sizeTableImage?.length > 0 && (
              <SizesImage src={product.sizeTableImage} />
            )}
          </>
        );
      case 2:
        return <SizeReference sizeInfo={sizeInfo} />;
      case 3:
        return <SizeProposal productId={productId} />;
      case 4:
        return (
          <>
            {product?.description.length > 0 && (
              <DetailsWrapper
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              />
            )}

            <PerksWrapper>
              <JorCustomPerks />
            </PerksWrapper>
          </>
        );
      case 5:
        return (
          <>
            <ContentTitle>{shipment.content.paragraph1}</ContentTitle>
            <ContentTitle>{shipment.content.paragraph2}</ContentTitle>
            <div>
              {shipmentData.map((data, idx) => (
                <TableRow data={data} key={idx} />
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <ContentTitle>{contentReturn.paragraph1}</ContentTitle>
            <ContentTitle>{contentReturn.paragraph2}</ContentTitle>
            <div>
              {returnData.map((data, idx) => (
                <ContentTableRow isColumns key={idx * data.length}>
                  <ContentTableData>{data}</ContentTableData>
                </ContentTableRow>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const DesktopContent = ({ tabIndex }: { tabIndex: number }): any => {
    switch (tabIndex) {
      case 1:
        return <SizeReference sizeInfo={sizeInfo} />;
      case 2:
        return <SizeProposal productId={productId} />;
      case 3:
        return (
          <>
            <ContentTitle>{shipment.content.paragraph1}</ContentTitle>
            <ContentTitle>{shipment.content.paragraph2}</ContentTitle>
            <div>
              {shipmentData.map((data, idx) => (
                <TableRow data={data} key={idx} />
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <ContentTitle>{contentReturn.paragraph2}</ContentTitle>
            <div>
              {returnData.map((data, idx) => (
                <ContentTableRow isColumns key={idx * data.length}>
                  <ContentTableData>{data}</ContentTableData>
                </ContentTableRow>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ProductInfoWrapper ref={wrapper}>
      <MediaQuery query="(max-width: 1023px)">
        <MobileTabsWrapper>
          {mobileTitles.map(({ id, title }) => (
            <MobileTab
              key={id}
              isActive={currentTabIndex === id}
              onClick={() => toggleTabsHandler(id)}
            >
              {title}
            </MobileTab>
          ))}
        </MobileTabsWrapper>

        <TabContentWrapper>
          <MobileContent tabIndex={currentTabIndex} />
        </TabContentWrapper>
      </MediaQuery>

      <MediaQuery query="(min-width: 1024px)">
        <InfoTitle>{sectionTitle}</InfoTitle>

        <DesktopTabsWrapper>
          {desktopTitles.map(({ id, title }) => (
            <DesktopTab
              key={id}
              isActive={currentTabIndex === id}
              onClick={() => toggleTabsHandler(id)}
            >
              {title}
            </DesktopTab>
          ))}
        </DesktopTabsWrapper>

        <TabContentWrapper>
          <DesktopContent tabIndex={currentTabIndex} />
        </TabContentWrapper>
      </MediaQuery>
    </ProductInfoWrapper>
  );
};

export default ProductInfo;

const ProductInfoWrapper = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: #2c2c2e;

  @media ${noDesktop} {
    padding: 0 5px;
  }

  @media ${desktop} {
    padding: 0 85px;
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.5);
    border-radius: 20px 20px 0 0;
  }
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  ${cocoBold};
  padding: 1% 0;
  font-size: calc(0.4em + 1vmin);
  color: #f7f7f7;
  border-bottom: 3px solid #6e6e6e;
`;

const MobileTabsWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(3, 32.69%);
  grid-column-gap: 1%;
  grid-row-gap: 10%;
  width: 100%;
  padding: 1% 0;
`;

const DesktopTabsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5% 0;
  border-bottom: 3px solid #6e6e6e;
`;

const activeStyles = css`
  color: #f7f7f7;
  background-color: #3e6ae1;
`;

const MobileTab = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  //height: 35px;
  height: 4vh;
  min-height: 4vh;
  max-height: 4vh;
  border-radius: 20px;
  color: #f7f7f7;
  ${cocoRegular};
  //padding: 10px 0;
  padding: 5px 0;
  //padding: 7% 0;
  font-size: calc(0.45em + 1vmin);
  //font-size: calc(0.35em + 1vmin);
  text-transform: capitalize;
  background-color: #1c1c1e;
  cursor: pointer;
  white-space: nowrap;
  ${(p: any) => (p.isActive ? activeStyles : null)};
`;

const DesktopTab = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  ${cocoRegular};
  padding: 0.6rem 0;
  margin-right: 3%;
  border-radius: 20px;
  color: #f7f7f7;
  text-transform: capitalize;
  background-color: #1c1c1e;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  ${(p: any) => (p.isActive ? activeStyles : null)};
  font-size: calc(0.4em + 1vmin);

  &:last-child {
    margin-right: 0;
  }
`;

const TabContentWrapper = styled.div`
  min-height: 345px;
  width: 100%;
  padding: 20px 0;
  color: #f7f7f7;

  @media ${noDesktop} {
    min-height: 250px;
  }
`;

const ContentTitle = styled.p`
  margin-bottom: 2rem;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
  text-align: justify;
`;

const NoSizeImage = styled.p`
  ${cocoRegular};
  font-size: calc(0.3em + 1vmin);
`;

const SizesImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const DetailsWrapper = styled.div`
  margin-bottom: 30px;

  & > * {
    ${cocoRegular};
    font-size: calc(0.4em + 1vmin);
    line-height: calc(0.8em + 1vmin);
  }
`;

const PerksWrapper = styled.div`
  & > ul {
    margin: 0;

    & > li {
      color: #f7f7f7;
      ${cocoRegular};
      font-size: calc(0.4em + 1vmin);
      line-height: calc(1.2em + 1vmin);

      &:before {
        content: url(${checkIconWhite});
      }
    }
  }
`;

const ContentTableRow = styled.div<{ isColumns?: boolean }>`
  display: grid;
  grid-template-rows: ${(p: any) => (p.isColumns ? 'auto' : '1fr')};
  grid-template-columns: ${(p: any) =>
    p.isColumns ? 'auto' : 'repeat(3, 1fr)'};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${noTablet} {
    grid-column-gap: 5px;
  }
`;

const ContentTableData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
`;
