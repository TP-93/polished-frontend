// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';

import BackButton from '../common/Buttons/BackButton';
import NextButton from '../common/Buttons/NextButton';

interface MobileControlsProps {
  isFixed: boolean;
  nextText: string;
  backHandler: () => void;
  nextHandler: () => void;
}

const MobileBottomControls = ({
  isFixed,
  nextText,
  backHandler,
  nextHandler,
}: MobileControlsProps) => (
  <Controls isFixed={isFixed}>
    <BtnWrapper>
      <BackButton onClick={backHandler} />
    </BtnWrapper>
    <BtnWrapper>
      <NextButton text={nextText} onClick={nextHandler} />
    </BtnWrapper>
  </Controls>
);

export default MobileBottomControls;

const fixedStyles = css`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
`;

const Controls = styled.div<{ isFixed: boolean }>`
  ${({ isFixed }) => (isFixed ? fixedStyles : undefined)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px;
  margin-top: auto;
  background-color: #000000;
  border-radius: 20px 20px 0 0;
  opacity: 1;
`;

const BtnWrapper = styled.div`
  width: 50%;
  > button {
    color: #fff;

    > svg {
      > path {
        fill: #fff;
      }
    }
  }
`;
