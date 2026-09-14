// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { cocoRegular } from '../../../../styles/constants';

interface Props {
  text: string;
  isReset: boolean;
  resetAction?: any;
  close: () => void;
}

const ConfirmModal = ({ text, isReset, close, resetAction }: Props) => (
  <Container>
    <ModalText>{text}</ModalText>
    <ButtonsWrapper>
      {isReset && (
        <>
          <Button onClick={close}>Cancel</Button>
          <Button
            isReset={isReset}
            onClick={() => {
              resetAction();
              close();
            }}
          >
            Reset
          </Button>
        </>
      )}
      {!isReset && (
        <Button isOkay onClick={close}>
          Okay!
        </Button>
      )}
    </ButtonsWrapper>
  </Container>
);

export default ConfirmModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1e1e1ebf;
  border-radius: 20px;
`;

const ModalText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6% 1%;
  line-height: 25px;
  color: #f7f7f7;
  ${cocoRegular};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
`;

const Button = styled.button<{
  isReset?: boolean;
  isOkay?: boolean;
}>`
  width: 50%;
  height: 100%;
  padding: 4% 2%;
  border: none;
  border-left: ${({ isReset }) => (isReset ? '1px solid #fff' : '0px')};
  outline: none;
  color: ${({ isReset, isOkay }) => {
    if (isReset) return 'red';
    if (isOkay) return '#0A84FF';
    return '#f7f7f7';
  }};
  background-color: transparent;
  cursor: pointer;
  ${cocoRegular};
  font-size: calc(0.45em + 1vmin);
`;
