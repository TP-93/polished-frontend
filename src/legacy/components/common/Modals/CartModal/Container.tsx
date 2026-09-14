// @ts-nocheck
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Content from './Content';
import ModalHeader from './Header';
import ModalActions from './Footer';

interface Props {
  close: any;
  product: any;
  selectedSize: string;
  userDesignName: string | null;
  checkoutImages: any;
  addToCartHandler: () => void;
  removeDesignHandler?: () => void;
}

const CartModal = ({
  close,
  product,
  selectedSize,
  userDesignName,
  checkoutImages,
  addToCartHandler,
  removeDesignHandler,
}: Props) => {
  useEffect(() => {
    addToCartHandler();
  }, []);

  return (
    <Container>
      <ModalHeader close={close} />
      <Content
        product={product}
        selectedSize={selectedSize}
        userDesignName={userDesignName}
        checkoutImages={checkoutImages}
      />
      <ModalActions removeDesignHandler={removeDesignHandler} />
    </Container>
  );
};

export default CartModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1%;
  opacity: 0.85;
  border-radius: 20px;
  background-color: #000;

  @media (max-width: 599px) {
    min-width: 90%;
  }

  @media (min-width: 600px) {
    min-width: 50%;
  }

  @media (min-width: 1024px) {
    min-width: 40%;
  }

  @media (min-width: 1400px) {
    min-width: 30%;
  }

  @media (min-width: 1800px) {
    min-width: 25%;
  }
`;
