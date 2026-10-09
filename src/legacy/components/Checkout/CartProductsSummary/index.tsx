// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';

import { OrderLine } from '../../../interfaces/product';
import { GUEST_TOKEN_NAME } from '../../../constants';
import CartSummaryListItem from './CartSummaryListItem';
import { createCheckout_checkoutCreate_quantityErrors as ServerQuantityError } from '../../../apollo/mutations/types/createCheckout';

interface Props {
  fixed?: boolean;
  delBtn?: boolean;
  products: OrderLine[];
  isWishList?: boolean;
  linesNumber: number;
  checkoutId?: string;
  quantityErrors?: (ServerQuantityError | null)[];
  setQuantityErrors?: (errors: (ServerQuantityError | null)[]) => void;
}

const CartProductsSummary = ({
  fixed,
  delBtn,
  products,
  checkoutId,
  linesNumber,
  quantityErrors,
  setQuantityErrors,
}: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const [disabled, setDisabled] = useState(false);

  return (
    <ItemsList>
      {products.map((product: OrderLine) => (
        <CartSummaryListItem
          key={product.cartId}
          token={token}
          fixed={fixed}
          delBtn={delBtn}
          product={product}
          disabled={disabled}
          checkoutId={checkoutId}
          linesNumber={linesNumber}
          setDisabled={setDisabled}
          quantityErrors={quantityErrors}
          setQuantityErrors={setQuantityErrors}
        />
      ))}
    </ItemsList>
  );
};

export default CartProductsSummary;

const ItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 0;
`;
