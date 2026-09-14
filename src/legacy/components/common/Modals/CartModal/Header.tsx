// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { cocoBold } from '../../../../styles/constants';
import CloseModal from '../../Buttons/CloseModal';
import { useUserProvider } from '../../../../context/user';

interface Props {
  close: () => void;
}

export default ({ close }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const {
    Product: {
      addToCartModal: { addToCartTitle },
    },
  } = languages[currentLanguage];

  return (
    <Header>
      <Title>{addToCartTitle}</Title>
      <CloseModal close={close} isCartModal />
    </Header>
  );
};

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2% 1%;
  text-align: center;

  > button {
    top: -18px;
    right: -23px;
  }
`;

const Title = styled.span`
  width: 100%;
  ${cocoBold};
  font-size: 1rem;
  color: #f7f7f7;
  text-transform: uppercase;
  text-align: center;
`;
