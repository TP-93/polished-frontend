// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../../../assets/images/icons/close_white.svg.tsx';

interface Props {
  close: () => void;
  isCartModal?: boolean;
}

const CloseModal = ({ close, isCartModal = false }: Props) => {
  return (
    <CloseBtn
      onClick={close}
      type="button"
      role="none"
      isCartModal={isCartModal}
    >
      <Close />
    </CloseBtn>
  );
};

export default CloseModal;

const CloseBtn = styled.button<{ isCartModal: boolean }>`
  position: absolute;
  top: ${({ isCartModal }) => (!isCartModal ? '-15px' : '-27px')};
  right: ${({ isCartModal }) => (!isCartModal ? '-10px' : '-27px')};
  padding: 8px;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f7f7f7;
  border-radius: 50%;
  background: none;
  cursor: pointer;
`;

const Close = styled(CloseIcon)`
  width: 12px;
  height: 12px;

  path {
    fill: #f7f7f7;
  }
`;
