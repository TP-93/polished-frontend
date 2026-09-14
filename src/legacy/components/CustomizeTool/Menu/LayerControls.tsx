// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';

import { useUserProvider } from '../../../context/user';

import { cocoBold } from '../../../styles/constants';
import { ReactComponent as Check } from '../../../assets/images/icons/arrows/check_icon_fat_white.svg.tsx';
import { ReactComponent as Cancel } from '../../../assets/images/icons/close_white.svg.tsx';

interface Props {
  isFixed: boolean;
  isImagePickerControls: boolean;
  doneHandler: () => void;
  cancelHandler: () => void;
}

const MobileLayerControls = ({
  isFixed,
  isImagePickerControls,
  doneHandler,
  cancelHandler,
}: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Product } = languages[currentLanguage];

  const {
    colorPickersData: {
      imagePicker: { finishLayer, finishLayers, cancelBtn },
    },
  } = Product;

  const cancelText = cancelBtn;
  const doneText = isImagePickerControls ? finishLayers : finishLayer;

  return (
    <Controls isFixed={isFixed}>
      <CancelBtn onClick={cancelHandler}>
        <CancelIcon />
        <span>{cancelText}</span>
      </CancelBtn>
      <DoneButton onClick={doneHandler} isFinishLayers={isImagePickerControls}>
        <CheckIcon />
        <span>{doneText}</span>
      </DoneButton>
    </Controls>
  );
};

export default MobileLayerControls;

const fixedStyles = css`
  position: fixed;
  left: 0;
  bottom: 0;
`;

const Controls = styled.div<{ isFixed: boolean }>`
  ${({ isFixed }) => (isFixed ? fixedStyles : undefined)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
  padding: 5px 10px;
  background-color: #000000;
  border-radius: 20px 20px 0 0;
`;

const btnStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  min-height: 4vh;
  max-height: 4vh;
  //padding: 5px;
  cursor: pointer;
  font-size: calc(0.35em + 1vmin);
  ${cocoBold};
  text-transform: uppercase;
  border-radius: 20px;
  user-select: none !important;

  > span {
    padding-left: 5px;
  }
`;

const CancelBtn = styled.div`
  ${btnStyles};
  color: #ff453a;
  border: 1px solid #ff453a;
`;

const DoneButton = styled.div<{ isFinishLayers: boolean }>`
  ${btnStyles};
  color: #ffffff;
  border: 1px solid
    ${({ isFinishLayers }) => (isFinishLayers ? '#3c66d6' : '#32d74b')};
  background-color: ${({ isFinishLayers }) =>
    isFinishLayers ? '#3c66d6' : '#32d74b'};
`;

const iconStyles = css`
  flex-basis: 10%;
  height: 2vh;
  user-select: none !important;
`;

const CancelIcon = styled(Cancel)`
  ${iconStyles};

  & > path {
    fill: #ff453a;
  }
`;

const CheckIcon = styled(Check)`
  ${iconStyles};

  & > path {
    color: #ffffff;
  }
`;
