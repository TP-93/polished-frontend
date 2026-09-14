// @ts-nocheck
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Base64 } from 'js-base64';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loader from '../components/common/PageDetails/Loader';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import { getOrderStatus } from '../apollo/queries/checkout';
import { getOrderStatus as OrderData } from '../apollo/queries/types/getOrderStatus';
import {
  red,
  black,
  desktop,
  cocoBold,
  cocoRegular,
} from '../styles/constants';
import StepsBlock from '../components/ThankYou/StepsBlock';
import ServiceBlock from '../components/ThankYou/ServiceBlock';
import ErrorMessage from '../components/common/Errors';
import { useUserProvider } from '../context/user';

interface Data {
  data: OrderData;
  loading: boolean;
  stopPolling: () => void;
}

const ThankYou = ({ history }: { history: any }) => {
  const {
    location: { search },
  } = history;

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { ThankYou: ThankYouProvider } = languages[currentLanguage];
  const {
    title,
    subTitle,
    errorMessage,
    subTitle2,
    subTitleAnalog,
    stepsBlockAnalog,
    serviceBlockAnalog,
  } = ThankYouProvider;

  const [isPageLoaded, togglePageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isPageLoaded) togglePageLoaded(true);
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
  }, [isPageLoaded]);

  const orderId: any = queryString.parse(search)?.order_id;

  const isValidTransaction: boolean = search?.length && orderId;

  if (!isPageLoaded && isValidTransaction) return <Loader />;

  if (isPageLoaded && !isValidTransaction) return <Redirect to="/404" />;

  return (
    <PageWrapper>
      <Query
        query={getOrderStatus}
        variables={{ token: orderId }}
        pollInterval={3000}
      >
        {({ data, loading, stopPolling }: Data) => {
          if (loading) return <Loader />;

          if (data?.orderByToken) {
            const {
              id,
              user,
              total,
              lines,
              number,
              paymentStatus,
              shippingPrice,
              billingAddress,
            } = data.orderByToken;

            const firstName = billingAddress?.firstName || '';

            if (
              paymentStatus === 'IN_STORE' ||
              paymentStatus === 'AUTHORIZED' ||
              paymentStatus === 'FULLY_CHARGED'
            ) {
              stopPolling();

              const {
                city: customerBillingCity,
                phone: customerBillingPhone,
                country,
                lastName: customerBillingLastName,
                firstName: customerBillingFirstName,
                postalCode: customerBillingPostcode,
                streetAddress1: customerBillingAddress1,
                streetAddress2: customerBillingAddress2,
              } = billingAddress || {};

              const purchaseEventData: any = {
                items: [],
                value: total?.amount || '',
                currency: 'EUR',
                shipping: shippingPrice?.gross?.amount || '',
                transaction_id: Base64.decode(id) || '',
                customerBillingCity,
                customerBillingPhone,
                customerFirstName: user?.firstName || '',
                customerLastName: user?.lastName || '',
                customerBillingCountry: country?.code || '',
                customerBillingLastName,
                customerBillingFirstName,
                customerBillingPostcode,
                customerBillingAddress1,
                customerBillingAddress2,
              };

              const categoryExceptions = ['socks', 'caps', 'gift'];

              lines.forEach((line: any) => {
                if (line) {
                  const {
                    size,
                    variant,
                    quantity,
                    unitPrice,
                    userDesign,
                    productSku,
                    productName,
                  } = line;

                  const purchaseEventItemData = {
                    item_name: productName,
                    item_id: `${productSku}-${size}`,
                    item_group_id: productSku,
                    price: unitPrice?.amount,
                    item_category: variant?.product?.category?.name || '',
                    item_category2:
                      variant?.product?.category?.parent?.name || '',
                    item_category3: '',
                    item_category4: '',
                    item_category5: userDesign?.id ? 'Customized' : 'Original',
                    item_variant: `Size ${size}`,
                    quantity,
                    index: purchaseEventData.items.length + 1,
                  };

                  let isCategoryException = false;

                  categoryExceptions.forEach((exception) => {
                    if (productName.toLowerCase().includes(exception)) {
                      isCategoryException = true;
                    }
                  });

                  if (!isCategoryException) {
                    const productNamePart = productName.split('(')[0];
                    const productNameChars = productNamePart.split(' ');

                    purchaseEventItemData.item_category3 =
                      productNameChars[productNameChars.length - 2];

                    // eslint-disable-next-line prefer-destructuring
                    purchaseEventItemData.item_category4 = productNameChars[0];
                  }

                  purchaseEventData.items.push(purchaseEventItemData);
                }
              });

              // @ts-ignore
              const transactionMatch: any = window.dataLayer.find(
                (event: any) =>
                  event?.ecommerce?.transaction_id === Base64.decode(id),
              );

              if (isPageLoaded && !transactionMatch) {
                // @ts-ignore
                window.dataLayer.push({
                  event: 'purchase',
                  ecommerce: { ...purchaseEventData },
                });
              }

              if (paymentStatus === 'IN_STORE') {
                return (
                  <>
                    <InnerWrapp>
                      <Title>
                        {title}, {firstName && <span>{firstName}</span>}
                      </Title>

                      <PageSubtitle>{subTitleAnalog}</PageSubtitle>

                      <InnerBlock>
                        <PageSubtitle>
                          {stepsBlockAnalog.title1} <span>{number}</span>{' '}
                          {stepsBlockAnalog.title2}
                        </PageSubtitle>

                        <PageSubtitle>{stepsBlockAnalog.title3}</PageSubtitle>

                        <PageSubtitleAnalog>
                          {stepsBlockAnalog.paragraph1} <span>{number}</span>{' '}
                          {stepsBlockAnalog.paragraph1Add}
                        </PageSubtitleAnalog>

                        <PageSubtitleAnalog>
                          {stepsBlockAnalog.paragraph2}
                        </PageSubtitleAnalog>

                        <PageSubtitleAnalog>
                          {stepsBlockAnalog.paragraph3}
                        </PageSubtitleAnalog>

                        <PageSubtitleAnalog>
                          {stepsBlockAnalog.paragraph4}
                        </PageSubtitleAnalog>
                      </InnerBlock>

                      <PageSubtitle>{serviceBlockAnalog.title}</PageSubtitle>

                      <PageSubtitleAnalog>
                        {serviceBlockAnalog.paragraph}
                      </PageSubtitleAnalog>
                    </InnerWrapp>
                  </>
                );
              }

              return (
                <>
                  <InnerWrapp>
                    <Title>
                      {title}, {firstName && <span>{firstName}</span>}
                    </Title>

                    <PageSubtitle>{subTitle}</PageSubtitle>

                    <PageSubtitle>
                      {subTitle2} # <span>{number}</span>
                    </PageSubtitle>

                    <StepsBlock />

                    <ServiceBlock />
                  </InnerWrapp>
                </>
              );
            }

            if (data.orderByToken.paymentStatus === 'PENDING') {
              return <Loader />;
            }

            stopPolling();

            return <ErrorMessage>{errorMessage} </ErrorMessage>;
          }

          return <Loader />;
        }}
      </Query>
    </PageWrapper>
  );
};

const InnerWrapp = styled.div`
  padding-top: 30px;
  margin: auto;
`;

const Title = styled.h1`
  ${cocoBold};
  color: ${black};
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;

  span {
    color: ${red};
  }

  @media ${desktop} {
    font-size: 48px;
  }
`;

const PageSubtitle = styled.h2`
  ${cocoBold};
  color: ${black};
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;

  span {
    color: ${red};
  }

  @media ${desktop} {
    font-size: 22px;
  }
`;

const InnerBlock = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
`;

const PageSubtitleAnalog = styled.h2`
  ${cocoRegular};
  color: ${black};
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 30px;
  margin-top: 30px;

  span {
    color: ${red};
  }

  @media ${desktop} {
    font-size: 22px;
  }
`;

export default ThankYou;
