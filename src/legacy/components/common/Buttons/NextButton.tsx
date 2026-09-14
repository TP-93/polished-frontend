// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { cocoBold, desktop } from '../../../styles/constants';
import { ReactComponent as BagIcon } from '../../../assets/images/icons/checkout/bag_icon_white.svg.tsx';

interface Props {
  text: string;
  onClick: any;
  isTextEditing?: boolean;
}

const NextButton = ({ text, onClick, isTextEditing }: Props) => (
  <Button onClick={onClick} disabled={isTextEditing}>
    <CartIcon />
    <span>{text}</span>
  </Button>
);

export default NextButton;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 4vh;
  max-height: 4vh;
  border: 1px solid #3e6ae1;
  outline: none;
  border-radius: 20px;
  ${cocoBold};
  background-color: #3e6ae1;
  cursor: pointer;
  font-size: calc(0.35em + 1vmin);
  color: #fff;
  user-select: none;
  text-transform: uppercase;

  &:disabled {
    opacity: 0.5;
  }

  > span {
    padding-left: 5px;
  }

  &:hover {
    opacity: 0.8;
  }

  @media ${desktop} {
    font-size: calc(0.1em + 1vmin);
  }
`;

const CartIcon = styled(BagIcon)`
  flex-basis: 10%;
  max-height: 2vh;
`;
