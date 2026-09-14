// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import {
  black,
  cocoBold,
  cocoRegular,
  pink,
  desktop,
} from '../../../styles/constants';
import { Checkout_checkout_shippingPrice as ShippingPrice } from '../../../apollo/queries/types/Checkout';
import { useUserProvider } from '../../../context/user';

const DeliveryOverview = ({
  price,
  date,
  location,
  openShippingMethods,
}: {
  price: ShippingPrice | null;
  date: any;
  location: string;
  openShippingMethods: () => void;
}) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Checkout } = languages[currentLanguage];
  const {
    sections: { shoppingCart },
  } = Checkout;

  return (
    <Overview>
      <Title>{shoppingCart.shipTitle}</Title>
      <Method>
        {date} {location}
        <span> {price && price.localized}</span>
      </Method>
      <ChangeBtn onClick={openShippingMethods} role="none">
        {'>'} {shoppingCart.shipLink}
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
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const Method = styled.p`
  ${cocoRegular};
  font-size: 12px;
  color: ${black};
  text-transform: uppercase;

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
  display: block;
  width: 220px;
  text-align: left;
  &:first-of-type {
    margin-bottom: 10px;
  }

  @media ${desktop} {
    font-size: 14px;
  }
`;

export default DeliveryOverview;
