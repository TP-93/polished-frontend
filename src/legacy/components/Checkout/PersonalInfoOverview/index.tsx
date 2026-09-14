// @ts-nocheck
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'styled-bootstrap-grid';
import {
  Checkout_checkout_billingAddress as Address,
  Checkout_checkout_shippingAddress as ShippingAddress,
} from '../../../apollo/queries/types/Checkout';

import {
  black,
  cocoBold,
  cocoRegular,
  pink,
  desktop,
} from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

const PersonalInfoOverview = ({
  email,
  address,
  sameAddress,
  shippingAddress,
  openAddressForm,
}: {
  email: string | null;
  address: Address | null;
  sameAddress: boolean;
  shippingAddress: ShippingAddress | null;
  openAddressForm: () => void;
}) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Checkout } = languages[currentLanguage];
  const { sections } = Checkout;
  const { checkout: checkoutProvider } = sections;
  const { personalIngoOverview } = checkoutProvider;
  const { isSameAddress } = personalIngoOverview;

  return (
    <Overview>
      <Title>{personalIngoOverview.title}</Title>
      <Row>
        {address && (
          <Col md={6}>
            {!isSameAddress ? (
              <BlockTitle>{personalIngoOverview.blockTitle}</BlockTitle>
            ) : (
              <BlockTitle>{personalIngoOverview.titleNotSame}</BlockTitle>
            )}
            <AddressLine>
              <span>{personalIngoOverview.row1} </span>
              {`${address.firstName} ${address.lastName}`}
            </AddressLine>
            <AddressLine>
              <span>{personalIngoOverview.row2} </span>
              <RightAlign>
                {`${address.streetAddress1} ${address.houseNumber}`}
              </RightAlign>
            </AddressLine>
            <AddressLine>
              <span>{personalIngoOverview.row3} </span>
              <RightAlign>{`${address.postalCode} ${address.city}`}</RightAlign>
            </AddressLine>
            <AddressLine>
              <span>{personalIngoOverview.row4} </span>
              {address.country.country}
            </AddressLine>
            <AddressLine>
              <span>{personalIngoOverview.row5} </span>
              {email}
            </AddressLine>
            <AddressLine>
              <span>{personalIngoOverview.row6} </span>
              {address.phone}
            </AddressLine>
          </Col>
        )}
        {!sameAddress && shippingAddress && (
          <Fragment>
            <Col md={6}>
              <BlockTitle>{isSameAddress.blockTitle}</BlockTitle>
              <AddressLine>
                <span>{isSameAddress.row1} </span>
                {shippingAddress.companyName || '-'}
              </AddressLine>
              <AddressLine>
                <span>{isSameAddress.row2} </span>
                {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
              </AddressLine>
              <AddressLine>
                <span>{isSameAddress.row3} </span>
                <RightAlign>
                  {`${shippingAddress.streetAddress1} ${shippingAddress.houseNumber}`}
                </RightAlign>
              </AddressLine>
              <AddressLine>
                <span>{personalIngoOverview.row3} </span>
                <RightAlign>
                  {`${shippingAddress.postalCode} ${shippingAddress.city}`}
                </RightAlign>
              </AddressLine>
              <AddressLine>
                <span>{isSameAddress.row4} </span>
                {shippingAddress.country.country}
              </AddressLine>
              <AddressLine>
                <span>{isSameAddress.row6} </span>
                {shippingAddress.phone}
              </AddressLine>
            </Col>
          </Fragment>
        )}
      </Row>
      <ChangeBtn type="button" onClick={openAddressForm} role="none">
        {'>'} {personalIngoOverview.changeBtn}
      </ChangeBtn>
    </Overview>
  );
};

const Overview = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  ${cocoBold};
  font-size: 14px;
  color: ${black};
  margin-bottom: 0;
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const BlockTitle = styled.h3`
  ${cocoBold};
  font-size: 14px;
  color: ${black};
  margin-bottom: 15px;
`;

const AddressLine = styled.p`
  ${cocoRegular};
  font-size: 12px;
  color: ${black};
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 15px;

  @media ${desktop} {
    font-size: 14px;
  }
`;

const ChangeBtn = styled.button`
  border: none;
  background: none;
  ${cocoBold};
  font-size: 12px;
  color: ${pink};
  text-decoration: underline;
  padding: 0;
  cursor: pointer;

  @media ${desktop} {
    font-size: 14px;
  }
`;

const RightAlign = styled.span`
  text-align: right;
`;

export default PersonalInfoOverview;
