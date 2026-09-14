// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { useUserProvider } from '../../../../context/user';

import { cocoBold } from '../../../../styles/constants';

interface Props {
  removeDesignHandler?: () => void;
}

export default ({ removeDesignHandler }: Props) => {
  const history = useHistory();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      addToCartModal: { cntShoppingBtn, cntCheckoutBtn },
    },
  } = languages[currentLanguage];

  const categoryRedirectHandler = () => {
    if (removeDesignHandler) removeDesignHandler();

    // @ts-ignore
    history.goBack();
  };

  const checkoutRedirectHandler = async () => {
    if (removeDesignHandler) removeDesignHandler();

    history.replace('/checkout');
  };

  return (
    <ActionsContainer>
      <ContinueShopping role="none" onClick={categoryRedirectHandler}>
        {cntShoppingBtn}
      </ContinueShopping>
      <GoToCheckout role="none" onClick={checkoutRedirectHandler}>
        {cntCheckoutBtn}
      </GoToCheckout>
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2% 1%;
`;

const btnStyle = css`
  width: 49%;
  padding: 2%;
  border-radius: 50px;
  color: #f7f7f7;
  border: 1px solid #f7f7f7;
  background-color: transparent;
  text-transform: capitalize;
  ${cocoBold};
  outline: none;
  font-size: calc(0.45em + 1vmin);
  white-space: nowrap;
`;

const ContinueShopping = styled.button`
  ${btnStyle};
`;

const GoToCheckout = styled.button`
  ${btnStyle};
  border: 1px solid transparent;
  background-color: #3e6ae1;
`;
