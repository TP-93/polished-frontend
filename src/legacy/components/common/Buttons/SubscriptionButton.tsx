// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import subscriptionIcon from '../../../assets/images/icons/subscribe/subscription_icon.png';
import { cocoBold, noDesktop } from '../../../styles/constants';

interface ISubscriptionButton {
  children: string;
  hideModal: () => void;
}

export default ({ children, hideModal }: ISubscriptionButton) => (
  <SubscriptionButton onClick={hideModal}>
    <SubscriptionIcon src={subscriptionIcon} alt="subscription letter" />
    {children}
  </SubscriptionButton>
);

const SubscriptionButton = styled.button`
  width: max-content;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 40px;
  right: 20px;
  z-index: 1000;
  padding: 0.5rem;
  border: none;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.16);
  background-color: #151515;
  color: #ffffff;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  ${cocoBold};
  font-size: 0.75rem;

  @media ${noDesktop} {
    right: 10px;
  }
`;

const SubscriptionIcon = styled.img`
  margin-right: 7px;
  height: 3vh;

  @media ${noDesktop} {
    height: 2vh;
  }
`;
