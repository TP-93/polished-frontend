// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { returnCurrentUser_me_orders_edges_node as NodeWrapper } from '../../apollo/queries/types/returnCurrentUser';

import Order from './Order';
import { BtnBlackMedium } from '../common/Buttons';
import { noTablet } from '../../styles/constants';

interface Node {
  node: NodeWrapper;
}

interface Props {
  orders: Node[];
  loadMore: () => void;
  hasNextPage: boolean;
}

export default ({ orders, loadMore, hasNextPage }: Props) => (
  <OrdersWrapper>
    {orders.map((o: Node) => (
      <Order key={o.node.id} data={o.node} />
    ))}
    {hasNextPage && (
      <Btn onClick={loadMore} role="none">
        Load more
      </Btn>
    )}
  </OrdersWrapper>
);

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: auto;
  padding: 20px 0;

  @media ${noTablet} {
    width: 100%;
  }
`;

const Btn = styled(BtnBlackMedium)`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

//
